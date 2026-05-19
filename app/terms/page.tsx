import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { buildMetadata } from "@/lib/seo/metadata";
import { WebPageJsonLd } from "@/lib/seo/jsonLd";

export const metadata: Metadata = buildMetadata({
  path: "/terms",
  title: "Terms of Use — Check Bills Online",
  description: "The terms of use for visitors to Check Bills Online.",
});

export default function TermsPage() {
  const breadcrumb = [{ name: "Home", href: "/" }, { name: "Terms", href: "/terms" }];
  return (
    <>
      <WebPageJsonLd url="/terms" name="Terms of Use" description="Terms of use for Check Bills Online." breadcrumb={breadcrumb} />
      <div className="container-wide pt-6"><Breadcrumb items={breadcrumb} /></div>
      <article className="container-tight py-12 prose-cb">
        <h1>Terms of use</h1>
        <p><strong>Effective date:</strong> May 9, 2026</p>

        <h2>Acceptance</h2>
        <p>By accessing this site you accept these terms. If you do not accept them, please do not use the site.</p>

        <h2>Information accuracy</h2>
        <p>
          We make reasonable efforts to keep tariff figures, contact numbers, and procedural steps
          current. Tariffs change frequently — always verify the rate from the cited regulator before
          relying on it for a contractual decision. The visible &ldquo;last reviewed&rdquo; date on each page
          tells you how fresh the content is.
        </p>

        <h2>No utility relationship</h2>
        <p>
          We are not an electric, gas, or water utility, and we are not affiliated with any utility.
          We do not bill, collect payment, or operate any account on your behalf.
        </p>

        <h2>External links</h2>
        <p>
          Links to utility portals and regulator websites are provided for convenience. We are not
          responsible for the content, accuracy, or availability of any third-party site.
        </p>

        <h2>Use restrictions</h2>
        <ul>
          <li>You may not scrape, mirror, or republish content from this site without written permission.</li>
          <li>You may not use the bill-check form to perform automated lookups against utility portals.
            Doing so may violate the utility&rsquo;s terms of service and the laws of your jurisdiction.</li>
          <li>You may not attempt to interfere with the site&rsquo;s availability or security.</li>
        </ul>

        <h2>Disclaimer</h2>
        <p>
          The site is provided &ldquo;as is&rdquo; without warranty of any kind, express or implied. We do
          not warrant that the site will be uninterrupted, error-free, or free of harmful components.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          To the maximum extent permitted by law, we are not liable for any loss or damage arising from
          your use of this site or reliance on its content, including but not limited to financial loss,
          missed payments, or service disconnections.
        </p>

        <h2>Governing law</h2>
        <p>
          These terms are governed by the laws of the jurisdiction where this site is operated. Any
          disputes are subject to the exclusive jurisdiction of the courts of that jurisdiction.
        </p>

        <h2>Changes</h2>
        <p>We may update these terms at any time. Material changes are flagged on the home page for 14 days.</p>
      </article>
    </>
  );
}
