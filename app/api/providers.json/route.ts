import { PROVIDERS } from "@/lib/data/providers";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";
export const revalidate = 86400;

const HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=3600",
  "Access-Control-Allow-Origin": "*",
  "X-Content-Type-Options": "nosniff",
};

export function GET() {
  const data = {
    "$schema": "https://checkbillsonline.com/schemas/providers.json",
    version: "1",
    documentation: `${SITE.url}/api`,
    license: "https://creativecommons.org/licenses/by/4.0/",
    source: SITE.url,
    count: PROVIDERS.length,
    data: PROVIDERS.map((p) => ({
      id: `${p.countrySlug}/${p.slug}`,
      slug: p.slug,
      name: p.name,
      legalName: p.legalName,
      type: p.type,
      country: p.countrySlug,
      url: `${SITE.url}/${p.countrySlug}/${p.routeSlug}`,
      routeSlug: p.routeSlug,
      portalUrl: p.portalUrl,
      referenceFormat: {
        label: p.referenceFormat.label,
        description: p.referenceFormat.description,
        example: p.referenceFormat.example,
        minLength: p.referenceFormat.minLength,
        maxLength: p.referenceFormat.maxLength,
        digitsOnly: p.referenceFormat.digitsOnly,
      },
      serviceAreas: p.serviceAreas,
      supportPhone: p.supportPhone ?? null,
      supportEmail: p.supportEmail ?? null,
      supportWhatsapp: p.supportWhatsapp ?? null,
      established: p.established ?? null,
      customers: p.customers ?? null,
      hq: p.hq ?? null,
      billCheckTier: p.billCheckTier,
    })),
  };

  return new Response(JSON.stringify(data, null, 2), { headers: HEADERS });
}
