export type Citation = {
  /** Plain-English source label, e.g. "MERC Tariff Order, June 2024". */
  label: string;
  url: string;
  /** ISO date for "retrieved on …". */
  retrievedOn: string;
};

export function CitationsBlock({ citations, lastReviewed, author }: { citations: Citation[]; lastReviewed: string; author: string }) {
  return (
    <aside className="not-prose mt-12 rounded-lg border border-slate-200 bg-slate-50 p-5">
      <h2 className="text-base font-semibold text-slate-900">Sources & last review</h2>
      <p className="mt-2 text-sm text-slate-700">
        Tariff rates, contact numbers, and procedural details on this page are taken from the
        primary sources listed below. We re-check each provider page on a 90-day cadence; this page
        was last reviewed on <strong>{lastReviewed}</strong> by <strong>{author}</strong>.
      </p>
      {citations.length > 0 && (
        <ol className="mt-3 list-decimal pl-5 space-y-1 text-sm text-slate-700">
          {citations.map((c, i) => (
            <li key={i}>
              <a href={c.url} target="_blank" rel="noopener noreferrer nofollow" className="underline">
                {c.label}
              </a>{" "}
              <span className="text-slate-500">— retrieved {c.retrievedOn}</span>
            </li>
          ))}
        </ol>
      )}
    </aside>
  );
}
