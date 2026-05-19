import type { Country } from "@/lib/types";

/**
 * 30-country canonical list for v1. Order is by region then alphabetical.
 * Regulator names and URLs are factual; verify with `lastReviewed` per content file
 * before publishing tariff numbers.
 */
export const COUNTRIES: Country[] = [
  // ─── South Asia ───────────────────────────────────────────────
  {
    slug: "india", name: "India", isoAlpha2: "IN", isoAlpha3: "IND",
    region: "South Asia",
    currency: { code: "INR", symbol: "₹", name: "Indian Rupee" },
    electricityRegulator: { name: "Central Electricity Regulatory Commission", shortName: "CERC", url: "https://cercind.gov.in/" },
    gasRegulator: { name: "Petroleum and Natural Gas Regulatory Board", shortName: "PNGRB", url: "https://www.pngrb.gov.in/" },
    waterRegulator: { name: "Central Water Commission", shortName: "CWC", url: "https://cwc.gov.in/" },
    voltageStd: "230V 50Hz", billingCycle: "monthly", timezone: "Asia/Kolkata",
    population: 1428, electrificationRate: 99,
    heroImageQuery: "electric power lines sunset",
    language: { primary: "English", locale: "en-IN" },
    shortIntro: "India has more than 70 distribution utilities serving 250 million electricity consumers. Most providers publish online bill view portals that accept a 9–12 digit consumer number."
  },
  {
    slug: "pakistan", name: "Pakistan", isoAlpha2: "PK", isoAlpha3: "PAK",
    region: "South Asia",
    currency: { code: "PKR", symbol: "₨", name: "Pakistani Rupee" },
    electricityRegulator: { name: "National Electric Power Regulatory Authority", shortName: "NEPRA", url: "https://nepra.org.pk/" },
    gasRegulator: { name: "Oil and Gas Regulatory Authority", shortName: "OGRA", url: "https://www.ogra.org.pk/" },
    voltageStd: "230V 50Hz", billingCycle: "monthly", timezone: "Asia/Karachi",
    population: 240, electrificationRate: 96,
    heroImageQuery: "pakistan power lines",
    language: { primary: "English", locale: "en-PK" },
    shortIntro: "Pakistan's 13 distribution companies share a single bill portal hosted by PITC. Bills carry a 14-digit reference number printed beside the consumer name."
  },
  {
    slug: "bangladesh", name: "Bangladesh", isoAlpha2: "BD", isoAlpha3: "BGD",
    region: "South Asia",
    currency: { code: "BDT", symbol: "৳", name: "Bangladeshi Taka" },
    electricityRegulator: { name: "Bangladesh Energy Regulatory Commission", shortName: "BERC", url: "https://berc.portal.gov.bd/" },
    gasRegulator: { name: "Bangladesh Energy Regulatory Commission", shortName: "BERC", url: "https://berc.portal.gov.bd/" },
    voltageStd: "220V 50Hz", billingCycle: "monthly", timezone: "Asia/Dhaka",
    population: 173, electrificationRate: 99,
    heroImageQuery: "electric power lines sunset",
    language: { primary: "English", locale: "en-BD" },
    shortIntro: "Six state distribution utilities — DESCO, DPDC, BPDB, WZPDCL, NESCO, REB — cover Bangladesh. Most accept bill checks via SMS short code 16216 and online portals using a 13-digit consumer number."
  },
  {
    slug: "sri-lanka", name: "Sri Lanka", isoAlpha2: "LK", isoAlpha3: "LKA",
    region: "South Asia",
    currency: { code: "LKR", symbol: "Rs", name: "Sri Lankan Rupee" },
    electricityRegulator: { name: "Public Utilities Commission of Sri Lanka", shortName: "PUCSL", url: "https://www.pucsl.gov.lk/" },
    voltageStd: "230V 50Hz", billingCycle: "monthly", timezone: "Asia/Colombo",
    population: 22, electrificationRate: 100,
    heroImageQuery: "electric grid transformer",
    language: { primary: "English", locale: "en-LK" },
    shortIntro: "The Ceylon Electricity Board and LECO together cover Sri Lanka's electricity supply. Bills use a 10-digit account number printed at the top of each statement."
  },
  {
    slug: "nepal", name: "Nepal", isoAlpha2: "NP", isoAlpha3: "NPL",
    region: "South Asia",
    currency: { code: "NPR", symbol: "रु", name: "Nepalese Rupee" },
    electricityRegulator: { name: "Electricity Regulatory Commission", shortName: "ERC", url: "https://www.erc.gov.np/" },
    voltageStd: "230V 50Hz", billingCycle: "monthly", timezone: "Asia/Kathmandu",
    population: 30, electrificationRate: 95,
    heroImageQuery: "electric power lines sunset",
    language: { primary: "English", locale: "en-NP" },
    shortIntro: "Nepal Electricity Authority is the single national distributor. The NEA Customer Portal and the IME Pay app accept Nepal's standard SC No (Service Connection number) for bill checks."
  },

  // ─── Southeast Asia ────────────────────────────────────────────
  {
    slug: "indonesia", name: "Indonesia", isoAlpha2: "ID", isoAlpha3: "IDN",
    region: "Southeast Asia",
    currency: { code: "IDR", symbol: "Rp", name: "Indonesian Rupiah" },
    electricityRegulator: { name: "Ministry of Energy and Mineral Resources", shortName: "ESDM", url: "https://www.esdm.go.id/" },
    voltageStd: "230V 50Hz", billingCycle: "monthly", timezone: "Asia/Jakarta",
    population: 280, electrificationRate: 99,
    heroImageQuery: "electric grid transformer",
    language: { primary: "English", locale: "en-ID" },
    shortIntro: "PT PLN is Indonesia's sole electricity distributor for 80+ million customers. The PLN Mobile app and pln.co.id portal accept the 12-digit Customer ID / ID Pelanggan."
  },
  {
    slug: "philippines", name: "Philippines", isoAlpha2: "PH", isoAlpha3: "PHL",
    region: "Southeast Asia",
    currency: { code: "PHP", symbol: "₱", name: "Philippine Peso" },
    electricityRegulator: { name: "Energy Regulatory Commission", shortName: "ERC", url: "https://www.erc.gov.ph/" },
    voltageStd: "230V 60Hz", billingCycle: "monthly", timezone: "Asia/Manila",
    population: 117, electrificationRate: 96,
    heroImageQuery: "electric power lines sunset",
    language: { primary: "English", locale: "en-PH" },
    shortIntro: "Meralco serves Metro Manila and most of Luzon; the rest of the country is split between 100+ electric cooperatives and Visayan/Mindanao distributors. Bills carry a 10-digit ATM/Reference Number."
  },
  {
    slug: "malaysia", name: "Malaysia", isoAlpha2: "MY", isoAlpha3: "MYS",
    region: "Southeast Asia",
    currency: { code: "MYR", symbol: "RM", name: "Malaysian Ringgit" },
    electricityRegulator: { name: "Suruhanjaya Tenaga (Energy Commission)", shortName: "ST", url: "https://www.st.gov.my/" },
    voltageStd: "240V 50Hz", billingCycle: "monthly", timezone: "Asia/Kuala_Lumpur",
    population: 34, electrificationRate: 100,
    heroImageQuery: "electric grid transformer",
    language: { primary: "English", locale: "en-MY" },
    shortIntro: "Tenaga Nasional Berhad (TNB) serves Peninsular Malaysia. Sabah and Sarawak have separate utilities — SESB and Sarawak Energy. All use a 12-digit Account Number for bill lookups."
  },
  {
    slug: "vietnam", name: "Vietnam", isoAlpha2: "VN", isoAlpha3: "VNM",
    region: "Southeast Asia",
    currency: { code: "VND", symbol: "₫", name: "Vietnamese Dong" },
    electricityRegulator: { name: "Electricity Regulatory Authority of Vietnam", shortName: "ERAV", url: "https://www.erav.vn/" },
    voltageStd: "220V 50Hz", billingCycle: "monthly", timezone: "Asia/Ho_Chi_Minh",
    population: 100, electrificationRate: 100,
    heroImageQuery: "electric power lines sunset",
    language: { primary: "English", locale: "en-VN" },
    shortIntro: "EVN — split into five regional subsidiaries (EVN HCMC, EVN HANOI, EVN NPC, EVN CPC, EVN SPC) — covers Vietnam. The CSKH EVN app and evn.com.vn use a 13-digit customer code."
  },
  {
    slug: "thailand", name: "Thailand", isoAlpha2: "TH", isoAlpha3: "THA",
    region: "Southeast Asia",
    currency: { code: "THB", symbol: "฿", name: "Thai Baht" },
    electricityRegulator: { name: "Energy Regulatory Commission of Thailand", shortName: "ERC", url: "https://www.erc.or.th/" },
    voltageStd: "220V 50Hz", billingCycle: "monthly", timezone: "Asia/Bangkok",
    population: 71, electrificationRate: 100,
    heroImageQuery: "electric grid transformer",
    language: { primary: "English", locale: "en-TH" },
    shortIntro: "MEA (Metropolitan Electricity Authority) covers Bangkok and three surrounding provinces; PEA (Provincial Electricity Authority) covers the rest. Bills carry an 11-digit CA Number."
  },
  {
    slug: "singapore", name: "Singapore", isoAlpha2: "SG", isoAlpha3: "SGP",
    region: "Southeast Asia",
    currency: { code: "SGD", symbol: "S$", name: "Singapore Dollar" },
    electricityRegulator: { name: "Energy Market Authority", shortName: "EMA", url: "https://www.ema.gov.sg/" },
    voltageStd: "230V 50Hz", billingCycle: "monthly", timezone: "Asia/Singapore",
    population: 6, electrificationRate: 100,
    heroImageQuery: "electric power lines sunset",
    language: { primary: "English", locale: "en-SG" },
    shortIntro: "Singapore's Open Electricity Market means a single physical grid (SP Group) with 13+ retailers. All bills carry an account number on the top-right of the statement and can be viewed in the SP Utilities app."
  },

  // ─── Middle East / GCC ─────────────────────────────────────────
  {
    slug: "uae", name: "United Arab Emirates", isoAlpha2: "AE", isoAlpha3: "ARE", nameOfficial: "United Arab Emirates",
    region: "Middle East",
    currency: { code: "AED", symbol: "د.إ", name: "UAE Dirham" },
    electricityRegulator: { name: "UAE Ministry of Energy & Infrastructure", url: "https://moei.gov.ae/" },
    voltageStd: "230V 50Hz", billingCycle: "monthly", timezone: "Asia/Dubai",
    population: 10, electrificationRate: 100,
    heroImageQuery: "electric grid transformer",
    language: { primary: "English", locale: "en-AE" },
    shortIntro: "DEWA serves Dubai, ADDC and AADC serve Abu Dhabi, and SEWA, FEWA cover the northern emirates. All accept Premise Number / Account Number lookups via mobile apps and web portals."
  },
  {
    slug: "saudi-arabia", name: "Saudi Arabia", isoAlpha2: "SA", isoAlpha3: "SAU",
    region: "Middle East",
    currency: { code: "SAR", symbol: "ر.س", name: "Saudi Riyal" },
    electricityRegulator: { name: "Water & Electricity Regulatory Authority", shortName: "WERA", url: "https://wera.gov.sa/" },
    voltageStd: "230V 60Hz", billingCycle: "monthly", timezone: "Asia/Riyadh",
    population: 36, electrificationRate: 100,
    heroImageQuery: "electric power lines sunset",
    language: { primary: "English", locale: "en-SA" },
    shortIntro: "Saudi Electricity Company (SEC) is the kingdom's monopoly distributor. The SEC app and se.com.sa portal accept the 10-digit Account Number printed at the top of every bill."
  },
  {
    slug: "qatar", name: "Qatar", isoAlpha2: "QA", isoAlpha3: "QAT",
    region: "Middle East",
    currency: { code: "QAR", symbol: "ر.ق", name: "Qatari Riyal" },
    electricityRegulator: { name: "Kahramaa (Qatar General Electricity and Water Corporation)", shortName: "Kahramaa", url: "https://www.km.qa/" },
    voltageStd: "240V 50Hz", billingCycle: "monthly", timezone: "Asia/Qatar",
    population: 3, electrificationRate: 100,
    heroImageQuery: "electric grid transformer",
    language: { primary: "English", locale: "en-QA" },
    shortIntro: "Kahramaa is Qatar's sole electricity and water utility. Bills carry an 11-digit account number; bills can be checked through the Kahramaa app or km.qa."
  },
  {
    slug: "kuwait", name: "Kuwait", isoAlpha2: "KW", isoAlpha3: "KWT",
    region: "Middle East",
    currency: { code: "KWD", symbol: "د.ك", name: "Kuwaiti Dinar" },
    electricityRegulator: { name: "Ministry of Electricity, Water and Renewable Energy", shortName: "MEW", url: "https://www.mew.gov.kw/" },
    voltageStd: "240V 50Hz", billingCycle: "monthly", timezone: "Asia/Kuwait",
    population: 4, electrificationRate: 100,
    heroImageQuery: "electric power lines sunset",
    language: { primary: "English", locale: "en-KW" },
    shortIntro: "Kuwait's Ministry of Electricity, Water and Renewable Energy operates as both regulator and supplier. The Sahel and MEW Kuwait apps accept the bill account number (file number)."
  },
  {
    slug: "oman", name: "Oman", isoAlpha2: "OM", isoAlpha3: "OMN",
    region: "Middle East",
    currency: { code: "OMR", symbol: "ر.ع", name: "Omani Rial" },
    electricityRegulator: { name: "Authority for Public Services Regulation", shortName: "APSR", url: "https://www.apsr.om/" },
    voltageStd: "240V 50Hz", billingCycle: "monthly", timezone: "Asia/Muscat",
    population: 5, electrificationRate: 100,
    heroImageQuery: "electric grid transformer",
    language: { primary: "English", locale: "en-OM" },
    shortIntro: "Mazoon, Majan, and Muscat Electricity Distribution Companies — collectively Nama Group — serve Oman. Bills carry an 8-digit account number used across the OmanWallet app and mazoonelectricity.com."
  },
  {
    slug: "bahrain", name: "Bahrain", isoAlpha2: "BH", isoAlpha3: "BHR",
    region: "Middle East",
    currency: { code: "BHD", symbol: ".د.ب", name: "Bahraini Dinar" },
    electricityRegulator: { name: "Electricity and Water Authority", shortName: "EWA", url: "https://www.ewa.bh/" },
    voltageStd: "230V 50Hz", billingCycle: "monthly", timezone: "Asia/Bahrain",
    population: 2, electrificationRate: 100,
    heroImageQuery: "electric power lines sunset",
    language: { primary: "English", locale: "en-BH" },
    shortIntro: "Bahrain's Electricity and Water Authority is the country's sole utility for both services. The EWA self-service portal and Tawasul app accept a 6-digit account number for bill checks."
  },
  {
    slug: "egypt", name: "Egypt", isoAlpha2: "EG", isoAlpha3: "EGY",
    region: "Middle East",
    currency: { code: "EGP", symbol: "ج.م", name: "Egyptian Pound" },
    electricityRegulator: { name: "Egyptian Electric Utility & Consumer Protection Regulatory Agency", shortName: "EgyptERA", url: "https://egyptera.org/" },
    voltageStd: "220V 50Hz", billingCycle: "monthly", timezone: "Africa/Cairo",
    population: 113, electrificationRate: 100,
    heroImageQuery: "electric grid transformer",
    language: { primary: "English", locale: "en-EG" },
    shortIntro: "Egypt's nine regional distribution companies (NEDCO, ALEXEDC, CEDC, SCEDC, NCEDC and others) share a unified payment portal hosted by EEHC. Bills carry an 11-digit subscription number."
  },
  {
    slug: "jordan", name: "Jordan", isoAlpha2: "JO", isoAlpha3: "JOR",
    region: "Middle East",
    currency: { code: "JOD", symbol: "د.أ", name: "Jordanian Dinar" },
    electricityRegulator: { name: "Energy and Minerals Regulatory Commission", shortName: "EMRC", url: "https://www.emrc.gov.jo/" },
    voltageStd: "230V 50Hz", billingCycle: "bimonthly", timezone: "Asia/Amman",
    population: 11, electrificationRate: 100,
    heroImageQuery: "electric power lines sunset",
    language: { primary: "English", locale: "en-JO" },
    shortIntro: "Three distributors — JEPCO (central), IDECO (north), EDCO (south) — supply Jordan. Bills are bimonthly with a 10-digit subscription number used in eFAWATEERcom and provider portals."
  },

  // ─── Africa ────────────────────────────────────────────────────
  {
    slug: "nigeria", name: "Nigeria", isoAlpha2: "NG", isoAlpha3: "NGA",
    region: "Africa",
    currency: { code: "NGN", symbol: "₦", name: "Nigerian Naira" },
    electricityRegulator: { name: "Nigerian Electricity Regulatory Commission", shortName: "NERC", url: "https://nerc.gov.ng/" },
    voltageStd: "230V 50Hz", billingCycle: "monthly", timezone: "Africa/Lagos",
    population: 223, electrificationRate: 60,
    heroImageQuery: "electric grid transformer",
    language: { primary: "English", locale: "en-NG" },
    shortIntro: "Eleven Discos — EKEDC, IKEDC, AEDC, IBEDC, EEDC, PHED, KEDCO, KAEDCO, BEDC, YEDC, JEDC — are licensed under NERC. Most accept the 13-digit Meter Number for prepaid and 11-digit Account Number for postpaid."
  },
  {
    slug: "kenya", name: "Kenya", isoAlpha2: "KE", isoAlpha3: "KEN",
    region: "Africa",
    currency: { code: "KES", symbol: "KSh", name: "Kenyan Shilling" },
    electricityRegulator: { name: "Energy and Petroleum Regulatory Authority", shortName: "EPRA", url: "https://www.epra.go.ke/" },
    voltageStd: "240V 50Hz", billingCycle: "monthly", timezone: "Africa/Nairobi",
    population: 55, electrificationRate: 76,
    heroImageQuery: "electric power lines sunset",
    language: { primary: "English", locale: "en-KE" },
    shortIntro: "Kenya Power (KPLC) is the sole distributor. Bills can be checked by SMS to 95551, the MyPower app, or kplc.co.ke using the 11-digit account number. M-Pesa Paybill 888880 settles both prepaid and postpaid."
  },
  {
    slug: "south-africa", name: "South Africa", isoAlpha2: "ZA", isoAlpha3: "ZAF",
    region: "Africa",
    currency: { code: "ZAR", symbol: "R", name: "South African Rand" },
    electricityRegulator: { name: "National Energy Regulator of South Africa", shortName: "NERSA", url: "https://www.nersa.org.za/" },
    voltageStd: "230V 50Hz", billingCycle: "monthly", timezone: "Africa/Johannesburg",
    population: 60, electrificationRate: 89,
    heroImageQuery: "electric grid transformer",
    language: { primary: "English", locale: "en-ZA" },
    shortIntro: "Eskom is the national generator and serves about 40% of end-customers directly. The remaining 60% receive bills from municipal utilities (City Power, Tshwane, eThekwini, Cape Town). All accept a 10–12 digit account number."
  },
  {
    slug: "ghana", name: "Ghana", isoAlpha2: "GH", isoAlpha3: "GHA",
    region: "Africa",
    currency: { code: "GHS", symbol: "₵", name: "Ghanaian Cedi" },
    electricityRegulator: { name: "Public Utilities Regulatory Commission", shortName: "PURC", url: "https://www.purc.com.gh/" },
    voltageStd: "230V 50Hz", billingCycle: "monthly", timezone: "Africa/Accra",
    population: 34, electrificationRate: 87,
    heroImageQuery: "electric power lines sunset",
    language: { primary: "English", locale: "en-GH" },
    shortIntro: "Electricity Company of Ghana (ECG) serves the southern half; Northern Electricity Distribution Company (NEDCo) covers the north. Both accept a 12-digit ECG Power App / NEDCo account number."
  },
  {
    slug: "tanzania", name: "Tanzania", isoAlpha2: "TZ", isoAlpha3: "TZA",
    region: "Africa",
    currency: { code: "TZS", symbol: "TSh", name: "Tanzanian Shilling" },
    electricityRegulator: { name: "Energy and Water Utilities Regulatory Authority", shortName: "EWURA", url: "https://www.ewura.go.tz/" },
    voltageStd: "230V 50Hz", billingCycle: "monthly", timezone: "Africa/Dar_es_Salaam",
    population: 65, electrificationRate: 45,
    heroImageQuery: "electric grid transformer",
    language: { primary: "English", locale: "en-TZ" },
    shortIntro: "Tanzania Electric Supply Company (TANESCO) is the national distributor. Bills are referenced by the Customer Service Number (CSN) — 11 digits — used in the LUKU prepaid system and Max Malipo bill app."
  },

  // ─── Anglosphere ───────────────────────────────────────────────
  {
    slug: "usa", name: "United States", isoAlpha2: "US", isoAlpha3: "USA", nameOfficial: "United States of America",
    region: "North America",
    currency: { code: "USD", symbol: "$", name: "US Dollar" },
    electricityRegulator: { name: "Federal Energy Regulatory Commission", shortName: "FERC", url: "https://www.ferc.gov/" },
    gasRegulator: { name: "Pipeline and Hazardous Materials Safety Administration", shortName: "PHMSA", url: "https://www.phmsa.dot.gov/" },
    voltageStd: "120V 60Hz", billingCycle: "monthly", timezone: "America/New_York",
    population: 332, electrificationRate: 100,
    heroImageQuery: "electric power lines sunset",
    language: { primary: "English", locale: "en-US" },
    shortIntro: "The US has 3,000+ electric utilities — investor-owned (Duke, ConEd, PG&E), municipal, and cooperative. All US utilities require a customer login on their portal to view bills; account numbers vary 8–14 digits."
  },
  {
    slug: "uk", name: "United Kingdom", isoAlpha2: "GB", isoAlpha3: "GBR", nameOfficial: "United Kingdom",
    region: "Europe",
    currency: { code: "GBP", symbol: "£", name: "Pound Sterling" },
    electricityRegulator: { name: "Office of Gas and Electricity Markets", shortName: "Ofgem", url: "https://www.ofgem.gov.uk/" },
    gasRegulator: { name: "Office of Gas and Electricity Markets", shortName: "Ofgem", url: "https://www.ofgem.gov.uk/" },
    waterRegulator: { name: "Water Services Regulation Authority", shortName: "Ofwat", url: "https://www.ofwat.gov.uk/" },
    voltageStd: "230V 50Hz", billingCycle: "monthly", timezone: "Europe/London",
    population: 67, electrificationRate: 100,
    heroImageQuery: "electric grid transformer",
    language: { primary: "English", locale: "en-GB" },
    shortIntro: "Energy retail in Great Britain is a competitive market with ~25 suppliers (Octopus, British Gas, EDF, E.ON Next, OVO). Bills are referenced by account number printed on every statement; smart meters report half-hourly to the supplier."
  },
  {
    slug: "canada", name: "Canada", isoAlpha2: "CA", isoAlpha3: "CAN",
    region: "North America",
    currency: { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
    electricityRegulator: { name: "Canada Energy Regulator", shortName: "CER", url: "https://www.cer-rec.gc.ca/" },
    voltageStd: "120V 60Hz", billingCycle: "monthly", timezone: "America/Toronto",
    population: 40, electrificationRate: 100,
    heroImageQuery: "electric power lines sunset",
    language: { primary: "English", locale: "en-CA" },
    shortIntro: "Each Canadian province regulates its own utilities — Hydro One and Toronto Hydro in Ontario, Hydro-Québec in Quebec, BC Hydro in British Columbia, ENMAX/EPCOR in Alberta. All accept an account number on their customer portal."
  },
  {
    slug: "australia", name: "Australia", isoAlpha2: "AU", isoAlpha3: "AUS",
    region: "Oceania",
    currency: { code: "AUD", symbol: "A$", name: "Australian Dollar" },
    electricityRegulator: { name: "Australian Energy Regulator", shortName: "AER", url: "https://www.aer.gov.au/" },
    voltageStd: "230V 50Hz", billingCycle: "quarterly", timezone: "Australia/Sydney",
    population: 26, electrificationRate: 100,
    heroImageQuery: "electric grid transformer",
    language: { primary: "English", locale: "en-AU" },
    shortIntro: "Australia's National Electricity Market connects retailers like AGL, Origin Energy, EnergyAustralia and Red Energy with distributors. Bills are typically issued quarterly with a 10–12 digit account reference."
  },
  {
    slug: "new-zealand", name: "New Zealand", isoAlpha2: "NZ", isoAlpha3: "NZL",
    region: "Oceania",
    currency: { code: "NZD", symbol: "NZ$", name: "New Zealand Dollar" },
    electricityRegulator: { name: "Electricity Authority", shortName: "EA", url: "https://www.ea.govt.nz/" },
    voltageStd: "230V 50Hz", billingCycle: "monthly", timezone: "Pacific/Auckland",
    population: 5, electrificationRate: 100,
    heroImageQuery: "electric power lines sunset",
    language: { primary: "English", locale: "en-NZ" },
    shortIntro: "Five major retailers — Genesis, Mercury, Contact, Meridian, Powershop — serve New Zealand alongside several independents. Bills carry an 8-digit account number used in mobile apps and online portals."
  },
  {
    slug: "ireland", name: "Ireland", isoAlpha2: "IE", isoAlpha3: "IRL",
    region: "Europe",
    currency: { code: "EUR", symbol: "€", name: "Euro" },
    electricityRegulator: { name: "Commission for Regulation of Utilities", shortName: "CRU", url: "https://www.cru.ie/" },
    voltageStd: "230V 50Hz", billingCycle: "bimonthly", timezone: "Europe/Dublin",
    population: 5, electrificationRate: 100,
    heroImageQuery: "electric grid transformer",
    language: { primary: "English", locale: "en-IE" },
    shortIntro: "Electric Ireland, Energia, Bord Gáis Energy, SSE Airtricity and Pinergy compete for retail customers. Bills are bimonthly with an account number and MPRN (Meter Point Reference Number)."
  },
];

export const COUNTRIES_BY_SLUG: Record<string, Country> = Object.fromEntries(
  COUNTRIES.map((c) => [c.slug, c])
);

export function getCountry(slug: string): Country | undefined {
  return COUNTRIES_BY_SLUG[slug];
}

export const COUNTRIES_BY_REGION: Record<string, Country[]> = COUNTRIES.reduce(
  (acc, c) => {
    (acc[c.region] ??= []).push(c);
    return acc;
  },
  {} as Record<string, Country[]>
);
