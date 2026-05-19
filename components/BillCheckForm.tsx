"use client";

import { useState, useTransition } from "react";
import type { Provider } from "@/lib/types";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "error"; message: string }
  | { kind: "ok-real"; html: string }
  | { kind: "ok-deeplink"; url: string }
  | { kind: "ok-linkout"; url: string };

export function BillCheckForm({ provider }: { provider: Provider }) {
  const [ref, setRef] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [, startTransition] = useTransition();

  function validate(input: string): string | null {
    const v = input.trim();
    if (!v) return `Please enter your ${provider.referenceFormat.label.toLowerCase()}.`;
    if (provider.referenceFormat.digitsOnly && !/^[0-9]+$/.test(v)) {
      return `${provider.referenceFormat.label} must be digits only.`;
    }
    if (v.length < provider.referenceFormat.minLength || v.length > provider.referenceFormat.maxLength) {
      return `${provider.referenceFormat.label} should be ${provider.referenceFormat.minLength}–${provider.referenceFormat.maxLength} characters.`;
    }
    try {
      const re = new RegExp(provider.referenceFormat.regex);
      if (!re.test(v)) return `That doesn't look like a valid ${provider.referenceFormat.label}.`;
    } catch {
      // Regex shipped in data file is invalid — fall through; min/max + digit check are enough.
    }
    return null;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const err = validate(ref);
    if (err) {
      setStatus({ kind: "error", message: err });
      return;
    }

    const value = ref.trim();
    setStatus({ kind: "submitting" });

    if (provider.billCheckTier === "B-deeplink" && provider.portalDeepLinkTemplate) {
      const url = provider.portalDeepLinkTemplate.replace("{ref}", encodeURIComponent(value));
      setStatus({ kind: "ok-deeplink", url });
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }

    if (provider.billCheckTier === "C-linkout") {
      const url = provider.portalUrl;
      setStatus({ kind: "ok-linkout", url });
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }

    // Tier A — real fetch through our API.
    const endpoint =
      provider.realApi === "pk-pitc"
        ? `/api/bill/pk?path=${encodeURIComponent(provider.pitcBillPath ?? "")}&refno=${encodeURIComponent(value)}`
        : `/api/bill/in?biller=${encodeURIComponent(provider.bbpsBillerId ?? "")}&consumerId=${encodeURIComponent(value)}`;

    startTransition(async () => {
      try {
        const res = await fetch(endpoint, { method: "GET", cache: "no-store" });
        const body = await res.json().catch(() => null);
        if (!res.ok) {
          setStatus({ kind: "error", message: typeof body?.error === "string" ? body.error : `Lookup failed (${res.status}).` });
          return;
        }
        // API returns { html, ref } JSON
        const html = typeof body?.html === "string" ? body.html : "";
        if (!html) {
          setStatus({ kind: "error", message: "Empty response from bill portal." });
          return;
        }
        setStatus({ kind: "ok-real", html });
      } catch (e) {
        setStatus({ kind: "error", message: e instanceof Error ? e.message : "Network error" });
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <label htmlFor="ref" className="block text-sm font-medium text-slate-900">
        {provider.referenceFormat.label}
      </label>
      <input
        id="ref"
        name="ref"
        inputMode={provider.referenceFormat.digitsOnly ? "numeric" : "text"}
        pattern={provider.referenceFormat.digitsOnly ? "[0-9]*" : undefined}
        autoComplete="off"
        spellCheck={false}
        value={ref}
        onChange={(e) => setRef(e.target.value)}
        placeholder={provider.referenceFormat.example}
        aria-describedby="ref-help"
        className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
      />
      <p id="ref-help" className="text-xs text-slate-500">{provider.referenceFormat.description}</p>

      <button
        type="submit"
        disabled={status.kind === "submitting"}
        className="w-full rounded-md bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-800 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status.kind === "submitting" ? "Looking up…" : "Check Bill"}
      </button>

      {status.kind === "error" && (
        <p role="alert" className="text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-md px-3 py-2">
          {status.message}
        </p>
      )}

      {(status.kind === "ok-deeplink" || status.kind === "ok-linkout") && (
        <p className="text-sm text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-md px-3 py-2">
          Opened the official {provider.name} portal in a new tab.{" "}
          <a href={status.url} target="_blank" rel="noopener noreferrer" className="underline">
            Open again
          </a>
        </p>
      )}

      {status.kind === "ok-real" && (
        <div className="rounded-md border border-slate-200 bg-slate-50 p-3 text-sm">
          <p className="font-medium mb-2">Bill loaded — preview below:</p>
          <iframe
            title="Bill preview"
            srcDoc={status.html}
            sandbox="allow-same-origin"
            className="w-full min-h-[640px] rounded bg-white"
          />
        </div>
      )}
    </form>
  );
}
