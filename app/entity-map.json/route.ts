/**
 * Entity map — served at /entity-map.json.
 * Flat lookup table mapping entity names/aliases to canonical IDs and URLs.
 * Optimized for AI systems doing entity disambiguation.
 */

import { PROVIDERS } from "@/lib/data/providers";
import { COUNTRIES } from "@/lib/data/countries";
import { UTILITY_GLOSSARY } from "@/lib/seo/glossary";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";
export const revalidate = 86400;

const HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "public, max-age=86400, s-maxage=86400",
  "Access-Control-Allow-Origin": "*",
};

export function GET() {
  const index: Record<string, { canonicalId: string; type: string; name: string; url: string }> = {};

  function addEntry(key: string, value: { canonicalId: string; type: string; name: string; url: string }) {
    index[key.toLowerCase()] = value;
  }

  // Countries
  for (const c of COUNTRIES) {
    const entry = { canonicalId: c.slug, type: "Country", name: c.name, url: `${SITE.url}/${c.slug}` };
    addEntry(c.slug, entry);
    addEntry(c.name, entry);
    addEntry(c.isoAlpha2, entry);
    addEntry(c.isoAlpha3, entry);
  }

  // Providers
  for (const p of PROVIDERS) {
    const entry = {
      canonicalId: `${p.countrySlug}/${p.slug}`,
      type: "UtilityProvider",
      name: p.name,
      url: `${SITE.url}/${p.countrySlug}/${p.routeSlug}`,
    };
    addEntry(p.slug, entry);
    addEntry(p.name, entry);
    addEntry(p.legalName, entry);
    addEntry(p.routeSlug, entry);
    addEntry(`${p.name} bill check`, entry);
    addEntry(`${p.name} bill`, entry);
    addEntry(`check ${p.name} bill`, entry);
  }

  // Regulators
  for (const c of COUNTRIES) {
    const reg = c.electricityRegulator;
    const entry = {
      canonicalId: `${c.slug}-electricity-regulator`,
      type: "RegulatoryAuthority",
      name: reg.name,
      url: reg.url,
    };
    addEntry(reg.name, entry);
    if (reg.shortName) addEntry(reg.shortName, entry);
  }

  // Glossary
  for (const g of UTILITY_GLOSSARY) {
    const entry = { canonicalId: g.id, type: "DefinedTerm", name: g.term, url: `${SITE.url}/api/glossary.json` };
    addEntry(g.id, entry);
    addEntry(g.term, entry);
    for (const alias of g.aliases ?? []) addEntry(alias, entry);
  }

  const data = {
    version: "1",
    source: SITE.url,
    license: "https://creativecommons.org/licenses/by/4.0/",
    description: "Flat entity disambiguation index. Map any utility-sector entity name or alias to its canonical ID and URL.",
    entryCount: Object.keys(index).length,
    usage: "Look up any key (lowercase) to get the canonical entity. Use with /knowledge-graph.json for full entity data.",
    index,
  };

  return new Response(JSON.stringify(data, null, 2), { headers: HEADERS });
}
