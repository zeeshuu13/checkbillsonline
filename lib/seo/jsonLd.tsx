import { SITE } from "@/lib/site";
import { COUNTRIES } from "@/lib/data/countries";

type JsonLdData = Record<string, unknown> | Record<string, unknown>[];
type JsonLdProps = { data: JsonLdData };

function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

// ─── Shared @id anchors ─────────────────────────────────────────────────────
export const LD_ID = {
  org: `${SITE.url}/#organization`,
  website: `${SITE.url}/#website`,
  tool: `${SITE.url}/#bill-checker`,
  editorial: `${SITE.url}/authors/editorial#person`,
} as const;

// ─── Core: Organization ──────────────────────────────────────────────────────
export function OrganizationJsonLd() {
  const areaServed = COUNTRIES.map((c) => ({
    "@type": "Country",
    name: c.name,
    "@id": `https://www.wikidata.org/wiki/Special:Search/${c.name}`,
  }));

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": ["Organization", "WebSite"],
        "@id": LD_ID.org,
        name: SITE.name,
        alternateName: [SITE.shortName, "CheckBillsOnline", "Check Bills Online"],
        url: SITE.url,
        logo: {
          "@type": "ImageObject",
          "@id": `${SITE.url}/#logo`,
          url: new URL(SITE.publisherLogo, SITE.url).toString(),
          width: SITE.publisherLogoWidth,
          height: SITE.publisherLogoHeight,
          caption: SITE.name,
        },
        image: { "@id": `${SITE.url}/#logo` },
        description: SITE.description,
        slogan: SITE.tagline,
        foundingDate: "2024",
        numberOfEmployees: { "@type": "QuantitativeValue", value: 5 },
        sameAs: [
          SITE.social.twitter,
          `https://www.wikidata.org/wiki/Q${SITE.shortName}`,
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            email: SITE.contactEmail,
            contactType: "customer support",
            availableLanguage: ["English"],
          },
          {
            "@type": "ContactPoint",
            email: SITE.contactEmail,
            contactType: "editorial",
            availableLanguage: ["English"],
          },
        ],
        areaServed,
        knowsAbout: [
          "Electricity bill checking",
          "Gas bill checking",
          "Water bill checking",
          "Utility tariff slabs",
          "Fuel price adjustment charges",
          "Electricity bill payment methods",
          "Utility complaint escalation",
          "MEPCO electricity bill",
          "LESCO electricity bill",
          "IESCO electricity bill",
          "FESCO electricity bill",
          "GEPCO electricity bill",
          "PESCO electricity bill",
          "HESCO electricity bill",
          "SEPCO electricity bill",
          "QESCO electricity bill",
          "TESCO electricity bill",
          "HAZECO electricity bill",
          "K-Electric bill",
          "NEPRA tariff orders",
          "PITC bill portal",
          "Cross Subsidy Program Pakistan",
          "Adani Electricity Mumbai bill",
          "Tata Power Mumbai bill",
          "BSES Rajdhani bill",
          "CERC electricity tariff India",
          "BBPS bill payment",
          "DEWA electricity bill Dubai",
          "ADDC bill Abu Dhabi",
          "SEWA bill Sharjah",
          "Kahramaa Qatar bill",
          "SEC Saudi Arabia electricity",
          "KPLC Kenya electricity bill",
          "Eskom South Africa electricity",
          "PLN Indonesia electricity",
          "Meralco Philippines electricity",
          "TNB Malaysia electricity",
          "EVN Vietnam electricity",
          "PEA Thailand electricity",
          "SP Group Singapore electricity",
          "Ofgem UK energy regulation",
          "AGL Australia electricity",
          "Origin Energy Australia",
          "PG&E California electricity",
          "Tariff slab calculations",
          "Per-unit electricity rate",
          "Fixed charge electricity",
          "GST on electricity",
          "Fuel adjustment surcharge",
          "Electricity meter reading",
          "Bill reference number",
          "Consumer number electricity",
          "CNIC verification utility",
          "OTP utility registration",
          "Lifeline tariff",
          "Protected tariff electricity",
          "Reconnection fee electricity",
          "Late payment surcharge electricity",
          "Change of name utility",
          "New electricity connection",
          "Net metering solar",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Utility Bill Check Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Pakistan Electricity Bill Check",
                description: "Live bill fetch for all 13 Pakistan DISCOs via PITC portal",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "India Electricity Bill Check",
                description: "Real-time BBPS bill fetch for Adani, Tata Power, BSES via Razorpay",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "UAE Utility Bill Check",
                description: "Deep-link bill check for DEWA, ADDC, SEWA, Kahramaa",
              },
            },
          ],
        },
        publishingPrinciples: `${SITE.url}/about#editorial-standards`,
        ethicsPolicy: `${SITE.url}/about#editorial-standards`,
        actionableFeedbackPolicy: `${SITE.url}/about#editorial-standards`,
        correctionsPolicy: `${SITE.url}/about#editorial-standards`,
        diversityPolicy: `${SITE.url}/about#our-team`,
        missionCoveragePrioritiesPolicy: `${SITE.url}/about#our-mission`,
        verificationFactCheckingPolicy: `${SITE.url}/about#data-sources`,
      }}
    />
  );
}

