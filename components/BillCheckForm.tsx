"use client";

import { useState, useEffect, useRef } from "react";
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

/** PITC's gbill.aspx accepts a POST with refno+type in the querystring and returns the bill HTML. */
function pitcGbillUrl(refno: string): string {
  return `https://bill.pitc.com.pk/gbill.aspx?refno=${encodeURIComponent(refno)}&type=U`;
}

type Stage =
  | { kind: "idle" }
  | { kind: "loading"; refValue: string; redirectUrl?: string }
  | { kind: "ready-pitc"; refValue: string; openHref: string }
  | { kind: "ready-redirect"; url: string; label: string }
  | { kind: "error"; message: string };

export function BillCheckForm({ provider }: { provider: Provider }) {
  const [ref, setRef] = useState("");
  const [stage, setStage] = useState<Stage>({ kind: "idle" });
  const [msgIdx, setMsgIdx] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Rotate loading messages while in loading stage
  useEffect(() => {
    if (stage.kind === "loading") {
      setMsgIdx(0);
      intervalRef.current = setInterval(() => {
        setMsgIdx((i) => (i + 1) % LOADING_MESSAGES.length);
      }, 1600);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [stage.kind]);

  // When loading finishes (timer fires), transition to the ready stage
  useEffect(() => {
    if (stage.kind !== "loading") return;
    const LOADING_MS = 5000;
    const t = setTimeout(() => {
      if (stage.redirectUrl) {
        setStage({ kind: "ready-redirect", url: stage.redirectUrl, label: provider.name });
        window.open(stage.redirectUrl, "_blank", "noopener,noreferrer");
      } else {
        // pk-pitc — browser will POST directly to PITC (no VPS-to-PITC connection needed)
        setStage({
          kind: "ready-pitc",
          refValue: stage.refValue,
          openHref: pitcGbillUrl(stage.refValue),
        });
      }
    }, LOADING_MS);
    return () => clearTimeout(t);
  }, [stage, provider.name]);

  // Reset when provider changes
  useEffect(() => {
    setStage({ kind: "idle" });
    setRef("");
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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const err = validate(ref);
    if (err) {
      setStage({ kind: "error", message: err });
      return;
    }

    const value = ref.trim();

    if (provider.billCheckTier === "B-deeplink" && provider.portalDeepLinkTemplate) {
      const url = provider.portalDeepLinkTemplate.replace("{ref}", encodeURIComponent(value));
      setStage({ kind: "loading", refValue: value, redirectUrl: url });
      return;
    }

    if (provider.billCheckTier === "C-linkout") {
      setStage({ kind: "loading", refValue: value, redirectUrl: provider.portalUrl });
      return;
    }

    // Tier A — pk-pitc: browser POSTs directly to PITC; no server proxy needed
    setStage({ kind: "loading", refValue: value });
  }

  const isLoading = stage.kind === "loading";

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
          disabled={isLoading}
          className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40 disabled:opacity-60"
        />
        <p id="ref-help" className="text-xs text-slate-500">{provider.referenceFormat.description}</p>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-md bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? "Checking…" : "Check Bill"}
        </button>
      </form>

      {/* ── Loading animation ── */}
      {stage.kind === "loading" && (
        <div className="rounded-xl border border-brand-100 bg-brand-50 px-4 py-6 flex flex-col items-center gap-3 text-center">
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 rounded-full border-4 border-brand-200" />
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-brand-700 animate-spin" />
          </div>
          <p className="text-sm font-medium text-brand-800">{LOADING_MESSAGES[msgIdx]}</p>
          <p className="text-xs text-slate-500">Please wait…</p>
        </div>
      )}

      {/* ── Error ── */}
      {stage.kind === "error" && (
        <div role="alert" className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2.5">
          <p className="text-sm text-rose-700">{stage.message}</p>
          <button
            type="button"
            onClick={() => setStage({ kind: "idle" })}
            className="mt-1.5 text-xs font-medium text-rose-600 underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* ── Pakistan PITC ready — browser POSTs directly to official portal ── */}
      {stage.kind === "ready-pitc" && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-5 space-y-3">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm font-semibold text-emerald-800">Ready — click to view your bill</p>
          </div>
          <p className="text-xs text-slate-600">
            Reference: <span className="font-mono font-semibold">{stage.refValue}</span>
          </p>
          {/*
           * Plain POST form — action is PITC's gbill.aspx with refno+type in the querystring.
           * PITC bounces cold GETs but serves the bill on a POST. No inputs needed in the body.
           * The user's browser handles the session/cookies with PITC directly.
           */}
          <form
            action={stage.openHref}
            method="POST"
            target="_blank"
            rel="noopener noreferrer"
            encType="text/plain"
          >
            <button
              type="submit"
              className="w-full rounded-md bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-800 transition-colors"
            >
              View Bill →
            </button>
          </form>
          <p className="text-xs text-slate-400 text-center">Opens on the official PITC portal in a new tab</p>
          <button
            type="button"
            onClick={() => setStage({ kind: "idle" })}
            className="w-full text-xs text-slate-500 underline"
          >
            Check a different reference
          </button>
        </div>
      )}

      {/* ── Redirect result (Tier B deeplink / Tier C linkout) ── */}
      {stage.kind === "ready-redirect" && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-4 text-center space-y-2">
          <p className="text-sm font-semibold text-emerald-800">
            Opened the official {stage.label} portal
          </p>
          <p className="text-xs text-slate-600">Check the new tab — your reference has been passed to the portal.</p>
          <a
            href={stage.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-1 rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-800 transition-colors"
          >
            Open again →
          </a>
          <div>
            <button
              type="button"
              onClick={() => setStage({ kind: "idle" })}
              className="text-xs text-slate-500 underline"
            >
              Check another
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
