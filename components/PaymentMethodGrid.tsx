export type PaymentMethod = {
  name: string;
  category: "Online portal" | "Mobile app" | "Bank" | "Wallet" | "Cash" | "ATM" | "SMS";
  description: string;
  url?: string;
  feeNote?: string;
};

export function PaymentMethodGrid({ methods }: { methods: PaymentMethod[] }) {
  return (
    <ul className="not-prose grid gap-4 md:grid-cols-2">
      {methods.map((m, i) => (
        <li key={i} className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="flex items-start justify-between gap-3">
            <h4 className="font-semibold text-slate-900">{m.name}</h4>
            <span className="shrink-0 rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700">
              {m.category}
            </span>
          </div>
          <p className="mt-2 text-sm text-slate-700">{m.description}</p>
          {m.feeNote && <p className="mt-1 text-xs text-slate-500">Fees: {m.feeNote}</p>}
          {m.url && (
            <a
              href={m.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="mt-2 inline-block text-sm font-medium text-brand-700 underline"
            >
              Open →
            </a>
          )}
        </li>
      ))}
    </ul>
  );
}