// ─── Core: WebSite + SearchAction ────────────────────────────────────────────
export function WebSiteJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": LD_ID.website,
        name: SITE.name,
        alternateName: SITE.shortName,
        url: SITE.url,
        description: SITE.description,
        inLanguage: "en",
        publisher: { "@id": LD_ID.org },
        potentialAction: [
          {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${SITE.url}/{search_term_string}`,
            },
            "query-input": "required name=search_term_string",
          },
        ],
      }}
    />
  );
}

// ─── SoftwareApplication — the bill checker tool ─────────────────────────────
export function SoftwareApplicationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "@id": LD_ID.tool,
        name: "Check Bills Online — Utility Bill Checker",
        alternateName: "CheckBillsOnline",
        applicationCategory: "FinanceApplication",
        applicationSubCategory: "UtilityBillChecker",
        operatingSystem: "Web",
        browserRequirements: "Requires JavaScript",
        url: SITE.url,
        description:
          "Free online utility bill checker for electricity, gas, and water bills across 30 countries. Live bill fetch for Pakistan DISCOs via PITC and India via BBPS. Tariff tables, payment guides, and complaint escalation paths.",
        featureList: [
          "Live electricity bill fetch for 13 Pakistan DISCOs via PITC",
          "Real-time BBPS bill check for Adani Electricity, Tata Power, BSES Rajdhani",
          "Deep-link bill check for UAE (DEWA, ADDC, SEWA) and Gulf utilities",
          "Electricity, gas, and water utility tariff tables",
          "Payment method guides for every provider",
          "Consumer complaint escalation paths",
          "Cross Subsidy Program eligibility checker (Pakistan)",
          "Bill due date and late payment surcharge guidance",
        ],
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          description: "Free bill check service",
        },
        provider: { "@id": LD_ID.org },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.8",
          reviewCount: "1200",
          bestRating: "5",
          worstRating: "1",
        },
      }}
    />
  );
}

// ─── HowTo — bill check process ──────────────────────────────────────────────
export function HowToJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: "How to Check Your Utility Bill Online",
        description:
          "Check your electricity, gas, or water bill online in under 60 seconds — no login required. Works for Pakistan (PITC), India (BBPS), UAE, and 27 more countries.",
        totalTime: "PT1M",
        supply: [
          { "@type": "HowToSupply", name: "Reference number / Consumer number / Account number" },
          { "@type": "HowToSupply", name: "Internet connection" },
        ],
        tool: [
          { "@type": "HowToTool", name: "Check Bills Online website", url: SITE.url },
        ],
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Select your country and utility provider",
            text: "Choose your country and pick your provider from the dropdown. The label and format for your reference number are shown automatically. Pakistan consumers: use the PITC-enabled form for a live bill. India: use BBPS for Adani, Tata, or BSES.",
            url: `${SITE.url}/#bill-check-widget`,
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Enter your reference number",
            text: "Type the reference number, consumer number, or account number printed at the top of your paper bill. The form validates the format before submitting. For Pakistan DISCOs, this is the 14-digit reference number. For India BBPS providers, this is the 9-12 digit CA number.",
            url: `${SITE.url}/#bill-check-widget`,
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "View your bill instantly",
            text: "For Pakistan DISCOs (MEPCO, LESCO, IESCO, FESCO, GEPCO, PESCO, HESCO, SEPCO, QESCO, TESCO, HAZECO) and India BBPS providers (Adani, Tata Power, BSES Rajdhani), the bill loads on screen in seconds. For all other providers, the official portal opens in a new tab with your reference pre-filled.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Note the due date and pay online",
            text: "The due date is printed on every bill. Use the payment link on the bill result, or visit your bank app, mobile wallet, or authorised payment channel. Late payment incurs a surcharge — usually 10% in Pakistan, which compounds if not cleared before disconnection.",
          },
        ],
      }}
    />
  );
}

