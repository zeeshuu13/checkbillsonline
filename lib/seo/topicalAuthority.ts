/**
 * Phase 17 — Topical Authority Engine.
 * Central linking system for countries, providers, regulators, tariffs, and concepts.
 * Provides relational lookups for internal linking and entity cross-referencing.
 */

import { PROVIDERS } from "@/lib/data/providers";
import { COUNTRIES } from "@/lib/data/countries";
import type { Provider, Country } from "@/lib/types";
import { UTILITY_GLOSSARY, type GlossaryEntry } from "@/lib/seo/glossary";
import { SITE } from "@/lib/site";

// ── Derived lookup maps ───────────────────────────────────────────────────────

const providersByCountry = new Map<string, Provider[]>();
const providerBySlug = new Map<string, Provider>();
const countryBySlug = new Map<string, Country>();

for (const c of COUNTRIES) {
  countryBySlug.set(c.slug, c);
  providersByCountry.set(c.slug, []);
}
for (const p of PROVIDERS) {
  providerBySlug.set(p.slug, p);
  const list = providersByCountry.get(p.countrySlug) ?? [];
  list.push(p);
  providersByCountry.set(p.countrySlug, list);
}

// ── Concept → Country → Provider relationships ────────────────────────────────

const CONCEPT_COUNTRY_MAP: Record<string, string[]> = {
  "tariff-slab": ["pakistan", "india", "bangladesh", "nepal", "kenya", "nigeria"],
  "fpa": ["pakistan"],
  "bbps": ["india"],
  "pitc": ["pakistan"],
  "dewa": ["uae"],
  "nepra": ["pakistan"],
  "css": ["pakistan"],
  "net-metering": ["pakistan", "india", "uae", "australia", "uk", "malaysia", "usa", "south-africa"],
  "prepaid-meter": ["nigeria", "ghana", "kenya", "south-africa", "zambia"],
  "smart-meter": ["uk", "australia", "uae", "india"],
  "slab-tariff": ["india", "pakistan", "bangladesh"],
  "fixed-charge": ["pakistan", "india", "uae", "australia", "uk"],
  "demand-charge": ["australia", "uk", "usa"],
  "time-of-use": ["australia", "uk", "uae", "usa"],
};

// ── API response types ────────────────────────────────────────────────────────

export type RelatedProvider = {
  name: string;
  slug: string;
  url: string;
  type: "electricity" | "gas" | "water";
  countrySlug: string;
  countryName: string;
  relevanceReason: string;
};

export type RelatedCountry = {
  name: string;
  slug: string;
  url: string;
  region: string;
  providerCount: number;
  relevanceReason: string;
};

export type RelatedConcept = {
  id: string;
  term: string;
  url: string;
  category: string;
  definition: string;
  relevanceReason: string;
};

export type RelatedRegulator = {
  name: string;
  shortName?: string;
  url: string;
  country: string;
  countryName: string;
  type: "electricity" | "gas" | "water";
};

export type AuthorityGraph = {
  providers: RelatedProvider[];
  countries: RelatedCountry[];
  concepts: RelatedConcept[];
  regulators: RelatedRegulator[];
};

// ── getRelatedProviders ───────────────────────────────────────────────────────

