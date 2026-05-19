export type EscalationLevel = {
  level: number;
  body: string;          // "Customer Care Centre", "Internal Grievance Cell", "Ombudsman"
  contact: string;       // phone / email / URL
  /** Statutory turnaround time in days where defined by regulator. */
  turnaroundDays?: number;
};

export function ComplaintsLadder({ levels }: { levels: EscalationLevel[] }) {
  return (
    <ol className="not-prose space-y-3">
      {levels.map((l) => (
        <li key={l.level} className="flex gap-4 rounded-lg border border-slate-200 bg-white p-4">
          <span
            aria-hidden
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand-700 text-sm font-semibold text-white"
          >
            {l.level}
          </span>
          <div>
            <h4 className="font-semibold text-slate-900">{l.body}</h4>
            <p className="text-sm text-slate-700">{l.contact}</p>
            {l.turnaroundDays != null && (
              <p className="mt-1 text-xs text-slate-500">
                Statutory turnaround: {l.turnaroundDays} {l.turnaroundDays === 1 ? "day" : "days"}.
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
