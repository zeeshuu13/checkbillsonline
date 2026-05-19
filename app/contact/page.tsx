import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SectionWithImage } from "@/components/SectionWithImage";
import { SITE } from "@/lib/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { WebPageJsonLd } from "@/lib/seo/jsonLd";

export const metadata: Metadata = buildMetadata({
  path: "/contact",
  title: "Contact Check Bills Online — Corrections, Partnerships, and Press",
  description:
    "Contact the Check Bills Online editorial team to report a factual error, suggest a new country, or discuss partnership and advertising opportunities.",
});

export default function ContactPage() {
  const breadcrumb = [{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }];
  return (
    <>
      <WebPageJsonLd
        url="/contact"
        name="Contact"
        description="Contact the Check Bills Online editorial team to report a factual error, suggest a new country, or discuss partnership and advertising opportunities."
        breadcrumb={breadcrumb}
      />
      <div className="container-wide pt-6"><Breadcrumb items={breadcrumb} /></div>

      {/* Page header */}
      <div className="container-tight pt-10 pb-2">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
          Contact us
        </h1>
        <p className="mt-4 text-lg text-slate-600 leading-relaxed max-w-2xl">
          We are a small editorial team. We read every message, and we reply to every genuine enquiry
          &mdash; though response times depend on the type of request. Read the sections below to find the
          fastest route to the right person.
        </p>
      </div>

      <article className="container-tight py-6">

        {/* 1. Corrections */}
        <SectionWithImage
          id="corrections"
          heading="Reporting a factual error"
          imageQuery="electricity bill statement"
          flip={false}
        >
          <p>
            Utility tariffs change frequently. If you have spotted an out-of-date tariff number, a wrong
            contact phone number, a broken link to an official portal, or any other factual inaccuracy,
            please contact us immediately. We treat corrections as the highest-priority class of enquiry
            and aim to investigate within 24 hours and publish a correction within 48 hours.
          </p>
          <p>
            To help us act quickly, please include:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>The URL of the page containing the error.</li>
            <li>The specific claim that is incorrect (quote it directly if possible).</li>
            <li>Your source &mdash; a link to the regulator order, the operator&rsquo;s tariff schedule, or
              another primary source that shows the correct figure.</li>
          </ul>
          <p>
            Email for corrections:{" "}
            <a
              href={`mailto:${SITE.contactEmail}?subject=Correction`}
              className="text-brand-700 underline font-medium"
            >
              {SITE.contactEmail}
            </a>
            {" "}(subject line: Correction).
          </p>
          <p>
            Once a correction is published, we add a dated note at the bottom of the affected page.
            We do not silently alter content. If the error originated in a third-party data source we
            cited, we update the citation as well.
          </p>
        </SectionWithImage>

        {/* 2. Country suggestions */}
        <SectionWithImage
          id="new-country"
          heading="Suggesting a new country or utility provider"
          imageQuery="electric power lines sunset"
          flip={true}
        >
          <p>
            Our expansion roadmap is driven partly by reader demand. If you live in or research a country
            not currently covered on this site and believe there is a consumer need for independent
            bill-check guidance, we want to hear from you.
          </p>
          <p>
            When suggesting a new country, it helps to include:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>The name of the country and the primary electricity or gas regulator.</li>
            <li>A link to the regulator&rsquo;s official website where tariff orders are published.</li>
            <li>The name of the dominant utility operator and a link to their bill-check portal.</li>
            <li>Any sense of how large the consumer audience is (monthly Google search volume for
              &ldquo;check electricity bill [country]&rdquo; is a useful proxy).</li>
          </ul>
          <p>
            If you are an energy journalist, researcher, or consumer-affairs advocate based in a country
            not yet covered and are interested in contributing as an in-country correspondent, please
            mention that too.
          </p>
          <p>
            Email for country suggestions:{" "}
            <a
              href={`mailto:${SITE.contactEmail}?subject=New+country+suggestion`}
              className="text-brand-700 underline font-medium"
            >
              {SITE.contactEmail}
            </a>
            {" "}(subject line: New country suggestion).
          </p>
        </SectionWithImage>

        {/* 3. Partnerships and advertising */}
        <SectionWithImage
          id="partnerships"
          heading="Partnership and advertising enquiries"
          imageQuery="electricity bill statement"
          flip={false}
        >
          <p>
            {SITE.name} accepts display advertising from organisations whose products and services are
            relevant to utility consumers: energy-efficiency products, home appliance retailers,
            financial services providers offering utility payment solutions, and similar categories.
          </p>
          <p>
            We do not accept:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Affiliate arrangements with utility operators or bill-comparison platforms where our
              editorial content would be influenced by which provider is recommended.
            </li>
            <li>
              Sponsored content that presents commercial claims as independent editorial opinion without
              clear labelling.
            </li>
            <li>
              Advertising from payday lenders, unauthorised financial promoters, or organisations that
              target consumers in utility payment difficulty with high-cost credit.
            </li>
          </ul>
          <p>
            All advertising relationships are disclosed on the relevant pages. If you would like to
            discuss a display advertising arrangement, a content partnership, or a data licensing
            arrangement, please email:{" "}
            <a
              href={`mailto:${SITE.contactEmail}?subject=Partnership`}
              className="text-brand-700 underline font-medium"
            >
              {SITE.contactEmail}
            </a>
            {" "}(subject line: Partnership).
          </p>
        </SectionWithImage>

        {/* 4. Press */}
        <SectionWithImage
          id="press"
          heading="Press and research requests"
          imageQuery="electric grid transformer"
          flip={true}
        >
          <p>
            Journalists, academics, and policy researchers are welcome to contact us for background
            data on utility billing practices, tariff trends, or consumer complaint patterns in the
            countries we cover. We share what we can within our editorial guidelines.
          </p>
          <p>
            For press enquiries, please include:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Your publication or institution and a link to your profile page.</li>
            <li>A brief description of the story or research project.</li>
            <li>The specific countries or operators you are researching.</li>
            <li>Your deadline, if you have one.</li>
          </ul>
          <p>
            We typically respond to press enquiries within one working day. For urgent deadline-driven
            requests, please mark your email &ldquo;URGENT&rdquo; in the subject line.
          </p>
          <p>
            Email for press:{" "}
            <a
              href={`mailto:${SITE.contactEmail}?subject=Press`}
              className="text-brand-700 underline font-medium"
            >
              {SITE.contactEmail}
            </a>
            {" "}(subject line: Press).
          </p>
          <p className="text-sm text-slate-500">
            For background on our editorial standards and methodology, see our{" "}
            <Link href="/about" className="text-brand-700 underline">
              About page
            </Link>
            .
          </p>
        </SectionWithImage>

      </article>
    </>
  );
}
