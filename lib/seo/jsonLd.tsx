import { SITE } from "@/lib/site";

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
