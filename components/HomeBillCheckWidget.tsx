"use client";

import { useState } from "react";
import Link from "next/link";
import { PROVIDERS } from "@/lib/data/providers";
import { BillCheckForm } from "@/components/BillCheckForm";
import type { Provider } from "@/lib/types";

type Tab = "pakistan" | "india" | "gulf" | "more";

const PK_SLUGS = ["mepco", "lesco", "iesco", "fesco", "gepco", "pesco", "hesco", "sepco", "qesco", "tesco", "hazeco", "k-electric"];
const IN_SLUGS = ["adani-electricity", "tata-power-mumbai", "bses-rajdhani"];
const GULF_SLUGS = ["dewa", "addc", "sewa"];

function getTabProviders(tab: Exclude<Tab, "more">): Provider[] {
  const slugs = tab === "pakistan" ? PK_SLUGS : tab === "india" ? IN_SLUGS : GULF_SLUGS;
  return slugs.map((s) => PROVIDERS.find((p) => p.slug === s)).filter(Boolean) as Provider[];
}

const TAB_LABELS: Record<Tab, string> = {
  pakistan: "Pakistan",
  india: "India",
  gulf: "UAE / Gulf",
  more: "More countries →",
};

export function HomeBillCheckWidget() {
  const [activeTab, setActiveTab] = useState<Tab>("pakistan");

  const tabProviders = activeTab !== "more" ? getTabProviders(activeTab) : [];
  const [selectedSlug, setSelectedSlug] = useState<string>(PK_SLUGS[0]);

  const currentSlug = activeTab !== "more" ? selectedSlug : "";
  const tabProvs = activeTab !== "more" ? tabProviders : [];
  const selectedProvider = tabProvs.find((p) => p.slug === currentSlug) ?? tabProvs[0];

  function handleTabChange(tab: Tab) {
    setActiveTab(tab);
    if (tab === "pakistan") setSelectedSlug(PK_SLUGS[0]);
    else if (tab === "india") setSelectedSlug(IN_SLUGS[0]);
    else if (tab === "gulf") setSelectedSlug(GULF_SLUGS[0]);
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-md overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-slate-200 bg-slate-50">
        {(["pakistan", "india", "gulf", "more"] as Tab[]).map((tab) => (
          tab === "more" ? (
            <Link
              key={tab}
              href="/#countries"
              className="flex-1 px-3 py-3 text-xs sm:text-sm font-medium text-center text-brand-700 hover:bg-brand-50 no-underline border-l border-slate-200"
            >
              {TAB_LABELS[tab]}
            </Link>
          ) : (
            <button
              key={tab}
              type="button"
              onClick={() => handleTabChange(tab)}
              className={`flex-1 px-3 py-3 text-xs sm:text-sm font-semibold text-center transition-colors ${
                activeTab === tab
                  ? "bg-white text-brand-700 border-b-2 border-brand-700"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/70 border-l border-slate-200 first:border-l-0"
              }`}
            >
              {TAB_LABELS[tab]}
            </button>
          )
        ))}
      </div>

      {/* Provider selector + form */}
      {activeTab !== "more" && selectedProvider && (
        <div className="p-5 md:p-6 space-y-4">
          {/* Provider dropdown */}
          <div>
            <label htmlFor="widget-provider" className="block text-sm font-medium text-slate-900 mb-1">
              Select provider
            </label>
            <select
              id="widget-provider"
              value={selectedProvider.slug}
              onChange={(e) => setSelectedSlug(e.target.value)}
              className="block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/40 text-sm"
            >
              {tabProvs.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.name} — {p.serviceAreas[0]}
                </option>
              ))}
            </select>
          </div>

          {/* Reuse existing BillCheckForm — handles all tier logic + result display */}
          <BillCheckForm key={selectedProvider.slug} provider={selectedProvider} />

          <p className="text-xs text-slate-400 text-center">
            Free · No login · Data from official sources
          </p>
        </div>
      )}
    </div>
  );
}
