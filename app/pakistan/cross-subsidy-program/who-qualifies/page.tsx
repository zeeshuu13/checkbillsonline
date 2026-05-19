import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CrossSubsidyEligibilityForm } from "@/components/CrossSubsidyEligibilityForm";
import { CrossSubsidyClusterBand } from "@/components/CrossSubsidyClusterBand";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Section } from "@/components/Section";
import { ArticleJsonLd, WebPageJsonLd } from "@/lib/seo/jsonLd";
import { buildMetadata } from "@/lib/seo/metadata";
import { CSS_FAQ_WHO_QUALIFIES, CSS_KEYWORDS, CSS_PATH } from "@/lib/content/pakistan/cross-subsidy";

const PATH = `${CSS_PATH}/who-qualifies`;
const PAGE_TITLE = "Who Qualifies — Cross Subsidy Program (Pakistan Protected Tariff)";
const PAGE_DESC =
  "Detailed eligibility rules for Pakistan's Cross Subsidy Program: protected-slab cut-offs, six-month rolling average, tenant and joint-meter scenarios, solar net-metering, and CNIC consolidation rules.";
const LAST_REVIEWED = "2026-05-19";

export const metadata: Metadata = buildMetadata({
  path: PATH,
  title: PAGE_TITLE,
  description: PAGE_DESC,
  keywords: CSS_KEYWORDS.whoQualifies,
  publishedTime: LAST_REVIEWED,
  modifiedTime: LAST_REVIEWED,
  author: "CheckBillsOnline Editorial",
});

const BREADCRUMB = [
  { name: "Home", href: "/" },
  { name: "Pakistan", href: "/pakistan" },
  { name: "Cross Subsidy Program", href: CSS_PATH },
  { name: "Who qualifies", href: PATH },
];

