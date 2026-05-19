import Link from "next/link";
import { PROVIDERS } from "@/lib/data/providers";
import { getAllMonthYearSlugs, parseMonthYear } from "@/lib/seo/months";

// ── Monthly guides strip (shown on provider hub + spoke pages) ───────────────

export function MonthlyGuidesBand({ providerName, base }: { providerName: string; base: string }) {
  const shown = getAllMonthYearSlugs().slice(0, 6);
  return (
    <section aria-labelledby="monthly-guides-heading" className="bg-brand-50 border-t border-brand-100">
      <div className="container-wide py-10">
        <h2 id="monthly-guides-heading" className="text-xl font-bold tracking-tight text-slate-900 mb-1">
          Monthly {providerName} Bill Guides
        </h2>
        <p className="text-sm text-slate-600 mb-5">
          Step-by-step guides for checking your bill by month — with tariff context, due dates, and payment tips.
        </p>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {shown.map((slug) => {
            const p = parseMonthYear(slug);
            return p ? (
              <li key={slug}>
                <Link
                  href={`${base}/${slug}`}
                  className="flex flex-col items-center justify-center rounded-lg border border-brand-200 bg-white px-3 py-4 text-center hover:border-brand-400 hover:bg-brand-50 no-underline group"
                >
                  <span className="text-xs font-semibold text-brand-700 group-hover:text-brand-900">{p.label}</span>
                  <span className="mt-1 text-xs text-slate-500">Bill Guide</span>
                </Link>
              </li>
            ) : null;
          })}
        </ul>
        <div className="mt-4">
          <Link href={`${base}/${shown[0] ?? ""}`} className="text-sm text-brand-700 hover:underline no-underline">
            View all monthly guides &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

// ── Related providers in the same country ────────────────────────────────────

export function RelatedProvidersBand({
  countrySlug,
  excludeSlug,
  heading = "Other providers in this country",
}: {
  countrySlug: string;
  excludeSlug: string;
  heading?: string;
}) {
  const others = PROVIDERS
    .filter((p) => p.countrySlug === countrySlug && p.slug !== excludeSlug)
    .slice(0, 6);
  if (others.length === 0) return null;
  return (
    <section aria-label={heading} className="bg-slate-50 border-t border-slate-200">
      <div className="container-wide py-10">
        <h2 className="text-xl font-semibold tracking-tight text-slate-900">{heading}</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((o) => (
            <li key={o.slug}>
              <Link
                href={`/${o.countrySlug}/${o.routeSlug}`}
                className="block rounded-md border border-slate-200 bg-white px-4 py-3 hover:border-brand-300 hover:bg-brand-50 no-underline"
              >
                <span className="font-medium text-slate-900">{o.name}</span>
                <span className="block text-xs text-slate-500 capitalize">{o.type} · {o.serviceAreas[0]}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