export function getRelatedProviders(opts: {
  providerSlug?: string;
  countrySlug?: string;
  utilityType?: "electricity" | "gas" | "water";
  limit?: number;
}): RelatedProvider[] {
  const { providerSlug, countrySlug, utilityType, limit = 6 } = opts;
  const sourceProvider = providerSlug ? providerBySlug.get(providerSlug) : null;
  const result: RelatedProvider[] = [];

  // Same-country providers (most relevant)
  if (countrySlug || sourceProvider?.countrySlug) {
    const slug = countrySlug ?? sourceProvider!.countrySlug;
    const country = countryBySlug.get(slug);
    const countryProviders = providersByCountry.get(slug) ?? [];
    for (const p of countryProviders) {
      if (p.slug === providerSlug) continue;
      if (utilityType && p.type !== utilityType) continue;
      result.push({
        name: p.name,
        slug: p.slug,
        url: `${SITE.url}/${p.countrySlug}/${p.routeSlug}`,
        type: p.type as "electricity" | "gas" | "water",
        countrySlug: p.countrySlug,
        countryName: country?.name ?? p.countrySlug,
        relevanceReason: `Same country (${country?.name ?? p.countrySlug})`,
      });
    }
  }

  // Same-type providers from other countries (cross-country)
  if (sourceProvider && result.length < limit) {
    for (const p of PROVIDERS) {
      if (p.slug === providerSlug) continue;
      if (p.countrySlug === (countrySlug ?? sourceProvider.countrySlug)) continue;
      if (p.type !== sourceProvider.type) continue;
      if (result.some((r) => r.slug === p.slug)) continue;
      const country = countryBySlug.get(p.countrySlug);
      result.push({
        name: p.name,
        slug: p.slug,
        url: `${SITE.url}/${p.countrySlug}/${p.routeSlug}`,
        type: p.type as "electricity" | "gas" | "water",
        countrySlug: p.countrySlug,
        countryName: country?.name ?? p.countrySlug,
        relevanceReason: `Same utility type (${p.type})`,
      });
      if (result.length >= limit * 2) break;
    }
  }

  return result.slice(0, limit);
}

// ── getRelatedCountries ───────────────────────────────────────────────────────

export function getRelatedCountries(opts: {
  countrySlug?: string;
  region?: string;
  conceptId?: string;
  limit?: number;
}): RelatedCountry[] {
  const { countrySlug, region, conceptId, limit = 6 } = opts;
  const sourceCountry = countrySlug ? countryBySlug.get(countrySlug) : null;
  const result: RelatedCountry[] = [];

  // Countries sharing the concept
  if (conceptId) {
    const conceptCountries = CONCEPT_COUNTRY_MAP[conceptId] ?? [];
    for (const slug of conceptCountries) {
      if (slug === countrySlug) continue;
      const c = countryBySlug.get(slug);
      if (!c) continue;
      result.push({
        name: c.name,
        slug: c.slug,
        url: `${SITE.url}/${c.slug}`,
        region: c.region,
        providerCount: providersByCountry.get(c.slug)?.length ?? 0,
        relevanceReason: `Also uses ${conceptId.replace(/-/g, " ")}`,
      });
    }
  }

  // Same-region countries
  const targetRegion = region ?? sourceCountry?.region;
  if (targetRegion) {
    for (const c of COUNTRIES) {
      if (c.slug === countrySlug) continue;
      if (c.region !== targetRegion) continue;
      if (result.some((r) => r.slug === c.slug)) continue;
      result.push({
        name: c.name,
        slug: c.slug,
        url: `${SITE.url}/${c.slug}`,
        region: c.region,
        providerCount: providersByCountry.get(c.slug)?.length ?? 0,
        relevanceReason: `Same region (${c.region})`,
      });
    }
  }

  // Remaining countries
  if (result.length < limit) {
    for (const c of COUNTRIES) {
      if (c.slug === countrySlug) continue;
      if (result.some((r) => r.slug === c.slug)) continue;
      result.push({
        name: c.name,
        slug: c.slug,
        url: `${SITE.url}/${c.slug}`,
        region: c.region,
        providerCount: providersByCountry.get(c.slug)?.length ?? 0,
        relevanceReason: "Related country",
      });
      if (result.length >= limit * 2) break;
    }
  }

  return result.slice(0, limit);
}

// ── getRelatedConcepts ────────────────────────────────────────────────────────

