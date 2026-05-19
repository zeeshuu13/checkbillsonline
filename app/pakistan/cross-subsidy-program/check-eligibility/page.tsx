import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CrossSubsidyEligibilityForm } from "@/components/CrossSubsidyEligibilityForm";
import { CrossSubsidyClusterBand } from "@/components/CrossSubsidyClusterBand";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Section } from "@/components/Section";
import { Callout } from "@/components/Callout";
import { ArticleJsonLd, WebPageJsonLd } from "@/lib/seo/jsonLd";
import { buildMetadata } from "@/lib/seo/metadata";
import { CSS_FAQ_ELIGIBILITY, CSS_KEYWORDS, CSS_PATH } from "@/lib/content/pakistan/cross-subsidy";

const PATH = `${CSS_PATH}/check-eligibility`;
const PAGE_TITLE = "Check Eligibility — Cross Subsidy Program (css.pitc.com.pk) | Pakistan";
const PAGE_DESC =
  "Enter your 14-digit electricity reference number to check your Cross Subsidy Program eligibility on the official PITC portal. Learn what the eligibility check verifies, which reference numbers are accepted, and how to fix common errors.";
const LAST_REVIEWED = "2026-05-19";

export const metadata: Metadata = buildMetadata({
  path: PATH,
  title: PAGE_TITLE,
  description: PAGE_DESC,
  keywords: CSS_KEYWORDS.eligibility,
  publishedTime: LAST_REVIEWED,
  modifiedTime: LAST_REVIEWED,
  author: "CheckBillsOnline Editorial",
});

const BREADCRUMB = [
  { name: "Home", href: "/" },
  { name: "Pakistan", href: "/pakistan" },
  { name: "Cross Subsidy Program", href: CSS_PATH },
  { name: "Check eligibility", href: PATH },
];

