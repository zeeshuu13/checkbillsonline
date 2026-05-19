import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { COUNTRIES, getCountry } from "@/lib/data/countries";
import { providersInCountry } from "@/lib/data/providers";
import { Breadcrumb } from "@/components/Breadcrumb";
import { RemoteImage } from "@/components/RemoteImage";
import { Section } from "@/components/Section";
import { SectionWithImage } from "@/components/SectionWithImage";
import { WebPageJsonLd } from "@/lib/seo/jsonLd";
import { buildMetadata } from "@/lib/seo/metadata";

type Params = { country: string };

export async function generateStaticParams(): Promise<Params[]> {
  return COUNTRIES.map((c) => ({ country: c.slug }));
}

export async function generateMetadata(props: { params: Promise<Params> }): Promise<Metadata> {
  const { country } = await props.params;
  const c = getCountry(country);
  if (!c) return {};
  return buildMetadata({
    path: `/${c.slug}`,
    title: `${c.name} Bill Check — Electricity, Gas & Water Bill Online`,
    description: `Check ${c.name} electricity, gas and water bills online. Provider list, tariff guides, payment methods, and complaint contacts.`,
    keywords: [
      `${c.name} bill check`,
      `${c.name} electricity bill`,
      `${c.name} gas bill`,
      `${c.name} water bill`,
      `pay electricity bill in ${c.name}`,
    ],
  });
}

