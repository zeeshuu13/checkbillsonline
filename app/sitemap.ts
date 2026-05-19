import type { MetadataRoute } from "next";
import { getSitemapEntries } from "@/lib/seo/sitemap";

export const revalidate = 86400;

export default function sitemap(): MetadataRoute.Sitemap {
  return getSitemapEntries();
}
