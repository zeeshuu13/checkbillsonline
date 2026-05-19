"use client";

import { useState, useMemo } from "react";

// ── Tariff configurations ────────────────────────────────────────────────────

type Slab = { upTo: number; rate: number };

type TariffConfig = {
  country: string;
  providers: string[];
  currency: string;
  symbol: string;
  fixedCharge: number; // per month
  slabs: { protected: Slab[]; unprotected: Slab[] };
  taxes: { name: string; pct: number }[];
  fuelAdjustment?: number; // PKR/unit flat
  note?: string;
};

const TARIFFS: TariffConfig[] = [
  {
    country: "Pakistan",
    providers: ["MEPCO", "LESCO", "IESCO", "FESCO", "GEPCO", "PESCO", "HAZECO", "HESCO", "SEPCO", "QESCO", "TESCO"],
    currency: "PKR", symbol: "₨",
    fixedCharge: 75,
    slabs: {
      protected: [
        { upTo: 50, rate: 3.95 },
        { upTo: 100, rate: 7.74 },
        { upTo: 200, rate: 10.06 },
      ],
      unprotected: [
        { upTo: 100, rate: 16.00 },
        { upTo: 200, rate: 21.16 },
        { upTo: 300, rate: 24.17 },
        { upTo: 400, rate: 26.53 },
        { upTo: 500, rate: 29.06 },
        { upTo: 600, rate: 30.15 },
        { upTo: 700, rate: 30.15 },
        { upTo: Infinity, rate: 35.00 },
      ],
    },
    taxes: [
      { name: "GST (18%)", pct: 18 },
      { name: "Electricity Duty (1.5%)", pct: 1.5 },
      { name: "TV Fee", pct: 0 },
    ],
    fuelAdjustment: 3.23,
    note: "NEPRA tariff 2024–25. Rates exclude FPA (₨3.23/unit avg). Protected applies to consumers using ≤200 units/month consistently.",
  },
  {
    country: "India",
    providers: ["Adani Electricity Mumbai", "Tata Power Mumbai", "BSES Rajdhani Delhi"],
    currency: "INR", symbol: "₹",
    fixedCharge: 100,
    slabs: {
      protected: [
        { upTo: 100, rate: 2.5 },
        { upTo: 300, rate: 5.0 },
        { upTo: Infinity, rate: 7.5 },
      ],
      unprotected: [
        { upTo: 100, rate: 4.0 },
        { upTo: 300, rate: 6.5 },
        { upTo: 500, rate: 8.5 },
        { upTo: Infinity, rate: 10.5 },
      ],
    },
    taxes: [{ name: "Electricity Duty (16%)", pct: 16 }],
    note: "Approximate Mumbai/Delhi domestic tariff. Actual rates vary by provider and MERC/DERC orders. Verify at your utility's portal.",
  },
  {
    country: "UAE",
    providers: ["DEWA (Dubai)", "ADDC (Abu Dhabi)", "SEWA (Sharjah)"],
    currency: "AED", symbol: "د.إ",
    fixedCharge: 30,
    slabs: {
      protected: [
        { upTo: 2000, rate: 0.23 },
        { upTo: Infinity, rate: 0.38 },
      ],
      unprotected: [
        { upTo: 2000, rate: 0.23 },
        { upTo: Infinity, rate: 0.38 },
      ],
    },
    taxes: [{ name: "VAT (5%)", pct: 5 }],
    note: "DEWA/SEWA residential tariff (fils/kWh converted to AED). Monthly billing. Fuel surcharge varies.",
  },
  {
    country: "UK",
    providers: ["British Gas", "Octopus Energy", "Average standing charge"],
    currency: "GBP", symbol: "£",
    fixedCharge: 31, // ~31 GBP/month standing charge (Ofgem price cap)
    slabs: {
      protected: [{ upTo: Infinity, rate: 0.245 }],
      unprotected: [{ upTo: Infinity, rate: 0.245 }],
    },
    taxes: [{ name: "VAT (5%)", pct: 5 }],
    note: "Based on Ofgem price cap (24.5p/kWh, £31/month standing charge). Actual rate depends on tariff and supplier. Last updated Q1 2025.",
  },
  {
    country: "USA",
    providers: ["Average (national)", "Con Edison NY", "PG&E California", "Duke Energy"],
    currency: "USD", symbol: "$",
    fixedCharge: 12,
    slabs: {
      protected: [{ upTo: Infinity, rate: 0.16 }],
      unprotected: [{ upTo: Infinity, rate: 0.16 }],
    },
    taxes: [{ name: "State & local taxes (~10%)", pct: 10 }],
    note: "US national average ~16¢/kWh (EIA 2024). Rates vary significantly by state and utility.",
  },
];

// ── Bill calculation ──────────────────────────────────────────────────────────

function calcSlabBill(units: number, slabs: Slab[]): number {
  let cost = 0;
  let remaining = units;
  let prev = 0;
  for (const slab of slabs) {
    const band = Math.min(remaining, slab.upTo - prev);
    if (band <= 0) break;
    cost += band * slab.rate;
    remaining -= band;
    prev = slab.upTo;
    if (remaining <= 0) break;
  }
  return cost;
}