export default async function CountryHubPage(props: { params: Promise<Params> }) {
  const { country } = await props.params;
  const c = getCountry(country);
  if (!c) notFound();

  const electricity = providersInCountry(c.slug, "electricity");
  const gas = providersInCountry(c.slug, "gas");
  const water = providersInCountry(c.slug, "water");
  const totalProviders = electricity.length + gas.length + water.length;

  const breadcrumb = [
    { name: "Home", href: "/" },
    { name: c.name, href: `/${c.slug}` },
  ];

  return (
    <>
      <WebPageJsonLd
        url={`/${c.slug}`}
        name={`${c.name} bill check`}
        description={c.shortIntro}
        breadcrumb={breadcrumb}
      />
      <div className="container-wide pt-6">
        <Breadcrumb items={breadcrumb} />
      </div>

      {/* Hero */}
      <section className="container-wide py-10 md:py-12">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">{c.region}</p>
        <h1 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
          {c.name} bill check — electricity, gas &amp; water
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-slate-700 leading-relaxed">{c.shortIntro}</p>

        <dl className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl text-sm">
          <div><dt className="text-slate-500">Currency</dt><dd className="font-medium">{c.currency.code} ({c.currency.symbol})</dd></div>
          <div><dt className="text-slate-500">Voltage</dt><dd className="font-medium">{c.voltageStd}</dd></div>
          <div><dt className="text-slate-500">Billing cycle</dt><dd className="font-medium capitalize">{c.billingCycle}</dd></div>
          <div><dt className="text-slate-500">Electrification</dt><dd className="font-medium">{c.electrificationRate}%</dd></div>
        </dl>
      </section>

      {/* Hero image */}
      <div className="container-wide pb-6">
        <RemoteImage
          query={c.heroImageQuery}
          alt={`${c.name} utility infrastructure`}
          className="aspect-[21/9] w-full rounded-xl object-cover"
          sizes="(min-width: 1280px) 1200px, 100vw"
          priority
        />
      </div>

      {/* Utility type hubs */}
      <section aria-labelledby="utility-hubs" className="bg-slate-50 border-y border-slate-200">
        <div className="container-wide py-12">
          <h2 id="utility-hubs" className="text-2xl font-bold tracking-tight">Check by utility type</h2>
          <p className="mt-2 text-slate-600 max-w-2xl">
            {totalProviders > 0
              ? `${totalProviders} provider${totalProviders === 1 ? "" : "s"} listed across electricity, gas, and water for ${c.name}. Select the utility type to see all providers, current tariffs, and payment guides.`
              : `Select a utility type below to see the licensed operators, tariff guides, and payment information for ${c.name}.`}
          </p>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            <li>
              <Link href={`/${c.slug}/electricity-bill-check`} className="block rounded-lg border border-slate-200 bg-white p-5 hover:border-brand-300 hover:shadow-sm no-underline transition-all">
                <span className="text-xs font-semibold uppercase tracking-wide text-brand-700">Electricity</span>
                <h3 className="mt-1 text-lg font-semibold text-slate-900">{c.name} electricity bill</h3>
                <p className="mt-2 text-sm text-slate-600">
                  {electricity.length > 0
                    ? `${electricity.length} provider${electricity.length === 1 ? "" : "s"} — tariff slabs, online check, payment channels.`
                    : "Tariff guides, payment channels, complaint escalation."}
                </p>
                <p className="mt-3 text-xs font-medium text-brand-700">View providers →</p>
              </Link>
            </li>
            <li>
              <Link href={`/${c.slug}/gas-bill-check`} className="block rounded-lg border border-slate-200 bg-white p-5 hover:border-brand-300 hover:shadow-sm no-underline transition-all">
                <span className="text-xs font-semibold uppercase tracking-wide text-brand-700">Gas</span>
                <h3 className="mt-1 text-lg font-semibold text-slate-900">{c.name} gas bill</h3>
                <p className="mt-2 text-sm text-slate-600">
                  {gas.length > 0
                    ? `${gas.length} provider${gas.length === 1 ? "" : "s"} — standing charges, unit rates, payment.`
                    : "Gas tariff guides, payment methods, consumer rights."}
                </p>
                <p className="mt-3 text-xs font-medium text-brand-700">View providers →</p>
              </Link>
            </li>
            <li>
              <Link href={`/${c.slug}/water-bill-check`} className="block rounded-lg border border-slate-200 bg-white p-5 hover:border-brand-300 hover:shadow-sm no-underline transition-all">
                <span className="text-xs font-semibold uppercase tracking-wide text-brand-700">Water</span>
                <h3 className="mt-1 text-lg font-semibold text-slate-900">{c.name} water bill</h3>
                <p className="mt-2 text-sm text-slate-600">
                  {water.length > 0
                    ? `${water.length} provider${water.length === 1 ? "" : "s"} — volumetric rates, sewerage, payment.`
                    : "Water tariff guides, volumetric rates, consumer rights."}
                </p>
                <p className="mt-3 text-xs font-medium text-brand-700">View providers →</p>
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* Pakistan Cross-Subsidy spotlight */}
      {c.slug === "pakistan" && (
        <section aria-labelledby="pk-css-spotlight" className="container-wide py-12">
          <div className="rounded-2xl border border-brand-200 bg-brand-50 p-6 md:p-8 grid gap-6 md:grid-cols-3 items-center">
            <div className="md:col-span-2">
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">
                Government of Pakistan · PITC
              </p>
              <h2 id="pk-css-spotlight" className="mt-2 text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
                Cross Subsidy Program — register your meter for the protected tariff
              </h2>
              <p className="mt-3 text-slate-700">
                Domestic consumers using up to 200 units/month can register on{" "}
                <span className="font-mono">css.pitc.com.pk</span> to receive the protected
                (lifeline) tariff. Check eligibility with your 14-digit reference number — free,
                CNIC + OTP verified, savings begin on your next bill.
              </p>
            </div>
            <div>
              <Link href="/pakistan/cross-subsidy-program" className="inline-flex items-center rounded-md bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-800 no-underline">
                Open Cross Subsidy guide →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Top electricity providers */}
      {electricity.length > 0 && (
        <section className="container-wide py-12">
          <h2 className="text-2xl font-bold tracking-tight">Top {c.name} electricity providers</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {electricity.map((p) => (
              <li key={p.slug}>
                <Link href={`/${c.slug}/${p.routeSlug}`} className="block rounded-lg border border-slate-200 bg-white p-4 hover:border-brand-300 hover:bg-brand-50 no-underline transition-colors">
                  <h3 className="font-semibold text-slate-900">{p.name}</h3>
                  <p className="mt-1 text-sm text-slate-600">{p.serviceAreas.slice(0, 3).join(", ")}{p.serviceAreas.length > 3 ? "…" : ""}</p>
                  {p.customers && <p className="mt-1 text-xs text-slate-500">{p.customers}M customers</p>}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Editorial: Understanding utility bills in this country */}
      <article className="container-tight py-8 md:py-12 space-y-0">
        <SectionWithImage id="how-billing-works" heading={`How utility billing works in ${c.name}`} imageQuery="electric power lines sunset" flip={false}>
          <p>
            Utility billing in {c.name} is overseen by {c.electricityRegulator.name}
            {c.electricityRegulator.shortName ? ` (${c.electricityRegulator.shortName})` : ""} for electricity
            {c.gasRegulator && `, by ${c.gasRegulator.shortName ?? c.gasRegulator.name} for gas`}
            {c.waterRegulator && `, and by ${c.waterRegulator.shortName ?? c.waterRegulator.name} for water`}. Each
            licensed utility operator must apply the tariffs approved by the relevant regulator &mdash; they cannot
            charge more or less than the approved rate without regulatory sanction.
          </p>
          <p>
            {c.name} bills are issued {c.billingCycle === "monthly" ? "every calendar month" : c.billingCycle === "bimonthly" ? "every two months" : "every three months"} and
            are denominated in {c.currency.name} ({c.currency.symbol}). The due date is typically{" "}
            {c.billingCycle === "monthly" ? "14\u201321 days" : c.billingCycle === "bimonthly" ? "21\u201328 days" : "28 days"} after the bill
            date, though it is always printed explicitly on the bill itself. Paying after the due date incurs a
            late-payment surcharge; failing to pay within the disconnection window (usually 15\u201330 days beyond
            the due date) results in supply being cut, which requires a reconnection fee and full settlement of
            the outstanding amount before supply is restored.
          </p>
          <p>
            Consumer protection is enforced through a formal complaints ladder: the operator&rsquo;s own
            customer-service desk is the first stop, followed by an escalation to the relevant regulator&rsquo;s
            consumer-affairs office, which has quasi-judicial authority to issue binding orders against licensed
            operators. This process is free of charge for consumers and no legal representation is required for
            routine billing disputes.
          </p>
        </SectionWithImage>

        <SectionWithImage id="reading-your-bill" heading={`Reading a ${c.name} utility bill — what the line items mean`} imageQuery="electric grid transformer" flip={true}>
          <p>
            Every {c.name} utility bill follows a standard layout regardless of the operator: identifying
            information at the top (account or reference number, registered name, service address, tariff
            category, sanctioned load or connection size, and meter number), consumption details and charges in
            the middle, and statutory levies &mdash; taxes, duties, and surcharges mandated by government &mdash; at the
            bottom.
          </p>
          <p>
            The tariff category printed at the top is the most important field to verify. If a residential
            property is classified as commercial because a previous occupant ran a business from the address,
            you may be paying a higher per-unit rate without realising it. Correcting a tariff category
            misclassification is a standard service request at any operator&rsquo;s customer-service office and
            typically takes 7\u201315 working days.
          </p>
          <p>
            The consumption section shows the previous and current meter readings, the units consumed, and the
            charge at the applicable tariff slab. For electricity, most {c.name} operators use a graduated
            (telescopic) slab: the first block of units is priced at the lowest rate, with each successive block
            at a higher rate. This means a household just above a slab boundary pays a noticeably higher rate
            on every unit above the threshold &mdash; understanding your slab position is the starting point for any
            meaningful bill-reduction effort.
          </p>
          <p>
            Statutory levies at the bottom of the bill are government-mandated taxes and surcharges:
            typically a general sales tax (GST or VAT), a provincial or state-level energy duty, and one or
            more sector-specific financing surcharges. These are expressed as percentages applied on top of
            the energy and fixed charges. The total payable is the sum of all these components, printed as two
            figures &mdash; a within-due-date amount and an after-due-date amount (which includes the late-payment
            surcharge).
          </p>
        </SectionWithImage>

        <SectionWithImage id="online-bill-check" heading={`Checking your ${c.name} bill online \u2014 the fastest methods`} imageQuery="electricity bill statement" flip={false}>
          <p>
            Every licensed utility operator in {c.name} is required to provide an online bill-view facility.
            The simplest path for most customers is this site: click the provider card on the relevant utility
            hub page (electricity, gas, or water), enter your account or reference number, and the form either
            fetches your bill live or opens the official portal pre-filled so the bill loads in one tap.
          </p>
          <p>
            Alternatively, you can go directly to the operator&rsquo;s website or mobile app and use the
            bill-check or quick-pay feature with your reference number. For most {c.name} operators, no login
            or registration is required for a bill view &mdash; the reference number is the only identifier needed.
            You can also check and pay through any major banking app in {c.name} using the domestic bill-pay
            network, where you select the operator from the electricity or utility biller list and enter your
            reference number.
          </p>
          <p>
            If the online lookup fails, the most reliable alternative is calling the operator&rsquo;s helpline
            (the number is printed on every bill and listed on each provider page on this site). For urgent
            documentation needs &mdash; visa applications, bank KYC, rental agreements &mdash; downloading the bill as a
            PDF from the operator&rsquo;s portal is the standard approach; a PDF bill dated within the last
            three months and matching your ID name is accepted by most {c.name} institutions.
          </p>
        </SectionWithImage>

        <SectionWithImage id="regulator" heading={`${c.name}'s utility regulator \u2014 ${c.electricityRegulator.shortName ?? c.electricityRegulator.name}`} imageQuery="electric grid transformer" flip={true}>
          <p>
            {c.electricityRegulator.name}{c.electricityRegulator.shortName ? ` (${c.electricityRegulator.shortName})` : ""} is{" "}
            {c.name}&rsquo;s primary utility regulator. It has statutory authority to approve tariffs, license
            operators, set service-quality standards, and adjudicate consumer complaints. Every tariff rate
            on every {c.name} electricity bill is ultimately set by {c.electricityRegulator.shortName ?? c.electricityRegulator.name} &mdash; the
            operator can only apply the approved rate, not deviate from it.
          </p>
          <p>
            The regulator&rsquo;s consumer-affairs office is the second-tier escalation point for disputes not
            resolved by the operator&rsquo;s own customer service. Filing a complaint with the regulator is
            free, requires no legal representation for routine billing matters, and results in a binding order
            requiring the operator to correct the issue and (where applicable) pay compensation.
          </p>
          <p>
            The regulator&rsquo;s website at{" "}
            <a href={c.electricityRegulator.url} target="_blank" rel="noopener noreferrer" className="text-brand-700 underline">
              {c.electricityRegulator.url}
            </a>{" "}
            publishes every tariff order, every Standards of Performance regulation, and every formal
            consumer-affairs decision. If you want to verify that the rate on your bill matches the approved
            schedule, this is the authoritative source.
          </p>
        </SectionWithImage>

        <SectionWithImage id="consumer-tips" heading={`Tips for ${c.name} utility customers`} imageQuery="electric grid transformer" flip={false}>
          <p>
            The most common source of surprise on a utility bill is not a billing error &mdash; it is seasonal
            variation in consumption that the customer did not notice until the bill arrived. The bill comparison
            section on most {c.name} operator bills (which shows the same cycle last year alongside the current
            cycle) is the first thing to check. A significant jump that does not correspond to a change in
            behaviour or a tariff revision points to either a new appliance, a fault, or a leak (for water bills).
          </p>
          <p>
            Auto-pay (direct debit, NACH mandate, or standing instruction depending on {c.name}&rsquo;s
            banking terminology) is the single most reliable way to avoid late-payment surcharges. Set it up
            once through the operator&rsquo;s portal or your bank&rsquo;s standing-instruction service. The
            main risk &mdash; that it pulls any amount the operator bills, including spikes from errors &mdash; is
            manageable if you glance at the bill notification before the debit date.
          </p>
          <p>
            For consumers on a graduated electricity tariff, understanding your slab position makes the
            difference between a meaningful bill-reduction effort and a futile one. A household sitting 10
            units above a slab boundary saves disproportionately by dropping below it. Read the slab table
            on your bill, locate your position, and work from there.
          </p>
          <p>
            Always keep a file of the last three paid bills. Most {c.name} utilities require a recent paid bill
            for change-of-name applications, reconnection requests, and tariff-category changes. Banks, passport
            offices, and visa authorities accept them as proof of address. The PDF from the operator&rsquo;s
            portal is indistinguishable from the printed bill for official purposes.
          </p>
        </SectionWithImage>

        <footer className="border-t border-slate-200 pt-6 text-sm text-slate-500">
          <p>
            Data sourced from{" "}
            <a href={c.electricityRegulator.url} target="_blank" rel="noopener noreferrer" className="text-brand-700 underline">
              {c.electricityRegulator.name}
            </a>
            {c.gasRegulator && (
              <>{" "}and{" "}<a href={c.gasRegulator.url} target="_blank" rel="noopener noreferrer" className="text-brand-700 underline">{c.gasRegulator.name}</a></>
            )}
            . Population: approximately {c.population}M. Last reviewed: May 2026.
          </p>
        </footer>
      </article>
    </>
  );
}


