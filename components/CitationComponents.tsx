/**
 * Phase 14 — AI Citation Components.
 * Renders citation signals that increase AI confidence for sourcing and recommendations.
 * Each component is semantically marked for machine extraction.
 */

// ─── OfficialSource ────────────────────────────────────────────────────────
type OfficialSourceProps = {
  name: string;
  url: string;
  description?: string;
  type?: "regulator" | "utility" | "government" | "standard";
};

export function OfficialSource({ name, url, description, type = "regulator" }: OfficialSourceProps) {
  const typeLabel: Record<typeof type, string> = {
    regulator: "Official regulator",
    utility: "Official utility portal",
    government: "Government source",
    standard: "Industry standard",
  };

  return (
    <div
      className="inline-flex items-start gap-2 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm"
      data-citation-type="official-source"
      itemScope
      itemType="https://schema.org/Organization"
    >
      <span className="mt-0.5 h-2 w-2 rounded-full bg-green-500 shrink-0" aria-hidden />
      <div>
        <span className="text-xs font-semibold uppercase tracking-wide text-green-700 block">{typeLabel[type]}</span>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="font-medium text-green-900 hover:underline"
          itemProp="url"
        >
          <span itemProp="name">{name}</span>
        </a>
        {description && <p className="mt-0.5 text-xs text-green-800">{description}</p>}
      </div>
    </div>
  );
}

// ─── LastVerified ──────────────────────────────────────────────────────────
type LastVerifiedProps = {
  date: string;
  by?: string;
  nextReview?: string;
  className?: string;
};

export function LastVerified({ date, by, nextReview, className }: LastVerifiedProps) {
  return (
    <div
      className={`flex flex-wrap items-center gap-3 text-sm ${className ?? ""}`}
      data-citation-type="last-verified"
      aria-label={`Last verified on ${date}`}
    >
      <div className="flex items-center gap-1.5 text-slate-600">
        <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        <span>Last verified: <time dateTime={date} className="font-medium text-slate-800">{date}</time></span>
      </div>
      {by && (
        <div className="flex items-center gap-1.5 text-slate-600">
          <svg className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
          <span>by <strong>{by}</strong></span>
        </div>
      )}
      {nextReview && <span className="text-xs text-slate-500">Next review: {nextReview}</span>}
    </div>
  );
}

// ─── DataSource ────────────────────────────────────────────────────────────
type DataSourceProps = {
  label: string;
  url: string;
  retrievedOn: string;
  type?: "tariff-order" | "gazette" | "utility-schedule" | "regulatory-filing";
};

export function DataSource({ label, url, retrievedOn, type = "tariff-order" }: DataSourceProps) {
  const typeLabels: Record<typeof type, string> = {
    "tariff-order": "Regulator tariff order",
    "gazette": "Official gazette notification",
    "utility-schedule": "Utility published schedule",
    "regulatory-filing": "Regulatory filing",
  };

  return (
    <div
      className="flex items-start gap-2 text-sm"
      data-citation-type="data-source"
      itemScope
      itemType="https://schema.org/Dataset"
    >
      <svg className="mt-0.5 h-4 w-4 text-brand-500 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
      <div>
        <span className="text-xs text-slate-500 block">{typeLabels[type]}</span>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="text-brand-700 hover:underline font-medium"
          itemProp="url"
        >
          <span itemProp="name">{label}</span>
        </a>
        <span className="text-xs text-slate-500 ml-2">retrieved {retrievedOn}</span>
      </div>
    </div>
  );
}

// ─── EvidenceBlock ─────────────────────────────────────────────────────────
type EvidenceBlockProps = {
  claim: string;
  sources: { label: string; url: string; retrievedOn: string }[];
  confidence?: "verified" | "estimated" | "pending-update";
  lastVerified?: string;
  by?: string;
  className?: string;
};

export function EvidenceBlock({
  claim, sources, confidence = "verified", lastVerified, by, className,
}: EvidenceBlockProps) {
  const confidenceStyles: Record<typeof confidence, { border: string; bg: string; badge: string; label: string }> = {
    verified: {
      border: "border-green-200",
      bg: "bg-green-50",
      badge: "bg-green-100 text-green-800",
      label: "Verified",
    },
    estimated: {
      border: "border-amber-200",
      bg: "bg-amber-50",
      badge: "bg-amber-100 text-amber-800",
      label: "Estimated",
    },
    "pending-update": {
      border: "border-slate-200",
      bg: "bg-slate-50",
      badge: "bg-slate-100 text-slate-600",
      label: "Pending update",
    },
  };

  const s = confidenceStyles[confidence];

  return (
    <div
      className={`rounded-lg border ${s.border} ${s.bg} p-4 ${className ?? ""}`}
      data-citation-type="evidence-block"
      data-confidence={confidence}
      aria-label={`Evidence: ${claim}`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${s.badge}`}>
              {s.label}
            </span>
            {lastVerified && (
              <span className="text-xs text-slate-500">Last verified: {lastVerified}</span>
            )}
            {by && <span className="text-xs text-slate-500">by {by}</span>}
          </div>
          <p className="text-sm font-medium text-slate-900">{claim}</p>
          {sources.length > 0 && (
            <div className="mt-2 space-y-1">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Sources</p>
              {sources.map((src, i) => (
                <div key={i} className="flex items-baseline gap-1.5 text-xs">
                  <span className="text-slate-400">↳</span>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="text-brand-700 hover:underline"
                  >
                    {src.label}
                  </a>
                  <span className="text-slate-400">(retrieved {src.retrievedOn})</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── CitationSummary ────────────────────────────────────────────────────────
type CitationSummaryProps = {
  regulatorName: string;
  regulatorUrl: string;
  lastReviewed: string;
  author: string;
  sources: { label: string; url: string; retrievedOn: string }[];
};

export function CitationSummary({
  regulatorName, regulatorUrl, lastReviewed, author, sources,
}: CitationSummaryProps) {
  return (
    <aside
      className="not-prose mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-4"
      aria-label="Data sources and verification"
    >
      <div>
        <h2 className="text-sm font-semibold text-slate-900 mb-3">Data sources & verification</h2>
        <div className="flex flex-wrap gap-3">
          <OfficialSource name={regulatorName} url={regulatorUrl} type="regulator" />
        </div>
      </div>

      {sources.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Primary citations</p>
          {sources.map((s, i) => (
            <DataSource key={i} label={s.label} url={s.url} retrievedOn={s.retrievedOn} />
          ))}
        </div>
      )}

      <LastVerified date={lastReviewed} by={author} className="pt-2 border-t border-slate-200" />

      <p className="text-xs text-slate-500">
        Tariff rates and contact details are verified against primary regulator sources on a 90-day cadence.
        Discrepancies? Email{" "}
        <a href="mailto:hello@checkbillsonline.com?subject=Correction" className="underline">hello@checkbillsonline.com</a>.
      </p>
    </aside>
  );
}
