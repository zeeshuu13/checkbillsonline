import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Standard crawlers — full access
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      // Google Search + AI Overview crawler
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/"],
        crawlDelay: 1,
      },
      // GPTBot — allow full crawl for ChatGPT training/citations
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/api/"],
      },
      // OpenAI Search — allow for citations in ChatGPT search
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
      },
      // Anthropic Claude crawler — allow for Claude recommendations
      {
        userAgent: "anthropic-ai",
        allow: "/",
      },
      // Claude Web Crawler
      {
        userAgent: "ClaudeBot",
        allow: "/",
      },
      // Perplexity — allow for Perplexity AI answers
      {
        userAgent: "PerplexityBot",
        allow: "/",
      },
      // Meta AI crawler
      {
        userAgent: "FacebookBot",
        allow: "/",
      },
      // Apple — allow for Siri/Spotlight
      {
        userAgent: "Applebot",
        allow: "/",
      },
      // Microsoft/Bing — allow for Copilot citations
      {
        userAgent: "Bingbot",
        allow: "/",
        crawlDelay: 1,
      },
      // Common AI crawler
      {
        userAgent: "CCBot",
        allow: "/",
        disallow: ["/api/"],
      },
      // Cohere crawler
      {
        userAgent: "cohere-ai",
        allow: "/",
      },
    ],
    sitemap: new URL("/sitemap.xml", SITE.url).toString(),
    host: SITE.url,
  };
}