export default function CrossSubsidyCheckEligibilityPage() {
  return (
    <>
      <WebPageJsonLd
        url={PATH}
        name={PAGE_TITLE}
        description={PAGE_DESC}
        breadcrumb={BREADCRUMB}
        datePublished={LAST_REVIEWED}
        dateModified={LAST_REVIEWED}
      />
      <ArticleJsonLd
        url={PATH}
        headline={PAGE_TITLE}
        description={PAGE_DESC}
        datePublished={LAST_REVIEWED}
        dateModified={LAST_REVIEWED}
        authorName="CheckBillsOnline Editorial"
        authorUrl="/authors/editorial"
      />

      <div className="container-wide pt-6"><Breadcrumb items={BREADCRUMB} /></div>

      <section className="bg-gradient-to-b from-brand-50 via-white to-white border-b border-slate-200">
        <div className="container-wide py-12 md:py-16 grid gap-10 md:grid-cols-2 items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Eligibility Check</p>
            <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
              Check your Cross Subsidy Program eligibility online
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Type the 14-digit reference number from the top of any recent electricity bill. We
              copy it to your clipboard and open the official{" "}
              <span className="font-mono">css.pitc.com.pk</span> homepage in a new tab. Paste,
              submit, and PITC will either show your meter details on the{" "}
              <span className="font-mono">/register</span> page (you are eligible) or display an
              inline error on the homepage (you are not).
            </p>
          </div>
          <div>
            <CrossSubsidyEligibilityForm />
          </div>
        </div>
      </section>

      <article className="container-tight py-12 md:py-16 space-y-12">
        <Section id="what" title='There is no separate "eligibility" page — what really happens'>
          <p>
            Many guides describe a multi-screen &ldquo;eligibility check&rdquo; but the PITC portal
            itself does not have one. The homepage at <span className="font-mono">css.pitc.com.pk</span>{" "}
            contains a single reference-number form. When you submit, the form POSTs to the URL{" "}
            <span className="font-mono">/check-eligibility</span> — that URL is just the server-side
            handler, not a page. The server runs three deterministic checks against the PITC
            consumer master and immediately decides between two outcomes:
          </p>
          <ul>
            <li>
              <strong>Eligible</strong> → server returns an HTTP 302 redirect to{" "}
              <span className="font-mono">https://css.pitc.com.pk/register</span>. Your browser
              follows the redirect and shows you the register page with your meter owner details
              and the CNIC + mobile form for the OTP step.
            </li>
            <li>
              <strong>Ineligible</strong> → server keeps you on the homepage and shows an inline
              error (usage above threshold, non-domestic tariff, duplicate CNIC, or reference not
              found).
            </li>
          </ul>
          <Callout title="Note">
            <p>
              So when this guide talks about &ldquo;the eligibility check&rdquo;, it really means
              the instantaneous decision the server makes — and whether you end up on{" "}
              <span className="font-mono">/register</span> or back on the homepage tells you the
              result.
            </p>
          </Callout>

          <h3>The three deterministic checks</h3>
          <ol>
            <li>
              <strong>Tariff class</strong> — the meter must be flagged as a domestic-tariff
              connection. Commercial (A2), industrial (B), agricultural (D), and bulk-supply meters
              are excluded by design.
            </li>
            <li>
              <strong>Rolling six-month average</strong> — the system sums the last six monthly
              metered units, divides by six, and checks the result against the protected threshold
              (typically 200 units/month). A single outlier month does not disqualify; the rolling
              average smooths it.
            </li>
            <li>
              <strong>One-occupant-one-meter</strong> — once you complete OTP registration, the
              system stores your CNIC as the verified occupant of this meter. Any attempt to use
              the same CNIC on a second live domestic connection elsewhere in the country will
              fail.
            </li>
          </ol>
        </Section>

        <Section id="refno" title="Which reference numbers are accepted?">
          <p>
            The CSS portal accepts both the older 14-digit reference number and the newer 10-digit
            consumer number that appears on SAP-based bills in some zones. The reference is the
            single most important identifier on your bill — usually printed in large type at the
            top, right below your DISCO logo and above the consumer name.
          </p>
          <ul>
            <li>
              <strong>14-digit reference</strong> — used by most legacy DISCOs (MEPCO, LESCO, IESCO,
              FESCO, GEPCO, PESCO, HESCO, SEPCO, QESCO, TESCO, HAZECO). Format{" "}
              <span className="font-mono">XX XXXX XXXX XXXX</span>.
            </li>
            <li>
              <strong>10-digit consumer number</strong> — used by newer SAP-rolled zones inside the
              same DISCOs. The CSS portal autodetects which format you typed.
            </li>
            <li>
              <strong>Spaces and dashes</strong> — strip them before pasting. The form on this page
              cleans them automatically.
            </li>
          </ul>
        </Section>

        <Section id="results" title="What you see after submitting the reference">
          <h3>1. Eligible — you are redirected to /register with your details visible</h3>
          <p>
            On a successful eligibility check, PITC redirects the browser to{" "}
            <span className="font-mono">https://css.pitc.com.pk/register</span>. The register page
            shows two stacked panels: <strong>Owner Details</strong> (read-only — reference, tariff
            code, consumer name, father/husband, address, sanctioned load) and{" "}
            <strong>Occupant Details</strong> (you fill in — CNIC and mobile). Click{" "}
            <strong>Send OTP to Mobile</strong> and PITC sends a 4-6 digit code by SMS. For the
            full walkthrough see{" "}
            <Link href={`${CSS_PATH}/how-to-register`}>how to register on CSS</Link>.
          </p>
          <h3>2. Ineligible — you stay on the homepage with an inline error</h3>
          <p>The most common ineligible reasons are:</p>
          <ul>
            <li><strong>Usage above threshold</strong> — your six-month rolling average has crept above the protected band. Bring monthly usage down for a few cycles and re-run the check.</li>
            <li><strong>Non-domestic tariff</strong> — the meter is commercial, industrial, agricultural, or bulk-supply. Apply for a domestic conversion at your DISCO subdivision before retrying.</li>
            <li><strong>Duplicate CNIC / multiple live connections</strong> — consolidate via the DISCO office and pick a single meter for the subsidy.</li>
            <li><strong>Reference not found</strong> — likely you typed the account number, customer ID, or billing-cycle ID instead of the actual 10-14 digit reference at the top of the bill.</li>
          </ul>
        </Section>

        <Section id="errors" title="Common eligibility errors and how to fix them">
          <h3>&ldquo;Reference number not found&rdquo;</h3>
          <p>
            You may have typed your <em>account number</em>, <em>bill issue number</em>, or{" "}
            <em>customer ID</em> instead of the reference number. Look for the longest run of digits
            at the top of the bill — that is almost always the reference. Strip all spaces. If you
            still see this error, try the 10-digit consumer number printed below the reference.
          </p>
          <h3>&ldquo;Permanently disconnected&rdquo;</h3>
          <p>
            The reference exists but the connection is marked permanently disconnected in the DISCO
            master. Visit your subdivision to either restore service or get a fresh reference on a
            new meter.
          </p>
          <h3>&ldquo;Server busy — try again later&rdquo;</h3>
          <p>
            The PITC API occasionally rate-limits during peak hours (bill cycle endings, news
            announcements). Wait a few minutes and retry. checkbillsonline.com does not control
            this — it is a load condition on the official PITC servers.
          </p>
          <h3>&ldquo;Owner details do not match&rdquo;</h3>
          <p>
            The consumer name on the meter is out of date — frequently after inheritance, sale, or a
            transfer the DISCO never processed. CSS itself cannot edit those fields; you must apply
            for a name change at the subdivision office and re-register on CSS once the update is
            live.
          </p>
        </Section>

        <Section id="privacy" title="Privacy: what we see and do not see">
          <p>
            checkbillsonline.com is a thin funnel for the official PITC portal. The eligibility form
            on this page is a client-side HTML form that validates the reference shape, copies it
            to your clipboard, and opens <span className="font-mono">css.pitc.com.pk</span> in a new
            tab. We do not log the reference, store it in cookies, send it to analytics, or share
            it with advertisers. Read our <Link href="/privacy">privacy policy</Link> for the full
            picture.
          </p>
        </Section>

        <CrossSubsidyClusterBand currentPath={PATH} />

        <FaqAccordion items={CSS_FAQ_ELIGIBILITY} />
      </article>
    </>
  );
}
