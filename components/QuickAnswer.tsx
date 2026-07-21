/**
 * AEO (Answer Engine Optimization) component.
 * Renders a visually distinct, semantically rich direct-answer block.
 * Optimised for: Google Featured Snippets, AI Overviews, voice search, Perplexity citations.
 *
 * Usage: Place immediately after the page h1, before body content.
 */

type QuickAnswerProps = {
  /** The question this block answers — rendered as an h2 for voice and featured snippets. */
  question: string;
  /** The concise answer — 40–60 words, fact-dense, citation-ready. */
  answer: string;
  /** Optional bullet points for list-featured-snippets. */
  bullets?: string[];
  /** Optional: "As of [date]" freshness signal. */
  asOf?: string;
  className?: string;
};

export function QuickAnswer({ question, answer, bullets, asOf, className }: QuickAnswerProps) {
  return (
    <aside
      className={`rounded-xl border border-brand-200 bg-brand-50 p-5 md:p-6 ${className ?? ""}`}
      aria-label="Quick answer"
      data-speakable="true"
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-brand-700 mb-2">Quick answer</p>
      <h2 className="text-base md:text-lg font-bold text-slate-900 mb-3">{question}</h2>
      <p className="text-sm md:text-base text-slate-800 leading-relaxed">{answer}</p>
      {bullets && bullets.length > 0 && (
        <ul className="mt-3 space-y-1.5 list-none pl-0">
          {bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand-500 shrink-0" aria-hidden />
              {b}
            </li>
          ))}
        </ul>
      )}
      {asOf && (
        <p className="mt-3 text-xs text-slate-500">
          Last verified: {asOf}
        </p>
      )}
    </aside>
  );
}

/**
 * TL;DR summary block — for provider hub pages.
 * Structured for AI chunking: a single extractable, self-contained block.
 */
type TldrProps = {
  points: string[];
  className?: string;
};

export function TldrBlock({ points, className }: TldrProps) {
  return (
    <div
      className={`rounded-lg border border-slate-200 bg-slate-50 px-5 py-4 ${className ?? ""}`}
      aria-label="Key takeaways"
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">Key takeaways</p>
      <ul className="space-y-2 list-none pl-0">
        {points.map((p, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700 leading-snug">
            <span className="text-brand-600 font-bold shrink-0 mt-0.5" aria-hidden>✓</span>
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * FactBox — structured data box for provider/country facts.
 * Renders machine-readable key-value pairs in a table for Google Structured Snippets.
 */
type FactBoxProps = {
  heading: string;
  facts: { label: string; value: string }[];
  className?: string;
};

export function FactBox({ heading, facts, className }: FactBoxProps) {
  return (
    <div
      className={`rounded-xl border border-slate-200 bg-white overflow-hidden ${className ?? ""}`}
      aria-label={heading}
    >
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{heading}</p>
      </div>
      <dl className="divide-y divide-slate-100">
        {facts.map((f) => (
          <div key={f.label} className="flex items-baseline gap-2 px-4 py-2.5">
            <dt className="min-w-[140px] text-xs font-medium text-slate-500 shrink-0">{f.label}</dt>
            <dd className="text-sm text-slate-900 font-medium">{f.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
