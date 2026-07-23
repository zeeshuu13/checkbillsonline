import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCountry } from "@/lib/data/countries";
import { PROVIDERS, getProvider } from "@/lib/data/providers";
import { getContent } from "@/lib/content";
import { Breadcrumb } from "@/components/Breadcrumb";
import { HeroBillCheck } from "@/components/HeroBillCheck";
import { CrossClusterBand } from "@/components/CrossClusterBand";
import { Section } from "@/components/Section";
import { Callout } from "@/components/Callout";
import { AlternatingSection } from "@/components/AlternatingSection";
import { TariffTable } from "@/components/TariffTable";
import { PaymentMethodGrid } from "@/components/PaymentMethodGrid";
import { ComplaintsLadder } from "@/components/ComplaintsLadder";
import { FaqAccordion } from "@/components/FaqAccordion";
import { CitationsBlock } from "@/components/CitationsBlock";
import { RemoteImage } from "@/components/RemoteImage";
import { buildBillCheckKeywords, buildMetadata } from "@/lib/seo/metadata";
import { getAllMonthYearSlugs, parseMonthYear } from "@/lib/seo/months";
import { WebPageJsonLd, ArticleJsonLd, ServiceJsonLd, FaqJsonLd, DatasetJsonLd } from "@/lib/seo/jsonLd";
import { MonthlyGuidesBand, RelatedProvidersBand } from "@/components/ProviderBands";
import { ProviderDisclaimer } from "@/components/ProviderDisclaimer";

type Params = { country: string; providerBillCheck: string };

export async function generateStaticParams(): Promise<Params[]> {
  return PROVIDERS.map((p) => ({ country: p.countrySlug, providerBillCheck: p.routeSlug }));
}

export async function generateMetadata(props: { params: Promise<Params> }): Promise<Metadata> {
  const { country, providerBillCheck } = await props.params;
  const provider = getProvider(country, providerBillCheck);
  const c = getCountry(country);
  if (!provider || !c) return {};
  const authored = getContent(country, providerBillCheck);
  const fallbackTitle = `${provider.name} Bill Check — View ${provider.name} ${provider.type === "electricity" ? "Electricity" : provider.type === "gas" ? "Gas" : "Water"} Bill Online`;
  const fallbackDescription = `Check your ${provider.name} bill online with your ${provider.referenceFormat.label}. Tariff, payment methods, complaint escalation, and FAQ.`;
  return buildMetadata({
    path: `/${country}/${providerBillCheck}`,
    title: authored?.hub.metaTitle ?? fallbackTitle,
    description: authored?.hub.metaDescription ?? fallbackDescription,
    keywords: buildBillCheckKeywords(provider.name, c.name, provider.type),
    publishedTime: authored?.hub.lastReviewed,
    modifiedTime: authored?.hub.lastReviewed,
    author: authored?.hub.author,
  });
}

