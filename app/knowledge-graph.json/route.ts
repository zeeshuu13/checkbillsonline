/**
 * Knowledge graph export — served at /knowledge-graph.json.
 * Full entity graph including providers, countries, regulators,
 * glossary terms, payment systems, and relationships.
 * Designed for AI retrieval, vector indexing, and knowledge graph extraction.
 */

import { PROVIDERS } from "@/lib/data/providers";
import { COUNTRIES } from "@/lib/data/countries";
import { UTILITY_GLOSSARY } from "@/lib/seo/glossary";
import { NET_METERING } from "@/lib/seo/netMetering";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";
export const revalidate = 86400;

const HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "public, max-age=86400, s-maxage=86400",
  "Access-Control-Allow-Origin": "*",
};

type Entity = {
  "@type": string;
  id: string;
  name: string;
  aliases?: string[];
  description?: string;
  parent?: string;
  relatedEntities?: string[];
  properties?: Record<string, unknown>;
  url?: string;
  country?: string;
  region?: string;
};

export function GET() {
  const entities: Entity[] = [];

  // ── Countries ─────────────────────────────────────────────────
  for (const c of COUNTRIES) {
    entities.push({
      "@type": "Country",
      id: c.slug,
      name: c.name,
      aliases: [c.isoAlpha2, c.isoAlpha3],
      description: c.shortIntro,
      url: `${SITE.url}/${c.slug}`,
      region: c.region,
      relatedEntities: [
        c.electricityRegulator.shortName ?? c.electricityRegulator.name,
        c.gasRegulator?.shortName ?? c.gasRegulator?.name,
        c.waterRegulator?.shortName ?? c.waterRegulator?.name,
        ...PROVIDERS.filter((p) => p.countrySlug === c.slug).map((p) => p.slug),
      ].filter(Boolean) as string[],
      properties: {
        currency: c.currency,
        voltageStd: c.voltageStd,
        billingCycle: c.billingCycle,
        population: c.population,
        electrificationRate: c.electrificationRate,
        timezone: c.timezone,
        language: c.language,
      },
    });
  }

  // ── Utility Providers ──────────────────────────────────────────
  for (const p of PROVIDERS) {
    entities.push({
      "@type": "UtilityProvider",
      id: p.slug,
      name: p.name,
      aliases: [p.legalName, p.routeSlug],
      description: `${p.name} is ${p.legalName}, a ${p.type} utility serving ${p.serviceAreas.join(", ")}.`,
      url: `${SITE.url}/${p.countrySlug}/${p.routeSlug}`,
      country: p.countrySlug,
      parent: p.countrySlug,
      relatedEntities: [
        p.countrySlug,
        `${p.countrySlug}/${p.type}-regulator`,
      ],
      properties: {
        type: p.type,
        legalName: p.legalName,
        portalUrl: p.portalUrl,
        supportPhone: p.supportPhone,
        serviceAreas: p.serviceAreas,
        established: p.established,
        customers: p.customers,
        hq: p.hq,
        billCheckTier: p.billCheckTier,
        referenceFormat: p.referenceFormat,
        spokes: [
          { slug: "tariff", url: `${SITE.url}/${p.countrySlug}/${p.routeSlug}/tariff` },
          { slug: "payment-methods", url: `${SITE.url}/${p.countrySlug}/${p.routeSlug}/payment-methods` },
          { slug: "complaints", url: `${SITE.url}/${p.countrySlug}/${p.routeSlug}/complaints` },
          { slug: "new-connection", url: `${SITE.url}/${p.countrySlug}/${p.routeSlug}/new-connection` },
          { slug: "faq", url: `${SITE.url}/${p.countrySlug}/${p.routeSlug}/faq` },
        ],
      },
    });
  }

  // ── Regulators ─────────────────────────────────────────────────
  const regulatorsSeen = new Set<string>();
  for (const c of COUNTRIES) {
    const regs = [
      { r: c.electricityRegulator, type: "electricity" },
      c.gasRegulator ? { r: c.gasRegulator, type: "gas" } : null,
      c.waterRegulator ? { r: c.waterRegulator, type: "water" } : null,
    ].filter(Boolean) as { r: { name: string; shortName?: string; url: string }; type: string }[];

    for (const { r, type } of regs) {
      const id = `${c.slug}-${type}-regulator`;
      if (regulatorsSeen.has(id)) continue;
      regulatorsSeen.add(id);
      entities.push({
        "@type": "RegulatoryAuthority",
        id,
        name: r.name,
        aliases: r.shortName ? [r.shortName] : [],
        url: r.url,
        country: c.slug,
        parent: c.slug,
        relatedEntities: [c.slug, ...PROVIDERS.filter((p) => p.countrySlug === c.slug && p.type === type).map((p) => p.slug)],
        properties: {
          type,
          function: "Electricity tariff setting and consumer complaint adjudication",
        },
      });
    }
  }

  // ── Glossary Terms ─────────────────────────────────────────────
  for (const g of UTILITY_GLOSSARY) {
    entities.push({
      "@type": "DefinedTerm",
      id: g.id,
      name: g.term,
      aliases: g.aliases ?? [],
      description: g.definition,
      relatedEntities: g.seeAlso ?? [],
      properties: {
        category: g.category,
        countries: g.countries ?? [],
      },
    });
  }

  // ── Net Metering Policies ──────────────────────────────────────
  for (const nm of NET_METERING) {
    if (!nm.available) continue;
    entities.push({
      "@type": "EnergyPolicy",
      id: `${nm.countrySlug}/net-metering`,
      name: `${nm.countrySlug} net metering policy`,
      country: nm.countrySlug,
      parent: nm.countrySlug,
      properties: {
        available: nm.available,
        regulator: nm.regulator,
        regulatorUrl: nm.regulatorUrl,
        minCapacity: nm.minCapacity,
        maxCapacity: nm.maxCapacity,
        exportRate: nm.exportRate,
        eligibility: nm.eligibility,
        lastUpdated: nm.lastUpdated,
      },
    });
  }

  // ── Payment Systems ────────────────────────────────────────────
  const paymentSystems: Entity[] = [
    {
      "@type": "PaymentSystem",
      id: "pitc",
      name: "PITC Bill Portal",
      aliases: ["Power Information Technology Company", "bill.pitc.com.pk"],
      description: "Pakistan's shared electricity bill portal operated by PITC. Serves all 13 DISCOs including MEPCO, LESCO, IESCO, FESCO, GEPCO, PESCO, HESCO, SEPCO, QESCO, TESCO, HAZECO.",
      url: "https://bill.pitc.com.pk",
      country: "pakistan",
      relatedEntities: ["mepco", "lesco", "iesco", "fesco", "gepco", "pesco", "hesco", "sepco", "qesco"],
      properties: { type: "real-time-bill-fetch", countries: ["pakistan"] },
    },
    {
      "@type": "PaymentSystem",
      id: "bbps",
      name: "Bharat Bill Payment System",
      aliases: ["BBPS", "NPCI BBPS"],
      description: "India's national bill payment system operated by NPCI. Enables real-time bill fetch and payment for Adani Electricity, Tata Power Mumbai, BSES Rajdhani, and 500+ billers.",
      url: "https://www.npci.org.in/what-we-do/bharat-bill-payment/about-bbps",
      country: "india",
      relatedEntities: ["adani-electricity", "tata-power-mumbai", "bses-rajdhani"],
      properties: { type: "real-time-bill-fetch", countries: ["india"] },
    },
    {
      "@type": "PaymentSystem",
      id: "css-portal",
      name: "CSS Portal",
      aliases: ["css.pitc.com.pk", "Cross Subsidy Program portal"],
      description: "Pakistan's Cross Subsidy registration portal. Registers domestic consumers using ≤200 units/month for the protected lifeline tariff.",
      url: "https://css.pitc.com.pk",
      country: "pakistan",
      relatedEntities: ["pitc", "nepra", "css"],
      properties: { type: "subsidy-registration", countries: ["pakistan"] },
    },
  ];
  entities.push(...paymentSystems);

  const data = {
    "@context": {
      "@vocab": "https://schema.org/",
      "id": "@id",
      "type": "@type",
    },
    version: "1",
    generated: "2026-07-01T00:00:00Z",
    source: SITE.url,
    license: "https://creativecommons.org/licenses/by/4.0/",
    description: "Complete entity knowledge graph for utility bill checking across 30 countries. Includes providers, countries, regulators, payment systems, billing concepts, and net metering policies.",
    entityCount: entities.length,
    entityTypes: ["Country", "UtilityProvider", "RegulatoryAuthority", "DefinedTerm", "EnergyPolicy", "PaymentSystem"],
    entities,
  };

  return new Response(JSON.stringify(data, null, 2), { headers: HEADERS });
}
