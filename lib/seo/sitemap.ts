import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { COUNTRIES } from "@/lib/data/countries";
import { PROVIDERS } from "@/lib/data/providers";
import { CSS_CLUSTER_LINKS } from "@/lib/content/pakistan/cross-subsidy";
import { getAllMonthYearSlugs } from "@/lib/seo/months";

const SPOKES = ["tariff", "payment-methods", "complaints", "new-connection", "faq"] as const;
const UTILITY_HUBS = ["electricity-bill-check", "gas-bill-check", "water-bill-check"] as const;

export function getSitemapEntries(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (p: string) => new URL(p, SITE.url).toString();

  const staticPages: MetadataRoute.Sitemap = [
    { url: url("/"),                  priority: 1.0, changeFrequency: "weekly",  lastModified: now },
    { url: url("/bill-calculator"),   priority: 0.8, changeFrequency: "monthly", lastModified: now },
    { url: url("/about"),             priority: 0.6, changeFrequency: "yearly",  lastModified: now },
    { url: url("/contact"),           priority: 0.5, changeFrequency: "yearly",  lastModified: now },
    { url: url("/privacy"),           priority: 0.3, changeFrequency: "yearly",  lastModified: now },
    { url: url("/terms"),             priority: 0.3, changeFrequency: "yearly",  lastModified: now },
    { url: url("/disclaimer"),        priority: 0.3, changeFrequency: "yearly",  lastModified: now },
  ];

  const countryEntries: MetadataRoute.Sitemap = COUNTRIES.flatMap((c) => {
    const base = `/${c.slug}`;
    const hub = { url: url(base), priority: 0.9, changeFrequency: "weekly" as const, lastModified: now };
    const utilHubs = UTILITY_HUBS.map((h) => ({
      url: url(`${base}/${h}`),
      priority: 0.8,
      changeFrequency: "weekly" as const,
      lastModified: now,
    }));
    return [hub, ...utilHubs];
  });

  const providerEntries: MetadataRoute.Sitemap = PROVIDERS.flatMap((p) => {
    const base = `/${p.countrySlug}/${p.routeSlug}`;
    const hub = { url: url(base), priority: 0.8, changeFrequency: "weekly" as const, lastModified: now };
    const spokes = SPOKES.map((s) => ({
      url: url(`${base}/${s}`),
      priority: 0.7,
      changeFrequency: "monthly" as const,
      lastModified: now,
    }));
    return [hub, ...spokes];
  });

  const cssEntries: MetadataRoute.Sitemap = CSS_CLUSTER_LINKS.map((l, i) => ({
    url: url(l.href),
    priority: i === 0 ? 0.85 : 0.75,
    changeFrequency: "weekly" as const,
    lastModified: now,
  }));

  const monthSlugs = getAllMonthYearSlugs();
  const monthlyEntries: MetadataRoute.Sitemap = PROVIDERS.flatMap((p) =>
    monthSlugs.map((m) => ({
      url: url(`/${p.countrySlug}/${p.routeSlug}/${m}`),
      priority: 0.6,
      changeFrequency: "monthly" as const,
      lastModified: now,
    }))
  );

  return [...staticPages, ...countryEntries, ...providerEntries, ...cssEntries, ...monthlyEntries];
}