function calcBill(units: number, config: TariffConfig, isProtected: boolean) {
  const slabs = isProtected ? config.slabs.protected : config.slabs.unprotected;
  const energyCharge = calcSlabBill(units, slabs);
  const fuelAdj = (config.fuelAdjustment ?? 0) * units;
  const subtotal = energyCharge + fuelAdj + config.fixedCharge;
  const taxTotal = config.taxes.filter((t) => t.pct > 0).reduce((acc, t) => acc + subtotal * (t.pct / 100), 0);
  const total = subtotal + taxTotal;

  return {
    energyCharge,
    fuelAdj,
    fixedCharge: config.fixedCharge,
    subtotal,
    taxTotal,
    total,
    breakdown: [
      { label: "Energy charge", amount: energyCharge },
      ...(fuelAdj > 0 ? [{ label: "Fuel price adjustment", amount: fuelAdj }] : []),
      { label: "Fixed / meter charge", amount: config.fixedCharge },
      ...config.taxes.filter((t) => t.pct > 0).map((t) => ({
        label: t.name,
        amount: subtotal * (t.pct / 100),
      })),
    ],
  };
}

// ── Component ─────────────────────────────────────────────────────────────────

export function BillCalculatorClient() {
  const [countryIdx, setCountryIdx] = useState(0);
  const [units, setUnits] = useState("");
  const [isProtected, setIsProtected] = useState(false);

  const config = TARIFFS[countryIdx];
  const unitsNum = parseFloat(units) || 0;
  const result = useMemo(
    () => (unitsNum > 0 ? calcBill(unitsNum, config, isProtected) : null),
    [unitsNum, config, isProtected]
  );

  const fmt = (n: number) =>
    `${config.symbol} ${n.toLocaleString("en", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <div className="bg-slate-50 border-y border-slate-200">
      <div className="container-wide py-12">
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl">

          {/* ── Inputs ── */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 md:p-8 space-y-5">
            <h2 className="text-lg font-bold text-slate-900">Enter your details</h2>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-1.5">Country / tariff</label>
              <select
                value={countryIdx}
                onChange={(e) => setCountryIdx(Number(e.target.value))}
                className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40 text-sm"
              >
                {TARIFFS.map((t, i) => (
                  <option key={t.country} value={i}>{t.country}</option>
                ))}
              </select>
            </div>

            {/* Provider (display only — affects label) */}
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-1.5">Provider (for reference)</label>
              <select className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-slate-600 text-sm">
                {config.providers.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
              <p className="mt-1 text-xs text-slate-500">All providers in this country use the same tariff schedule.</p>
            </div>

            {/* Units */}
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-1.5">Units consumed (kWh)</label>
              <input
                type="number"
                min={0}
                max={9999}
                placeholder="e.g. 350"
                value={units}
                onChange={(e) => setUnits(e.target.value)}
                className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40 text-sm"
              />
              <p className="mt-1 text-xs text-slate-500">Find this on your last bill or read your meter.</p>
            </div>

            {/* Protected toggle (Pakistan) */}
            {config.country === "Pakistan" && (
              <div className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
                <input
                  id="protected"
                  type="checkbox"
                  checked={isProtected}
                  onChange={(e) => setIsProtected(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-brand-700"
                />
                <label htmlFor="protected" className="text-sm text-slate-700 cursor-pointer">
                  <span className="font-medium">Protected consumer</span>
                  <span className="block text-xs text-slate-500 mt-0.5">
                    Average ≤200 units/month — eligible for lower NEPRA protected tariff (CSS program).
                  </span>
                </label>
              </div>
            )}

            {config.note && (
              <p className="text-xs text-slate-500 italic">{config.note}</p>
            )}
          </div>

          {/* ── Results ── */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-6 md:p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Estimated bill</h2>

            {result ? (
              <>
                {/* Total */}
                <div className="rounded-xl bg-brand-700 text-white px-6 py-5 mb-5 text-center">
                  <p className="text-sm font-medium opacity-80 mb-1">Total payable (estimated)</p>
                  <p className="text-4xl font-bold tracking-tight">{fmt(result.total)}</p>
                  <p className="text-xs opacity-70 mt-1">for {unitsNum} kWh · {config.country}</p>
                </div>

                {/* Breakdown */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-3">Breakdown</p>
                  {result.breakdown.map((row) => (
                    <div key={row.label} className="flex justify-between items-center py-1.5 border-b border-slate-100 last:border-0 text-sm">
                      <span className="text-slate-700">{row.label}</span>
                      <span className="font-medium text-slate-900">{fmt(row.amount)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-2 text-sm font-semibold text-slate-900">
                    <span>Total</span>
                    <span>{fmt(result.total)}</span>
                  </div>
                </div>

                {/* Slab info */}
                <div className="mt-5 rounded-lg bg-slate-50 border border-slate-200 px-4 py-3 text-xs text-slate-600">
                  <span className="font-semibold text-slate-800">Slab position: </span>
                  {unitsNum <= 100 ? "Slab 1 (lowest rate)" :
                    unitsNum <= 200 ? "Slab 2" :
                    unitsNum <= 300 ? "Slab 3" :
                    unitsNum <= 500 ? "Slab 4–5" : "High consumption slab"}
                  {" — "}
                  <span>
                    {unitsNum <= 200
                      ? "You may qualify for the protected tariff."
                      : "Reducing usage below the next slab boundary will save more per unit."}
                  </span>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-48 text-center text-slate-400">
                <svg className="w-12 h-12 mb-3 opacity-30" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm font-medium">Enter units consumed to see your estimate</p>
                <p className="text-xs mt-1">Try entering 300 to start</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