export default function CrossSubsidyWhoQualifiesPage() {
  return (
    <>
      <WebPageJsonLd url={PATH} name={PAGE_TITLE} description={PAGE_DESC} breadcrumb={BREADCRUMB} datePublished={LAST_REVIEWED} dateModified={LAST_REVIEWED} />
      <ArticleJsonLd url={PATH} headline={PAGE_TITLE} description={PAGE_DESC} datePublished={LAST_REVIEWED} dateModified={LAST_REVIEWED} authorName="CheckBillsOnline Editorial" authorUrl="/authors/editorial" />

      <div className="container-wide pt-6"><Breadcrumb items={BREADCRUMB} /></div>

      <section className="bg-gradient-to-b from-brand-50 via-white to-white border-b border-slate-200">
        <div className="container-wide py-12 md:py-16 grid gap-10 md:grid-cols-2 items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Eligibility Rules</p>
            <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
              Who qualifies for the Cross Subsidy Program?
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              Protected-tariff eligibility comes down to three intersecting rules: tariff category,
              rolling six-month average, and one-occupant-one-meter via CNIC. Below is the full rule
              sheet including tenants, joint meters, and solar net-metered households — with the
              checkpoints PITC actually verifies.
            </p>
          </div>
          <div>
            <CrossSubsidyEligibilityForm compact />
          </div>
        </div>
      </section>

      <article className="container-tight py-12 md:py-16 space-y-12">
        <Section id="rule1" title="Rule 1 — Tariff category must be domestic">
          <p>
            The first deterministic check is the tariff class flag in the PITC consumer master.
            Only meters classified under the <strong>A-1 Residential</strong> tariff family (and a
            handful of explicitly listed sub-categories) are eligible. The exclusions are:
          </p>
          <ul>
            <li><strong>Commercial (A-2)</strong> — shops, restaurants, salons, offices.</li>
            <li><strong>Industrial (B / B-1 / B-2 / B-3 / B-4)</strong> — workshops, mills, factories.</li>
            <li><strong>Agricultural (D)</strong> — tubewells, agricultural pumps.</li>
            <li><strong>Bulk supply (C)</strong> — high-tension consumers.</li>
            <li><strong>Public-lighting and street-light meters</strong>.</li>
          </ul>
          <p>
            If your home runs a small shop on the ground floor with a separate meter, the home
            meter qualifies if its tariff is A-1 and its usage is within the protected band; the
            shop meter never qualifies. If a single A-1 meter is used to also power a small
            commercial activity, you need to consider whether tariff reclassification (and
            disqualification) is a risk.
          </p>
        </Section>

        <Section id="rule2" title="Rule 2 — Six-month rolling average must stay protected">
          <p>
            The protected band has two micro-slabs: <strong>1-100 units/month</strong> and{" "}
            <strong>101-200 units/month</strong>. To qualify, your <em>average</em> over the last
            six billing cycles must stay at or below 200 units. The system uses a rolling window,
            so one heavy month (a relative visiting, a summer AC week) does not by itself remove
            you — but two or three consecutive heavy months will push the average above the
            threshold and the subsidy will pause.
          </p>
          <p>
            The math: take the last six billing cycles, sum the metered units, divide by six.
            Compare the result to 200. If the result is ≤ 200, you qualify on this rule. The PITC
            portal does this calculation in real time when you submit your reference.
          </p>
          <p>
            Useful corollaries: a household at 250 units/month can drop to 100 units/month for
            three months and re-enter the protected band (250 × 3 + 100 × 3 ÷ 6 = 175). A household
            already in protected territory at 150 units/month can absorb one 300-unit month and
            stay protected (150 × 5 + 300 ÷ 6 = 175). Plan summer AC use accordingly.
          </p>
        </Section>

        <Section id="rule3" title="Rule 3 — One occupant, one meter via CNIC">
          <p>
            The third rule closes the historical leakage: a single CNIC cannot be the verified
            occupant of more than one live domestic meter in the country. Households with multiple
            inherited meters in the same CNIC, or families running parallel meters in second
            houses, must pick one for the subsidy. The other remains on the unprotected slab.
          </p>
          <p>
            The rule applies at registration time and at every subsequent eligibility re-check. If
            two close relatives in the same household both register the same meter with different
            CNICs, the second registration will fail because the meter is already occupied.
          </p>
        </Section>

        <Section id="tenants" title="Tenants — the occupant flow exists for you">
          <p>
            One of the most common eligibility questions is: &ldquo;The meter is in my
            landlord&rsquo;s name; can I still claim CSS as the tenant who actually pays the
            bill?&rdquo; Yes — and the occupant flow on the PITC <span className="font-mono">/register</span>{" "}
            page is built specifically for this. The owner panel keeps the landlord&rsquo;s name on
            file; the occupant panel records your CNIC and mobile. The subsidy is anchored to the
            verified occupant, not to the registered owner.
          </p>
          <p>
            What you need: a copy of the lease agreement or any document tying you to the address
            (utility bill, rent receipt). PITC may ask you to upload one if the system flags an
            address mismatch. Do not enter your landlord&rsquo;s CNIC — the OTP will go to their
            mobile, and the registration will be in their name. That defeats the purpose.
          </p>
        </Section>

        <Section id="shared-meters" title="Shared / joint meters">
          <p>
            Joint meters can technically qualify, but only one CNIC can be the registered occupant.
            Multiple families splitting one meter usually exceed the protected average together
            even when each family is individually low-usage, so shared-meter households are the
            most common &ldquo;ineligible&rdquo; case on the portal.
          </p>
          <p>
            The pragmatic fix is to apply for separate meters at the DISCO subdivision. Once each
            family has its own A-1 connection, each can register independently for CSS. Some DISCOs
            offer a streamlined &ldquo;family separation&rdquo; meter application — ask at the
            subdivision counter.
          </p>
        </Section>

        <Section id="solar" title="Solar net-metering households">
          <p>
            Solar net-metering changes how the units on your bill are calculated (imports minus
            exports). If your <em>net</em> billed units stay under 200/month, you qualify on the
            usage rule. However, most net-metered homes have a sanctioned load above the 1 kW
            ceiling that the protected slab implicitly assumes, which can independently disqualify
            them under DISCO load-class rules.
          </p>
          <p>
            The eligibility tool at css.pitc.com.pk is the authoritative test — use it to confirm
            whether your specific solar + load configuration qualifies. If you are about to install
            solar and want to retain CSS eligibility, ask your installer to size the system around
            your annual consumption rather than around export ambition.
          </p>
        </Section>

        <Section id="common-disqualifications" title="The five most common disqualifications">
          <ul>
            <li><strong>Usage drift</strong> — 6-month average crept above 200/month (over half of all rejections).</li>
            <li><strong>Multiple connections per CNIC</strong> — inherited or duplicate meters not consolidated.</li>
            <li><strong>Non-domestic tariff</strong> — meter quietly reclassified after a commercial activity.</li>
            <li><strong>Permanently disconnected</strong> — old meter still in the master; new connection needed.</li>
            <li><strong>Owner name mismatch</strong> — DISCO record not updated after inheritance, sale, or rent.</li>
          </ul>
        </Section>

        <CrossSubsidyClusterBand currentPath={PATH} />

        <FaqAccordion items={CSS_FAQ_WHO_QUALIFIES} />

        <p className="text-sm text-slate-600">
          Continue with{" "}
          <Link href={`${CSS_PATH}/how-to-register`}>how to register</Link> if your eligibility
          passes, or{" "}
          <Link href={`${CSS_PATH}/benefits-and-savings`}>benefits &amp; savings</Link> to estimate
          what the protected tariff would shave off your bill.
        </p>
      </article>
    </>
  );
}
