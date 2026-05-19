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
import { CSS_FAQ_REGISTER, CSS_KEYWORDS, CSS_PATH } from "@/lib/content/pakistan/cross-subsidy";

const PATH = `${CSS_PATH}/how-to-register`;
const PAGE_TITLE = "How to Register on CSS (css.pitc.com.pk) — Step-by-Step Guide";
const PAGE_DESC =
  "Step-by-step walkthrough of the Cross Subsidy Program registration flow on css.pitc.com.pk: verify reference number, confirm owner details, enter CNIC and mobile, verify OTP, and confirm the subsidy on your next bill.";
const LAST_REVIEWED = "2026-05-19";

export const metadata: Metadata = buildMetadata({
  path: PATH,
  title: PAGE_TITLE,
  description: PAGE_DESC,
  keywords: CSS_KEYWORDS.howToRegister,
  publishedTime: LAST_REVIEWED,
  modifiedTime: LAST_REVIEWED,
  author: "CheckBillsOnline Editorial",
});

const BREADCRUMB = [
  { name: "Home", href: "/" },
  { name: "Pakistan", href: "/pakistan" },
  { name: "Cross Subsidy Program", href: CSS_PATH },
  { name: "How to register", href: PATH },
];

export default function CrossSubsidyHowToRegisterPage() {
  return (
    <>
      <WebPageJsonLd url={PATH} name={PAGE_TITLE} description={PAGE_DESC} breadcrumb={BREADCRUMB} datePublished={LAST_REVIEWED} dateModified={LAST_REVIEWED} />
      <ArticleJsonLd url={PATH} headline={PAGE_TITLE} description={PAGE_DESC} datePublished={LAST_REVIEWED} dateModified={LAST_REVIEWED} authorName="CheckBillsOnline Editorial" authorUrl="/authors/editorial" />

      <div className="container-wide pt-6"><Breadcrumb items={BREADCRUMB} /></div>

      <section className="bg-gradient-to-b from-brand-50 via-white to-white border-b border-slate-200">
        <div className="container-wide py-12 md:py-16 grid gap-10 md:grid-cols-2 items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Step-by-step</p>
            <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
              How to register on the Cross Subsidy Program
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Four ordered steps end-to-end: verify reference number, confirm owner details on the
              PITC <span className="font-mono">/register</span> page, enter your CNIC and mobile,
              and verify the OTP that PITC sends by SMS. Total time under two minutes if all
              details are correct.
            </p>
          </div>
          <div>
            <CrossSubsidyEligibilityForm compact />
          </div>
        </div>
      </section>

      <article className="container-tight py-12 md:py-16 space-y-12">
        <Section id="before" title="Before you start — what you need on hand">
          <ul>
            <li>Your <strong>14-digit reference number</strong> (or 10-digit consumer number on SAP zones) from any recent bill.</li>
            <li>Your <strong>CNIC</strong> — the original or a clear photo of the front side.</li>
            <li>A <strong>PTA biometric-verified mobile number</strong> registered in your name or a household member&rsquo;s name, reachable for SMS right now.</li>
            <li>Two minutes of uninterrupted time so the OTP does not expire mid-flow.</li>
          </ul>
          <Callout title="Tip" variant="tip">
            <p>
              Cut and paste your reference number into a notes app first, then strip spaces and
              dashes. The PITC form is strict about format. The eligibility form on this page does
              the cleanup automatically.
            </p>
          </Callout>
        </Section>

        <Section id="step1" title="Step 1 — Verify Reference Number">
          <p>
            Open <span className="font-mono">css.pitc.com.pk</span> (the form on this page does
            this for you in a new tab). On the homepage you will see a single input labelled{" "}
            <em>Reference Number</em>. Paste your 10-14 digit reference and click submit.
          </p>
          <ul>
            <li>If the reference is valid and your meter is eligible, PITC redirects you to <span className="font-mono">/register</span>.</li>
            <li>If something fails, you stay on the homepage with a red error banner. Read the eligibility errors page for fix-it guidance.</li>
          </ul>
        </Section>

        <Section id="step2" title="Step 2 — Confirm Owner Details">
          <p>
            The <span className="font-mono">/register</span> page is a single screen with two
            panels. The top panel — <strong>Owner Details</strong> — is read-only and shows what
            PITC has on record for this connection: reference number, tariff code, consumer name,
            father/husband, address, sanctioned load.
          </p>
          <p>
            Scan it carefully. If anything looks wrong (a previous owner&rsquo;s name, an outdated
            address, the wrong tariff code), stop and visit your DISCO subdivision to fix the
            record first. CSS cannot edit these fields; registering with stale data will create
            problems later when the subsidy is verified.
          </p>
          <p>
            Common reasons for stale owner details: the property was sold but the meter was never
            transferred, an inheritance was not formally registered, or a DISCO data-entry error
            was never corrected. All three are fixable at the subdivision counter with CNIC + a
            recent bill + the relevant property document.
          </p>
        </Section>

        <Section id="step3" title="Step 3 — Enter CNIC and Mobile, request OTP">
          <p>
            The bottom panel — <strong>Occupant Details</strong> — is where you fill in the actual
            person who lives at this address and pays the bill. Two fields:
          </p>
          <ul>
            <li><strong>CNIC</strong> — 13 digits, no dashes. The CNIC must belong to a person who actually resides at the meter address.</li>
            <li><strong>Mobile number</strong> — a PTA biometric-verified SIM. The OTP will be SMSed here within ~30 seconds.</li>
          </ul>
          <p>
            Click <strong>Send OTP to Mobile</strong>. Wait for the SMS. If it does not arrive in
            two minutes, click <strong>Resend OTP</strong>. If it still does not arrive, see the
            troubleshooting section below.
          </p>
        </Section>

        <Section id="step4" title="Step 4 — Verify OTP, registration complete">
          <p>
            Type the 4-6 digit OTP from the SMS into the box and click <strong>Verify</strong>.
            PITC confirms the registration and shows a success screen with a registration ID. Save
            or screenshot this ID — it is your reference if you ever need to follow up with PITC or
            your DISCO.
          </p>
          <p>
            Behind the scenes, PITC queues your registration for back-end checks against the DISCO
            master and the protected-tariff database. The protected tariff begins reflecting on
            your <em>next</em> billing cycle. If your six-month rolling consumption is already
            inside the protected band, the lower per-unit rate appears immediately; if your average
            is right at the boundary, it may take one or two cycles of low consumption before the
            subsidy kicks in.
          </p>
        </Section>

        <Section id="otp-troubleshooting" title="OTP troubleshooting">
          <h3>The OTP never arrives</h3>
          <p>Three usual causes and their fixes:</p>
          <ul>
            <li>
              <strong>SIM is not PTA biometric-verified</strong> — go to a mobile-operator
              franchise with your CNIC to complete biometric verification, then retry.
            </li>
            <li>
              <strong>Number is on Do-Not-Disturb (DND)</strong> — DND blocks transactional SMS.
              Call your operator&rsquo;s helpline to remove DND for service messages.
            </li>
            <li>
              <strong>SMS gateway delay</strong> — wait two minutes, click Resend. If still failing,
              try a different family member&rsquo;s PTA-verified number. <em>Do not</em> use a
              colleague&rsquo;s or friend&rsquo;s number — the OTP legally ties that household to
              the subsidy.
            </li>
          </ul>
          <h3>I entered the wrong OTP</h3>
          <p>
            The form rejects wrong OTPs with a red error. You typically get five attempts before
            the OTP expires; if you exhaust them, click Resend and start fresh.
          </p>
          <h3>The OTP expired</h3>
          <p>
            OTPs expire after ~5 minutes. If you let one expire, click Resend on the same page —
            PITC issues a fresh OTP without rerunning the eligibility check.
          </p>
        </Section>

        <Section id="after" title="After registration — verifying the subsidy">
          <p>
            On your next bill (or the one after), look for the <strong>Tariff Code</strong> field.
            Protected consumers see codes like A-1a(01) or A-1a(02) depending on the slab; non-
            protected consumers see A-1b. The energy-charge line should now show the protected
            per-unit rate (NEPRA-notified), and the fixed-charge component should be lower or zero.
          </p>
          <p>
            If your next bill still shows the non-protected slab, the most likely cause is the
            DISCO bill-cycle cutoff: your DISCO had already locked the bill for that month before
            your registration was queued. Re-check the bill after that — it should now be at the
            protected rate.
          </p>
          <p>
            If the bill after that <em>still</em> shows the wrong tariff code, contact your DISCO
            with the registration ID from the success screen. The most common backend issue is a
            mismatch between the PITC CSS record and the DISCO billing database; the DISCO
            customer-care can manually reconcile.
          </p>
        </Section>

        <CrossSubsidyClusterBand currentPath={PATH} />

        <FaqAccordion items={CSS_FAQ_REGISTER} />
      </article>
    </>
  );
}