export function getRelatedConcepts(opts: {
  countrySlug?: string;
  providerSlug?: string;
  conceptIds?: string[];
  limit?: number;
}): RelatedConcept[] {
  const { countrySlug, providerSlug, conceptIds, limit = 6 } = opts;
  const result: RelatedConcept[] = [];

  // Concepts explicitly requested
  if (conceptIds?.length) {
    for (const id of conceptIds) {
      const term = UTILITY_GLOSSARY.find((g) => g.id === id);
      if (!term) continue;
      result.push({
        id: term.id,
        term: term.term,
        url: `${SITE.url}/api/glossary.json#${term.id}`,
        category: term.category,
        definition: term.definition,
        relevanceReason: "Directly related concept",
      });
    }
  }

  // Country-specific concepts
  if (countrySlug) {
    for (const term of UTILITY_GLOSSARY) {
      if (result.some((r) => r.id === term.id)) continue;
      if (!term.countries?.includes(countrySlug)) continue;
      result.push({
        id: term.id,
        term: term.term,
        url: `${SITE.url}/api/glossary.json#${term.id}`,
        category: term.category,
        definition: term.definition,
        relevanceReason: `Used in ${countryBySlug.get(countrySlug)?.name ?? countrySlug}`,
      });
    }
  }

  // seeAlso chain from provider's glossary terms
  if (providerSlug) {
    const provider = providerBySlug.get(providerSlug);
    if (provider) {
      for (const term of UTILITY_GLOSSARY) {
        if (result.some((r) => r.id === term.id)) continue;
        if (!term.countries?.includes(provider.countrySlug)) continue;
        for (const ref of term.seeAlso ?? []) {
          const linked = UTILITY_GLOSSARY.find((g) => g.id === ref);
          if (!linked || result.some((r) => r.id === linked.id)) continue;
          result.push({
            id: linked.id,
            term: linked.term,
            url: `${SITE.url}/api/glossary.json#${linked.id}`,
            category: linked.category,
            definition: linked.definition,
            relevanceReason: `Related to ${term.term}`,
          });
        }
      }
    }
  }

  // Fill remainder with global common concepts
  if (result.length < limit) {
    const GLOBAL_PRIORITY = ["reference-number", "tariff-slab", "billing-cycle", "fixed-charge", "energy-unit-kwh"];
    for (const id of GLOBAL_PRIORITY) {
      if (result.some((r) => r.id === id)) continue;
      const term = UTILITY_GLOSSARY.find((g) => g.id === id);
      if (!term) continue;
      result.push({
        id: term.id,
        term: term.term,
        url: `${SITE.url}/api/glossary.json#${term.id}`,
        category: term.category,
        definition: term.definition,
        relevanceReason: "Core billing concept",
      });
      if (result.length >= limit) break;
    }
  }

  return result.slice(0, limit);
}

// ── getRelatedRegulators ──────────────────────────────────────────────────────

export function getRelatedRegulators(opts: {
  countrySlug?: string;
  utilityType?: "electricity" | "gas" | "water";
}): RelatedRegulator[] {
  const { countrySlug, utilityType } = opts;
  const result: RelatedRegulator[] = [];

  const targetCountries = countrySlug
    ? COUNTRIES.filter((c) => c.slug === countrySlug)
    : COUNTRIES;

  for (const c of targetCountries) {
    const regs: { r: { name: string; shortName?: string; url: string }; type: "electricity" | "gas" | "water" }[] = [];
    if (!utilityType || utilityType === "electricity") {
      regs.push({ r: c.electricityRegulator, type: "electricity" });
    }
    if ((!utilityType || utilityType === "gas") && c.gasRegulator) {
      regs.push({ r: c.gasRegulator, type: "gas" });
    }
    if ((!utilityType || utilityType === "water") && c.waterRegulator) {
      regs.push({ r: c.waterRegulator, type: "water" });
    }
    for (const { r, type } of regs) {
      result.push({
        name: r.name,
        shortName: r.shortName,
        url: r.url,
        country: c.slug,
        countryName: c.name,
        type,
      });
    }
  }

  return result;
}

// ── getFullAuthorityGraph ─────────────────────────────────────────────────────

export function getFullAuthorityGraph(opts: {
  providerSlug?: string;
  countrySlug?: string;
  utilityType?: "electricity" | "gas" | "water";
}): AuthorityGraph {
  const { providerSlug, countrySlug, utilityType } = opts;
  const provider = providerSlug ? providerBySlug.get(providerSlug) : null;
  const resolvedCountry = countrySlug ?? provider?.countrySlug;
  const resolvedType = utilityType ?? (provider?.type as "electricity" | "gas" | "water" | undefined);

  return {
    providers: getRelatedProviders({ providerSlug, countrySlug: resolvedCountry, utilityType: resolvedType }),
    countries: getRelatedCountries({ countrySlug: resolvedCountry }),
    concepts: getRelatedConcepts({ countrySlug: resolvedCountry, providerSlug }),
    regulators: getRelatedRegulators({ countrySlug: resolvedCountry, utilityType: resolvedType }),
  };
}
