import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { Breadcrumb } from "@/components/Breadcrumb";
import { BillCalculatorClient } from "./BillCalculatorClient";

export const metadata: Metadata = buildMetadata({
  path: "/bill-calculator",
  title: "Electricity Bill Calculator — Estimate Your Bill Online | CheckBillsOnline",
  description:
    "Free electricity bill calculator for Pakistan (MEPCO, LESCO, IESCO, FESCO & all DISCOs), India, UAE and more. Enter your units consumed to estimate your bill amount instantly.",
  keywords: [
    "electricity bill calculator",
    "MEPCO bill calculator",
    "LESCO bill calculator",
    "Pakistan electricity bill estimate",
    "units consumed bill calculator",
    "NEPRA tariff calculator",
  ],
});

const breadcrumb = [
  { name: "Home", href: "/" },
  { name: "Bill Calculator", href: "/bill-calculator" },
];

export default function BillCalculatorPage() {
  return (
    <>
      <div className="container-wide pt-6">
        <Breadcrumb items={breadcrumb} />
      </div>

      <section className="container-wide py-10">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Free tool</p>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
          Electricity Bill Calculator
        </h1>
        <p className="mt-3 text-lg text-slate-700 max-w-2xl">
          Enter your units consumed and select your country / provider to get an instant estimate
          of your electricity bill — before the official bill arrives.
        </p>
      </section>

      <BillCalculatorClient />

      {/* How it works */}
      <section className="container-wide py-12 border-t border-slate-200">
        <div className="max-w-3xl space-y-6">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">How the calculator works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                n: "1",
                title: "Select your provider",
                body: "Choose your country and electricity distribution company. The calculator loads the current approved tariff slabs from the regulator.",
              },
              {
                n: "2",
                title: "Enter units consumed",
                body: "Type the number of units (kWh) shown on your meter or your last bill. You can also enter a date range to auto-estimate seasonal usage.",
              },
              {
                n: "3",
                title: "Get your estimate",
                body: "The calculator applies the graduated slab rates, fixed charges, taxes, and surcharges to give you a close estimate of your payable amount.",
              },
            ].map((s) => (
              <div key={s.n} className="rounded-xl border border-slate-200 bg-white p-5">
                <div className="text-2xl font-bold text-brand-700 mb-2">{s.n}</div>
                <h3 className="font-semibold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
            <strong>Disclaimer:</strong> This calculator produces estimates only. The actual bill
            from your utility company may differ due to meter-reading adjustments, fuel price
            adjustments (FPA/FAC), surcharge revisions, and arrears. Always verify your payable
            amount from the official bill or your provider&apos;s portal.
          </div>
        </div>
      </section>

      {/* Pakistan tariff info */}
      <section className="container-wide py-12 border-t border-slate-200">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 mb-4">Pakistan electricity tariff slabs (NEPRA 2024–25)</h2>
          <p className="text-slate-700 mb-6">
            Pakistan uses a graduated slab tariff approved by NEPRA. The rate increases as consumption rises.
            All 12 DISCOs (MEPCO, LESCO, IESCO, FESCO, GEPCO, PESCO, HAZECO, HESCO, SEPCO, QESCO, TESCO, K-Electric)
            follow the same domestic tariff schedule for protected and unprotected consumers.
          </p>
          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-slate-900">Slab (units/month)</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-900">Rate (PKR/unit)</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-900">Category</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { slab: "1 – 50", rate: "3.95", cat: "Protected (lifeline)" },
                  { slab: "1 – 100", rate: "7.74", cat: "Protected (≤100 units)" },
                  { slab: "1 – 200", rate: "10.06", cat: "Protected (≤200 units)" },
                  { slab: "1 – 100", rate: "16.00", cat: "Unprotected (first 100)" },
                  { slab: "101 – 200", rate: "21.16", cat: "Unprotected" },
                  { slab: "201 – 300", rate: "24.17", cat: "Unprotected" },
                  { slab: "301 – 400", rate: "26.53", cat: "Unprotected" },
                  { slab: "401 – 500", rate: "29.06", cat: "Unprotected" },
                  { slab: "501 – 600", rate: "30.15", cat: "Unprotected" },
                  { slab: "601 – 700", rate: "30.15", cat: "Unprotected" },
                  { slab: "Above 700", rate: "35.00", cat: "Unprotected (peak slab)" },
                ].map((r) => (
                  <tr key={r.slab} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-mono text-slate-900">{r.slab}</td>
                    <td className="px-4 py-3 text-slate-900">₨ {r.rate}</td>
                    <td className="px-4 py-3 text-slate-600">{r.cat}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Source: NEPRA tariff schedule 2024–25. Rates exclude taxes, FPA, and surcharges.
            Verify current rates at{" "}
            <a href="https://nepra.org.pk/" target="_blank" rel="noopener noreferrer" className="text-brand-700 underline">nepra.org.pk</a>.
          </p>
        </div>
      </section>
    </>
  );
}
