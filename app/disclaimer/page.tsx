import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SITE } from "@/lib/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { WebPageJsonLd } from "@/lib/seo/jsonLd";

export const metadata: Metadata = buildMetadata({
  path: "/disclaimer",
  title: "Disclaimer — Check Bills Online",
  description: "Check Bills Online is an independent consumer guide. We are not affiliated with Duke Energy, PG&E, or any other utility. All trademarks belong to their respective owners.",
});

export default function DisclaimerPage() {
  const breadcrumb = [{ name: "Home", href: "/" }, { name: "Disclaimer", href: "/disclaimer" }];
  return (
    <>
      <WebPageJsonLd url="/disclaimer" name="Disclaimer" description="Editorial disclaimer." breadcrumb={breadcrumb} />
      <div className="container-wide pt-6"><Breadcrumb items={breadcrumb} /></div>
      <article className="container-tight py-12 prose-cb">
        <h1>Disclaimer</h1>
        <p><strong>Effective date:</strong> July 23, 2026</p>

        <h2>Independent third-party site — not affiliated with any utility provider</h2>
        <p>
          <strong>{SITE.name} is an independent consumer guide. We are not affiliated with, endorsed
          by, sponsored by, or in any way officially connected with any electricity, gas, or water
          utility company, or any government regulator.</strong>
        </p>
        <p>
          Every provider page on this site — including pages for Duke Energy, PG&amp;E, Adani Electricity,
          MEPCO, LESCO, DEWA, or any other utility — is produced independently by our editorial team
          for informational purposes only. We are not those companies, and those companies have not
          authorised or approved our content.
        </p>

        <h2>Trademark notice</h2>
        <p>
          All company names, trademarks, service marks, trade names, and logos mentioned on this site
          (including but not limited to &ldquo;Duke Energy&rdquo;, &ldquo;Duke Energy Corporation&rdquo;,
          &ldquo;PG&amp;E&rdquo;, &ldquo;Adani Electricity&rdquo;, &ldquo;MEPCO&rdquo;,
          &ldquo;LESCO&rdquo;, &ldquo;DEWA&rdquo;, and all others) are the property of their
          respective owners.
        </p>
        <p>
          Our use of these names is solely for <strong>nominative fair use</strong> — that is, to
          accurately identify the utility company whose billing portal we are directing consumers to.
          This use does not imply affiliation, endorsement, or sponsorship by those companies.
          Our pages are consumer guides that link users directly to the official portals of those
          companies; we do not impersonate those companies.
        </p>

        <h2>Official portals</h2>
        <p>
          Every provider page on this site prominently links to the utility&rsquo;s own official
          website. If you wish to interact directly with a utility, please use the official link
          shown on each provider page. Examples:
        </p>
        <ul>
          <li>Duke Energy official site: <a href="https://www.duke-energy.com" target="_blank" rel="noopener noreferrer nofollow">duke-energy.com</a></li>
          <li>PG&amp;E official site: <a href="https://www.pge.com" target="_blank" rel="noopener noreferrer nofollow">pge.com</a></li>
        </ul>

        <h2>Information is editorial, not legal or financial advice</h2>
        <p>
          The articles on this site are written for general consumer information. They do not
          constitute legal, financial, or engineering advice. For matters affecting your contract,
          your safety, or your regulatory obligations, consult a qualified professional in your
          jurisdiction.
        </p>

        <h2>Tariff figures and contact details may change</h2>
        <p>
          Tariffs are revised by regulators regularly. Contact numbers are reassigned. We re-check
          each provider page on a 90-day cadence and date-stamp the review, but you should always
          verify a tariff figure from the cited regulator before relying on it for a contractual
          decision.
        </p>

        <h2>Bill-check link-outs</h2>
        <p>
          The bill-check form on every provider page is operated by the utility, not by us. Tier B
          (deep-link) and Tier C (link-out) pages open the official utility portal in a new tab; the
          utility&rsquo;s terms and privacy policy apply on that portal. Tier A (real-time lookup)
          pages fetch your bill through a regulated aggregator (Razorpay BBPS for India, PITC for
          Pakistan) and we do not retain the bill data.
        </p>

        <h2>Editorial corrections and removal requests</h2>
        <p>
          If you are a representative of a utility company and believe any content on this site
          is inaccurate, misleading, or otherwise requires attention, please contact us at{" "}
          <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a> and we will respond
          within 3 business days. Factual corrections are published within 48 hours of verification.
        </p>

        <h2>Affiliate and advertising disclosure</h2>
        <p>
          We may publish advertising on this site through Google AdSense or equivalent networks.
          Advertising is contextual to the page and clearly labelled. Advertising relationships do
          not influence editorial content; we name providers regardless of whether they advertise on
          the site.
        </p>
      </article>
    </>
  );
}