export default async function ProviderHubPage(props: { params: Promise<Params> }) {
  const { country, providerBillCheck } = await props.params;
  const provider = getProvider(country, providerBillCheck);
  const c = getCountry(country);
  if (!provider || !c) notFound();

  const content = getContent(country, providerBillCheck);
  const base = `/${country}/${providerBillCheck}`;

  const breadcrumb = [
    { name: "Home", href: "/" },
    { name: c.name, href: `/${c.slug}` },
    { name: `${provider.type.charAt(0).toUpperCase()}${provider.type.slice(1)} bill check`, href: `/${c.slug}/${provider.type}-bill-check` },
    { name: provider.name, href: base },
  ];

  return (
    <>
      <WebPageJsonLd
        url={base}
        name={`${provider.name} bill check`}
        description={content?.hub.metaDescription ?? `Check your ${provider.name} ${provider.type} bill online.`}
        breadcrumb={breadcrumb}
        datePublished={content?.hub.lastReviewed}
        dateModified={content?.hub.lastReviewed}
      />
      <ServiceJsonLd
        name={`${provider.name} ${provider.type} bill check`}
        description={`Online bill view, tariff and payment guide for ${provider.legalName} customers.`}
        url={base}
        areaServed={provider.serviceAreas}
        providerName={provider.legalName}
        providerUrl={provider.portalUrl}
      />
      {content?.hub.lastReviewed && (
        <ArticleJsonLd
          url={base}
          headline={content.hub.metaTitle}
          description={content.hub.metaDescription}
          datePublished={content.hub.lastReviewed}
          dateModified={content.hub.lastReviewed}
          authorName={content.hub.author}
          authorUrl="/authors/editorial"
        />
      )}
      {content?.hub.faq && content.hub.faq.length > 0 && (
        <FaqJsonLd items={content.hub.faq} pageUrl={base} />
      )}
      {content?.hub.tariff && (
        <DatasetJsonLd
          name={`${provider.name} ${provider.type} tariff rates`}
          description={`Current ${provider.name} electricity tariff slab rates and fixed charges sourced from ${c.electricityRegulator.shortName ?? c.electricityRegulator.name}`}
          url={base}
          creator="Check Bills Online"
          dateModified={content.hub.lastReviewed}
          keywords={[
            `${provider.name} tariff`,
            `${provider.name} electricity rate`,
            `${c.name} electricity tariff`,
            `${c.electricityRegulator.shortName ?? c.electricityRegulator.name} tariff`,
            "utility bill rate",
          ]}
        />
      )}

      <div className="container-wide pt-6">
        <Breadcrumb items={breadcrumb} />
      </div>

      <ProviderDisclaimer
        providerName={provider.name}
        legalName={provider.legalName}
        portalUrl={provider.portalUrl}
      />

      <HeroBillCheck country={c} provider={provider} />
      <CrossClusterBand provider={provider} current="" />

      <article className="container-tight py-12 md:py-16 space-y-12">
        {content ? (
          <>
            <p className="text-lg text-slate-700 leading-relaxed">{content.hub.intro}</p>

            {content.hub.sections.map((s, i) => (
              <div key={s.id}>
                <AlternatingSection section={s} flip={i % 2 === 1} />
                {s.id === "tariff-overview" && content.hub.tariff && (
                  <TariffTable {...content.hub.tariff} />
                )}
                {s.id === "payment-overview" && content.hub.paymentMethods && (
                  <PaymentMethodGrid methods={content.hub.paymentMethods} />
                )}
                {s.id === "complaints-overview" && content.hub.complaintsLadder && (
                  <ComplaintsLadder levels={content.hub.complaintsLadder} />
                )}
              </div>
            ))}

            <FaqAccordion items={content.hub.faq} />

            <CitationsBlock
              citations={content.hub.citations}
              lastReviewed={content.hub.lastReviewed}
              author={content.hub.author}
            />
          </>
        ) : (
          <PlaceholderContent providerName={provider.name} portalUrl={provider.portalUrl} regulatorUrl={c.electricityRegulator.url} regulatorName={c.electricityRegulator.shortName ?? c.electricityRegulator.name} />
        )}
      </article>

      <MonthlyGuidesBand providerName={provider.name} base={base} />
      <RelatedProvidersBand countrySlug={c.slug} excludeSlug={provider.slug} />
    </>
  );
}

function PlaceholderContent({
  providerName, portalUrl, regulatorName, regulatorUrl,
}: {
  providerName: string;
  portalUrl: string;
  regulatorName: string;
  regulatorUrl: string;
}) {
  return (
    <div className="prose-cb">
      <p>
        Our editorial team is still compiling the full {providerName} bill-check guide. In the
        meantime, the form above takes you straight to the official {providerName} portal.
      </p>
      <p>
        For tariff and consumer-rights documentation, the regulator&rsquo;s site is{" "}
        <a href={regulatorUrl} target="_blank" rel="noopener noreferrer">{regulatorName}</a>. The
        operator&rsquo;s own customer service desk is{" "}
        <a href={portalUrl} target="_blank" rel="noopener noreferrer">{portalUrl}</a>.
      </p>
      <p>
        We are publishing this country&rsquo;s full editorial set during Phase 2 of our rollout — see
        the homepage for the current schedule.
      </p>
    </div>
  );
}

