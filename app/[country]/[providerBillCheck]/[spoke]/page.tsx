import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
import { buildMetadata } from "@/lib/seo/metadata";
import { WebPageJsonLd, ArticleJsonLd } from "@/lib/seo/jsonLd";
import { MonthlyBillPage } from "@/components/MonthlyBillPage";
import { isMonthYear, getAllMonthYearSlugs, parseMonthYear } from "@/lib/seo/months";
import { buildMonthlyContent } from "@/lib/content/monthly";
import { MonthlyGuidesBand, RelatedProvidersBand } from "@/components/ProviderBands";

const SPOKES = ["tariff", "payment-methods", "complaints", "new-connection", "faq"] as const;
type SpokeKey = (typeof SPOKES)[number];

type Params = { country: string; providerBillCheck: string; spoke: string };

export async function generateStaticParams(): Promise<Params[]> {
  const spokeParams = PROVIDERS.flatMap((p) =>
    SPOKES.map((spoke) => ({
      country: p.countrySlug,
      providerBillCheck: p.routeSlug,
      spoke,
    }))
  );
  const monthlyParams = PROVIDERS.flatMap((p) =>
    getAllMonthYearSlugs().map((monthYear) => ({
      country: p.countrySlug,
      providerBillCheck: p.routeSlug,
      spoke: monthYear,
    }))
  );
  return [...spokeParams, ...monthlyParams];
}

function isSpoke(s: string): s is SpokeKey {
  return (SPOKES as readonly string[]).includes(s);
}

const SPOKE_LABEL: Record<SpokeKey, string> = {
  tariff: "Tariff",
  "payment-methods": "Payment methods",
  complaints: "Complaints",
  "new-connection": "New connection",
  faq: "FAQ",
};

export async function generateMetadata(props: { params: Promise<Params> }): Promise<Metadata> {
  const { country, providerBillCheck, spoke } = await props.params;
  const provider = getProvider(country, providerBillCheck);
  const c = getCountry(country);
  if (!provider || !c) return {};

  // Monthly page metadata
  if (isMonthYear(spoke)) {
    const monthly = buildMonthlyContent(provider, c, spoke);
    return buildMetadata({
      path: `/${country}/${providerBillCheck}/${spoke}`,
      title: monthly.metaTitle,
      description: monthly.metaDescription,
      publishedTime: monthly.lastReviewed,
      modifiedTime: monthly.lastReviewed,
    });
  }

  if (!isSpoke(spoke)) return {};
  const content = getContent(country, providerBillCheck);
  const authored = content?.spokes[spoke];
  const fallbackTitle = `${provider.name} ${SPOKE_LABEL[spoke]} — ${c.name}`;
  const fallbackDescription = `${SPOKE_LABEL[spoke]} guide for ${provider.name} (${c.name}) customers.`;
  return buildMetadata({
    path: `/${country}/${providerBillCheck}/${spoke}`,
    title: authored?.metaTitle ?? fallbackTitle,
    description: authored?.metaDescription ?? fallbackDescription,
    publishedTime: authored?.lastReviewed,
    modifiedTime: authored?.lastReviewed,
    author: authored?.author,
  });
}

export default async function SpokePage(props: { params: Promise<Params> }) {
  const { country, providerBillCheck, spoke } = await props.params;
  const provider = getProvider(country, providerBillCheck);
  const c = getCountry(country);
  if (!provider || !c) notFound();

  // Monthly bill page branch
  if (isMonthYear(spoke)) {
    return <MonthlyBillPage provider={provider} country={c} monthSlug={spoke} />;
  }

  if (!isSpoke(spoke)) notFound();

  const content = getContent(country, providerBillCheck);
  const spokeContent = content?.spokes[spoke];
  const base = `/${country}/${providerBillCheck}`;
  const path = `${base}/${spoke}`;

  const utilityLabel = provider.type.charAt(0).toUpperCase() + provider.type.slice(1);
  const breadcrumb = [
    { name: "Home", href: "/" },
    { name: c.name, href: `/${c.slug}` },
    { name: `${utilityLabel} bill check`, href: `/${c.slug}/${provider.type}-bill-check` },
    { name: provider.name, href: base },
    { name: SPOKE_LABEL[spoke], href: path },
  ];

  return (
    <>
      <WebPageJsonLd
        url={path}
        name={spokeContent?.metaTitle ?? `${provider.name} ${SPOKE_LABEL[spoke]}`}
        description={spokeContent?.metaDescription ?? ""}
        breadcrumb={breadcrumb}
        datePublished={spokeContent?.lastReviewed}
        dateModified={spokeContent?.lastReviewed}
      />
      {spokeContent?.lastReviewed && (
        <ArticleJsonLd
          url={path}
          headline={spokeContent.h1}
          description={spokeContent.metaDescription}
          datePublished={spokeContent.lastReviewed}
          dateModified={spokeContent.lastReviewed}
          authorName={spokeContent.author}
          authorUrl="/authors/editorial"
        />
      )}

      <div className="container-wide pt-6">
        <Breadcrumb items={breadcrumb} />
      </div>

      <HeroBillCheck country={c} provider={provider} />
      <CrossClusterBand provider={provider} current={spoke} />

      <article className="container-tight py-12 md:py-16 space-y-12">
        {spokeContent ? (
          <>
            <header>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">{spokeContent.h1}</h1>
              <p className="mt-4 text-lg text-slate-700 leading-relaxed">{spokeContent.intro}</p>
            </header>

            {/* Tariff spoke renders the table at the top of the body. */}
            {spoke === "tariff" && content?.hub.tariff && (
              <TariffTable {...content.hub.tariff} />
            )}

            {/* Payment-methods spoke renders the grid. */}
            {spoke === "payment-methods" && "paymentMethods" in spokeContent && (
              <PaymentMethodGrid methods={(spokeContent as typeof spokeContent & { paymentMethods: Parameters<typeof PaymentMethodGrid>[0]["methods"] }).paymentMethods} />
            )}

            {/* Complaints spoke renders the escalation ladder. */}
            {spoke === "complaints" && "ladder" in spokeContent && (
              <ComplaintsLadder levels={(spokeContent as typeof spokeContent & { ladder: Parameters<typeof ComplaintsLadder>[0]["levels"] }).ladder} />
            )}

            {spokeContent.sections.map((s, i) => (
              <div key={s.id}>
                <AlternatingSection section={s} flip={i % 2 === 1} />
              </div>
            ))}

            {spokeContent.faq && spokeContent.faq.length > 0 && (
              <FaqAccordion items={spokeContent.faq} />
            )}

            <CitationsBlock
              citations={spokeContent.citations}
              lastReviewed={spokeContent.lastReviewed}
              author={spokeContent.author}
            />
          </>
        ) : (
          <div className="prose-cb">
            <h1>{provider.name} {SPOKE_LABEL[spoke]}</h1>
            <p>
              Our editorial team is compiling this section. For now, the form above takes you to the
              official {provider.name} portal where you can find the latest information.
            </p>
          </div>
        )}
      </article>

      <MonthlyGuidesBand providerName={provider.name} base={base} />
      <RelatedProvidersBand countrySlug={c.slug} excludeSlug={provider.slug} />
    </>
  );
}
