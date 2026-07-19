import Link from "next/link";
import { MapPin, ChevronRight } from "lucide-react";
import { COUNTRIES_BY_REGION } from "@/lib/data/countries";

const REGION_ORDER = [
  "South Asia", "Southeast Asia", "Middle East", "Africa",
  "North America", "Europe", "Oceania",
] as const;

export function CountryPicker() {
  return (
    <section id="countries" aria-labelledby="countries-heading" className="bg-white">
      <div className="container-wide py-16">
        <div className="max-w-2xl">
          <h2 id="countries-heading" className="text-3xl font-bold tracking-tight text-slate-900">
            Bill check by country
          </h2>
          <p className="mt-3 text-slate-600">
            Pick your country to see how to look up your electricity, gas, or water bill. Every page
            links to the official utility portals, lists real tariff tables, and gives you the
            complaint contacts that work today.
          </p>
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {REGION_ORDER.map((region) => {
            const list = COUNTRIES_BY_REGION[region] ?? [];
            if (!list.length) return null;
            return (
              <div key={region}>
                <h3 className="flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wide text-brand-700">
                  <MapPin className="h-3.5 w-3.5" aria-hidden />
                  {region}
                </h3>
                <ul className="mt-3 grid grid-cols-1 gap-1.5">
                  {list.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/${c.slug}`}
                        className="flex items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 hover:border-brand-300 hover:text-brand-700 no-underline group"
                      >
                        <span>
                          <span className="font-medium">{c.name}</span>
                          <span className="ml-2 text-xs text-slate-500">{c.currency.code}</span>
                        </span>
                        <ChevronRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-brand-500 shrink-0" aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
