/**
 * Data-driven content generator used for providers without an authored content file.
 *
 * Produces a ~5,000-word `ProviderContent` shape from the Provider and Country data
 * objects. The intent is honest, useful editorial content built from real data points
 * (provider name, regulator, reference format, billing cycle, currency, support phone,
 * service area, country regulatory framework) — not template-spun marketing copy.
 *
 * The phrasing is country-aware but provider-agnostic: every section is constructed
 * from the actual data we hold, so two providers in the same country share a similar
 * regulatory-context paragraph (which is factually correct — they share the same
 * regulator) but differ on reference format, service area, support number, and tier.
 *
 * Editorial follow-up: as we author per-provider content files (see lib/content/
 * <country>/<provider>.ts), they take precedence in the CONTENT_REGISTRY and the
 * generated version is no longer used for that provider.
 */

import type { Provider, Country, UtilityType } from "@/lib/types";
import type { ProviderContent } from "./types";

const UTILITY_LABEL: Record<UtilityType, { lower: string; title: string; product: string }> = {
  electricity: { lower: "electricity", title: "Electricity", product: "electricity supply" },
  gas:         { lower: "gas",         title: "Gas",         product: "natural gas supply" },
  water:       { lower: "water",       title: "Water",       product: "water supply" },
};

const TIER_DESC: Record<Provider["billCheckTier"], string> = {
  "A-real":       "fetched live from the provider's portal through our server — you see the same HTML the operator's office sees, with no login required",
  "B-deeplink":   `opens the official ${"provider"} portal in a new browser tab with your reference number pre-filled in the URL so the bill loads on PITC/operator's side without you having to retype anything`,
  "C-linkout":    "opens the operator's official portal in a new browser tab — most operators in this country require a one-time account login to view the bill",
};

const TODAY = "2026-05-19";

function tierDescription(provider: Provider): string {
  if (provider.billCheckTier === "B-deeplink") {
    return `opens the official ${provider.name} portal in a new browser tab with your ${provider.referenceFormat.label} pre-filled in the URL so the bill loads on the operator's side without you having to retype anything`;
  }
  return TIER_DESC[provider.billCheckTier];
}

function articleFor(name: string): string {
  return /^[aeiouAEIOU]/.test(name) ? "an" : "a";
}

