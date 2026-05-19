export const SITE = {
  name: "Check Bills Online",
  shortName: "CheckBillsOnline",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://checkbillsonline.com",
  tagline: "International Electricity, Gas & Water Bill Checker",
  description:
    "Check electricity, gas, and water bills online in 30 countries. Step-by-step guides, official provider portals, tariff tables, and complaint escalation paths.",
  author: {
    name: "CheckBillsOnline Editorial",
    url: "/authors/editorial",
    twitter: "@checkbillsonline",
  },
  social: {
    twitter: "https://twitter.com/checkbillsonline",
  },
  /** Horizontal wordmark logo, used in header / footer / open-graph. */
  logo: "/logo.png",
  logoWidth: 1108,
  logoHeight: 256,
  /** Square publisher logo, used in schema.org Organization + Article markup. */
  publisherLogo: "/android-chrome-512x512.png",
  publisherLogoWidth: 512,
  publisherLogoHeight: 512,
  defaultLocale: "en",
  contactEmail: "hello@checkbillsonline.com",
  /**
   * Disclaimer shown on every bill-check page — required for AdSense compliance
   * and to make the link-out / aggregator model honest with users.
   */
  legalDisclaimer:
    "Check Bills Online is an independent information service. We link to official utility portals and do not store your bill data. Tariff figures cite the issuing regulator and are correct as of the date shown.",
} as const;

export type SiteConfig = typeof SITE;
