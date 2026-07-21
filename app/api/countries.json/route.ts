import { COUNTRIES } from "@/lib/data/countries";
import { PROVIDERS } from "@/lib/data/providers";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";
export const revalidate = 86400;

const HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=3600",
  "Access-Control-Allow-Origin": "*",
};

export function GET() {
  const data = {
    "$schema": "https://checkbillsonline.com/schemas/countries.json",
    version: "1",
    documentation: `${SITE.url}/api`,
    license: "https://creativecommons.org/licenses/by/4.0/",
    source: SITE.url,
    count: COUNTRIES.length,
    data: COUNTRIES.map((c) => {
      const providerCount = PROVIDERS.filter((p) => p.countrySlug === c.slug).length;
      return {
        id: c.slug,
        name: c.name,
        isoAlpha2: c.isoAlpha2,
        isoAlpha3: c.isoAlpha3,
        region: c.region,
        url: `${SITE.url}/${c.slug}`,
        currency: c.currency,
        electricityRegulator: c.electricityRegulator,
        gasRegulator: c.gasRegulator ?? null,
        waterRegulator: c.waterRegulator ?? null,
        voltageStd: c.voltageStd,
        billingCycle: c.billingCycle,
        timezone: c.timezone,
        population: c.population,
        electrificationRate: c.electrificationRate,
        language: c.language,
        shortIntro: c.shortIntro,
        providerCount,
      };
    }),
  };

  return new Response(JSON.stringify(data, null, 2), { headers: HEADERS });
}
