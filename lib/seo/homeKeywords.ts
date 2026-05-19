/**
 * Home-page keyword pool builder. Produces ~120+ keywords combining:
 *
 *  • Generic international utility-bill terms
 *  • Per-provider "<provider> bill check" keywords across all 30 countries
 *  • Per-country variations (electricity / gas / water + "online")
 *  • Pakistan-specific cluster (CSS, all 11 DISCOs, both spellings)
 *  • India-specific cluster (BBPS, top DISCOMs)
 *  • Anglosphere cluster (UK, USA, AU, NZ, CA, IE)
 *
 * The list is deduped and capped at 120 entries (Google ignores beyond ~60
 * for ranking, but a wider pool helps with on-page LSI and audit tooling).
 */

import { PROVIDERS } from "@/lib/data/providers";
import { COUNTRIES } from "@/lib/data/countries";

const GENERIC = [
  "check electricity bill online",
  "international bill check",
  "utility bill payment guide",
  "electricity bill online",
  "gas bill check online",
  "water bill check online",
  "duplicate bill download",
  "bill calculator",
  "tariff guide",
  "energy bill checker",
  "online bill check",
  "view electricity bill",
  "pay utility bill online",
  "electricity bill payment",
  "gas bill payment",
  "water bill payment",
  "smart meter bill",
  "prepaid electricity bill",
  "postpaid electricity bill",
  "consumer number bill check",
  "account number bill check",
  "reference number bill check",
];

const PAKISTAN_SPECIFIC = [
  "mepco bill check",
  "mepco bill online",
  "lesco bill check",
  "lesco bill online",
  "iesco bill check",
  "iesco bill online",
  "fesco bill check",
  "gepco bill check",
  "pesco bill check",
  "hesco bill check",
  "sepco bill check",
  "qesco bill check",
  "tesco bill check",
  "hazeco bill check",
  "k-electric bill check",
  "k electric bill",
  "ke duplicate bill",
  "wapda bill check",
  "pitc bill",
  "bill.pitc.com.pk",
  "online bill check pakistan",
  "pakistan electricity bill",
  "cross subsidy program",
  "css.pitc.com.pk",
  "protected consumer pakistan",
  "lifeline tariff pakistan",
  "sngpl bill check",
  "ssgc bill check",
  "pakistan gas bill",
];

const INDIA_SPECIFIC = [
  "adani electricity bill",
  "adani electricity bill check",
  "tata power bill check",
  "tata power mumbai bill",
  "bses rajdhani bill",
  "bses bill check",
  "bbps bill payment",
  "bharat billpay electricity",
  "discom bill check india",
  "pay electricity bill india",
  "indian electricity bill",
  "online bill check india",
  "msedcl bill check",
  "torrent power bill",
];

const ANGLO_SPECIFIC = [
  "coned bill check",
  "con edison bill",
  "pge bill check",
  "duke energy bill",
  "british gas bill",
  "british gas account",
  "octopus energy bill",
  "ofgem energy bill",
  "agl energy bill",
  "genesis energy bill",
  "electric ireland bill",
  "hydro one bill",
  "us electricity bill",
  "uk electricity bill",
];

const GULF_SPECIFIC = [
  "dewa bill check",
  "dewa quick pay",
  "addc bill check",
  "sewa bill check",
  "sec bill saudi arabia",
  "kahramaa bill check",
  "mew kuwait bill",
  "mazoon electricity bill",
  "ewa bahrain bill",
  "uae electricity bill",
  "saudi electricity bill",
];

const AFRICA_SEA_SPECIFIC = [
  "kenya power bill check",
  "kplc postpaid bill",
  "eskom bill check",
  "ekedc bill",
  "tanesco bill check",
  "ecg bill ghana",
  "pln bill check indonesia",
  "meralco bill check",
  "tnb bill malaysia",
  "evn bill vietnam",
  "mea bill thailand",
];

function dedupe(list: string[]): string[] {
  return [...new Set(list.map((s) => s.trim().toLowerCase()))];
}

export function buildHomeKeywords(): string[] {
  // Pull every provider's brand-named bill-check term programmatically.
  const providerTerms: string[] = PROVIDERS.flatMap((p) => [
    `${p.name.toLowerCase()} bill check`,
    `${p.name.toLowerCase()} bill online`,
    `pay ${p.name.toLowerCase()} bill`,
  ]);

  // Country-level utility variations.
  const countryTerms: string[] = COUNTRIES.flatMap((c) => [
    `${c.name.toLowerCase()} electricity bill`,
    `${c.name.toLowerCase()} bill check online`,
    `electricity bill ${c.name.toLowerCase()}`,
  ]);

  const merged = dedupe([
    ...GENERIC,
    ...PAKISTAN_SPECIFIC,
    ...INDIA_SPECIFIC,
    ...ANGLO_SPECIFIC,
    ...GULF_SPECIFIC,
    ...AFRICA_SEA_SPECIFIC,
    ...providerTerms,
    ...countryTerms,
  ]);

  // Cap at 120 — search engines stop reading past ~60-100 anyway, but a wider
  // pool helps any on-page audit / LSI tools we run.
  return merged.slice(0, 120);
}
