import type { Provider } from "@/lib/types";
import type { Country } from "@/lib/types";
import { BillCheckForm } from "@/components/BillCheckForm";

type Props = {
  country: Country;
  provider: Provider;
};

const TIER_LABEL: Record<Provider["billCheckTier"], string> = {
  "A-real": "Live lookup",
  "B-deeplink": "Opens official portal pre-filled",
  "C-linkout": "Opens official portal",
};

export function HeroBillCheck({ country, provider }: Props) {
  return (
    <section
      aria-labelledby="bill-check-heading"
      className="bg-gradient-to-b from-brand-50 via-white to-white border-b border-slate-200"
    >
      <div className="container-wide py-12 md:py-16 grid gap-10 md:grid-cols-2 items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
            {country.name} · {provider.type === "electricity" ? "Electricity" : provider.type === "gas" ? "Gas" : "Water"} bill
          </p>
          <h1 id="bill-check-heading" className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            Check your {provider.name} bill online
          </h1>
          <p className="mt-4 text-lg text-slate-700">
            Enter your {provider.referenceFormat.label.toLowerCase()} to view your latest {provider.name} bill amount, due date, and consumption.
          </p>
          <ul className="mt-6 grid gap-2 text-sm text-slate-700">
            <li className="flex gap-2"><span aria-hidden className="text-brand-600">✓</span> Official source — we route to {provider.legalName}.</li>
            <li className="flex gap-2"><span aria-hidden className="text-brand-600">✓</span> No login required.</li>
            <li className="flex gap-2"><span aria-hidden className="text-brand-600">✓</span> Free to use, every time.</li>
          </ul>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-5 md:p-6">
          <BillCheckForm provider={provider} />
          <p className="mt-3 text-xs text-slate-500">
            {TIER_LABEL[provider.billCheckTier]} · Powered by {provider.legalName}.
          </p>
        </div>
      </div>
    </section>
  );
}
