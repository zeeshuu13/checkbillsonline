import { NET_METERING } from "@/lib/seo/netMetering";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";
export const revalidate = 86400;

const HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=3600",
  "Access-Control-Allow-Origin": "*",
};

export function GET() {
  const available = NET_METERING.filter((n) => n.available);
  const data = {
    "$schema": "https://checkbillsonline.com/schemas/net-metering.json",
    version: "1",
    documentation: `${SITE.url}/api`,
    license: "https://creativecommons.org/licenses/by/4.0/",
    description: "Net metering and solar feed-in tariff policy by country. Data sourced from national regulators.",
    count: NET_METERING.length,
    availableCount: available.length,
    data: NET_METERING,
  };

  return new Response(JSON.stringify(data, null, 2), { headers: HEADERS });
}
