import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export type PageMetaInput = {
  title: string;
  description: string;
  path: string;             // e.g. "/india/adani-electricity-bill-check"
  keywords?: string[];
  ogImage?: string;
  /** Mark generated pages noindex (e.g. /api or admin). Defaults to indexable. */
  noindex?: boolean;
  /** ISO date for OG/Twitter publish time. */
  publishedTime?: string;
  /** ISO date for Article schema. */
  modifiedTime?: string;
  author?: string;
};

export function buildMetadata(input: PageMetaInput): Metadata {
  const url = new URL(input.path, SITE.url).toString();
  const ogImage = input.ogImage ?? "/og-default.png";

  return {
    title: input.title,
    description: input.description,
    keywords: input.keywords,
    alternates: { canonical: url },
    robots: input.noindex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type: "article",
      siteName: SITE.name,
      url,
      title: input.title,
      description: input.description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: input.title }],
      publishedTime: input.publishedTime,
      modifiedTime: input.modifiedTime,
      authors: input.author ? [input.author] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [ogImage],
      creator: SITE.author.twitter,
    },
  };
}

/**
 * Build a keyword pool from a base term + variations. Mirrors the MEPCO
 * `buildDiscoBillCheckKeywords100()` pattern — used for `<meta keywords>` and
 * for content audits, not for stuffing visible text.
 */
export function buildBillCheckKeywords(provider: string, country: string, utility: "electricity" | "gas" | "water"): string[] {
  const base = `${provider} ${utility} bill check`;
  const synonyms = [
    "online", "online check", "online payment", "duplicate", "view", "download",
    "PDF", "print", "history", "outstanding", "due date", "reference number",
    "consumer number", "account number",
  ];
  const country_phrases = [country, `${country} ${utility}`, `${utility} bill ${country}`];

  const out = new Set<string>();
  out.add(base);
  out.add(`${provider} bill`);
  out.add(`${provider} ${utility}`);
  for (const s of synonyms) out.add(`${base} ${s}`);
  for (const c of country_phrases) out.add(c);
  out.add(`how to check ${provider} bill`);
  out.add(`how to pay ${provider} bill`);
  out.add(`${provider} customer care`);
  out.add(`${provider} complaint number`);

  return [...out].slice(0, 60);
}
