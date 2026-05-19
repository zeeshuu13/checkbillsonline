export type UtilityType = "electricity" | "gas" | "water";

export type CountrySlug =
  | "india" | "pakistan" | "bangladesh" | "sri-lanka" | "nepal"
  | "indonesia" | "philippines" | "malaysia" | "vietnam" | "thailand" | "singapore"
  | "uae" | "saudi-arabia" | "qatar" | "kuwait" | "oman" | "bahrain" | "egypt" | "jordan"
  | "nigeria" | "kenya" | "south-africa" | "ghana" | "tanzania"
  | "usa" | "uk" | "canada" | "australia" | "new-zealand" | "ireland";

export type Regulator = {
  name: string;
  shortName?: string;
  url: string;
};

export type Country = {
  slug: CountrySlug;
  name: string;
  nameOfficial?: string;
  isoAlpha2: string;
  isoAlpha3: string;
  region:
    | "South Asia" | "Southeast Asia" | "Middle East" | "Africa"
    | "North America" | "Europe" | "Oceania";
  currency: { code: string; symbol: string; name: string };
  electricityRegulator: Regulator;
  gasRegulator?: Regulator;
  waterRegulator?: Regulator;
  voltageStd: string;            // e.g. "230V 50Hz"
  billingCycle: "monthly" | "bimonthly" | "quarterly";
  timezone: string;              // IANA tz of capital
  population: number;            // millions
  electrificationRate: number;   // 0-100
  heroImageQuery: string;
  language: { primary: string; locale: string };
  /** Two sentences. Used on country hub above the fold. */
  shortIntro: string;
};

export type BillCheckTier =
  /** Real-time fetch through our own server. */
  | "A-real"
  /** Deep link into provider portal with prefilled querystring. */
  | "B-deeplink"
  /** Plain link-out — provider portal requires login. */
  | "C-linkout";

export type Provider = {
  slug: string;                  // e.g. "adani-electricity"
  countrySlug: CountrySlug;
  type: UtilityType;
  name: string;                  // marketing name
  legalName: string;             // full company name
  /** URL slug used in routes: `<slug>-bill-check` */
  routeSlug: string;             // e.g. "adani-electricity-bill-check"
  portalUrl: string;             // canonical "check bill" landing
  /**
   * URL template for prefilled deep-links. The literal `{ref}` is replaced with the
   * URL-encoded reference number at click-time. Stored as a string (not a function) so
   * the Provider object can cross the React Server Component → Client boundary.
   */
  portalDeepLinkTemplate?: string;
  referenceFormat: {
    label: string;               // "Consumer Number"
    regex: string;               // serialized RegExp body, e.g. "^[0-9]{11}$"
    example: string;
    description: string;
    digitsOnly: boolean;
    minLength: number;
    maxLength: number;
  };
  supportPhone?: string;
  supportEmail?: string;
  supportWhatsapp?: string;
  serviceAreas: string[];        // human cities/regions
  established?: number;
  customers?: number;            // millions
  hq?: string;
  billCheckTier: BillCheckTier;
  /** Provider-specific image search string for Unsplash. */
  imageQuery: string;
  /** Real API integration code, when tier === "A-real". */
  realApi?: "pk-pitc" | "in-bbps-razorpay";
  /** PITC path for tier A on Pakistan utilities (mirrors MEPCO `pitcBillPath`). */
  pitcBillPath?: string;
  /** Razorpay BBPS biller_id for tier A on India utilities. */
  bbpsBillerId?: string;
};
