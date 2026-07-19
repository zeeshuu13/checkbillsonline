import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/lib/seo/jsonLd";
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
