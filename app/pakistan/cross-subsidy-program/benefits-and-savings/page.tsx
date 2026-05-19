import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { CrossSubsidyEligibilityForm } from "@/components/CrossSubsidyEligibilityForm";
import { CrossSubsidyClusterBand } from "@/components/CrossSubsidyClusterBand";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Section } from "@/components/Section";
import { ArticleJsonLd, WebPageJsonLd } from "@/lib/seo/jsonLd";
import { buildMetadata } from "@/lib/seo/metadata";
import { CSS_FAQ_BENEFITS, CSS_KEYWORDS, CSS_PATH } from "@/lib/content/pakistan/cross-subsidy";

const PATH = `${CSS_PATH}/benefits-and-savings`;
const PAGE_TITLE = "Benefits & Savings — Cross Subsidy Program (Pakistan Protected Tariff)";
const PAGE_DESC =
  "How much can you save under Pakistan's Cross Subsidy Program? Protected vs unprotected tariff impact, per-unit rate differences, FPA softening, and bill-line analysis for typical 100, 150, and 200-unit households.";
const LAST_REVIEWED = "2026-05-19";

export const metadata: Metadata = buildMetadata({
  path: PATH,
  title: PAGE_TITLE,
  description: PAGE_DESC,
  keywords: CSS_KEYWORDS.benefits,
  publishedTime: LAST_REVIEWED,
  modifiedTime: LAST_REVIEWED,
  author: "CheckBillsOnline Editorial",
});

const BREADCRUMB = [
  { name: "Home", href: "/" },
  { name: "Pakistan", href: "/pakistan" },
  { name: "Cross Subsidy Program", href: CSS_PATH },
  { name: "Benefits & savings", href: PATH },
];