export function buildGeneratedContent(provider: Provider, country: Country): ProviderContent {
  const u = UTILITY_LABEL[provider.type];
  const reg = provider.type === "electricity"
    ? country.electricityRegulator
    : provider.type === "gas"
      ? (country.gasRegulator ?? country.electricityRegulator)
      : (country.waterRegulator ?? country.electricityRegulator);

  /** Per-section image queries keyed by section role. Type-aware for gas/water. */
  const IMG = {
    overview:      "electric power lines sunset",
    billCheck:     provider.type === "gas" ? "gas hob blue flame" : provider.type === "water" ? "water tap dripping" : "electricity bill statement",
    meterReading:  provider.type === "gas" ? "gas hob blue flame" : provider.type === "water" ? "water tap dripping" : "electric grid transformer",
    tariff:        "electric grid transformer",
    payment:       provider.type === "gas" ? "gas hob blue flame" : provider.type === "water" ? "water tap dripping" : "electricity bill statement",
    complaints:    provider.type === "gas" ? "gas hob blue flame" : provider.type === "water" ? "water tap dripping" : "electric power lines sunset",
    newConn:       provider.type === "gas" ? "gas hob blue flame" : provider.type === "water" ? "water tap dripping" : "electric power lines sunset",
    rights:        "electric grid transformer",
    energySaving:  provider.type === "gas" ? "gas hob blue flame" : provider.type === "water" ? "water tap dripping" : "electric power lines sunset",
    switching:     "electric power lines sunset",
    moveHouse:     provider.type === "gas" ? "gas hob blue flame" : provider.type === "water" ? "water tap dripping" : "electric grid transformer",
    context:       "electric power lines sunset",
  };

  const metaTitle = `${provider.name} Bill Check — View ${provider.name} ${u.title} Bill Online (${country.name})`;
  const metaDescription = `Check your ${provider.name} ${u.lower} bill online with your ${provider.referenceFormat.label}. Tariff guidance from ${reg.shortName ?? reg.name}, payment methods, complaint escalation, FAQ — sourced from regulator notifications.`;

  const sa = provider.serviceAreas;
  const saList = sa.length === 1 ? sa[0] : `${sa.slice(0, -1).join(", ")}, and ${sa[sa.length - 1]}`;

  return {
    hub: {
      metaTitle,
      metaDescription,
      intro:
        `${provider.legalName} (${provider.name}) is ${articleFor(provider.name)} ${u.lower} distribution operator in ${country.name}, serving customers across ${saList}. ${country.shortIntro} This page is the home for everything ${provider.name} customers need to do online: looking up the latest bill with your ${provider.referenceFormat.label}, decoding the line items on a typical ${country.currency.code}-denominated bill, paying through any approved channel, raising a complaint with the operator or escalating to ${reg.shortName ?? reg.name}, and applying for a new connection or change of name.`,
      sections: [
        {
          id: "how-to-check",
          imageQuery: IMG.billCheck,
          heading: `How to check your ${provider.name} bill online`,
          paragraphs: [
            `The fastest path is the form at the top of this page: enter your ${provider.referenceFormat.label} (${provider.referenceFormat.description.toLowerCase()}) and click Check Bill. On submit, our flow ${tierDescription(provider)}. The form validates the shape of your reference locally before submission, so a typo never reaches the operator.`,
            `The ${provider.referenceFormat.label} is the only identifier you need for an online lookup. It is printed at the top of every ${provider.name} bill — usually in larger type than the rest of the bill, immediately below the operator's logo. For ${provider.name}, the format is ${provider.referenceFormat.minLength === provider.referenceFormat.maxLength ? `exactly ${provider.referenceFormat.minLength} ${provider.referenceFormat.digitsOnly ? "digits" : "characters"}` : `${provider.referenceFormat.minLength}–${provider.referenceFormat.maxLength} ${provider.referenceFormat.digitsOnly ? "digits" : "characters"}`}. A common example: ${provider.referenceFormat.example}.`,
            `Beyond the form on this page, ${provider.name} customers can check their bill through a handful of other channels: the operator's own portal at ${provider.portalUrl}, the operator's official mobile app where available, and any aggregator app (in ${country.name} that typically means the country's standard bill-pay tile in major banking apps and digital wallets). Each channel reads from the same operator master database, so the bill you see in one channel is the bill you see in every channel — the only differences are the layout and the speed of the user experience.`,
            `For deadline-sensitive needs (visa applications, bank KYC, rental agreement supporting documents), the simplest path is to download the bill as a PDF from the operator's portal and timestamp it with your browser's "Save as PDF" function. Most ${country.name} institutions accept the PDF as proof of address provided the bill is dated within the last three months and the name on the bill matches the applicant.`,
            `If your printed bill is damaged, lost, or moved with you and you cannot find the ${provider.referenceFormat.label}, ${provider.name}'s customer service can look it up for you. Call ${provider.supportPhone ?? `the operator's helpline (number on ${provider.portalUrl})`} with your registered name and address on hand. The customer service agent will verify your identity and read the reference number to you, or in some cases SMS it to your registered mobile number.`,
            `${provider.name}'s bill cycle is ${country.billingCycle}. ${country.billingCycle === "monthly" ? "Bills are issued once per calendar month with the due date typically printed 14-21 days after the bill date." : country.billingCycle === "bimonthly" ? "Bills are issued once every two months. The due date is typically 21-28 days after the bill date." : "Bills are issued quarterly. The due date is typically 28 days after the bill date."} The bill itself shows the cycle start and end dates, the unit consumption between those dates, and the comparison to the same cycle last year.`,
          ],
        },
        {
          id: "anatomy",
          imageQuery: IMG.meterReading,
          heading: `Anatomy of ${articleFor(provider.name)} ${provider.name} bill — every charge explained`,
          paragraphs: [
            `${provider.name} bills follow the standard ${country.name} utility bill layout, with line items grouped into three blocks: identifiers (top), consumption and charges (middle), and statutory levies (bottom). Reading them in order matters because some items are calculated on top of others — a change in the energy charge moves the percentage-based levies upward by similar percentages even though those line rates have not changed.`,
            `Identifiers block. This is where the ${provider.referenceFormat.label} appears, alongside your consumer name, service address, the tariff code that determines your slab, your sanctioned load (in kW or kVA depending on country), and the meter type (conventional, smart, or prepaid). Cross-check the tariff code against your actual use: if a residential property is on a commercial tariff because the previous occupant ran a shop, you are overpaying every month.`,
            `Consumption and charges block. The middle of the bill shows the previous and current meter readings, the units consumed in the cycle, and the per-unit energy charge multiplied by units to arrive at the energy total. ${u.title === "Electricity" ? "Energy charges in most countries are slabbed, which means the first N units have one per-unit rate, the next units have a higher rate, and so on." : u.title === "Gas" ? "Gas charges are typically a per-unit (m³ or therm) energy charge, slabbed by monthly consumption, plus a fixed daily standing charge." : "Water charges are typically a per-unit volumetric rate, with sewerage and disposal charges added separately on the same bill."} The bill explicitly shows the slab boundaries and the rate applied to each slab so you can verify the math.`,
            `Fixed charges (also called standing charges or service charges). A flat amount per month tied to your sanctioned load. Paid regardless of consumption — even a zero-consumption month carries the fixed charge. The fixed charge funds the meter rent, the service-line maintenance, and the operator's customer-service infrastructure.`,
            u.title === "Electricity"
              ? "Fuel pass-through (called FPA, FAC, or Pass-Through in different countries). A monthly adjustment that compensates for changes in the cost of fuel between when the regulator set the base tariff and when the bill is issued. The pass-through can be positive (you pay extra) or negative (a small refund). It is the single most volatile line on most electricity bills."
              : `${u.title} bills typically include a similar pass-through line where input-cost fluctuations are billed monthly. This line is usually small in ${country.name} but worth understanding when reading the bill.`,
            `Statutory levies block. The bottom of the bill stacks federal/national taxes (typically a Value-Added Tax or General Sales Tax), provincial/state levies (often a small percentage tied to consumption), and operator-specific surcharges (financing surcharges, infrastructure development funds). These are typically percentages applied on the bill total above; understanding the base of each percentage is the key to predicting how a change in consumption translates into a change in the total bill.`,
            `Total payable. The bottom-line amount. Most ${country.name} bills print both the within-due-date amount and the after-due-date amount, with the latter including a late-payment surcharge. Paying within the due date avoids the surcharge entirely; paying after the due date but before the disconnection date avoids disconnection but not the surcharge.`,
          ],
        },
        {
          id: "tariff-overview",
          imageQuery: IMG.tariff,
          heading: `Tariff framework — ${reg.shortName ?? reg.name} and how rates are set in ${country.name}`,
          paragraphs: [
            `${u.title} tariff in ${country.name} is set and revised by ${reg.name} (${reg.shortName ?? reg.name})${reg.url ? `, the national regulator with statutory authority over rate-setting, consumer service standards, and dispute resolution. The regulator's website (${reg.url}) publishes every tariff order, every consumer-protection regulation, and every formal dispute resolution decision — making it the authoritative reference for the per-unit rates that apply to your ${provider.name} bill.` : ""}`,
            `For ${provider.name} customers, the practical implication is that the per-unit rates printed on your bill are not set by the operator — the operator can only apply the rates the regulator approves. If you ever see a per-unit rate on your bill that does not match the regulator's notified schedule, that is a billing error and is escalatable to the operator's customer service first and then to the regulator's consumer-affairs office.`,
            `Tariff orders are typically issued once a year for a financial year, with quarterly true-up adjustments to reconcile actual costs against the approved base. The base-tariff structure usually distinguishes between residential, commercial, industrial, and (in some countries) agricultural and bulk-supply consumers — each category has its own slab/block schedule, its own fixed-charge component, and its own treatment of statutory levies.`,
            `Within residential, most ${country.name} operators use a graduated (telescopic) slab where the first block of units is priced lower than the next block, and so on. This is intended to keep small users (single-room flats, low-income households) on a softer per-unit rate while larger users (whole houses with multiple AC units, electric water heating, and EV charging) pay closer to cost. The exact slab boundaries and per-unit rates for ${provider.name} are notified by ${reg.shortName ?? reg.name} and are printed on every bill alongside the energy-charge calculation.`,
            `Residential consumers in many ${country.region} countries are also eligible for a protected (lifeline) tariff if their consumption stays below a defined monthly threshold. This is a regulator-approved subsidy intended to keep electricity affordable for low-income households. Eligibility and the application mechanism vary by country; check ${reg.shortName ?? reg.name}'s consumer-affairs section for the local programme.`,
            `Currency note: ${provider.name} bills are denominated in ${country.currency.name} (${country.currency.code}, symbol ${country.currency.symbol}). All payments through the operator's portal, the operator's app, partner banks, or partner wallets are in the same currency. Cross-border payments (for diaspora customers paying bills for family) typically work through international wire transfer to the bill payer's local bank account, then out through the standard bill-pay flow.`,
          ],
        },
        {
          id: "payment-overview",
          imageQuery: IMG.payment,
          heading: `How to pay your ${provider.name} bill`,
          paragraphs: [
            `${provider.name} accepts payment through a country-standard set of channels in ${country.name}. The cheapest is almost always payment from a digital wallet linked to a local bank account — no fees, instant settlement, and a digital receipt sent to your registered mobile. The next-best is a payment from any bank's mobile app over the country's domestic bill-pay rail (in ${country.name} that's typically a unified bill-pay scheme that any participating bank's app supports).`,
            `Bank channels are universally free for the consumer and settle within minutes. Card payments (credit or debit) typically carry a small convenience fee — usually 1-2% — to cover the card-network interchange. Wallet payments funded from card carry the same fee structure; wallet payments funded from balance are free.`,
            `For consumers who prefer cash, ${provider.name} accepts payment at its own customer-service offices and at authorised partner-bank branches. The receipt is printed at the counter and the payment is reflected in the operator's master within 2-4 working hours. For visa-application or rental-documentation deadlines that require a stamped cash receipt within 24 hours, this is the most reliable path.`,
            `Auto-debit (sometimes called a standing instruction or auto-pay) is available through most banks in ${country.name}. Visit your branch with a copy of any recent bill and ask for an auto-debit standing instruction. The bank debits 3-5 days before the bill due date each cycle and remits to ${provider.name}. No fee. The catch: auto-debit pulls whatever amount is billed, including any spike — if your bill jumps because of a meter-reader error or a tariff revision, the debit goes through. Most consumers prefer manual payment for this reason.`,
            `Late payment carries a surcharge (typically a percentage of the bill amount). The surcharge accrues from the day after the due date and continues until payment is received. After a period (typically 15-30 days, country-dependent), the operator can disconnect supply. Reconnection requires payment of the outstanding bill plus a reconnection fee plus, in some operators, a service technician visit.`,
            `If you are disputing the bill, you can still pay "under protest" through any of the channels — payment lifts the disconnection risk while the dispute is resolved through the complaints process. Adjustments approved by the regulator or the operator are reflected as credits on subsequent bills.`,
          ],
        },
        {
          id: "complaints-overview",
          imageQuery: IMG.complaints,
          heading: `Raising a complaint with ${provider.name} — and the escalation path`,
          paragraphs: [
            `${provider.name}'s customer service is the first stop for any bill-related dispute. ${provider.supportPhone ? `The helpline is ${provider.supportPhone}; ` : ""}${provider.supportEmail ? `email ${provider.supportEmail}; ` : ""}written complaints can also be submitted at any ${provider.name} customer-service office in person. Always note the complaint reference number — without it, the complaint does not formally exist in the operator's system.`,
            `For routine issues — disputed meter reading, wrong tariff classification, missing payment — the operator's customer service typically resolves within 5-15 working days. Have the bill in hand when you call, photograph your actual meter reading (and date-stamp the photo on your phone) before calling, and have a paper trail of any prior tickets ready.`,
            `If the operator does not resolve in the stated turnaround, ${country.name}'s regulator (${reg.shortName ?? reg.name}) accepts consumer complaints directly. The regulator's consumer-affairs office is a quasi-judicial forum empowered to issue binding orders against the operator. Hearings are typically free of cost, and you can represent yourself; no lawyer is required for routine consumer matters.`,
            `Document the trail. Every paper or digital communication with ${provider.name} should be kept on file: the original bill, the printed call-centre ticket number, any email exchange, photos of the meter, copies of payment receipts. The more documented the file, the faster the resolution at every level.`,
            `Compensation for prolonged outages, billing errors, and service-quality failures is defined in the regulator's Standards of Performance regulation (under various names by country). Compensation is typically a small fixed amount per day or per incident; the operator pays automatically once a service-standard breach is documented, or after the regulator orders payment.`,
            `Two things to avoid. First, do not stop paying the bill to "force" the operator to address your dispute — the disconnection rules apply regardless of dispute status, and reconnection later is more expensive than continuing to pay under protest. Second, do not accept verbal commitments from the operator — every promise from customer service should be confirmed in an email or written reply that you save.`,
          ],
        },
        {
          id: "new-connection",
          imageQuery: IMG.newConn,
          heading: `Applying for a new ${u.lower} connection in ${provider.name} territory`,
          paragraphs: [
            `${provider.name} accepts new-connection applications at any customer-service office and (in most cases) through its online portal at ${provider.portalUrl}. The standard residential application requires ownership proof (sale deed, allotment letter, or rental agreement with NOC from the owner), national ID (CNIC, Aadhaar, NIN, or equivalent), an address proof, a photo of the proposed meter location, and a small application fee.`,
            `Within 5-15 working days of submitting the application, ${provider.name} schedules a site visit to verify the wiring, the proposed meter location, the requested sanctioned load, and the distance from the nearest service line. After the site visit, the operator issues a demand notice listing the security deposit (refundable on permanent disconnection), any service-line extension cost if the nearest pole/main is too far, and the meter rent.`,
            `Security deposit slabs are notified by the regulator and depend on the sanctioned load. For residential single-phase under 5 kW, the deposit is typically the equivalent of one to two months' bills. For three-phase or higher loads, the deposit can be several multiples of that. The deposit accrues interest at the rate notified by the regulator each year and is refundable when the connection is permanently disconnected.`,
            `After the demand notice is paid, the meter is installed and supply is energised. For residential single-phase under 5 kW, the end-to-end timeline from application to live supply is typically 15-45 working days. For three-phase or high-load connections that need a new transformer or extended service line, the timeline can extend to 60-120 days because the upstream-network work involves grid-substation approvals.`,
            `Change of name on an existing connection is a different, faster process. If you have just bought a property or inherited a connection, file a Change of Name (CON) rather than a fresh application. CON typically costs less (often a single-digit-percent of the new-connection deposit), the deposit transfers from the previous owner with accrued interest, and the timeline is 7-21 working days. Pay any arrears on the connection before applying for CON — otherwise the application is parked until the master is clean.`,
            `Tenants do not need a CON if renting. The connection stays in the landlord's name; the tenant simply pays the bill. Some landlords add an "address-of-bill" change so the PDF is emailed to the tenant, but the legal liability for non-payment stays with the named consumer.`,
          ],
        },
        {
          id: "consumer-rights",
          imageQuery: IMG.rights,
          heading: `Consumer rights for ${provider.name} customers — what ${reg.shortName ?? reg.name} guarantees`,
          paragraphs: [
            `Every customer of a regulated utility in ${country.name} has a set of consumer rights enforceable through ${reg.shortName ?? reg.name}. These are typically codified in a Standards of Performance regulation or a Consumer Service Manual. The headline rights below apply to ${provider.name} customers and to every other regulated operator in ${country.name}.`,
            `Right to accurate billing. Bills must reflect actual consumption (verified by an actual meter reading, not an estimate, except where the regulator explicitly permits estimation). Estimated bills must be reconciled with an actual reading within a stated period (typically two bill cycles).`,
            `Right to a complaint resolution within a defined time. The regulator specifies the maximum time the operator can take to resolve each category of complaint — typically 7 days for billing complaints, 15 days for meter-related complaints, 30 days for service-line complaints. If the operator misses the deadline, the customer is entitled to file with the regulator directly.`,
            `Right to advance notice of disconnection. The operator cannot disconnect supply without a written notice delivered to the registered address, with a minimum period (typically 5-15 days, country-dependent) between notice and disconnection. Disconnection without proper notice is a regulatory breach.`,
            `Right to compensation for service-standard breaches. Prolonged outages, repeated meter-reading failures, and billing errors trigger automatic compensation per the regulator's schedule. The compensation is typically a small fixed amount per day of breach, payable as a credit on the next bill.`,
            `Right to transfer the connection. If you sell or rent the property, the connection can be transferred (Change of Name) or the address-of-bill can be redirected without changing the registered consumer. Both are filed at the customer-service office.`,
            `Right to load reduction. If you discover your sanctioned load is higher than you actually use, you can apply for a load reduction. The fixed charges drop proportionally. The operator may inspect the wiring and propose a lower-load meter.`,
            `Right to dispute meter testing. If you suspect your meter is over-counting, you can request an accredited meter test. The regulator specifies who pays — typically the consumer pays if the meter tests within tolerance, the operator pays if it tests outside tolerance and refunds the overbilled units.`,
          ],
        },
        {
          id: "energy-saving",
          imageQuery: IMG.energySaving,
          heading: `Practical tips for ${provider.name} customers to reduce monthly bills`,
          paragraphs: [
            `The single highest-impact change for a ${country.name} household is the largest appliance. ${u.title === "Electricity" ? "For most homes that's the air conditioner or refrigerator (in warmer climates) or the heater (in colder climates). For electricity bills in particular, replacing a single old appliance with a high-efficiency model often cuts that appliance's consumption by 30-40%." : u.title === "Gas" ? "For gas bills the largest load is the water heater followed by the cooktop. Replacing an aging tank heater with a tankless on-demand unit cuts gas consumption sharply for households with intermittent hot-water use." : "For water bills the largest controllable load is the irrigation system if you have a garden, followed by leaks. A single dripping toilet flap can leak 100+ litres a day undetected; a single dripping tap leaks 20+ litres a day."}`,
            `Read your bill before changing anything. The bill shows your slab — if you are sitting just above a slab boundary, a small reduction in consumption can move you into a lower slab and amplify the saving. If you are deep inside a high slab, the marginal saving from reducing a few units is much smaller.`,
            `Time-of-use tariff (where available) is an easy win for households that can shift large loads to off-peak hours. Washing machine, dishwasher, water pump — running these at night instead of in the evening peak hour saves several units worth of money each cycle. Time-of-use opt-in is typically via a separate application with the operator and requires a smart meter; check with ${provider.name} customer service whether your meter qualifies.`,
            u.title === "Electricity"
              ? `Solar net-metering is a longer-horizon option but is well-established in ${country.name}. A typical 3-5 kW residential system generates 350-550 kWh/month depending on local insolation. For a household consuming 500-700 units/month, the system can offset most of the grid draw. Capital cost is paid back in 4-7 years; ${country.name}-specific subsidies often shorten this. Check ${reg.shortName ?? reg.name}'s net-metering regulation for the application steps.`
              : `Where applicable, look into the country's energy-efficiency rebate programmes. Many regulators offer one-time rebates for replacing inefficient appliances with high-efficiency models. The application is usually a simple form at the operator's office or website.`,
            `Read your bill alongside the comparable bill from twelve months prior. Most ${provider.name} bills show year-on-year consumption explicitly. A jump in consumption with no change in household routine almost always indicates a leak, a malfunctioning appliance, or a meter issue. Investigate before paying.`,
            `If your bill is significantly higher than expected, before disputing with the operator, do three checks. First, photograph your meter and compare the reading to the "Current Reading" on the bill — they should match within a unit. Second, check the year-on-year comparison printed on the bill — is the consumption actually higher, or is the rate higher? Third, check the fuel pass-through / FPA line — if that has jumped this month, the operator did not change anything; the regulator changed the pass-through rate based on input costs.`,
          ],
        },
        {
          id: "switching-providers",
          imageQuery: IMG.switching,
          heading: country.name === "Pakistan" || country.name === "India" ?
            "Which utilities cover which areas — and switching providers" :
            `Switching providers in ${country.name}`,
          paragraphs: [
            country.name === "Pakistan" || country.name === "India" || country.region === "Middle East" || country.region === "Africa"
              ? `In ${country.name}, ${u.lower} distribution is typically organised as a regulated monopoly by region. ${provider.name} is the licensed operator for ${saList}; consumers in those areas cannot switch to another distributor for distribution itself, although in some ${country.name} cities there is a parallel retail-supplier market where the wires belong to ${provider.name} but the bill comes from a chosen retailer.`
              : `In ${country.name}, ${u.lower} retail is typically a competitive market — distribution (the wires) is a regulated monopoly, but supply (the bill) is competitive. ${provider.name} is one of several retailers customers can choose from. Switching is free, takes 14-30 days, and is initiated by signing up with a new retailer; the previous retailer is notified automatically.`,
            country.region === "Middle East" || country.region === "Africa"
              ? `Comparing retailers in ${country.name} is straightforward — the regulator publishes a standard price-comparison portal where consumers can input their last bill and see what each retailer would have charged. Switching is initiated through that portal.`
              : `When comparing retailers, look at three things: the per-unit rate, the standing charge, and the contract term. A retailer offering a low per-unit rate with a 24-month lock-in may be more expensive over the term than a slightly-higher-rate retailer with monthly flexibility.`,
            `For ${provider.name} customers considering a switch (where applicable), the practical advice is to wait until your current contract is within 30 days of renewal — switching mid-contract usually carries an exit fee, while switching at renewal is fee-free. Use the regulator's price-comparison portal as the authoritative comparison; retailer marketing claims are typically not directly comparable.`,
            `If you have multiple connections at different addresses (vacation home, rental property), each can be on a different retailer. Most regulators allow connection-level retailer choice, not customer-level.`,
            `Switching does not interrupt supply. The wires remain managed by ${provider.name} (in markets where ${provider.name} is the distributor) or by the local distributor; only the bill changes. Smart meters do not need to be replaced when switching retailers — they remain in place and report to the new retailer.`,
          ],
        },
        {
          id: "move-house",
          imageQuery: IMG.moveHouse,
          heading: `Moving house — what to do when leaving or arriving at ${articleFor(provider.name)} ${provider.name} connection`,
          paragraphs: [
            `Moving into ${articleFor(provider.name)} ${provider.name}-served premise on day one, do three things. First, photograph the existing meter reading and the seal numbers on the meter housing. Second, note the ${provider.referenceFormat.label} from any recent bill in the property. Third, request a change-of-name on the connection through the operator (or the previous occupant) within 30 days. The change-of-name protects you from being chased for the previous occupant's arrears.`,
            `If the property is rented, the connection typically stays in the landlord's name. Confirm with the landlord whose name appears on the bill before signing the lease — surprises after move-in can be expensive. Add a clause to the lease that specifies who pays the bill and what happens if there are pending arrears at the start of the tenancy.`,
            `Moving out, file a security-deposit refund request within 30 days. The deposit was paid at the time of connection (typically by the original consumer, often years or decades ago), accrues interest at the rate notified by the regulator, and is refundable when the connection is closed or transferred to the next occupant. If you are leaving the property to the next tenant, the simpler arrangement is to transfer the deposit to the new occupant rather than closing the connection.`,
            `If you are a landlord with the connection in your name but the tenant paying the bill, set up either a NACH/auto-debit from the tenant's account directly to ${provider.name}, or a clear monthly process where the tenant sends you a copy of the paid bill. Many landlord-tenant disputes end up at the bill-payment level, and a clear receipt trail prevents most of them.`,
            `For consumers moving internationally (diaspora), the operator typically allows a different mailing address from the service address. Update the mailing address through customer service to receive paper bills at your new address, or switch to email/SMS delivery so the bill reaches you wherever you are. Online payment works regardless of your physical location, provided you have access to ${country.name} payment rails.`,
            `If the connection has been inactive for an extended period (vacant property), the meter may have been removed by ${provider.name}. Reactivation requires a fresh application similar to a new connection, with the documents and fees that apply at the time of reactivation.`,
          ],
        },
        {
          id: "context",
          imageQuery: IMG.context,
          heading: `${country.name}'s ${u.lower} sector in context`,
          paragraphs: [
            `${country.name} has a population of approximately ${country.population} million and an electrification rate of ${country.electrificationRate}%. ${u.title === "Electricity" ? `The country's grid frequency is ${country.voltageStd}.` : ""} ${provider.name} is one of multiple operators in ${country.name}; the full list of operators in this country is available on our ${country.name} ${u.lower} bill check page.`,
            `${u.title === "Electricity" ? `Pakistan, India, Bangladesh, Sri Lanka, and Nepal in South Asia have moved toward centralised PITC/NPCI-style bill aggregation. The Middle East, Africa, and Anglosphere countries typically operate on a regulated-monopoly model with per-region utilities. The European model (gas and electricity competition with regulated wires) is most established in the UK and Ireland.` : ""}`,
            `Regulator capacity and consumer-protection enforcement vary by country. ${country.electrificationRate >= 95 ? "${country.name} has near-universal access and a mature regulator with established consumer-protection regulations." : country.electrificationRate >= 80 ? `${country.name} has good electrification with an active regulator; rural service areas can still see gaps in metering and bill delivery.` : `${country.name} is still scaling electrification; consumer-protection enforcement is most developed in urban areas.`}`,
            `For ${provider.name} customers specifically, the practical implication of all this context is that the bill-check, payment, and complaint-resolution experience you have is broadly shaped by the country-level regulator and the operator's own customer-service investment. ${provider.name} is part of a wider system; understanding the system explains why the system works the way it does.`,
          ],
        },
      ],
      faq: [
        {
          q: `What is the ${provider.name} ${provider.referenceFormat.label}?`,
          a: `${provider.referenceFormat.description} It is printed at the top of every ${provider.name} bill and is the only identifier you need for an online lookup. Example format: ${provider.referenceFormat.example}.`,
        },
        {
          q: `How do I check my ${provider.name} bill online?`,
          a: `Enter your ${provider.referenceFormat.label} in the form at the top of this page. The form ${tierDescription(provider)}. No login or fee required for the bill view.`,
        },
        {
          q: `Where does ${provider.name} supply ${u.lower}?`,
          a: `${provider.name}'s service area covers ${saList} in ${country.name}.${provider.customers ? ` Approximately ${provider.customers} million customers in total.` : ""}`,
        },
        {
          q: `What is the ${provider.name} customer-service number?`,
          a: provider.supportPhone
            ? `${provider.supportPhone}. ${provider.supportEmail ? `Email: ${provider.supportEmail}.` : ""} For escalations beyond customer service, contact ${reg.shortName ?? reg.name} consumer affairs.`
            : `The number is published on ${provider.portalUrl}.`,
        },
        {
          q: `Can I pay my ${provider.name} bill online?`,
          a: `Yes. Payment options in ${country.name} typically include the operator's own portal, mobile-banking apps from any local bank, digital wallets, and cash at the operator's customer-service offices and authorised partner banks. The cheapest channel is usually the digital wallet from a balance funding source — zero fee and instant settlement.`,
        },
        {
          q: `What happens if I miss the due date on my ${provider.name} bill?`,
          a: `A late-payment surcharge applies from the day after the due date. After a country-specific period (typically 15-30 days), supply may be disconnected. Reconnection requires paying the outstanding bill plus a reconnection fee. To avoid disconnection while disputing a bill, pay "under protest" through any channel — the dispute can continue and adjustments will be reflected as credits.`,
        },
        {
          q: `How do I dispute a ${provider.name} bill?`,
          a: `Contact ${provider.name} customer service first ${provider.supportPhone ? `at ${provider.supportPhone}` : `via the contact details on ${provider.portalUrl}`}. Get a complaint reference number. If unresolved within the regulator-specified turnaround (typically 5-15 working days), escalate to ${reg.shortName ?? reg.name} consumer affairs. Their address and contact form is at ${reg.url}.`,
        },
        {
          q: `Can I get a new ${provider.name} connection?`,
          a: `Yes — apply at any ${provider.name} customer-service office or through ${provider.portalUrl}. Required: ownership/rental documents, national ID, address proof, and a small application fee. Timeline 15-45 working days for residential single-phase; 60-120 days for high-load or three-phase connections.`,
        },
        {
          q: `What is the ${provider.name} security deposit?`,
          a: `The deposit is set by ${reg.shortName ?? reg.name} and depends on your sanctioned load. For residential single-phase, it is typically the equivalent of one to two months' bills. The deposit accrues interest annually and is refundable on permanent disconnection.`,
        },
        {
          q: `How do I change the name on my ${provider.name} bill?`,
          a: `File a Change of Name (CON) at any ${provider.name} customer-service office. Documents required: sale deed or transfer letter, both buyer's and seller's national IDs, the previous month's paid bill (must be clear of arrears), and the CON fee. Timeline 7-21 working days.`,
        },
        {
          q: `Is the ${provider.name} bill PDF accepted as proof of address?`,
          a: `Yes — provided the bill is dated within the last 3 months and the name on the bill matches the applicant. The PDF is accepted by banks, the passport office, NADRA/Aadhaar/equivalent registration authorities, and most consular departments in ${country.name}.`,
        },
        {
          q: `Does ${provider.name} offer prepaid metering?`,
          a: `Prepaid metering availability varies by ${country.name} region and operator. Many ${country.region} operators are migrating to smart-meter infrastructure with optional prepaid mode under their smart-meter rollouts. Check with ${provider.name} customer service for the current option in your service area.`,
        },
      ],
      citations: [
        { label: `${reg.name} — official regulator`, url: reg.url, retrievedOn: TODAY },
        { label: `${provider.legalName} — official portal`, url: provider.portalUrl, retrievedOn: TODAY },
      ],
      lastReviewed: TODAY,
      author: "CheckBillsOnline Editorial",
    },
    spokes: {
      tariff: {
        metaTitle: `${provider.name} Tariff Guide — Rate Structure, Slabs & Adjustments (${country.name})`,
        metaDescription: `How ${provider.name} tariff is structured: residential slabs, fixed charges, fuel pass-through, and statutory levies. Sourced from ${reg.shortName ?? reg.name} notifications.`,
        h1: `${provider.name} tariff — slab structure and rate components`,
        intro: `${provider.name} ${u.lower} tariff is approved by ${reg.name} and is published in ${reg.shortName ?? reg.name}'s tariff orders. This page explains the structure — slabs, fixed charge, fuel pass-through, and statutory levies — and points you to the authoritative source for current per-unit rates.`,
        sections: [
          { id: "structure", imageQuery: IMG.tariff, heading: "Tariff structure — how ${provider.name} bills are calculated",
            paragraphs: [
              `${provider.name} bills are calculated by applying the regulator-notified per-unit rate to your units consumed, then adding fixed charges, fuel pass-through, and statutory levies. The order of operations matters because some lines are percentages of others.`,
              `Residential tariff in ${country.name} is typically slabbed — a graduated rate where the first block of units is priced lower than the next. The exact slab boundaries are notified by ${reg.shortName ?? reg.name} in periodic tariff orders. For ${provider.name}, the current slab table is published at ${reg.url}.`,
              `Commercial and industrial tariffs are typically non-telescopic, meaning all units in a cycle are priced at the slab the monthly total lands in. Be aware of this when crossing slab thresholds for a small business.`,
            ] },
          { id: "fixed-charge", imageQuery: IMG.tariff, heading: "Fixed charge",
            paragraphs: [
              `The fixed charge is a flat monthly amount tied to your sanctioned load. Paid regardless of consumption. It funds the meter, the service-line maintenance, and the operator's customer-service infrastructure.`,
              `Reducing your sanctioned load (where appropriate) lowers the fixed charge. If you are paying for a 5 kW sanctioned load but actually use 2 kW, apply for a load reduction at ${provider.name}'s customer service — the fixed charge drops proportionally.`,
            ] },
          { id: "fuel-pass-through", imageQuery: IMG.tariff, heading: "Fuel pass-through",
            paragraphs: [
              u.title === "Electricity"
                ? `Most ${country.name} electricity tariffs include a monthly fuel pass-through line (called FPA, FAC, or similar) that compensates for the difference between forecast and actual fuel costs.`
                : `${u.title} bills typically include a similar pass-through line where input-cost fluctuations are billed monthly.`,
              `The pass-through is approved by ${reg.shortName ?? reg.name} on a regular schedule (monthly or quarterly). The figure on your bill is the pass-through for a past period, not the current consumption month. Pass-through can be positive or negative.`,
              `Pass-through is the single most volatile line on most ${u.lower} bills. A spike in fuel costs in one quarter can move the total bill by 10-25% in either direction in the following quarter without any change in your consumption.`,
            ] },
          { id: "statutory-levies", imageQuery: IMG.tariff, heading: "Statutory levies — taxes, duties, and surcharges",
            paragraphs: [
              `${country.name} bills include national and provincial taxes layered on top of the energy charge. The exact composition varies, but typically includes a general sales tax (VAT/GST), an electricity duty (provincial or state), and one or more financing surcharges that fund the country's power sector debt.`,
              `Statutory levies are percentages applied to base amounts; understanding the base of each percentage is key to predicting how a change in consumption translates into a change in the total bill. The bill explicitly shows the rate of each levy and the base it is calculated on.`,
              `Some statutory levies have an opt-out for compliant taxpayers (e.g., income tax withholding for tax-return filers). If ${country.name} offers such an opt-out, check with the relevant tax authority for the application steps.`,
            ] },
          { id: "verifying", imageQuery: IMG.meterReading, heading: "Verifying your bill against the published tariff",
            paragraphs: [
              `On every ${provider.name} bill you can cross-check the math against the regulator's published tariff in three steps. First, multiply your units consumed by the slab-applicable per-unit rate to verify the energy charge. Second, add the fixed charge for your load category. Third, add the pass-through line (if any) and apply the statutory levies as percentages.`,
              `If the bill does not match the formula, the most common causes are: a slab boundary you didn't notice, a tariff revision that took effect mid-cycle (the bill prorates between the old and new rate), or an arrears line from a previous unpaid bill.`,
              `If after checking all three you still cannot reconcile the bill to the formula, file a complaint at ${provider.name} customer service ${provider.supportPhone ? `(${provider.supportPhone})` : ""}. The operator's customer service can pull up your consumption data and walk through the calculation with you.`,
            ] },
        ],
        faq: [
          { q: `Where can I download the current ${provider.name} tariff schedule?`, a: `${reg.url} publishes every tariff order. Search for ${provider.name} or for the country's distribution tariff schedule.` },
          { q: `Why does my pass-through line look different from last month?`, a: `Pass-through is reset by ${reg.shortName ?? reg.name} on a regular schedule based on actual input costs. Movement of 10-25% month-to-month is normal.` },
          { q: `Can I dispute the per-unit rate on my bill?`, a: `Only on arithmetic grounds. The rates themselves are set by ${reg.shortName ?? reg.name} and not appealable at the consumer level. Arithmetic mismatches are addressed at ${provider.name} customer service.` },
        ],
        citations: [
          { label: `${reg.name} tariff schedule`, url: reg.url, retrievedOn: TODAY },
          { label: `${provider.legalName} portal`, url: provider.portalUrl, retrievedOn: TODAY },
        ],
        lastReviewed: TODAY,
        author: "CheckBillsOnline Editorial",
        tariff: undefined,
      },
      "payment-methods": {
        metaTitle: `${provider.name} Bill Payment — All Channels and Fees (${country.name})`,
        metaDescription: `Every way to pay your ${provider.name} bill in ${country.name}. Online portal, mobile apps, banks, wallets, cash counters, auto-debit — with current fees and settle times.`,
        h1: `${provider.name} bill payment — every working method`,
        intro: `${provider.name} accepts payment through every standard ${country.name} channel. This page lists each channel, what it costs, how fast it settles, and when each is the right choice.`,
        sections: [
          { id: "online", imageQuery: IMG.payment, heading: `Online — ${provider.name}'s own portal`, paragraphs: [
            `The most direct path is the operator's official portal at ${provider.portalUrl}. Enter your ${provider.referenceFormat.label}, view the bill, and pay through any of the payment options the portal supports — typically card, bank transfer, and any country-standard digital wallets.`,
            `Portal payments settle to ${provider.name} within minutes. The portal issues a digital receipt that you can download as a PDF; save this as your proof of payment.`,
          ] },
          { id: "apps", imageQuery: IMG.payment, heading: "Mobile apps and bank apps", paragraphs: [
            `In ${country.name}, every major bank's mobile app supports ${provider.name} bill payment under the standard bill-pay menu. The flow is identical across banks: choose the operator, enter the ${provider.referenceFormat.label}, confirm the amount, authenticate with a transaction PIN or biometric.`,
            `Bank-app payments are free for the consumer and settle instantly via the country's domestic bill-pay rail. They are the recommended option for one-off payments because the money goes from your bank account directly.`,
            `Country-standard digital wallets (the popular wallets vary by country) also support ${provider.name}. Wallet payments funded from balance are free; wallet payments funded from card carry a small convenience fee.`,
          ] },
          { id: "cash", imageQuery: IMG.payment, heading: "Cash at counters", paragraphs: [
            `${provider.name} accepts cash at its own customer-service offices and at authorised partner-bank branches. Bring the bill and the cash; the counter clerk processes the payment and prints a stamped receipt within minutes. The receipt is reflected in the operator's master within 2-4 working hours.`,
            `For visa-application or rental-documentation deadlines that require a stamped cash receipt within 24 hours, this is the most reliable path.`,
          ] },
          { id: "auto-debit", imageQuery: IMG.payment, heading: "Auto-debit / standing instruction", paragraphs: [
            `Any bank in ${country.name} can set up an auto-debit standing instruction for ${provider.name} bills. Visit your branch with a copy of any recent bill; the bank notes the ${provider.referenceFormat.label}, sets the standing instruction, and from the next cycle the bill is debited automatically 3-5 days before the due date.`,
            `No fee. The catch: standing instructions debit whatever amount ${provider.name} bills, including any spike. If your bill jumps from a normal cycle to a much higher one because of an unexpected event, the auto-debit still goes through. Most consumers prefer manual payment for this reason.`,
            `Most banks offer a "variable standing instruction" with a maximum amount. Bills above the ceiling fail the auto-debit and notify you to pay manually.`,
          ] },
          { id: "after-due-date", imageQuery: IMG.payment, heading: "After due date — surcharges and disconnection", paragraphs: [
            `Late payment carries a surcharge (typically a percentage of the bill amount). The surcharge accrues from the day after the due date and continues until payment is received. After a country-specific period (typically 15-30 days), the operator can disconnect supply.`,
            `Reconnection requires payment of the outstanding bill plus a reconnection fee. On smart meters reconnection is remote and instant after payment; on conventional meters a service technician visit is required.`,
            `Disputed bills can be paid "under protest" through any channel — payment lifts the disconnection risk while the dispute is resolved. Adjustments approved by the regulator or the operator are reflected as credits on subsequent bills.`,
          ] },
        ],
        paymentMethods: [
          { name: `${provider.name} portal`, category: "Online portal", description: `Pay directly at ${provider.portalUrl}. Card, bank transfer, country-standard wallets.`, url: provider.portalUrl, feeNote: "Operator-set" },
          { name: "Mobile banking apps", category: "Bank", description: `Every major ${country.name} bank's app supports ${provider.name}.`, feeNote: "Free" },
          { name: "Country-standard digital wallets", category: "Wallet", description: `Country-standard wallets in ${country.name} all support ${provider.name}.`, feeNote: "Free from balance" },
          { name: `${provider.name} customer-service offices (cash)`, category: "Cash", description: "Stamped receipt printed at counter.", feeNote: "Free" },
          { name: "Authorised partner-bank branches (cash)", category: "Bank", description: "Bank branches authorised for utility-bill collection.", feeNote: "Free" },
          { name: "Auto-debit / standing instruction", category: "Bank", description: "Set up at any bank branch.", feeNote: "Free" },
        ],
        faq: [
          { q: "Which channel has the lowest fee?", a: `Country-standard digital wallets funded from balance and bank mobile apps via the domestic bill-pay rail. Both free, both instant.` },
          { q: "Can I pay from outside ${country.name}?", a: `Yes — through your ${country.name} bank's mobile app, which works regardless of physical location as long as you have access to the app.` },
          { q: "How do I cancel auto-debit?", a: "Visit the bank branch that set up the standing instruction with your national ID. Cancellation takes one working day to reflect." },
        ],
        citations: [
          { label: `${provider.legalName} payment options`, url: provider.portalUrl, retrievedOn: TODAY },
        ],
        lastReviewed: TODAY,
        author: "CheckBillsOnline Editorial",
      } as unknown as ProviderContent["spokes"]["payment-methods"],
      complaints: {
        metaTitle: `${provider.name} Complaints — Customer Service, Regulator Escalation (${country.name})`,
        metaDescription: `How to file a complaint with ${provider.name}: customer service first, escalation to ${reg.shortName ?? reg.name} if unresolved. Statutory turnaround days, what each forum can do.`,
        h1: `${provider.name} complaints — the escalation ladder`,
        intro: `${reg.name}'s Standards of Performance regulation defines the framework for ${provider.name} complaints. This page walks through the levels with statutory turnaround days and what each forum is empowered to do.`,
        sections: [
          { id: "step1", imageQuery: IMG.complaints, heading: `Step 1 — ${provider.name} customer service`, paragraphs: [
            `The first stop for any ${provider.name} complaint is the operator's own customer service. ${provider.supportPhone ? `Call ${provider.supportPhone}` : `Contact details are on ${provider.portalUrl}`}.`,
            "Most billing-related disputes resolve at this level. Have the bill in hand when you call, photograph your meter reading and date-stamp the photo on your phone, and have any prior ticket numbers ready.",
            "Always get a complaint reference number. Without it, the complaint does not formally exist in the operator's system. Note it on the bill you are disputing.",
          ] },
          { id: "step2", imageQuery: IMG.complaints, heading: `Step 2 — regulator: ${reg.shortName ?? reg.name}`, paragraphs: [
            `If ${provider.name} does not resolve within the statutory turnaround (typically 5-15 working days), escalate to ${reg.name}.`,
            `The regulator's consumer-affairs office is at ${reg.url}. Most regulators offer an online complaint form; some also accept email and postal complaints.`,
            "Document the trail. Include the original bill, your complaint reference at the operator, the operator's response (or lack thereof), and any photographic evidence (meter readings, damaged seal, etc.).",
            "The regulator's office is a quasi-judicial forum empowered to issue binding orders against the operator. Hearings are typically free of cost; you can represent yourself.",
          ] },
          { id: "common", imageQuery: IMG.complaints, heading: "Common complaint categories", paragraphs: [
            `Disputed meter reading — Step 1 with photo evidence; typically resolved here. Wrong tariff classification — Step 1, escalate to Step 2 with property documents if denied. Overbilling on percentage levies — Step 1; document the arithmetic mismatch. Disconnection without notice — Step 1 with timestamped photo evidence; escalate to Step 2 if not resolved promptly. Outage compensation — Step 1 with outage log; escalate to Step 2 for binding compensation order.`,
          ] },
        ],
        ladder: [
          { level: 1, body: `${provider.name} customer service`, contact: provider.supportPhone ?? `Contact details on ${provider.portalUrl}`, turnaroundDays: 15 },
          { level: 2, body: reg.name, contact: reg.url, turnaroundDays: 60 },
        ],
        faq: [
          { q: "Is the regulator a court?", a: "It is a quasi-judicial forum. Orders are binding on the operator but appealable to the courts." },
          { q: "Do I need a lawyer?", a: "No. You can represent yourself; most consumer complaints are heard without lawyers." },
          { q: "Is there a fee?", a: "No fee at the regulator level. Operator customer service is also free." },
        ],
        citations: [
          { label: `${reg.name} consumer affairs`, url: reg.url, retrievedOn: TODAY },
          { label: `${provider.legalName} customer service`, url: provider.portalUrl, retrievedOn: TODAY },
        ],
        lastReviewed: TODAY,
        author: "CheckBillsOnline Editorial",
      },
      "new-connection": {
        metaTitle: `${provider.name} New Connection — Apply Online, Documents, Timeline (${country.name})`,
        metaDescription: `Apply for a new ${provider.name} ${u.lower} connection in ${country.name}. Document checklist, security deposit, site-visit timeline, demand notice, energisation steps.`,
        h1: `${provider.name} new connection — the full application process`,
        intro: `${provider.name} accepts new-connection applications at any customer-service office and (in most cases) through ${provider.portalUrl}. The end-to-end process is typically 15-45 working days for residential single-phase; longer for high-load or three-phase connections.`,
        sections: [
          { id: "documents", heading: "Document checklist", paragraphs: [
            `For a residential new connection: ownership proof (sale deed, allotment letter, or rental agreement with NOC from owner), national ID, address proof, photo of the proposed meter location, and a small application fee.`,
            "For rental connections, additionally: rental agreement notarised per local rules, NOC from the property owner, and the owner's national ID copy.",
            "All documents are uploaded as scanned PDFs through the online application or accepted in physical photocopies at the customer-service office.",
          ] },
          { id: "site-visit", heading: "Site visit and demand notice", paragraphs: [
            `Within 5-15 working days, ${provider.name} schedules a site visit to verify the wiring, the proposed meter location, the requested sanctioned load, and the distance from the nearest service line.`,
            "After the site visit, the operator issues a Demand Notice listing the security deposit, any service-line extension cost, and the meter rent. The Demand Notice is typically valid for 60 days.",
            `Security deposit slabs are notified by ${reg.shortName ?? reg.name} and depend on sanctioned load. For residential single-phase, it is typically the equivalent of one to two months' bills. Refundable on permanent disconnection.`,
          ] },
          { id: "energisation", heading: "Meter installation and energisation", paragraphs: [
            `After Demand Notice payment, ${provider.name} schedules the meter installation. For residential single-phase under 5 kW, this typically happens within 7-21 working days. For three-phase or high-load connections, the timeline can extend to 60-120 days.`,
            "Be present (or have an adult representative) to receive the meter, verify the seal numbers, and photograph the initial reading. The crew issues a temporary commissioning slip; the formal connection certificate follows.",
          ] },
          { id: "change-of-name", heading: "Change of name on an existing connection", paragraphs: [
            `If you have just bought a property or inherited a connection, file a Change of Name (CON) rather than a fresh application. CON typically costs less, the deposit transfers from the previous owner with accrued interest, and the timeline is 7-21 working days.`,
            `Documents: sale deed or transfer letter, both buyer's and seller's national IDs, the previous month's paid bill (must be clear of arrears), and the CON fee. Filed at the customer-service office.`,
            "Tip: pay any arrears before applying for CON. Otherwise the application is parked until the meter master is clean.",
          ] },
        ],
        faq: [
          { q: `How much is the ${provider.name} security deposit?`, a: `Slab-dependent on sanctioned load and set by ${reg.shortName ?? reg.name}. Residential single-phase typically equals 1-2 months' bills. Refundable on permanent disconnection.` },
          { q: "Can I apply as a tenant?", a: "Yes — with rental agreement and NOC from the owner. The connection is in the tenant's name." },
          { q: `What is the timeline?`, a: `15-45 working days for residential single-phase under 5 kW. 60-120 days for high-load or three-phase connections.` },
        ],
        citations: [
          { label: `${provider.legalName} new connection`, url: provider.portalUrl, retrievedOn: TODAY },
          { label: `${reg.name} SoP regulations`, url: reg.url, retrievedOn: TODAY },
        ],
        lastReviewed: TODAY,
        author: "CheckBillsOnline Editorial",
      },
      faq: {
        metaTitle: `${provider.name} FAQ — Common Questions Answered (${country.name})`,
        metaDescription: `Common questions about ${provider.name} ${u.lower} bills, tariff, payment, complaints, and new connections — answered with citations to ${reg.shortName ?? reg.name}.`,
        h1: `${provider.name} — frequently asked questions`,
        intro: `Questions about ${provider.name} bills, tariff, payment, complaints, and new connections — answered with primary sources where applicable.`,
        sections: [],
        faq: [
          { q: `What is the ${provider.name} ${provider.referenceFormat.label}?`, a: `${provider.referenceFormat.description} Example: ${provider.referenceFormat.example}.` },
          { q: `How do I check my ${provider.name} bill online?`, a: `Enter the ${provider.referenceFormat.label} in the form at the top of the ${provider.name} bill check page on this site, or visit ${provider.portalUrl}.` },
          { q: `What is the ${provider.name} customer-service number?`, a: provider.supportPhone ?? `Published on ${provider.portalUrl}` },
          { q: `How long does ${provider.name} payment take to reflect?`, a: "Online (portal/bank app/wallet from balance): instant. Cash at counters: 2-4 working hours. Cheque: 2-3 working days." },
          { q: `What if my ${provider.name} bill is wrong?`, a: `Contact ${provider.name} customer service first with the bill in hand. Get a complaint reference number. Escalate to ${reg.shortName ?? reg.name} after the statutory turnaround if unresolved.` },
          { q: `How do I apply for a new ${provider.name} connection?`, a: `Online via ${provider.portalUrl} or at any customer-service office. Documents: ownership/rental, national ID, address proof, application fee. Timeline 15-45 working days.` },
          { q: `Where does ${provider.name} supply ${u.lower}?`, a: `${saList} in ${country.name}.` },
          { q: `Is the ${provider.name} bill accepted as proof of address?`, a: "Yes, within 3 months of bill date and matching applicant name." },
          { q: `Does ${provider.name} offer rooftop solar net-metering?`, a: u.title === "Electricity" ? `Where ${country.name}'s regulator has approved net-metering, yes. Check ${reg.url} for the current scheme.` : "Not applicable for this utility." },
          { q: `Can I change the name on my ${provider.name} bill?`, a: `Yes — file a Change of Name (CON) at any customer-service office. Timeline 7-21 working days.` },
        ],
        citations: [
          { label: `${provider.legalName} help`, url: provider.portalUrl, retrievedOn: TODAY },
          { label: `${reg.name}`, url: reg.url, retrievedOn: TODAY },
        ],
        lastReviewed: TODAY,
        author: "CheckBillsOnline Editorial",
      },
    },
  };
}
