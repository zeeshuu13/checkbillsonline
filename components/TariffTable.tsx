export type TariffRow = {
  range: string;
  rate: string;
  unit?: string;
  notes?: string;
};

type Props = {
  caption: string;
  rows: TariffRow[];
  /** Plain-English source citation, e.g. "MERC Tariff Order, June 2024". */
  sourceLabel: string;
  sourceUrl: string;
  retrievedOn: string;          // ISO date
};

export function TariffTable({ caption, rows, sourceLabel, sourceUrl, retrievedOn }: Props) {
  return (
    <figure className="not-prose my-6 overflow-x-auto rounded-lg border border-slate-200">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <caption className="bg-slate-50 px-4 py-3 text-left text-sm font-semibold text-slate-900">
          {caption}
        </caption>
        <thead className="bg-slate-50">
          <tr>
            <th scope="col" className="px-4 py-2 text-left font-medium text-slate-700">Slab / Consumption</th>
            <th scope="col" className="px-4 py-2 text-left font-medium text-slate-700">Rate</th>
            <th scope="col" className="px-4 py-2 text-left font-medium text-slate-700">Notes</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white">
          {rows.map((r, i) => (
            <tr key={i}>
              <td className="px-4 py-2 align-top font-medium text-slate-900">{r.range}</td>
              <td className="px-4 py-2 align-top text-slate-800">{r.rate} {r.unit ?? ""}</td>
              <td className="px-4 py-2 align-top text-slate-600">{r.notes ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <figcaption className="border-t border-slate-200 bg-slate-50 px-4 py-2 text-xs text-slate-600">
        Source: <a href={sourceUrl} target="_blank" rel="noopener noreferrer nofollow" className="underline">{sourceLabel}</a>
        . Retrieved {retrievedOn}.
      </figcaption>
    </figure>
  );
}