export default function CrossSubsidyBenefitsPage() {
  return (
    <>
      <WebPageJsonLd url={PATH} name={PAGE_TITLE} description={PAGE_DESC} breadcrumb={BREADCRUMB} datePublished={LAST_REVIEWED} dateModified={LAST_REVIEWED} />
      <ArticleJsonLd url={PATH} headline={PAGE_TITLE} description={PAGE_DESC} datePublished={LAST_REVIEWED} dateModified={LAST_REVIEWED} authorName="CheckBillsOnline Editorial" authorUrl="/authors/editorial" />

      <div className="container-wide pt-6"><Breadcrumb items={BREADCRUMB} /></div>

      <section className="bg-gradient-to-b from-brand-50 via-white to-white border-b border-slate-200">
        <div className="container-wide py-12 md:py-16 grid gap-10 md:grid-cols-2 items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Savings &amp; Impact</p>
            <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
              How much do you save with Cross Subsidy?
            </h1>
            <p className="mt-4 text-lg text-slate-700">
              The protected tariff is meaningfully cheaper per unit, the fixed-charge component is
              often waived, and the FPA pass-through is softened. For a typical 150-unit household
              in MEPCO/LESCO/IESCO territory, monthly savings commonly land in the Rs 1,500-Rs 3,000
              range. Below is the math for three common household profiles.
            </p>
          </div>
          <div>
            <CrossSubsidyEligibilityForm compact />
          </div>
        </div>
      </section>

      <article className="container-tight py-12 md:py-16 space-y-12">
        <Section id="anatomy" title="Anatomy of the savings — three line items move">
          <p>The Cross Subsidy Program changes three lines on your bill:</p>
          <ol>
            <li>
              <strong>Energy charge</strong> — biggest delta. Protected slabs typically run several
              rupees per unit lower than the equivalent unprotected slabs. The exact rates are
              notified by NEPRA from time to time and printed on every bill under the tariff-code
              row.
            </li>
            <li>
              <strong>Fixed charge</strong> — often waived or reduced for protected consumers,
              depending on the latest NEPRA notification.
            </li>
            <li>
              <strong>FPA (Fuel Price Adjustment)</strong> — the monthly fuel pass-through is
              sometimes reduced or eliminated for protected slabs depending on NEPRA&rsquo;s
              monthly notification. Some months the protected FPA is fully waived; other months
              it is at a lower per-unit rate than the unprotected.
            </li>
          </ol>
          <p>
            Statutory components — <strong>GST</strong>, <strong>TV fee</strong>,{" "}
            <strong>financial cost (FC) surcharge</strong>, <strong>meter rent</strong> — are
            largely unaffected because they are fixed amounts or percentages independent of slab.
            What changes is the base on which those percentages are calculated, so GST does drop
            proportionally with the energy charge.
          </p>
        </Section>

        <Section id="profiles" title="Three sample households — what changes on the bill">
          <h3>Profile A: 80 units/month (1-100 slab)</h3>
          <p>
            A small flat with a fridge, fans, lights, and occasional TV use. Annual electricity
            spend before CSS is typically Rs 6,000-9,000. After CSS, the per-unit energy charge
            drops to the lowest protected rate, fixed charge is waived, and the FPA may be fully
            zero for the protected slab. Annual savings commonly Rs 1,500-3,500.
          </p>

          <h3>Profile B: 150 units/month (101-200 slab)</h3>
          <p>
            A modest household with one AC used 2-3 hours/day in summer, a fridge, washing machine
            run twice a week, and standard lighting/fans. Annual spend before CSS is typically Rs
            15,000-25,000. After CSS, the protected slab cuts the per-unit rate, and the protected
            FPA discount kicks in on every cycle. Annual savings commonly Rs 8,000-18,000.
          </p>

          <h3>Profile C: 190 units/month (top of the protected band)</h3>
          <p>
            A larger family with one or two ACs, multiple fridges, and a water pump on a borehole.
            Sitting at the top of the protected band is the riskiest spot — a single 250-unit month
            pulls the average just enough to lose protection for the next cycle. Annual savings
            when you stay protected are similar to Profile B, but the protection is fragile.
          </p>

          <p className="text-sm text-slate-600 mt-4">
            Exact PKR savings depend on the current NEPRA tariff schedule, your DISCO, and the
            month&rsquo;s FPA notification. Use your last paid bill and the NEPRA tariff schedule
            to compute exact savings for your case.
          </p>
        </Section>

        <Section id="lose-protection" title="What happens if you lose protection?">
          <p>
            Losing protection is not permanent — it pauses until your rolling six-month average
            returns to the protected band. The mechanics:
          </p>
          <ul>
            <li>The system re-evaluates the rolling average on every billing cycle.</li>
            <li>If your average exits the protected band, the very next bill prices every unit at the unprotected rate.</li>
            <li>If your average returns to the protected band, the very next bill prices at the protected rate again. There is no fresh registration needed.</li>
          </ul>
          <p>
            Practical implication: a single hot month with all ACs running 12 hours/day can push a
            150-unit household to 280 units, but the rolling average barely moves (one 280-unit
            month among five 150-unit months is an average of 171 — still inside protection). Two
            consecutive 280-unit months push the average to 215 — over the threshold — and you
            lose protection for at least one cycle.
          </p>
        </Section>

        <Section id="relief-packages" title="Stacking with government relief packages">
          <p>
            Relief packages announced for specific months (Ramazan relief, winter relief,
            IMF-conditional reliefs, election-period subsidies) are typically additive to the CSS
            subsidy unless the notification explicitly excludes one. The bill shows each relief on
            its own adjustment line so you can see what was applied that month.
          </p>
          <p>
            One important caveat: some reliefs are means-tested in their own right (BISP-linked,
            for example), so CSS-registered households who do not separately qualify for those
            reliefs will see only the CSS effect on their bill. Conversely, BISP-linked relief
            recipients who are not CSS-registered miss out on the structural protected-slab
            savings every month — both registrations are worth pursuing.
          </p>
        </Section>

        <Section id="non-savings-benefits" title="Non-cash benefits of being on CSS">
          <ul>
            <li><strong>Stable tariff</strong> — protected slab rates are revised less aggressively than unprotected slabs in NEPRA tariff orders.</li>
            <li><strong>Softer FPA</strong> — when fuel prices spike, protected consumers absorb a smaller share of the pass-through.</li>
            <li><strong>Identity-verified record</strong> — your meter is now associated with a verified occupant CNIC, which simplifies any future name change, inheritance, or transfer.</li>
            <li><strong>Future welfare alignment</strong> — government welfare-linked tariffs (announced periodically) tend to use the same CSS database for identifying recipients.</li>
          </ul>
        </Section>

        <CrossSubsidyClusterBand currentPath={PATH} />

        <FaqAccordion items={CSS_FAQ_BENEFITS} />

        <p className="text-sm text-slate-600">
          Ready to start? Run the eligibility check at the top of this page, or jump to{" "}
          <Link href={`${CSS_PATH}/how-to-register`}>how to register</Link> for the full
          step-by-step.
        </p>
      </article>
    </>
  );
}
