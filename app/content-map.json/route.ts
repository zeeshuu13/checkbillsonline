/**
 * Content map — served at /content-map.json.
 * Phase 16: Vector-ready content index.
 * Lists every indexable page with title, entity refs, topic clusters, and hub relationships.
 * Used for: semantic search, vector database ingestion, AI content indexing.
 */

import { PROVIDERS } from "@/lib/data/providers";
import { COUNTRIES } from "@/lib/data/countries";
import { SITE } from "@/lib/site";
import { getAllMonthYearSlugs } from "@/lib/seo/months";

export const dynamic = "force-static";
export const revalidate = 86400;

const HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "public, max-age=86400, s-maxage=86400",
  "Access-Control-Allow-Origin": "*",
};

const SPOKES = ["tariff", "payment-methods", "complaints", "new-connection", "faq"] as const;

type ContentNode = {
  id: string;
  url: string;
  title: string;
  type: "home" | "country-hub" | "utility-hub" | "provider-hub" | "provider-spoke" | "monthly-guide" | "static";
  entityRefs: string[];
  topicCluster: string;
  hubUrl: string | null;
  parentUrl: string | null;
  relatedUrls: string[];
};

export function GET() {
  const nodes: ContentNode[] = [];
  const monthSlugs = getAllMonthYearSlugs();

  // Home
  nodes.push({
    id: "home",
    url: SITE.url,
    title: "Check Electricity Bill Online — 30 Countries, 56 Providers",
    type: "home",
    entityRefs: ["checkbillsonline", ...COUNTRIES.map((c) => c.slug)],
    topicCluster: "utility-bill-check",
    hubUrl: null,
    parentUrl: null,
    relatedUrls: COUNTRIES.slice(0, 10).map((c) => `${SITE.url}/${c.slug}`),
  });

  // Country hubs
  for (const c of COUNTRIES) {
    const countryUrl = `${SITE.url}/${c.slug}`;
    const providers = PROVIDERS.filter((p) => p.countrySlug === c.slug);
    nodes.push({
      id: c.slug,
      url: countryUrl,
      title: `${c.name} Bill Check — Electricity, Gas & Water`,
      type: "country-hub",
      entityRefs: [
        c.slug,
        c.electricityRegulator.shortName ?? c.electricityRegulator.name,
        ...providers.map((p) => p.slug),
      ],
      topicCluster: `${c.region.toLowerCase().replace(/\s+/g, "-")}-utility-bills`,
      hubUrl: SITE.url,
      parentUrl: SITE.url,
      relatedUrls: providers.map((p) => `${SITE.url}/${c.slug}/${p.routeSlug}`),
    });

    // Utility type hubs
    for (const type of ["electricity", "gas", "water"] as const) {
      nodes.push({
        id: `${c.slug}/${type}-bill-check`,
        url: `${countryUrl}/${type}-bill-check`,
        title: `${c.name} ${type.charAt(0).toUpperCase() + type.slice(1)} Bill Check`,
        type: "utility-hub",
        entityRefs: [c.slug, `${type}-billing`, c.electricityRegulator.shortName ?? c.electricityRegulator.name],
        topicCluster: `${c.slug}-${type}`,
        hubUrl: countryUrl,
        parentUrl: countryUrl,
        relatedUrls: providers.filter((p) => p.type === type).map((p) => `${SITE.url}/${c.slug}/${p.routeSlug}`),
      });
    }
  }

  // Provider hubs and spokes
  for (const p of PROVIDERS) {
    const providerUrl = `${SITE.url}/${p.countrySlug}/${p.routeSlug}`;
    const countryUrl = `${SITE.url}/${p.countrySlug}`;

    nodes.push({
      id: `${p.countrySlug}/${p.slug}`,
      url: providerUrl,
      title: `${p.name} Bill Check — View & Pay ${p.name} Bill Online`,
      type: "provider-hub",
      entityRefs: [p.slug, p.countrySlug, p.type, `${p.countrySlug}-${p.type}-regulator`],
      topicCluster: `${p.countrySlug}-${p.type}-bill`,
      hubUrl: `${countryUrl}/${p.type}-bill-check`,
      parentUrl: `${countryUrl}/${p.type}-bill-check`,
      relatedUrls: SPOKES.map((s) => `${providerUrl}/${s}`),
    });

    for (const spoke of SPOKES) {
      nodes.push({
        id: `${p.countrySlug}/${p.slug}/${spoke}`,
        url: `${providerUrl}/${spoke}`,
        title: `${p.name} ${spoke.replace(/-/g, " ")} — ${spoke === "tariff" ? "Rate slabs" : spoke === "payment-methods" ? "How to pay" : spoke === "complaints" ? "Escalation guide" : spoke === "new-connection" ? "Apply for connection" : "FAQ"}`,
        type: "provider-spoke",
        entityRefs: [p.slug, p.countrySlug, spoke.replace(/-/g, " ")],
        topicCluster: `${p.countrySlug}-${p.type}-${spoke}`,
        hubUrl: providerUrl,
        parentUrl: providerUrl,
        relatedUrls: SPOKES.filter((s) => s !== spoke).map((s) => `${providerUrl}/${s}`),
      });
    }

    // Monthly guides (latest 6 months only in content map)
    for (const monthSlug of monthSlugs.slice(0, 6)) {
      nodes.push({
        id: `${p.countrySlug}/${p.slug}/${monthSlug}`,
        url: `${providerUrl}/${monthSlug}`,
        title: `${p.name} Bill ${monthSlug.replace(/-/g, " ")} — Check & Pay`,
        type: "monthly-guide",
        entityRefs: [p.slug, p.countrySlug, monthSlug],
        topicCluster: `${p.countrySlug}-${p.type}-monthly`,
        hubUrl: providerUrl,
        parentUrl: providerUrl,
        relatedUrls: monthSlugs.slice(0, 3).filter((s) => s !== monthSlug).map((s) => `${providerUrl}/${s}`),
      });
    }
  }

  // Static pages
  const staticPages = [
    { id: "about", path: "/about", title: "About Check Bills Online", cluster: "editorial" },
    { id: "contact", path: "/contact", title: "Contact Us", cluster: "editorial" },
    { id: "privacy", path: "/privacy", title: "Privacy Policy", cluster: "legal" },
    { id: "terms", path: "/terms", title: "Terms of Service", cluster: "legal" },
    { id: "bill-calculator", path: "/bill-calculator", title: "Bill Calculator", cluster: "tools" },
    { id: "pakistan/cross-subsidy-program", path: "/pakistan/cross-subsidy-program", title: "Pakistan Cross Subsidy Program", cluster: "pakistan-subsidy" },
  ];
  for (const sp of staticPages) {
    nodes.push({
      id: sp.id,
      url: `${SITE.url}${sp.path}`,
      title: sp.title,
      type: "static",
      entityRefs: [],
      topicCluster: sp.cluster,
      hubUrl: SITE.url,
      parentUrl: SITE.url,
      relatedUrls: [],
    });
  }

  const data = {
    version: "1",
    source: SITE.url,
    license: "https://creativecommons.org/licenses/by/4.0/",
    description: "Complete content map for vector indexing and semantic search. Every page listed with entity references, topic cluster, and hub relationships.",
    nodeCount: nodes.length,
    topicClusters: [...new Set(nodes.map((n) => n.topicCluster))],
    nodes,
  };

  return new Response(JSON.stringify(data, null, 2), { headers: HEADERS });
}
