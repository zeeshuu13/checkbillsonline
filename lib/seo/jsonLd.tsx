import { SITE } from "@/lib/site";
import { COUNTRIES } from "@/lib/data/countries";

type JsonLdProps = { data: Record<string, unknown> | Record<string, unknown>[] };

/**
 * Renders one or more JSON-LD documents as a single `<script type="application/ld+json">`
 * element. Multiple objects render as an array `@graph`-style payload.
 */
function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // Trusted, fully-typed content built at render time. Stringify-then-escape to be safe.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

export function OrganizationJsonLd() {
  const areaServed = COUNTRIES.map((c) => ({ "@type": "Country", name: c.name }));
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE.name,
        url: SITE.url,
        logo: {
          "@type": "ImageObject",
          url: new URL(SITE.publisherLogo, SITE.url).toString(),
          width: SITE.publisherLogoWidth,
          height: SITE.publisherLogoHeight,
        },
        sameAs: [SITE.social.twitter],
        contactPoint: [
          {
            "@type": "ContactPoint",
            email: SITE.contactEmail,
            contactType: "customer support",
            availableLanguage: ["English"],
          },
        ],
        areaServed,
        knowsAbout: [
          "Electricity bill check", "Gas bill check", "Water bill check",
          "Utility bill payment", "MEPCO bill", "LESCO bill", "IESCO bill",
          "FESCO bill", "GEPCO bill", "PESCO bill", "HESCO bill", "SEPCO bill",
          "QESCO bill", "TESCO bill", "HAZECO bill", "K-Electric bill",
          "NEPRA tariff", "Pakistan electricity tariff", "PITC bill check",
          "Adani Electricity bill", "Tata Power bill", "BSES Rajdhani bill",
          "BBPS India bill payment", "MERC tariff", "DEWA bill check",
          "ADDC bill check", "SEWA bill check", "Dubai electricity bill",
          "Abu Dhabi electricity bill", "Tariff slab rates", "Fuel adjustment charges",
          "Cross Subsidy Program Pakistan", "Electricity consumption units",
          "Utility complaint escalation", "Online bill payment",
        ],
      }}
    />
  );
}

export function WebSiteJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        name: SITE.name,
        url: SITE.url,
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE.url}/{search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      }}
    />
  );
}

export function HowToJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: "How to Check Your Utility Bill Online",
        description: "Check your electricity, gas, or water bill online in seconds — no login required.",
        totalTime: "PT1M",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Select your utility provider",
            text: "Choose your country tab (Pakistan, India, UAE/Gulf) and pick your provider from the dropdown. The label and format for your reference number are shown automatically.",
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Enter your reference number",
            text: "Type the reference number, consumer number, or account number printed at the top of your paper bill. The form validates the format before submitting.",
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "View your bill instantly",
            text: "For supported providers (Pakistan DISCOs via PITC, India via BBPS) the bill loads on screen within seconds. For other providers, the official portal opens in a new tab with your reference pre-filled.",
          },
          {
            "@type": "HowToStep",
            position: 4,
            name: "Pay online or note the due date",
            text: "Use the payment link shown on the bill result, or visit any authorised bank branch or mobile wallet app. Note the due date to avoid late payment surcharges.",
          },
        ],
      }}
    />
  );
}

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
      }}
    />
  );
}

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

export function WebPageJsonLd({
  url, name, description, breadcrumb, datePublished, dateModified,
}: {
  url: string; name: string; description: string;
  breadcrumb?: BreadcrumbItem[];
  datePublished?: string; dateModified?: string;
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": new URL(url, SITE.url).toString(),
        url: new URL(url, SITE.url).toString(),
        name,
        description,
        isPartOf: { "@type": "WebSite", "@id": SITE.url, name: SITE.name },
        inLanguage: "en",
        datePublished, dateModified,
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
        publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
      }}
    />
  );
}

export type FaqItem = { q: string; a: string };
export function FaqJsonLd({ items }: { items: FaqItem[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((it) => ({
          "@type": "Question",
          name: it.q,
          acceptedAnswer: { "@type": "Answer", text: it.a },
        })),
      }}
    />
  );
}

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
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        url: new URL(url, SITE.url).toString(),
        provider: {
          "@type": "Organization",
          name: providerName,
          url: providerUrl,
        },
        areaServed: areaServed.map((a) => ({ "@type": "Place", name: a })),
        serviceType: "Utility bill check",
      }}
    />
  );
}

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
        mainEntityOfPage: { "@type": "WebPage", "@id": absUrl },
        headline,
        description,
        image: image ? [new URL(image, SITE.url).toString()] : undefined,
        author: {
          "@type": "Person",
          name: authorName,
          url: authorUrl ? new URL(authorUrl, SITE.url).toString() : undefined,
        },
        publisher: {
          "@type": "Organization",
          name: SITE.name,
          logo: {
            "@type": "ImageObject",
            url: new URL(SITE.publisherLogo, SITE.url).toString(),
          },
        },
        datePublished,
        dateModified: dateModified ?? datePublished,
      }}
    />
  );
}
