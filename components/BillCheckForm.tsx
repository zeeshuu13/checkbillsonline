"use client";

import { useState, useEffect, useRef, useTransition } from "react";
import type { Provider } from "@/lib/types";

const LOADING_MESSAGES = [
  "Connecting to billing server...",
  "Verifying your reference number...",
  "Reaching the official portal...",
  "Checking billing records...",
  "Fetching your electricity bill...",
  "Securing session with portal...",
  "Almost there, please wait...",
  "Loading your bill details...",
];

type Status =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "error"; message: string }
  | { kind: "ok-real"; html: string }
  | { kind: "ok-redirect"; url: string; label: string };

export function BillCheckForm({ provider }: { provider: Provider }) {
  const [ref, setRef] = useState("");
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [msgIdx, setMsgIdx] = useState(0);
  const [showBill, setShowBill] = useState(false);
  const [, startTransition] = useTransition();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (status.kind === "loading") {
      setMsgIdx(0);
      intervalRef.current = setInterval(() => {
        setMsgIdx((i) => (i + 1) % LOADING_MESSAGES.length);
      }, 1800);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [status.kind]);

  // Reset bill view when provider changes externally
  useEffect(() => {
    setStatus({ kind: "idle" });
    setRef("");
    setShowBill(false);
  }, [provider.slug]);

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
      // regex in data file is invalid — min/max + digit check are enough
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
    setStatus({ kind: "loading" });
    setShowBill(false);

    // Tier B — deeplink: show loading for 3 s then open portal
    if (provider.billCheckTier === "B-deeplink" && provider.portalDeepLinkTemplate) {
      const url = provider.portalDeepLinkTemplate.replace("{ref}", encodeURIComponent(value));
      setTimeout(() => {
        setStatus({ kind: "ok-redirect", url, label: provider.name });
        window.open(url, "_blank", "noopener,noreferrer");
      }, 3000);
      return;
    }

    // Tier C — linkout: show loading for 3 s then open portal home
    if (provider.billCheckTier === "C-linkout") {
      const url = provider.portalUrl;
      setTimeout(() => {
        setStatus({ kind: "ok-redirect", url, label: provider.name });
        window.open(url, "_blank", "noopener,noreferrer");
      }, 3000);
      return;
    }

    // Tier A — real API fetch (Pakistan PITC / India BBPS)
    const endpoint =
      provider.realApi === "pk-pitc"
        ? `/api/bill/pk?path=${encodeURIComponent(provider.pitcBillPath ?? "")}&refno=${encodeURIComponent(value)}`
        : `/api/bill/in?biller=${encodeURIComponent(provider.bbpsBillerId ?? "")}&consumerId=${encodeURIComponent(value)}`;

    startTransition(async () => {
      try {
        const res = await fetch(endpoint, { method: "GET", cache: "no-store" });
        const body = await res.json().catch(() => null);
        if (!res.ok) {
          setStatus({
            kind: "error",
            message: typeof body?.error === "string" ? body.error : `Lookup failed (${res.status}).`,
          });
          return;
        }
        const html = typeof body?.html === "string" ? body.html : "";
        if (!html) {
          setStatus({ kind: "error", message: "Empty response from bill portal." });
          return;
        }
        setStatus({ kind: "ok-real", html });
      } catch (e) {
        setStatus({ kind: "error", message: e instanceof Error ? e.message : "Network error — please try again." });
      }
    });
  }

  return (
    <div className="space-y-3">
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
          disabled={status.kind === "loading"}
          className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40 disabled:opacity-60"
        />
        <p id="ref-help" className="text-xs text-slate-500">{provider.referenceFormat.description}</p>

        <button
          type="submit"
          disabled={status.kind === "loading"}
          className="w-full rounded-md bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {status.kind === "loading" ? "Checking…" : "Check Bill"}
        </button>
      </form>

      {/* Loading animation */}
      {status.kind === "loading" && (
        <div className="rounded-xl border border-brand-100 bg-brand-50 px-4 py-6 flex flex-col items-center gap-3 text-center">
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 rounded-full border-4 border-brand-200" />
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-brand-700 animate-spin" />
          </div>
          <p className="text-sm font-medium text-brand-800 transition-all duration-500">
            {LOADING_MESSAGES[msgIdx]}
          </p>
          <p className="text-xs text-slate-500">This may take up to 30 seconds</p>
        </div>
      )}

      {/* Error */}
      {status.kind === "error" && (
        <div role="alert" className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2.5">
          <p className="text-sm text-rose-700">{status.message}</p>
          <button
            type="button"
            onClick={() => setStatus({ kind: "idle" })}
            className="mt-1.5 text-xs font-medium text-rose-600 underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Redirect result (Tier B/C) */}
      {status.kind === "ok-redirect" && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-center space-y-2">
          <p className="text-sm font-semibold text-emerald-800">
            Opened the official {status.label} portal
          </p>
          <p className="text-xs text-slate-600">Your reference number has been passed to the portal. Check the new tab.</p>
          <a
            href={status.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-1 rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800 transition-colors"
          >
            Open again →
          </a>
        </div>
      )}

      {/* Real bill result (Tier A) */}
      {status.kind === "ok-real" && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-4 space-y-3">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm font-semibold text-emerald-800">Bill fetched successfully!</p>
          </div>
          {!showBill ? (
            <button
              type="button"
              onClick={() => setShowBill(true)}
              className="w-full rounded-md bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-800 transition-colors"
            >
              View Bill →
            </button>
          ) : (
            <div className="rounded-md overflow-hidden border border-slate-200">
              <iframe
                title="Bill preview"
                srcDoc={status.html}
                sandbox="allow-same-origin"
                className="w-full min-h-[700px] bg-white"
              />
              <div className="border-t border-slate-200 bg-slate-50 px-3 py-2 flex justify-between items-center">
                <span className="text-xs text-slate-500">Fetched from official portal · For reference only</span>
                <button
                  type="button"
                  onClick={() => setShowBill(false)}
                  className="text-xs text-slate-500 hover:text-slate-700 underline"
                >
                  Hide
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
