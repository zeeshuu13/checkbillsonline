import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SectionWithImage } from "@/components/SectionWithImage";
import { SITE } from "@/lib/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { WebPageJsonLd } from "@/lib/seo/jsonLd";

export const metadata: Metadata = buildMetadata({
  path: "/about",
  title: "About Check Bills Online — Independent Utility Bill Guides",
  description:
    "Check Bills Online is an independent editorial site covering electricity, gas, and water bill checks across 30 countries — sourced from regulators, not utility marketing.",
});

export default function AboutPage() {
  const breadcrumb = [{ name: "Home", href: "/" }, { name: "About", href: "/about" }];
  return (
    <>
      <WebPageJsonLd url="/about" name="About" description={SITE.description} breadcrumb={breadcrumb} />
      <div className="container-wide pt-6"><Breadcrumb items={breadcrumb} /></div>

      {/* Page header */}
      <div className="container-tight pt-10 pb-2">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
          About {SITE.name}
        </h1>
        <p className="mt-4 text-lg text-slate-600 leading-relaxed max-w-2xl">
          We are an independent editorial team that researches how to check, understand, and pay
          utility bills across 30 countries. We are not affiliated with any utility company, regulator,
          or government body. Our funding comes from display advertising, not commissions on bill payments.
        </p>
      </div>

      <article className="container-tight py-6">

        {/* 1. Mission */}
        <SectionWithImage
          id="our-mission"
          heading="Our mission: make utility bills legible"
          imageQuery="electric power lines sunset"
          flip={false}
        >
          <p>
            The average household utility bill contains between twelve and twenty-two line items depending
            on the country and the operator. Most of those line items are not explained anywhere on the bill
            itself. Regulators publish tariff orders that run to hundreds of pages. Utility operators post
            FAQ pages that answer everything except the question the customer actually has.
          </p>
          <p>
            {SITE.name} exists to close that gap. For every country and operator we cover, we produce a
            plain-English breakdown of every charge on the bill: what it is, how it is calculated, which
            regulator approved it, and where to look if the number seems wrong. We do not soften
            numbers, aggregate payments, or earn a fee when you pay your bill through a third-party
            gateway. The guides are the product.
          </p>
          <p>
            Consumers who understand their bills are better equipped to catch billing errors, dispute
            incorrect charges, choose the right tariff category, and reduce consumption in ways that
            actually move the needle. That is the outcome we are optimising for, not page views or
            affiliate conversions.
          </p>
        </SectionWithImage>

        {/* 2. What we cover */}
        <SectionWithImage
          id="what-we-cover"
          heading="What we cover — and why"
          imageQuery="electricity bill statement"
          flip={true}
        >
          <p>
            We currently publish guides for electricity, gas, and water utilities in 30 countries across
            South Asia, Southeast Asia, the Middle East, and Africa. Country selection is driven by two
            factors: consumer demand (measured by search volume and reader feedback) and data
            availability (we only publish a guide if we can source tariff data directly from a regulator
            or a utility&rsquo;s published tariff schedule).
          </p>
          <p>
            Within each country we cover:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Bill-check guides</strong> &mdash; step-by-step instructions for checking the latest
              bill on the operator&rsquo;s official portal or app, including screenshots of the key screens.
            </li>
            <li>
              <strong>Bill anatomy</strong> &mdash; a line-by-line explanation of every charge,
              including fixed charges, energy charges, taxes, surcharges, and subsidies.
            </li>
            <li>
              <strong>Current tariff slabs</strong> &mdash; the approved rate schedule, presented as a
              searchable table with the source order and effective date cited.
            </li>
            <li>
              <strong>Payment methods</strong> &mdash; every accepted payment channel, with applicable
              fees, settlement times, and failure rates where data is available.
            </li>
            <li>
              <strong>Complaint escalation</strong> &mdash; the full complaint chain, from operator
              customer service through to the national regulator&rsquo;s consumer division, with statutory
              turnaround periods.
            </li>
          </ul>
        </SectionWithImage>

        {/* 3. Our editorial team */}
        <SectionWithImage
          id="our-team"
          heading="Our editorial team"
          imageQuery="electric grid transformer"
          flip={false}
        >
          <p>
            Our team consists of energy and utilities journalists, consumer-affairs researchers, and
            regulatory analysts spread across the countries we cover. No guide is published without
            a named editor who holds responsibility for its accuracy. The editor&rsquo;s name, the date of
            their most recent review, and the primary sources they used appear at the bottom of every
            guide.
          </p>
          <p>
            We maintain a network of in-country correspondents who monitor regulator websites and utility
            portals for tariff changes, new consumer protection rules, and portal redesigns that would
            make our step-by-step screenshots out of date. When a change is detected, the affected guide
            enters our review queue within 24 hours and is republished with a new date within five
            working days.
          </p>
          <p>
            We do not publish AI-generated content without human review and verification. Language-model
            tools are used for drafting and consistency checks, not as a substitute for primary-source
            research. Every tariff figure and regulatory citation is checked by a human editor before
            publication.
          </p>
        </SectionWithImage>

        {/* 4. Data sources and methodology */}
        <SectionWithImage
          id="data-sources"
          heading="Data sources and methodology"
          imageQuery="electric grid transformer"
          flip={true}
        >
          <p>
            Every tariff number on this site is sourced from one of three primary sources:
          </p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              The utility operator&rsquo;s published tariff schedule (usually a PDF or web table linked from
              the operator&rsquo;s official website or the national regulator&rsquo;s website).
            </li>
            <li>
              A formal tariff determination or consumer tariff order issued by the relevant national
              regulator and available in a public document register.
            </li>
            <li>
              A gazette notification published by the relevant government ministry, where the tariff
              has statutory force.
            </li>
          </ol>
          <p>
            We do not accept tariff data from utility press releases, news articles, or consumer forums.
            If the only available source is a press release, we note that and link to the underlying
            regulator order once it is published.
          </p>
          <p>
            Tariffs change. We add an effective date to every tariff table and flag when a revision is
            in the tariff determination pipeline. If you see a discrepancy between our table and your
            actual bill, please contact us &mdash; we act on corrections within 48 hours.
          </p>
        </SectionWithImage>

        {/* 5. How we work */}
        <SectionWithImage
          id="how-we-work"
          heading="How we work: the guide production process"
          imageQuery="electric grid transformer"
          flip={false}
        >
          <p>
            Every guide on {SITE.name} goes through the same production process before publication:
          </p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              <strong>Primary source collection.</strong> The assigning editor identifies the official
              regulator, the operator&rsquo;s current tariff schedule, and the official portal or app used for
              bill checking.
            </li>
            <li>
              <strong>Tariff extraction.</strong> The tariff researcher extracts the current slab rates,
              fixed charges, taxes, and any applicable subsidies from the primary source documents.
            </li>
            <li>
              <strong>Guide drafting.</strong> The writer produces the guide using a structured template
              that ensures every section is present and every tariff claim is cite-tagged.
            </li>
            <li>
              <strong>Editorial review.</strong> The assigning editor checks that every cite-tag resolves
              to a genuine primary source, verifies the portal screenshots, and confirms that the
              complaint contact details work.
            </li>
            <li>
              <strong>Publication and monitoring.</strong> The guide is published with the editor&rsquo;s byline
              and review date. The in-country correspondent is set to monitor the relevant regulator and
              operator feeds for changes.
            </li>
          </ol>
        </SectionWithImage>

        {/* 6. Editorial standards */}
        <SectionWithImage
          id="editorial-standards"
          heading="Our editorial standards"
          imageQuery="electric grid transformer"
          flip={true}
        >
          <p>
            Our editorial standards are modelled on those of trade publications in the energy and
            consumer-affairs space. The key rules are:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>No undisclosed commercial relationships.</strong> We accept no payment from utility
              operators, comparison platforms, or payment processors in exchange for editorial coverage.
              If a guide is sponsored, it is labelled as such and the sponsor has no input into the content.
            </li>
            <li>
              <strong>Corrections policy.</strong> Factual errors are corrected within 48 hours of
              notification. The correction is noted at the bottom of the page with the date it was made.
              We do not silently delete or alter content.
            </li>
            <li>
              <strong>No data retention.</strong> The bill-check forms on this site either redirect to
              the official operator portal or make a real-time API call that does not persist any
              personally identifiable information to our servers. We do not store bill reference numbers,
              connection IDs, or usage data.
            </li>
            <li>
              <strong>Transparency on limitations.</strong> Where we cannot verify a piece of information,
              we say so explicitly rather than publishing an unverified claim. Where a tariff is under
              review, we note that the published figure may change.
            </li>
          </ul>
          <p>
            If you believe a page on this site violates these standards, please contact us with the
            specific claim and your evidence. We take editorial complaints seriously and will respond
            within two working days.
          </p>
        </SectionWithImage>

        {/* 7. Coverage roadmap */}
        <SectionWithImage
          id="coverage-roadmap"
          heading="Countries we cover and our expansion roadmap"
          imageQuery="electric power lines sunset"
          flip={false}
        >
          <p>
            We currently publish guides for 30 countries. Our active expansion roadmap includes an
            additional 15 countries across Sub-Saharan Africa and Latin America, where electricity
            bill checking is underserved by English-language consumer resources despite high consumer
            demand.
          </p>
          <p>
            Adding a new country to our coverage takes between six and twelve weeks: four to six weeks
            for primary-source research and tariff extraction, two weeks for guide drafting and editorial
            review, and one week for portal testing. We prioritise countries where:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Regulator websites publish tariff orders in English or a widely accessible language.</li>
            <li>The operator&rsquo;s bill-check portal is functional and stable enough to screenshot reliably.</li>
            <li>We can identify an in-country correspondent to handle ongoing monitoring.</li>
          </ul>
          <p>
            If you would like to suggest a country, or if you are a researcher or journalist based in
            a country not currently covered and are interested in contributing, we would like to hear
            from you. Email us at{" "}
            <a href={`mailto:${SITE.contactEmail}`} className="text-brand-700 underline">
              {SITE.contactEmail}
            </a>
            .
          </p>
        </SectionWithImage>

        {/* 8. Get in touch */}
        <SectionWithImage
          id="contact-cta"
          heading="Get in touch"
          imageQuery="electricity bill statement"
          flip={true}
        >
          <p>
            We read every email we receive, though response times vary by type:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Factual corrections</strong> &mdash; we act within 48 hours. Please include the page URL,
              the specific claim, and your source. Email:{" "}
              <a href={`mailto:${SITE.contactEmail}?subject=Correction`} className="text-brand-700 underline">
                {SITE.contactEmail}
              </a>
            </li>
            <li>
              <strong>New country suggestions</strong> &mdash; we log every suggestion and use the list to
              prioritise our expansion roadmap.
            </li>
            <li>
              <strong>Partnership and advertising</strong> &mdash; we accept display advertising that does
              not compromise editorial independence. We do not accept affiliate arrangements with utility
              operators or payment processors.
            </li>
            <li>
              <strong>Press and research</strong> &mdash; journalists and academic researchers are welcome
              to request data on a specific country or operator. We will share what we can within our
              editorial guidelines.
            </li>
          </ul>
          <p>
            For all enquiries:{" "}
            <a href={`mailto:${SITE.contactEmail}`} className="text-brand-700 underline font-medium">
              {SITE.contactEmail}
            </a>
            . You can also use our{" "}
            <Link href="/contact" className="text-brand-700 underline">
              contact page
            </Link>{" "}
            for structured enquiry types.
          </p>
        </SectionWithImage>

      </article>
    </>
  );
}