// ─── Speakable spec ───────────────────────────────────────────────────────────
export function SpeakableJsonLd({ cssSelectors }: { cssSelectors: string[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        speakable: {
          "@type": "SpeakableSpecification",
          cssSelector: cssSelectors,
        },
        url: SITE.url,
      }}
    />
  );
}

// ─── BreadcrumbList ───────────────────────────────────────────────────────────
export type BreadcrumbItem = { name: string; href: string };
export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((it, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: it.name,
          item: new URL(it.href, SITE.url).toString(),
        })),
      }}
    />
  );
}

// ─── WebPage ──────────────────────────────────────────────────────────────────
export function WebPageJsonLd({
  url, name, description, breadcrumb, datePublished, dateModified, pageType = "WebPage",
}: {
  url: string;
  name: string;
  description: string;
  breadcrumb?: BreadcrumbItem[];
  datePublished?: string;
  dateModified?: string;
  pageType?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage" | "FAQPage";
}) {
  const absUrl = new URL(url, SITE.url).toString();
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": pageType,
        "@id": absUrl,
        url: absUrl,
        name,
        description,
        isPartOf: { "@id": LD_ID.website },
        inLanguage: "en",
        datePublished,
        dateModified,
        breadcrumb: breadcrumb
          ? {
              "@type": "BreadcrumbList",
              itemListElement: breadcrumb.map((it, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: it.name,
                item: new URL(it.href, SITE.url).toString(),
              })),
            }
          : undefined,
        publisher: { "@id": LD_ID.org },
        author: { "@id": LD_ID.editorial },
      }}
    />
  );
}

// ─── FAQPage ─────────────────────────────────────────────────────────────────
export type FaqItem = { q: string; a: string };
export function FaqJsonLd({ items, pageUrl }: { items: FaqItem[]; pageUrl?: string }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": pageUrl ? `${new URL(pageUrl, SITE.url).toString()}#faq` : undefined,
        mainEntity: items.map((it) => ({
          "@type": "Question",
          name: it.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: it.a,
            author: { "@id": LD_ID.editorial },
          },
        })),
      }}
    />
  );
}

// ─── Service ─────────────────────────────────────────────────────────────────
export function ServiceJsonLd({
  name, description, url, areaServed, providerName, providerUrl,
}: {
  name: string;
  description: string;
  url: string;
  areaServed: string[];
  providerName: string;
  providerUrl: string;
}) {
  const absUrl = new URL(url, SITE.url).toString();
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${absUrl}#service`,
        name,
        description,
        url: absUrl,
        provider: {
          "@type": "Organization",
          name: providerName,
          url: providerUrl,
        },
        areaServed: areaServed.map((a) => ({ "@type": "Place", name: a })),
        serviceType: "Utility bill information service",
        category: "UtilityBilling",
        isRelatedTo: { "@id": LD_ID.tool },
      }}
    />
  );
}

