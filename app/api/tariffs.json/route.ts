import { PROVIDERS } from "@/lib/data/providers";
import { getContent } from "@/lib/content";
import { SITE } from "@/lib/site";
import type { TariffRow } from "@/components/TariffTable";

export const dynamic = "force-static";
export const revalidate = 86400;

const HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=3600",
  "Access-Control-Allow-Origin": "*",
};

export function GET() {
  const tariffs: {
    id: string;
    provider: string;
    providerName: string;
    country: string;
    type: string;
    caption: string;
    sourceLabel: string;
    sourceUrl: string;
    retrievedOn: string;
    pageUrl: string;
    rows: TariffRow[];
  }[] = [];

  for (const p of PROVIDERS) {
    const content = getContent(p.countrySlug, p.routeSlug);
    if (!content?.hub.tariff) continue;

    const t = content.hub.tariff;
    tariffs.push({
      id: `${p.countrySlug}/${p.slug}`,
      provider: p.slug,
      providerName: p.name,
      country: p.countrySlug,
      type: p.type,
      caption: t.caption,
      sourceLabel: t.sourceLabel,
      sourceUrl: t.sourceUrl,
      retrievedOn: t.retrievedOn,
      pageUrl: `${SITE.url}/${p.countrySlug}/${p.routeSlug}/tariff`,
      rows: t.rows.map((r) => ({
        range: r.range,
        rate: r.rate,
        unit: r.unit,
        notes: r.notes,
      })),
    });
  }

  const data = {
    "$schema": "https://checkbillsonline.com/schemas/tariffs.json",
    version: "1",
    documentation: `${SITE.url}/api`,
    license: "https://creativecommons.org/licenses/by/4.0/",
    description: "Electricity, gas, and water tariff slab tables sourced from national regulators. Each entry cites its source document and retrieval date.",
    notice: "Tariff figures are sourced from regulator documents and reviewed on a 90-day cadence. Always verify rates from the cited source URL before using for billing calculations.",
    count: tariffs.length,
    data: tariffs,
  };

  return new Response(JSON.stringify(data, null, 2), { headers: HEADERS });
}
