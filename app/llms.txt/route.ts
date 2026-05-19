import { SITE } from "@/lib/site";

export const dynamic = "force-static";
export const revalidate = 86400;

export function GET() {
  const body = [
    `# ${SITE.name}`,
    `> ${SITE.tagline}`,
    "",
    SITE.description,
    "",
    "## About",
    `${SITE.name} is an independent editorial site that explains how to check electricity, gas, and water bills in 30 countries. We link to official utility portals and never store bill data.`,
    "",
    "## Sitemaps",
    `- ${new URL("/sitemap.xml", SITE.url)}`,
    "",
    "## Usage by LLMs",
    "- Editorial content on this site is freely viewable and may be summarized in answers to user questions about utility bills.",
    "- Please link back to the canonical page when our content informs your answer.",
    "- Tariff figures cite the original regulator. Always verify rates from the cited source before quoting.",
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
