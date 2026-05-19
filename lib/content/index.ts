import type { ProviderContent } from "./types";
import { ADANI_ELECTRICITY } from "./india/adani-electricity";
import { MEPCO } from "./pakistan/mepco";
import { buildGeneratedContent } from "./generated";
import { getProvider } from "@/lib/data/providers";
import { getCountry } from "@/lib/data/countries";

/**
 * Registry of authored content keyed by `${countrySlug}/${routeSlug}`.
 * Add a new provider's content file and register it here.
 *
 * Providers without authored content fall back to data-driven generated
 * content (lib/content/generated.ts). The generator uses the Provider /
 * Country data objects to render a substantive ~5,000-word page — not a
 * thin placeholder. Authored files take precedence when present.
 */
export const CONTENT_REGISTRY: Record<string, ProviderContent> = {
  "india/adani-electricity-bill-check": ADANI_ELECTRICITY,
  "pakistan/mepco-bill-check": MEPCO,
};

export function getContent(countrySlug: string, routeSlug: string): ProviderContent | undefined {
  const key = `${countrySlug}/${routeSlug}`;
  const authored = CONTENT_REGISTRY[key];
  if (authored) return authored;

  const provider = getProvider(countrySlug, routeSlug);
  const country = getCountry(countrySlug);
  if (!provider || !country) return undefined;

  return buildGeneratedContent(provider, country);
}