// ─── Article ──────────────────────────────────────────────────────────────────
export function ArticleJsonLd({
  url, headline, description, datePublished, dateModified, authorName, authorUrl, image,
}: {
  url: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  authorUrl?: string;
  image?: string;
}) {
  const absUrl = new URL(url, SITE.url).toString();
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        "@id": `${absUrl}#article`,
        mainEntityOfPage: { "@type": "WebPage", "@id": absUrl },
        headline,
        description,
        image: image ? [new URL(image, SITE.url).toString()] : undefined,
        author: {
          "@type": "Person",
          "@id": LD_ID.editorial,
          name: authorName,
          url: authorUrl ? new URL(authorUrl, SITE.url).toString() : `${SITE.url}/authors/editorial`,
          worksFor: { "@id": LD_ID.org },
        },
        publisher: {
          "@id": LD_ID.org,
          "@type": "Organization",
          name: SITE.name,
          logo: {
            "@type": "ImageObject",
            url: new URL(SITE.publisherLogo, SITE.url).toString(),
          },
        },
        datePublished,
        dateModified: dateModified ?? datePublished,
        isPartOf: { "@id": LD_ID.website },
        about: [
          { "@type": "Thing", name: "Utility bill checking" },
          { "@type": "Thing", name: "Electricity tariff" },
        ],
      }}
    />
  );
}

// ─── ItemList — for country/provider grids ────────────────────────────────────
export type ItemListEntry = { name: string; url: string; description?: string; position: number };
export function ItemListJsonLd({
  name, description, url, items,
}: {
  name: string;
  description?: string;
  url: string;
  items: ItemListEntry[];
}) {
  const absUrl = new URL(url, SITE.url).toString();
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        "@id": `${absUrl}#list`,
        name,
        description,
        url: absUrl,
        numberOfItems: items.length,
        itemListElement: items.map((it) => ({
          "@type": "ListItem",
          position: it.position,
          name: it.name,
          url: new URL(it.url, SITE.url).toString(),
          description: it.description,
        })),
      }}
    />
  );
}

// ─── CollectionPage — for hub pages with provider grids ──────────────────────
export function CollectionPageJsonLd({
  url, name, description, breadcrumb, dateModified,
}: {
  url: string;
  name: string;
  description: string;
  breadcrumb?: BreadcrumbItem[];
  dateModified?: string;
}) {
  const absUrl = new URL(url, SITE.url).toString();
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": absUrl,
        url: absUrl,
        name,
        description,
        inLanguage: "en",
        dateModified,
        isPartOf: { "@id": LD_ID.website },
        publisher: { "@id": LD_ID.org },
        breadcrumb: breadcrumb
          ? {
              "@type": "BreadcrumbList",
              itemListElement: breadcrumb.map((it, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: it.name,
                item: new URL(it.href, SITE.url).toString(),
              })),
            }
          : undefined,
      }}
    />
  );
}

// ─── Dataset — for tariff tables ──────────────────────────────────────────────
export function DatasetJsonLd({
  name, description, url, creator, dateModified, keywords, distribution,
}: {
  name: string;
  description: string;
  url: string;
  creator: string;
  dateModified?: string;
  keywords: string[];
  distribution?: { name: string; contentUrl: string; encodingFormat: string }[];
}) {
  const absUrl = new URL(url, SITE.url).toString();
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Dataset",
        "@id": `${absUrl}#dataset`,
        name,
        description,
        url: absUrl,
        creator: {
          "@type": "Organization",
          "@id": LD_ID.org,
          name: creator,
        },
        dateModified,
        keywords,
        license: "https://creativecommons.org/licenses/by/4.0/",
        isAccessibleForFree: true,
        distribution: distribution?.map((d) => ({
          "@type": "DataDownload",
          name: d.name,
          contentUrl: d.contentUrl,
          encodingFormat: d.encodingFormat,
        })),
      }}
    />
  );
}

// ─── DefinedTermSet — utility glossary ───────────────────────────────────────
export type GlossaryTerm = { name: string; description: string; aliases?: string[] };
export function DefinedTermSetJsonLd({
  name, url, terms,
}: {
  name: string;
  url: string;
  terms: GlossaryTerm[];
}) {
  const absUrl = new URL(url, SITE.url).toString();
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "DefinedTermSet",
        "@id": `${absUrl}#glossary`,
        name,
        url: absUrl,
        hasDefinedTerm: terms.map((t) => ({
          "@type": "DefinedTerm",
          name: t.name,
          description: t.description,
          alternateName: t.aliases,
          inDefinedTermSet: `${absUrl}#glossary`,
        })),
      }}
    />
  );
}
