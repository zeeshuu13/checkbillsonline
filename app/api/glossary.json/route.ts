import { UTILITY_GLOSSARY } from "@/lib/seo/glossary";
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
    "$schema": "https://checkbillsonline.com/schemas/glossary.json",
    version: "1",
    documentation: `${SITE.url}/api`,
    license: "https://creativecommons.org/licenses/by/4.0/",
    description: "Utility billing terminology used across electricity, gas, and water sectors in 30 countries.",
    count: UTILITY_GLOSSARY.length,
    categories: ["billing", "tariff", "payment", "regulation", "infrastructure", "subsidy", "tax"],
    data: UTILITY_GLOSSARY,
  };

  return new Response(JSON.stringify(data, null, 2), { headers: HEADERS });
}
