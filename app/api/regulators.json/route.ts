import { COUNTRIES } from "@/lib/data/countries";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";
export const revalidate = 86400;

const HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=3600",
  "Access-Control-Allow-Origin": "*",
};

export function GET() {
  const regulators: {
    id: string;
    name: string;
    shortName: string | null;
    url: string;
    type: "electricity" | "gas" | "water";
    country: string;
    countryName: string;
    jurisdiction: string;
  }[] = [];

  for (const c of COUNTRIES) {
    regulators.push({
      id: `${c.slug}/electricity`,
      name: c.electricityRegulator.name,
      shortName: c.electricityRegulator.shortName ?? null,
      url: c.electricityRegulator.url,
      type: "electricity",
      country: c.slug,
      countryName: c.name,
      jurisdiction: c.region,
    });
    if (c.gasRegulator && c.gasRegulator.url !== c.electricityRegulator.url) {
      regulators.push({
        id: `${c.slug}/gas`,
        name: c.gasRegulator.name,
        shortName: c.gasRegulator.shortName ?? null,
        url: c.gasRegulator.url,
        type: "gas",
        country: c.slug,
        countryName: c.name,
        jurisdiction: c.region,
      });
    }
    if (c.waterRegulator && c.waterRegulator.url !== c.electricityRegulator.url) {
      regulators.push({
        id: `${c.slug}/water`,
        name: c.waterRegulator.name,
        shortName: c.waterRegulator.shortName ?? null,
        url: c.waterRegulator.url,
        type: "water",
        country: c.slug,
        countryName: c.name,
        jurisdiction: c.region,
      });
    }
  }

  const data = {
    "$schema": "https://checkbillsonline.com/schemas/regulators.json",
    version: "1",
    documentation: `${SITE.url}/api`,
    license: "https://creativecommons.org/licenses/by/4.0/",
    source: SITE.url,
    count: regulators.length,
    data: regulators,
  };

  return new Response(JSON.stringify(data, null, 2), { headers: HEADERS });
}
