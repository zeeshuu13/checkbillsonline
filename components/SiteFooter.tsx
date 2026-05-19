import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/site";
import { COUNTRIES_BY_REGION } from "@/lib/data/countries";

const REGIONS_ORDER: (keyof typeof COUNTRIES_BY_REGION)[] = [
  "South Asia", "Southeast Asia", "Middle East", "Africa",
  "North America", "Europe", "Oceania",
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-slate-200 bg-slate-50 text-slate-700">
      <div className="container-wide py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <Link href="/" aria-label={`${SITE.name} home`} className="inline-block no-underline">
              <Image
                src={SITE.logo}
                alt={SITE.name}
                width={SITE.logoWidth}
                height={SITE.logoHeight}
                sizes="180px"
                className="h-10 w-auto"
              />
            </Link>
            <p className="mt-3 text-sm text-slate-600 max-w-sm">
              {SITE.description}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Guides</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-brand-700">About</Link></li>
              <li><Link href="/contact" className="hover:text-brand-700">Contact</Link></li>
              <li><Link href="/authors/editorial" className="hover:text-brand-700">Editorial team</Link></li>
              <li><Link href="/pakistan/cross-subsidy-program" className="hover:text-brand-700">Cross Subsidy Program (Pakistan)</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Legal</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/privacy" className="hover:text-brand-700">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-brand-700">Terms</Link></li>
              <li><Link href="/disclaimer" className="hover:text-brand-700">Disclaimer</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Bill check by region</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {REGIONS_ORDER.flatMap((region) =>
                (COUNTRIES_BY_REGION[region] ?? []).slice(0, 6).map((c) => (
                  <li key={c.slug}>
                    <Link href={`/${c.slug}`} className="hover:text-brand-700">{c.name}</Link>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 text-xs text-slate-500 flex flex-col sm:flex-row gap-2 justify-between">
          <p>© {new Date().getFullYear()} {SITE.name}. All product names are trademarks of their respective utility providers.</p>
          <p>{SITE.legalDisclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
