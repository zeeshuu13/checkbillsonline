"use client";

import { useState } from "react";

const PITC_CSS_HOME = "https://css.pitc.com.pk/";

function digitsOnly(s: string): string {
  return s.replace(/\D/g, "");
}

function refOk(ref: string): boolean {
  return ref.length >= 10 && ref.length <= 14;
}

type Props = {
  /** Compact mode hides the long helper paragraph below the input. */
  compact?: boolean;
};

/**
 * Reference-number entry for the Cross Subsidy Program.
 *
 *  WHY we don't POST directly to css.pitc.com.pk/check-eligibility:
 *  ─────────────────────────────────────────────────────────────────
 *  The Laravel app at css.pitc.com.pk uses CSRF tokens (`_token`)
 *  bound to a server-side session cookie. The session cookie is
 *  HTTP-only and scoped to the css.pitc.com.pk origin, so the user's
 *  browser will NEVER attach it to a form submitted from
 *  checkbillsonline.com (cross-origin cookie isolation, tightened by
 *  Chrome's 3rd-party cookie phase-out in 2024). Without the matching
 *  session, the POST always returns 419 Page Expired.
 *
 *  Working flow instead:
 *    1. Validate the reference shape (10–14 digits) on our side.
 *    2. Copy the reference to the user's clipboard.
 *    3. Open the official css.pitc.com.pk homepage in a new tab — the
 *       user's browser receives a fresh session cookie on that load,
 *       and the user pastes the reference into the official form.
 *
 *  Nothing on this site stores, logs, or proxies the reference.
 */
export function CrossSubsidyEligibilityForm({ compact = false }: Props) {
  const [refno, setRefno] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cleaned = digitsOnly(refno);
    if (!refOk(cleaned)) {
      setError(
        cleaned.length === 0
          ? "Please enter your reference number from the top of your electricity bill."
          : "Reference number must be 10–14 digits. Remove spaces and dashes."
      );
      return;
    }
    setError(null);

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(cleaned);
        setCopied(true);
      }
    } catch {
      /* clipboard blocked — still continue to the PITC tab */
    }

    window.open(PITC_CSS_HOME, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 md:p-6 shadow-sm">
      <form onSubmit={onSubmit} noValidate className="space-y-3">
        <label htmlFor="css-refno" className="block text-sm font-medium text-slate-900">
          Electricity Reference Number
        </label>
        <input
          id="css-refno"
          name="refno"
          type="text"
          inputMode="numeric"
          autoComplete="off"
          placeholder="e.g. 09 1516 2084 4234"
          value={refno}
          onChange={(e) => {
            setRefno(e.target.value);
            if (copied) setCopied(false);
            if (error) setError(null);
          }}
          maxLength={20}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? "css-refno-error" : "css-refno-hint"}
          className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
        />
        <p id="css-refno-hint" className="text-xs text-slate-500">
          Printed on the top of your electricity bill — 10 to 14 digits.
        </p>
        {error && (
          <p id="css-refno-error" role="alert" className="text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-md px-3 py-2">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-md bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-800"
        >
          Apply Cross Subsidy Program →
        </button>

        {copied && (
          <div role="status" aria-live="polite" className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
            <strong>✓ Reference {digitsOnly(refno)} copied to clipboard.</strong>
            <p className="mt-1 text-emerald-800">
              The official PITC portal <span className="font-mono">css.pitc.com.pk</span> has opened
              in a new tab. Paste your reference into the form there and click submit — PITC will
              then take you to the <span className="font-mono">/register</span> page that shows your
              meter owner details and asks for CNIC + mobile to send an OTP.
            </p>
          </div>
        )}

        <p className="text-xs text-slate-500">
          For your security, the official eligibility check, CNIC entry, and OTP verification all
          happen on the official PITC portal <span className="font-mono">css.pitc.com.pk</span>.
          checkbillsonline.com does not store your reference number.
        </p>
      </form>

      {!compact && (
        <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <p className="font-semibold text-slate-900">What happens next?</p>
          <ol className="mt-2 list-decimal pl-5 space-y-1 text-sm text-slate-700">
            <li>
              <strong>Click Apply</strong> — we copy your reference and open{" "}
              <span className="font-mono">css.pitc.com.pk</span> in a new tab.
            </li>
            <li>
              <strong>Paste &amp; submit on PITC homepage</strong> — there is only one form on the
              PITC homepage. Paste your reference into it and click submit.
            </li>
            <li>
              <strong>PITC opens your register page</strong> — if the reference is valid, PITC
              redirects you to <span className="font-mono">/register</span> which displays your
              meter owner details and the occupant CNIC + mobile fields.
            </li>
            <li>
              <strong>CNIC &amp; OTP</strong> — enter your CNIC and a PTA biometric-verified mobile
              number, then verify the OTP that PITC sends by SMS.
            </li>
            <li>
              <strong>Done</strong> — your subsidy registration is queued. The protected tariff
              reflects on your next bill cycle if you qualify.
            </li>
          </ol>
        </div>
      )}
    </div>
  );
}
