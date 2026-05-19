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
import {
  CSS_FAQ_LANDING,
  CSS_KEYWORDS,
  CSS_PATH,
} from "@/lib/content/pakistan/cross-subsidy";

const PAGE_TITLE = "Cross Subsidy Program (CSS) by PITC — Check Eligibility & Register | Pakistan";
const PAGE_DESC =
  "Free guide and reference-number lookup for the Government of Pakistan Cross Subsidy Program on css.pitc.com.pk. Check your eligibility, learn the protected-tariff rules, and register your domestic electricity meter to lower your monthly bill.";
const LAST_REVIEWED = "2026-05-19";

export const metadata: Metadata = buildMetadata({
  path: CSS_PATH,
  title: PAGE_TITLE,
  description: PAGE_DESC,
  keywords: CSS_KEYWORDS.landing,
  publishedTime: LAST_REVIEWED,
  modifiedTime: LAST_REVIEWED,
  author: "CheckBillsOnline Editorial",
});

const BREADCRUMB = [
  { name: "Home", href: "/" },
  { name: "Pakistan", href: "/pakistan" },
  { name: "Cross Subsidy Program", href: CSS_PATH },
];

export default function CrossSubsidyLandingPage() {
  return (
    <>
      <WebPageJsonLd
        url={CSS_PATH}
        name={PAGE_TITLE}
        description={PAGE_DESC}
        breadcrumb={BREADCRUMB}
        datePublished={LAST_REVIEWED}
        dateModified={LAST_REVIEWED}
      />
      <ArticleJsonLd
        url={CSS_PATH}
        headline={PAGE_TITLE}
        description={PAGE_DESC}
        datePublished={LAST_REVIEWED}
        dateModified={LAST_REVIEWED}
        authorName="CheckBillsOnline Editorial"
        authorUrl="/authors/editorial"
      />

      <div className="container-wide pt-6">
        <Breadcrumb items={BREADCRUMB} />
      </div>

      <section className="bg-gradient-to-b from-brand-50 via-white to-white border-b border-slate-200">
        <div className="container-wide py-12 md:py-16 grid gap-10 md:grid-cols-2 items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
              Government of Pakistan · PITC
            </p>
            <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
              Cross Subsidy Program — check eligibility and register your meter
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              The Cross Subsidy Program is a national initiative that links genuine low-usage
              domestic consumers to the protected (lifeline) electricity tariff, lowering the cost
              of every monthly bill. Enter your 14-digit reference number to check eligibility on
              the official PITC portal — registration is free and takes under two minutes.
            </p>
            <ul className="mt-6 grid gap-2 text-sm text-slate-700">
              <li className="flex gap-2"><span aria-hidden className="text-brand-600">✓</span> Free to register</li>
              <li className="flex gap-2"><span aria-hidden className="text-brand-600">✓</span> Official PITC portal (css.pitc.com.pk)</li>
              <li className="flex gap-2"><span aria-hidden className="text-brand-600">✓</span> OTP-verified, no data stored on our side</li>
            </ul>
          </div>
          <div>
            <CrossSubsidyEligibilityForm />
          </div>
        </div>
      </section>

      <article className="container-tight py-12 md:py-16 space-y-12">
        <Section id="what-is" title="What is the Cross Subsidy Program?">
          <p>
            The Cross Subsidy Program — abbreviated <strong>CSS</strong> and administered through
            the <strong>Power Information Technology Company (PITC)</strong> on{" "}
            <span className="font-mono">css.pitc.com.pk</span> — is a Government of Pakistan
            initiative to make sure the protected (lifeline) electricity tariff actually reaches the
            households it was designed for. The way the Pakistan electricity tariff is structured by{" "}
            <strong>NEPRA</strong> (National Electric Power Regulatory Authority), domestic users
            whose monthly consumption stays under a defined threshold — typically up to{" "}
            <strong>200 units</strong> per month — are entitled to a softer per-unit rate than
            households that use more. Without an identity check, however, the protected tariff was
            historically applied to any meter whose recent bills happened to fall under that line —
            including secondary meters of well-off households, vacant plot meters, and short-let
            commercial conversions. CSS uses CNIC and OTP-based occupant verification to make sure
            the subsidy stays inside the homes that need it most.
          </p>
          <p>
            Practically, that means a verified protected consumer pays meaningfully less for the
            same units consumed: the energy-charge slab is lower, the fixed-charge component is
            often waived, and the monthly <strong>FPA</strong> (fuel price adjustment) pass-through
            is frequently softened for protected slabs by NEPRA. For a typical 150-unit-a-month
            household across MEPCO, LESCO, IESCO, FESCO, GEPCO, PESCO, HESCO, SEPCO, QESCO, TESCO,
            and HAZECO, this can translate to a saving of several hundred to several thousand rupees
            on every bill — money that adds up to a full month&rsquo;s groceries over a year.
          </p>
        </Section>

        <Section id="how" title="How does the css.pitc.com.pk flow actually work?">
          <p>
            The PITC portal is intentionally simple — there are <strong>only two pages</strong> the
            consumer actually sees, not four. checkbillsonline.com handles the front of the funnel
            — validating that your reference number is the right shape (10–14 digits) and copying
            it to your clipboard — and then hands you off to the official PITC site for everything
            that involves your CNIC, OTP, and final registration. We do not store, log, or proxy
            any consumer data.
          </p>
          <ol>
            <li>
              <strong>Reference entry on the PITC homepage</strong> — there is a single input field
              on <span className="font-mono">css.pitc.com.pk</span>. You paste your 14-digit
              reference (or the 10-digit consumer number for newer SAP-based meters) and click
              submit. PITC&rsquo;s server runs the eligibility logic instantly — there is no
              dedicated &ldquo;eligibility result&rdquo; page.
            </li>
            <li>
              <strong>Register page shows your owner details</strong> — if the reference is valid
              and eligible, PITC redirects you to{" "}
              <span className="font-mono">https://css.pitc.com.pk/register</span>. This page
              displays your meter owner details (consumer name, father/husband, address, sanctioned
              load, tariff) and contains the occupant CNIC + mobile fields. The registered consumer
              on the meter is often different from the person actually living there — the portal
              explicitly asks for the <strong>current occupant&rsquo;s</strong> CNIC so the subsidy
              is anchored to the household paying the bill.
            </li>
            <li>
              <strong>OTP verification</strong> — clicking Send OTP triggers a one-time password by
              SMS to the mobile you entered. The number must be a PTA biometric-verified SIM in the
              same household&rsquo;s name. The OTP closes the loop between the meter, the CNIC, and
              the mobile.
            </li>
            <li>
              <strong>Done</strong> — your registration is queued for back-end checks by your DISCO
              and PITC. In most cases the protected tariff begins reflecting on your next billing
              cycle. If your six-month rolling consumption is already inside the protected band,
              you should see the lower per-unit rate immediately.
            </li>
          </ol>
          <Callout title="Note">
            <p>
              <span className="font-mono">/check-eligibility</span> is not a page you visit — it is
              just the form-handler URL that the PITC homepage POSTs to. The server immediately
              redirects you to the <span className="font-mono">/register</span> page if your
              reference is eligible, or shows an error on the homepage if it is not.
            </p>
          </Callout>
        </Section>

        <Section id="who" title="Who qualifies (in plain language)">
          <p>
            Cross Subsidy Program eligibility is computed on three intersecting tests. The household
            must satisfy <em>all three</em> for the protected tariff to be applied. For the full
            rule sheet — including tenant scenarios, joint-meter cases, and net-metered solar setups
            — read{" "}
            <Link href={`${CSS_PATH}/who-qualifies`}>who qualifies for CSS</Link>.
          </p>
          <ul>
            <li><strong>Tariff category</strong> — the meter must be on a <em>domestic</em> tariff (not commercial, industrial, agricultural, or bulk supply).</li>
            <li><strong>Six-month rolling average</strong> — your average monthly consumption over the last six months must stay at or below the protected threshold (typically 200 units).</li>
            <li><strong>Single live connection per CNIC</strong> — the same CNIC cannot appear as the registered consumer or verified occupant on more than one live domestic connection in the country.</li>
          </ul>
        </Section>

        <Section id="why" title="Why was the Cross Subsidy Program created?">
          <p>
            Pakistan&rsquo;s electricity tariff has been progressive for decades — the more you
            consume, the higher the unit rate climbs. The intent has always been to keep
            electricity affordable for low-income households while letting heavier industrial and
            commercial users pay closer to the cost of generation, transmission, and distribution.
            In practice, however, the slab system was applied automatically based on each
            month&rsquo;s metered units, with no check that the cheaper slab was actually flowing
            to the household it was designed for. The result was leakage: secondary meters in
            wealthy homes (servant quarters, guest annexes), commercial-as-residential conversions,
            and even vacant plot meters all collected protected-slab pricing.
          </p>
          <p>
            CSS closes that leakage by overlaying a <strong>CNIC- and OTP-verified occupant</strong>{" "}
            on top of each domestic meter. Once a meter is registered, the system can trace
            protected status to a verified household head rather than to an anonymous reference
            number. In return for one short registration, the genuine low-usage household keeps the
            soft tariff month after month, with no paperwork, no fee, and no DISCO visit.
          </p>
        </Section>

        <Section id="bills" title="How CSS connects with your monthly bill check">
          <p>
            CSS is most useful when you check your bills regularly so you can see the protected
            tariff being applied. The bill-check pages on this site read the same PITC dataset that
            CSS uses, so once you are registered you can confirm — on every cycle — that the tariff
            line on your bill matches the protected slab. If your bill suddenly shows the
            unprotected rate, that is usually a sign that your six-month rolling average has crept
            above the threshold.
          </p>
          <p>
            Many CSS-registered households use these monthly checks before each summer to plan how
            heavily they can run their air-conditioning without losing protected status. Combine
            this page with each DISCO&rsquo;s bill page (linked below) to build a complete picture
            of your protected slab usage.
          </p>
        </Section>

        <CrossSubsidyClusterBand currentPath={CSS_PATH} />

        <Section id="discos" title="Cross Subsidy Program across all 11 DISCOs">
          <p>
            CSS is a federal program — it runs identically across every <strong>DISCO</strong>{" "}
            (distribution company) that bills through the PITC platform: MEPCO, LESCO, FESCO,
            IESCO, GEPCO, PESCO, HESCO, SEPCO, QESCO, TESCO, and HAZECO. Karachi consumers
            (K-Electric) follow a separate, similar mechanism not handled by PITC. Use the
            reference-number lookup at the top of this page no matter which DISCO bills your
            connection — the portal autodetects your DISCO from the reference. Once registered,
            cross-link to your specific DISCO&rsquo;s regular monthly bill check page for the
            official duplicate:
          </p>
          <ul>
            <li><Link href="/pakistan/mepco-bill-check">MEPCO bill check</Link></li>
            <li><Link href="/pakistan/lesco-bill-check">LESCO bill check</Link></li>
            <li><Link href="/pakistan/k-electric-bill-check">K-Electric bill check (separate Karachi program)</Link></li>
            <li><Link href="/pakistan/electricity-bill-check">All Pakistan electricity providers</Link></li>
          </ul>
        </Section>

        <Section id="safety" title="Is the eligibility lookup safe?">
          <p>
            Yes. checkbillsonline.com does not see, store, or transmit any of your data. The form on
            this page validates the reference shape locally, copies it to your clipboard, and opens
            the official <span className="font-mono">css.pitc.com.pk</span> homepage in a new
            browser tab. Your CNIC and mobile are typed only on the official PITC screen. We never
            ask you to pay; neither does PITC. If anyone calls or messages you offering to
            &ldquo;fast-track&rdquo; your CSS registration for a fee, it is a scam — report it via
            our <Link href="/contact">contact page</Link>.
          </p>
        </Section>

        <FaqAccordion items={CSS_FAQ_LANDING} />
      </article>
    </>
  );
}
