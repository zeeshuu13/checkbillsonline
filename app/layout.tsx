import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { OrganizationJsonLd, WebSiteJsonLd, DefinedTermSetJsonLd } from "@/lib/seo/jsonLd";
import { SITE } from "@/lib/site";
import { AdBanner } from "@/components/AdBanner";
import { InvokeAd } from "@/components/InvokeAd";

const GA_ID = "G-H41JGXD19K";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1c40ad",
  colorScheme: "light",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — International Electricity, Gas & Water Bill Checker`,
    template: `%s | ${SITE.name}`,
  },
  description:
    "Check electricity, gas and water bills online in 30 countries. Step-by-step guides, official provider portals, tariff tables, and complaint contacts.",
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  generator: "Next.js",
  keywords: [
    "check electricity bill online",
    "international bill check",
    "gas bill check",
    "water bill check",
    "utility bill payment",
  ],
  referrer: "origin-when-cross-origin",
  creator: SITE.name,
  publisher: SITE.name,
  formatDetection: { email: false, address: false, telephone: false },
  alternates: {
    canonical: SITE.url,
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      { rel: "icon", url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { rel: "icon", url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  appleWebApp: {
    title: SITE.shortName,
    capable: true,
    statusBarStyle: "default",
  },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_US",
    url: SITE.url,
    title: `${SITE.name} — International Electricity, Gas & Water Bill Checker`,
    description:
      "Check utility bills online in 30 countries. Step-by-step guides, official provider portals, tariff tables, and complaint contacts.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@checkbillsonline",
    creator: "@checkbillsonline",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_VERIFICATION }
      : undefined,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col">
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { send_page_view: true });
        `}</Script>

        {/* Adsterra Popunder */}
        <Script
          src="https://calculatepredestinationset.com/bc/b8/22/bcb8226f00e192337555895aaa5c7202.js"
          strategy="afterInteractive"
        />

        {/* Adsterra Social Bar */}
        <Script
          src="https://calculatepredestinationset.com/cd/d0/1b/cdd01bdc5c7ddbd223ba69703e2b7d0c.js"
          strategy="lazyOnload"
        />

        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <DefinedTermSetJsonLd
          name="Utility bill terminology glossary"
          url="/"
          terms={[
            { name: "Reference number", description: "A unique identifier printed at the top of every utility bill, used to look up the bill online. Also called consumer number, account number, CA number, or premise number depending on the utility.", aliases: ["consumer number", "account number", "CA number", "premise number", "customer ID"] },
            { name: "Tariff slab", description: "A consumption band in a graduated electricity tariff. Each slab has a per-unit rate; usage in each band is billed at that band's rate. Crossing into a higher slab increases the rate only on units in that band (telescopic tariff).", aliases: ["consumption slab", "billing slab", "tariff band", "rate slab"] },
            { name: "Fixed charge", description: "A flat monthly charge on a utility bill that does not depend on consumption. Also called the meter rent, capacity charge, or standing charge. Payable even if consumption is zero.", aliases: ["standing charge", "meter rent", "capacity charge", "service charge"] },
            { name: "Fuel Price Adjustment (FPA)", description: "A monthly variable surcharge on electricity bills in Pakistan, passed through from changes in fuel input costs (gas, furnace oil, coal). Positive when input costs rise, negative when they fall. Set monthly by NEPRA.", aliases: ["FPA", "fuel adjustment", "fuel adjustment charge", "FAC"] },
            { name: "PITC", description: "Power Information Technology Company, a government entity in Pakistan that operates bill.pitc.com.pk — the shared online bill portal for all 13 Pakistan DISCOs (distribution companies).", aliases: ["Power Information Technology Company"] },
            { name: "DISCO", description: "Distribution Company — one of Pakistan's 13 electricity distribution utilities: MEPCO, LESCO, IESCO, FESCO, GEPCO, PESCO, HESCO, SEPCO, QESCO, TESCO, HAZECO, K-Electric, TESCO.", aliases: ["distribution company", "electricity distribution utility"] },
            { name: "NEPRA", description: "National Electric Power Regulatory Authority — Pakistan's electricity sector regulator. Sets tariff for all DISCOs and adjudicates consumer complaints. Website: nepra.org.pk.", aliases: ["National Electric Power Regulatory Authority"] },
            { name: "BBPS", description: "Bharat Bill Payment System — NPCI-operated payment rail used for utility bill payments in India. Enables real-time bill fetch and payment for Adani Electricity, Tata Power, BSES, and hundreds of other Indian utilities.", aliases: ["Bharat Bill Payment System", "NPCI bill payment"] },
            { name: "Late payment surcharge", description: "A penalty added to a utility bill when payment is received after the due date. In Pakistan this is typically 10% of the bill amount. Failing to pay within the disconnection window adds reconnection fees on top.", aliases: ["LPS", "late fee", "surcharge", "penalty"] },
            { name: "Cross Subsidy Program (CSS)", description: "A Government of Pakistan program at css.pitc.com.pk that registers domestic electricity consumers using ≤200 units/month for the protected (lifeline) tariff. Registration requires a CNIC and is verified by OTP. Eligible consumers pay a lower per-unit rate.", aliases: ["CSS", "lifeline tariff registration", "protected tariff", "cross subsidy"] },
            { name: "DEWA", description: "Dubai Electricity and Water Authority — the government utility providing electricity and water in Dubai, UAE. Bill reference is a 10-digit Premise account number. Website: dewa.gov.ae.", aliases: ["Dubai Electricity and Water Authority"] },
            { name: "Reconnection fee", description: "A charge levied to restore electricity supply after disconnection for non-payment. In addition to the reconnection fee, the full outstanding balance must be settled before supply is restored.", aliases: ["restoration fee", "reconnection charge"] },
            { name: "Withholding tax (electricity)", description: "In Pakistan, a withholding tax is levied on electricity bills: 7.5% for income tax filers and 15% for non-filers. This amount is adjustable against the consumer's annual income tax liability.", aliases: ["WHT", "WH tax", "FBR withholding", "7.5% electricity tax"] },
            { name: "Net metering", description: "A billing arrangement for solar panel owners where electricity exported to the grid is credited against consumption. The net consumption (import minus export) is billed at the applicable tariff slab rate.", aliases: ["solar net metering", "export tariff", "grid export credit"] },
            { name: "MEPCO", description: "Multan Electric Power Company — Pakistan electricity DISCO serving Southern Punjab (Multan, Bahawalpur, Sahiwal division). Bill reference: 14 digits. Check via PITC portal or MEPCO bill check page.", aliases: ["Multan Electric Power Company", "MEPCO bill check"] },
            { name: "LESCO", description: "Lahore Electric Supply Company — Pakistan electricity DISCO serving Lahore and surrounding areas. Bill reference: 14 digits. Check via PITC portal.", aliases: ["Lahore Electric Supply Company", "LESCO bill check"] },
          ]}
        />
        <SiteHeader />

        {/* Leaderboard (728x90) desktop / Mobile banner (320x50) */}
        <div className="flex justify-center py-1 bg-gray-50">
          <div className="hidden md:block">
            <AdBanner adKey="7beb05982d6060d9bc8d4f9aedd64b76" width={728} height={90} />
          </div>
          <div className="md:hidden">
            <AdBanner adKey="5e2e1126f024d8ebf6cf82954a920879" width={320} height={50} />
          </div>
        </div>

        <main id="main" className="flex-1">
          {children}
        </main>

        {/* Invoke.js display ad */}
        <InvokeAd className="py-2" />

        {/* 468x60 banner */}
        <div className="flex justify-center py-2">
          <AdBanner adKey="a8f3bfef5eb5dd5fb59611a43f1a8492" width={468} height={60} />
        </div>

        {/* 300x250 medium rectangle */}
        <div className="flex justify-center py-2">
          <AdBanner adKey="7ee8f6723303c65503a5971d0dfcad15" width={300} height={250} />
        </div>

        {/* Skyscraper ads side by side (hidden on mobile) */}
        <div className="hidden md:flex justify-center gap-4 py-2">
          <AdBanner adKey="bc6b96e4f270519fda1e7b924267b57b" width={160} height={300} />
          <AdBanner adKey="fa6c45dc2df2353d9ef359fe7f5c9c81" width={160} height={600} />
        </div>

        <SiteFooter />
      </body>
    </html>
  );
}
