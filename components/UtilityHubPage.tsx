import Link from "next/link";
import { COUNTRIES, getCountry } from "@/lib/data/countries";
import { PROVIDERS, providersInCountry } from "@/lib/data/providers";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Section } from "@/components/Section";
import { RemoteImage } from "@/components/RemoteImage";
import { AlternatingSection } from "@/components/AlternatingSection";
import { FaqAccordion } from "@/components/FaqAccordion";
import { WebPageJsonLd } from "@/lib/seo/jsonLd";
import type { UtilityType } from "@/lib/types";
import { notFound } from "next/navigation";
import { buildUtilityHubContent } from "@/lib/content/utility-hub";

const UTILITY_LABEL: Record<UtilityType, { title: string; lower: string }> = {
  electricity: { title: "Electricity", lower: "electricity" },
  gas:         { title: "Gas",         lower: "gas" },
  water:       { title: "Water",       lower: "water" },
};

export function UtilityHubPage({ countrySlug, type }: { countrySlug: string; type: UtilityType }) {
  const c = getCountry(countrySlug);
  if (!c) notFound();
  const providers = providersInCountry(c.slug, type);
  const label = UTILITY_LABEL[type];
  const hubContent = buildUtilityHubContent(c, type, providers);

  const breadcrumb = [
    { name: "Home", href: "/" },
    { name: c.name, href: `/${c.slug}` },
    { name: `${label.title} bill check`, href: `/${c.slug}/${type}-bill-check` },
  ];

  return (
    <>
      <WebPageJsonLd
        url={`/${c.slug}/${type}-bill-check`}
        name={`${c.name} ${label.title} bill check`}
        description={`Look up your ${c.name} ${label.lower} bill online — list of approved providers, tariff guides, payment methods, and complaint contacts.`}
        breadcrumb={breadcrumb}
      />

      <div className="container-wide pt-6">
        <Breadcrumb items={breadcrumb} />
      </div>

      {/* Hero */}
      <section className="container-wide py-10 md:py-12">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">{c.name} · {label.title}</p>
        <h1 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
          {c.name} {label.lower} bill — providers, tariffs and payment
        </h1>
        <p className="mt-4 max-w-3xl text-slate-700 text-lg leading-relaxed">
          {hubContent.heroIntro}
        </p>
      </section>

      {/* Hero image */}
      <div className="container-wide pb-4">
        <RemoteImage
          query={hubContent.imageQueries[0]}
          alt={`${c.name} ${label.lower} infrastructure`}
          className="aspect-[21/9] w-full rounded-xl object-cover"
          sizes="(min-width: 1280px) 1200px, 100vw"
          priority
        />
      </div>

      {/* Provider list */}
      <section id="providers" className="container-wide py-12 scroll-mt-24">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          {c.name} {label.lower} providers
        </h2>
        <p className="mt-2 text-slate-600">
          Select your provider below to check your bill, see the current tariff, and find the
          complaint-escalation contacts for your operator.
        </p>
        <div className="mt-6">
          {providers.length > 0 ? (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {providers.map((p) => (
                <li key={p.slug}>
                  <Link href={`/${c.slug}/${p.routeSlug}`} className="block h-full rounded-lg border border-slate-200 bg-white p-5 hover:border-brand-300 hover:bg-brand-50 no-underline transition-colors">
                    <h3 className="text-lg font-semibold text-slate-900">{p.name}</h3>
                    <p className="mt-1 text-xs text-slate-500">{p.legalName}</p>
                    <p className="mt-3 text-sm text-slate-700">{p.serviceAreas.slice(0, 3).join(", ")}{p.serviceAreas.length > 3 ? "…" : ""}</p>
                    {p.customers && (
                      <p className="mt-2 text-xs text-slate-500">{p.customers}M customers</p>
                    )}
                    {p.supportPhone && <p className="mt-1 text-xs text-slate-500">Support: {p.supportPhone}</p>}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-slate-700">
              We are still compiling {c.name}&rsquo;s {label.lower} provider catalog. In the
              meantime, check the regulator&rsquo;s site:{" "}
              <a href={c.electricityRegulator.url} target="_blank" rel="noopener noreferrer" className="text-brand-700 underline">
                {c.electricityRegulator.shortName ?? c.electricityRegulator.name}
              </a>.
            </p>
          )}
        </div>
      </section>

      {/* Rich editorial content */}
      <article className="container-tight py-4 md:py-8 space-y-12">
        {hubContent.sections.map((s, i) => (
          <AlternatingSection key={s.id} section={s} flip={i % 2 === 1} />
        ))}

        {/* FAQ */}
        <Section id="faq" title={`Frequently asked questions — ${c.name} ${label.lower} bills`}>
          <FaqAccordion items={hubContent.faq} />
        </Section>

        {/* Footer citation */}
        <footer className="border-t border-slate-200 pt-6 text-sm text-slate-500">
          <p>
            Regulatory information sourced from{" "}
            <a href={c.electricityRegulator.url} target="_blank" rel="noopener noreferrer" className="text-brand-700 underline">
              {c.electricityRegulator.name}
            </a>
            {c.gasRegulator && type === "gas" && (
              <>
                {" "}and{" "}
                <a href={c.gasRegulator.url} target="_blank" rel="noopener noreferrer" className="text-brand-700 underline">
                  {c.gasRegulator.name}
                </a>
              </>
            )}
            . Last reviewed: May 2026. Editorial team: CheckBillsOnline.
          </p>
        </footer>
      </article>

      {/* Cross-link to other utility types in this country */}
      <section aria-label="Other utility types" className="bg-slate-50 border-t border-slate-200">
        <div className="container-wide py-8">
          <h2 className="text-base font-semibold text-slate-900 mb-3">Other utility bills in {c.name}</h2>
          <div className="flex flex-wrap gap-3">
            {(["electricity", "gas", "water"] as UtilityType[])
              .filter((t) => t !== type)
              .map((t) => (
                <Link
                  key={t}
                  href={`/${c.slug}/${t}-bill-check`}
                  className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-brand-300 hover:text-brand-700 no-underline capitalize"
                >
                  {t} bill check →
                </Link>
              ))}
            <Link
              href={`/${c.slug}`}
              className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-brand-300 hover:text-brand-700 no-underline"
            >
              {c.name} overview →
            </Link>
          </div>
        </div>
      </section>

      {/* Cross-link to same-region countries */}
      {(() => {
        const siblings = COUNTRIES.filter((s) => s.region === c.region && s.slug !== c.slug);
        if (!siblings.length) return null;
        return (
          <section aria-label={`${c.region} countries`} className="border-t border-slate-100">
            <div className="container-wide py-8">
              <h2 className="text-base font-semibold text-slate-900 mb-3">More {c.region} bill check guides</h2>
              <div className="flex flex-wrap gap-2">
                {siblings.map((sib) => {
                  const cnt = PROVIDERS.filter((p) => p.countrySlug === sib.slug).length;
                  return (
                    <Link
                      key={sib.slug}
                      href={`/${sib.slug}/${type}-bill-check`}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-brand-300 hover:text-brand-700 no-underline"
                    >
                      {sib.name}{cnt > 0 ? ` (${cnt})` : ""}
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })()}
    </>
  );
}
