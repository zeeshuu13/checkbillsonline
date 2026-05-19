import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SITE } from "@/lib/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { WebPageJsonLd } from "@/lib/seo/jsonLd";

export const metadata: Metadata = buildMetadata({
  path: "/disclaimer",
  title: "Disclaimer — Check Bills Online",
  description: "Important disclaimers about the editorial nature of Check Bills Online and our relationship with utility providers.",
});

export default function DisclaimerPage() {
  const breadcrumb = [{ name: "Home", href: "/" }, { name: "Disclaimer", href: "/disclaimer" }];
  return (
    <>
      <WebPageJsonLd url="/disclaimer" name="Disclaimer" description="Editorial disclaimer." breadcrumb={breadcrumb} />
      <div className="container-wide pt-6"><Breadcrumb items={breadcrumb} /></div>
      <article className="container-tight py-12 prose-cb">
        <h1>Disclaimer</h1>
        <p><strong>Effective date:</strong> May 9, 2026</p>

        <h2>Not affiliated with any utility</h2>
        <p>
          {SITE.name} is an independent editorial site. We are not affiliated with any electricity,
          gas, or water utility, nor with any regulator. Trademarks, logos, and brand names appearing
          on this site are the property of their respective owners. Their use is for nominative
          identification only and does not imply endorsement.
        </p>

        <h2>Information is editorial, not legal or financial advice</h2>
        <p>
          The articles on this site are written for general information. They do not constitute legal,
          financial, or engineering advice. For matters affecting your contract, your safety, or your
          regulatory obligations, consult a qualified professional in your jurisdiction.
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
          utility&rsquo;s terms and privacy policy apply on that portal. Tier A (real-time lookup) pages
          fetch your bill through a regulated aggregator (Razorpay BBPS for India, PITC for Pakistan)
          and we do not retain the bill data.
        </p>

        <h2>Editorial corrections</h2>
        <p>
          If you spot a factual error, please email <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>.
          Factual corrections are typically published within 48 hours.
        </p>

        <h2>Affiliate and advertising disclosure</h2>
        <p>
          We may publish advertising on this site through Google AdSense or equivalent networks.
          Advertising is contextual to the page and clearly labelled. Advertising relationships do not
          influence editorial content; we name providers regardless of whether they advertise on the
          site.
        </p>
      </article>
    </>
  );
}
