import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SITE } from "@/lib/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { WebPageJsonLd } from "@/lib/seo/jsonLd";

export const metadata: Metadata = buildMetadata({
  path: "/privacy",
  title: "Privacy Policy — Check Bills Online",
  description: "How we handle the data you submit on Check Bills Online, what we collect, and how to contact us.",
});

export default function PrivacyPage() {
  const breadcrumb = [{ name: "Home", href: "/" }, { name: "Privacy", href: "/privacy" }];
  return (
    <>
      <WebPageJsonLd url="/privacy" name="Privacy Policy" description="Privacy practices for Check Bills Online." breadcrumb={breadcrumb} />
      <div className="container-wide pt-6"><Breadcrumb items={breadcrumb} /></div>
      <article className="container-tight py-12 prose-cb">
        <h1>Privacy policy</h1>
        <p><strong>Effective date:</strong> May 9, 2026</p>

        <h2>What we collect</h2>
        <p>
          We collect minimal data. The bill-check form on each provider page accepts a reference
          number (a customer ID issued by your utility) and uses it to look up your bill. We do not
          persist that reference number to our database after the lookup completes.
        </p>
        <p>
          We use server logs to keep the site reliable and protected against abuse. Server logs may
          include your IP address, browser user-agent, the URL you requested, and the response status
          code. These logs are retained for 30 days and discarded.
        </p>

        <h2>Cookies</h2>
        <p>
          We do not set marketing cookies. Functional cookies, where used, are limited to maintaining
          session state for the bill-check flow and are cleared when you close your browser.
        </p>

        <h2>Third-party services</h2>
        <p>The bill-check flow uses third-party services in three ways:</p>
        <ul>
          <li><strong>Link-outs to official utility portals.</strong> When you click &ldquo;Check Bill&rdquo;
            and your provider is in Tier B or Tier C, we open the utility&rsquo;s own portal in a new tab.
            Once on the utility&rsquo;s site, the utility&rsquo;s own privacy policy applies.</li>
          <li><strong>Razorpay BBPS (India only).</strong> For Indian providers using real bill fetch,
            we relay your consumer ID to Razorpay&rsquo;s BBPS endpoint, which queries the official BBPS
            (NPCI) network. Razorpay is bound by RBI&rsquo;s BBPS data norms.</li>
          <li><strong>PITC (Pakistan only).</strong> For Pakistani DISCO bills, we fetch the bill HTML
            directly from bill.pitc.com.pk and pass it to your browser. PITC&rsquo;s own privacy terms govern
            the upstream service.</li>
        </ul>

        <h2>Images</h2>
        <p>
          Imagery on the site is sourced from Unsplash under the Unsplash licence. Photographer
          credits and back-links to the photographer&rsquo;s Unsplash profile are displayed beside
          every photo as required by the Unsplash API guidelines. No biometric or facial data is
          collected via these images.
        </p>

        <h2>Advertising</h2>
        <p>
          We may run advertising on the site through Google AdSense or equivalent networks. When
          advertising is enabled, those networks may set their own cookies, governed by their privacy
          policies. We do not share personal data with advertisers; ads are contextual to the page.
        </p>

        <h2>Your rights</h2>
        <p>
          You have the right to ask us what data we hold about you, to ask for corrections, and to ask
          for deletion. Email <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a> and we will
          respond within 30 days.
        </p>

        <h2>Children</h2>
        <p>This site is not directed at children under 13. We do not knowingly collect data from children.</p>

        <h2>Changes to this policy</h2>
        <p>
          We will update the effective date at the top of this page when we make material changes.
          Substantial changes are also flagged on the home page banner for at least 14 days.
        </p>
      </article>
    </>
  );
}
