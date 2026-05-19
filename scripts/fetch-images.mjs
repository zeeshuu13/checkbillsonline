#!/usr/bin/env node
/**
 * Build-time Unsplash image fetcher.
 *
 * Walks the countries and providers data files, collects every `heroPexelsQuery`
 * / `pexelsQuery` string (renamed historically; treat as a generic search term),
 * hits the Unsplash API, and writes the deduped result to lib/data/images.json
 * so RemoteImage can read it at runtime.
 *
 * Usage:   UNSPLASH_ACCESS_KEY=xxx node scripts/fetch-images.mjs
 *
 * Idempotent: existing entries are preserved unless `--refresh` is passed.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "lib/data/images.json");

const ENDPOINT = "https://api.unsplash.com/search/photos";

const args = new Set(process.argv.slice(2));
const REFRESH = args.has("--refresh");

/**
 * Static image queries that supplement whatever is referenced in
 * countries.ts and providers.ts. These cover the section-level images
 * used by AlternatingSection across all page types.
 */
const STATIC_QUERIES = [
  // Electricity — section-level
  "electricity meter reading",
  "solar panel rooftop array",
  "power station turbine generator",
  "high voltage substation aerial",
  "electricity pylon field landscape",
  "smart electricity meter display",
  "grid connection tower",
  "electric wires distribution pole",
  "residential electricity meter",
  // Gas — section-level
  "gas pipeline rural",
  "home gas boiler",
  // Water — section-level
  "water treatment plant aerial",
  "water pipe infrastructure",
  // Cross-utility
  "utility bill payment mobile",
  "energy saving lightbulb",
];

async function collectQueries() {
  const queries = new Set(STATIC_QUERIES);
  for (const rel of ["lib/data/countries.ts", "lib/data/providers.ts"]) {
    const src = await fs.readFile(path.join(ROOT, rel), "utf8");
    const matches = src.matchAll(/heroImageQuery:\s*"([^"]+)"|imageQuery:\s*"([^"]+)"/g);
    for (const m of matches) {
      const q = (m[1] ?? m[2] ?? "").trim();
      if (q) queries.add(q);
    }
  }
  return [...queries];
}

async function loadIndex() {
  try {
    const raw = await fs.readFile(OUT, "utf8");
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

async function searchUnsplash(query, accessKey) {
  const url = new URL(ENDPOINT);
  url.searchParams.set("query", query);
  url.searchParams.set("per_page", "5");
  url.searchParams.set("orientation", "landscape");
  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Client-ID ${accessKey}`,
      "Accept-Version": "v1",
    },
  });
  if (!res.ok) {
    throw new Error(`Unsplash: ${res.status} ${res.statusText} for "${query}"`);
  }
  const data = await res.json();
  return (data.results ?? []).map((p) => ({
    id: p.id,
    width: p.width,
    height: p.height,
    src: p.urls.regular,
    alt: p.alt_description ?? p.description ?? query,
    photographer: p.user.name,
    photographerUrl: p.user.links.html,
    pageUrl: p.links.html,
  }));
}

async function main() {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  if (!accessKey) {
    console.warn("[fetch-images] UNSPLASH_ACCESS_KEY not set — leaving images.json untouched.");
    process.exit(0);
  }

  const queries = await collectQueries();
  console.log(`[fetch-images] ${queries.length} unique queries.`);
  const index = await loadIndex();

  for (const q of queries) {
    if (!REFRESH && Array.isArray(index[q]) && index[q].length > 0) continue;
    try {
      const photos = await searchUnsplash(q, accessKey);
      index[q] = photos;
      console.log(`[fetch-images] ${q} → ${photos.length} photos`);
      // Unsplash demo tier is 50 req/hr — pace ourselves.
      await new Promise((r) => setTimeout(r, 1200));
    } catch (e) {
      console.error(`[fetch-images] failed for "${q}": ${e?.message ?? e}`);
    }
  }

  await fs.writeFile(OUT, JSON.stringify(index, null, 2) + "\n", "utf8");
  console.log(`[fetch-images] wrote ${OUT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
