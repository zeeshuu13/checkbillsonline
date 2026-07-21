import { PROVIDERS } from "@/lib/data/providers";
import { COUNTRIES, getCountry } from "@/lib/data/countries";
import { getContent } from "@/lib/content";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";
export const revalidate = 86400;

const HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=3600",
  "Access-Control-Allow-Origin": "*",
};

export function GET() {
  const allFaqs: {
    id: string;
    question: string;
    answer: string;
    provider?: string;
    country?: string;
    category: string;
    pageUrl: string;
  }[] = [];

  // Provider FAQ items
  for (const p of PROVIDERS) {
    const content = getContent(p.countrySlug, p.routeSlug);
    if (!content?.hub.faq?.length) continue;
    content.hub.faq.forEach((faq, i) => {
      allFaqs.push({
        id: `${p.countrySlug}/${p.slug}/hub/${i}`,
        question: faq.q,
        answer: faq.a,
        provider: p.slug,
        country: p.countrySlug,
        category: `${p.type}-bill-check`,
        pageUrl: `${SITE.url}/${p.countrySlug}/${p.routeSlug}`,
      });
    });
    // Spoke FAQs
    const spokes = ["tariff", "payment-methods", "complaints", "new-connection", "faq"] as const;
    for (const spoke of spokes) {
      const spokeContent = content.spokes[spoke];
      if (!spokeContent?.faq?.length) continue;
      spokeContent.faq.forEach((faq, i) => {
        allFaqs.push({
          id: `${p.countrySlug}/${p.slug}/${spoke}/${i}`,
          question: faq.q,
          answer: faq.a,
          provider: p.slug,
          country: p.countrySlug,
          category: spoke,
          pageUrl: `${SITE.url}/${p.countrySlug}/${p.routeSlug}/${spoke}`,
        });
      });
    }
  }

  const data = {
    "$schema": "https://checkbillsonline.com/schemas/faqs.json",
    version: "1",
    documentation: `${SITE.url}/api`,
    license: "https://creativecommons.org/licenses/by/4.0/",
    description: "Frequently asked questions about utility bill checking, payment, tariffs, and complaints — aggregated from all provider and country pages.",
    count: allFaqs.length,
    data: allFaqs,
  };

  return new Response(JSON.stringify(data, null, 2), { headers: HEADERS });
}
