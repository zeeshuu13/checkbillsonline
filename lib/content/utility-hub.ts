/**
 * Data-driven content generator for utility-type hub pages.
 *
 * Produces a rich ~4000-word content block for the
 * /{country}/electricity-bill-check, /{country}/gas-bill-check, and
 * /{country}/water-bill-check pages.
 *
 * All text is assembled from real Country and Provider data —
 * regulator names, provider count, currency, billing cycle, etc. —
 * so two countries with the same structure share similar phrasing but
 * differ on every factual data point.
 */

import type { Country, Provider, UtilityType } from "@/lib/types";
import type { ContentSection } from "./types";
import type { FaqItem } from "@/lib/seo/jsonLd";

export type { FaqItem };

export type UtilityHubContent = {
  /** Large intro paragraph shown directly under the H1. */
  heroIntro: string;
  sections: ContentSection[];
  faq: FaqItem[];
  /** Image queries for RemoteImage components — one per section break. */
  imageQueries: string[];
};

// ─── label helpers ────────────────────────────────────────────────────────────

const LABEL = {
  electricity: { lower: "electricity", title: "Electricity", product: "electricity supply", bills: "electricity bills", provider: "electricity distributor" },
  gas:         { lower: "gas",         title: "Gas",         product: "natural gas supply", bills: "gas bills",         provider: "gas distributor"         },
  water:       { lower: "water",       title: "Water",       product: "water supply",       bills: "water bills",       provider: "water utility"            },
};

function listify(arr: string[]): string {
  if (arr.length === 0) return "";
  if (arr.length === 1) return arr[0];
  return `${arr.slice(0, -1).join(", ")} and ${arr[arr.length - 1]}`;
}

function articleFor(word: string): "an" | "a" {
  return /^[aeiouAEIOU]/.test(word) ? "an" : "a";
}

// ─── main generator ────────────────────────────────────────────────────────────

export function buildUtilityHubContent(
  country: Country,
  type: UtilityType,
  providers: Provider[],
): UtilityHubContent {
  const u = LABEL[type];
  const reg =
    type === "electricity"
      ? country.electricityRegulator
      : type === "gas"
        ? (country.gasRegulator ?? country.electricityRegulator)
        : (country.waterRegulator ?? country.electricityRegulator);

  const regName = reg.shortName ?? reg.name;
  const providerCount = providers.length;
  const totalCustomers = providers.reduce((s, p) => s + (p.customers ?? 0), 0);
  const providerNames = providers.map((p) => p.name);
  const majorProviders = providerNames.slice(0, 5);
  const majorList = listify(majorProviders);
  const allAreas = [...new Set(providers.flatMap((p) => p.serviceAreas.slice(0, 2)))].slice(0, 8);
  const areaList = listify(allAreas);

  // ─── hero intro ────────────────────────────────────────────────────────────
  const heroIntro = `${country.name} has ${providerCount > 0 ? `${providerCount} licensed ${u.lower} ${providerCount === 1 ? "distributor" : "distributors"}` : `a regulated ${u.lower} sector`}${totalCustomers > 0 ? ` serving around ${totalCustomers.toFixed(1)} million ${u.lower} customers` : ""} under the oversight of ${reg.name}${reg.shortName ? ` (${reg.shortName})` : ""}. ${country.shortIntro} This page is your starting point for everything to do with ${u.bills} in ${country.name}: how to find your provider, how to check and read your bill, how to pay, how to resolve disputes, and how to protect your rights as a consumer under ${regName}'s regulations.`;

  // ─── sections ──────────────────────────────────────────────────────────────

  const sections: ContentSection[] = [];

  // 1 ── Sector overview
  sections.push({
    id: "sector-overview",
    imageQuery: type === "gas" ? "gas hob blue flame" : type === "water" ? "water tap dripping" : "electric power lines sunset",
    heading: `${country.name}'s ${u.lower} sector — how it is organised and who is in charge`,
    paragraphs: [
      `${country.name}'s ${u.lower} sector is regulated by ${reg.name}${reg.shortName ? ` — commonly referred to as ${reg.shortName}` : ""}. The regulator has statutory authority to approve tariffs, set service-quality standards, and adjudicate consumer complaints. For customers, that means every ${u.lower} bill you receive, every disconnection notice, and every complaint you raise is ultimately governed by the rules ${regName} has published — and those rules are publicly available.`,
      `${providerCount > 0
        ? `There ${providerCount === 1 ? "is" : "are"} currently ${providerCount} ${u.lower} ${providerCount === 1 ? "provider" : "providers"} listed on this site for ${country.name}${majorList ? `: ${majorList}` : ""}. Together they cover${areaList ? ` areas including ${areaList}` : " the country's major population centres"}.`
        : `${country.name}'s ${u.lower} sector is served by a small number of licensed operators whose coverage maps to the country's administrative regions.`} ${totalCustomers > 0 ? `Combined, these operators supply approximately ${totalCustomers.toFixed(1)} million ${u.lower} consumers. ` : ""}Each operator holds a distribution licence from ${regName} that ties their service obligations, tariff entitlements, and consumer-protection duties to a defined geographic zone.`,
      `In most countries the ${u.lower} distribution business is a regulated monopoly — meaning that if you live in a given area, you have one licensed ${u.lower} ${u.provider} and no practical choice of distributor. The trade-off for that monopoly is regulatory oversight: the operator cannot raise tariffs without ${regName} approval, cannot disconnect your supply without proper notice, and must resolve billing complaints within defined timelines or face formal sanction.`,
      `${country.name} bills are denominated in ${country.currency.name} (${country.currency.code}, symbol ${country.currency.symbol}). The billing cycle is ${country.billingCycle}: ${country.billingCycle === "monthly" ? "bills are issued once per calendar month, with the due date typically 14–21 days after the bill date" : country.billingCycle === "bimonthly" ? "bills are issued once every two months, with the due date typically 21–28 days after the bill date" : "bills are issued quarterly, with the due date typically 28 days after the bill date"}. Missing the due date triggers a late-payment surcharge; missing several cycles triggers a disconnection notice. Understanding the cycle is the first step to managing your bill proactively.`,
      `${country.name} operates on a ${country.voltageStd} standard${type === "electricity" ? ", which sets the voltage and frequency of the electricity grid" : ""}. ${country.electrificationRate >= 99 ? `${country.name} has near-universal ${u.lower} access with an electrification rate of ${country.electrificationRate}%, meaning almost every household and business is connected.` : country.electrificationRate >= 85 ? `${country.name}'s ${u.lower} access stands at ${country.electrificationRate}%, with good urban coverage and ongoing rural expansion programmes.` : `${country.name} is actively expanding ${u.lower} access — the current coverage rate is around ${country.electrificationRate}%, with the government and regulator prioritising rural connections.`}`,
    ],
  });

  // 2 ── How to find your provider
  sections.push({
    id: "find-your-provider",
    imageQuery: type === "gas" ? "gas hob blue flame" : type === "water" ? "water tap dripping" : "electric power lines sunset",
    heading: `How to find your ${u.lower} provider in ${country.name}`,
    paragraphs: [
      `Your ${u.lower} provider is determined by the address of the connection — not by any choice you make. Each licensed operator in ${country.name} has a defined service territory, and if your address falls inside that territory, that operator is your provider. The easiest way to confirm who your provider is to look at any recent ${u.lower} bill: the operator's logo, legal name, and contact details are printed at the top.`,
      `If you do not have a bill on hand — you just moved in, inherited a property, or are dealing with a rented flat where the landlord manages the account — there are a few reliable ways to find out. First, check the physical meter: it often has a sticker or plate with the operator's name and a helpline number. Second, ask your building management or the previous tenant; in rented property the operator is almost always whoever the landlord has always paid.`,
      `${providerCount > 0
        ? `The ${providerCount} ${u.lower} ${providerCount === 1 ? "provider" : "providers"} currently listed for ${country.name} on this site ${providerCount === 1 ? "is" : "are"} ${majorList}. Each provider's page on this site includes the service areas covered, the reference-number format for online bill checks, the helpline number, and a direct link to the official portal.`
        : `The operators currently active in ${country.name} are listed below. Each card links to a bill-check page with the operator's official portal link, reference-number format, and helpline.`}`,
      `Once you know your provider's name, come back to this page, find the provider card below, and click through. The provider page has the specific steps for checking your bill online with that operator's reference-number format, the current tariff structure as approved by ${regName}, and the exact escalation path if you need to raise a complaint.`,
      `If your address straddles two service territories — possible in border areas between two licensed operators — the definitively correct answer comes from ${regName}'s licence registry, which maps every service territory at the sub-district level. The regulator's website at ${reg.url} publishes this information.`,
    ],
  });

  // 3 ── How to check your bill
  sections.push({
    id: "how-to-check-bill",
    imageQuery: type === "gas" ? "gas hob blue flame" : type === "water" ? "water tap dripping" : "electricity bill statement",
    heading: `How to check your ${u.lower} bill online in ${country.name}`,
    paragraphs: [
      `Checking a ${u.lower} bill online in ${country.name} works differently by operator, but the principle is the same everywhere: you enter a unique account or reference number, and the operator's system returns your current bill. The number itself is almost always printed prominently on any previous bill — near the top, near the operator's logo, in larger type than the surrounding text.`,
      `The simplest path is through this site: click the provider card below, go to the provider's bill-check page, enter your reference number in the form, and the page either fetches your bill in real time (for operators connected to our live-data integration) or opens the official portal pre-filled so the bill loads in one tap. No account registration is required; no personal data is stored on our servers.`,
      `Beyond this site, most ${country.name} operators offer at least three direct channels. First, the operator's own website — every licensed operator in ${country.name} is required by ${regName} to provide an online bill-view facility. Second, the operator's mobile app, where available — these tend to have the cleanest interface and add consumption graphs and due-date reminders. Third, banking and wallet apps: ${country.name}'s domestic bill-pay network means you can fetch and pay any ${u.lower} bill from inside your bank's mobile app by selecting the ${u.lower} biller and entering your reference number.`,
      `For customers who prefer not to go online, the alternative is calling the operator's helpline with the account number and registered name. The helpline agent can read the outstanding amount to you, confirm the due date, and arrange payment. A third alternative is visiting the operator's walk-in customer-service centre — bring any previous bill or the physical meter card as identification.`,
      `The most common reason a bill lookup fails is a mistyped reference number. The reference formats are specific: for some operators the number must be exactly 14 digits, for others 10–13 digits are valid, for a few it includes dashes or spaces. Check the format specified on the provider's bill-check page before entering the number, and make sure you are reading the right field on the bill — the consumer number, the account number, and the reference number on some bills are different numbers in different positions.`,
      `PDF bills downloaded from the operator's portal are widely accepted as proof of address by banks, visa authorities, and rental agencies in ${country.name}. To use a bill as proof of address, the bill must be dated within the last three months and the name on the bill must match your identification document. If the bill is still in a previous occupant's name, request a Change of Name from the operator before using the bill for documentation purposes.`,
    ],
  });

  // 4 ── Reading / understanding your bill
  sections.push({
    id: "reading-your-bill",
    imageQuery: type === "gas" ? "gas hob blue flame" : type === "water" ? "water tap dripping" : "electric grid transformer",
    heading: `Reading your ${u.lower} bill — understanding every line item`,
    paragraphs: [
      `${country.name} ${u.lower} bills follow a standard layout: identifying information at the top, consumption and charges in the middle, and statutory levies and totals at the bottom. Reading them in order matters because some charges are calculated as percentages of other charges — a change in the energy charge moves those percentage lines even when no rate has changed.`,
      `The top block of the bill carries the identifiers: your account or reference number, your registered name and service address, your tariff category (residential, commercial, industrial, or agricultural), your sanctioned load (the maximum demand you are permitted to draw, in kW or kVA), and the meter number. Check the tariff category first. If a residential property is classified as commercial because a previous occupant ran a business from the address, you may be billed at a higher per-unit rate without realising it. Correcting the category is a straightforward application at the operator's customer-service office.`,
      type === "electricity"
        ? `The consumption block shows the previous meter reading, the current meter reading, and the difference — the units consumed in this billing period. Most ${country.name} electricity bills show consumption in kilowatt-hours (kWh or "units"). Below the raw consumption, the bill applies your tariff's slab rates. Most residential tariffs in ${country.name} use a graduated (telescopic) slab: the first block of units is priced at the lowest rate, the next block at a higher rate, and so on. The bill explicitly shows the slab boundaries and the rate applied to each slab so you can verify the arithmetic yourself.`
        : type === "gas"
          ? `The consumption block shows the previous and current meter readings (typically in cubic metres or units), the difference, and any calorific-value conversion factor used to translate volume into energy. The charges are then applied: a standing charge (flat per month regardless of consumption), a unit rate (per m³ or per therm), and in some tariffs a tiered rate where the first block of consumption is priced differently from the next. The bill explicitly shows which rate applied to which consumption block.`
          : `The consumption block shows the previous and current meter readings in cubic metres (or gallons, depending on the operator), the units consumed, and the charge. Most water bills in ${country.name} include a separate sewerage or wastewater component charged as a percentage of the water volume consumed, or as a flat fee. The total is a combination of the volumetric water charge and the sewerage charge, and sometimes a standing charge covering meter maintenance.`,
      `Fixed charges (also called standing charges or capacity charges) appear as a flat line regardless of how much you consumed. They fund the meter, the service-line maintenance, and the operator's customer-service infrastructure. Even a zero-consumption bill carries the fixed charge. If you suspect your fixed charge is incorrect, compare the sanctioned load on your bill to the rate table for that load published by ${regName} — fixed charges are load-dependent and publicly notified.`,
      `Statutory levies fill the bottom of the bill. These are government-mandated taxes and surcharges: a general sales tax or VAT, provincial or state duties, and sometimes sector-specific financing surcharges. They are percentages applied on top of the energy and fixed charges. Understanding the base each percentage is applied to is the key to predicting how a change in consumption changes your total bill — a 5% GST applied only on the energy charge moves differently from a 5% GST applied on the total of energy + fixed + pass-through.`,
      `The total payable appears at the bottom as two figures in most ${country.name} bills: the within-due-date amount and the after-due-date amount. The difference between them is the late-payment surcharge. Paying on time costs you the smaller amount; paying after the due date but before disconnection costs you the surcharge but saves the reconnection fee. Never ignore both dates and let it reach disconnection if you can avoid it — reconnection is more expensive and more disruptive than even a large late-payment surcharge.`,
    ],
  });

  // 5 ── Tariff structure
  sections.push({
    id: "tariff-structure",
    imageQuery: "electric grid transformer",
    heading: `Tariff structure — how ${u.lower} rates are set in ${country.name}`,
    paragraphs: [
      `${u.title} tariffs in ${country.name} are approved and published by ${reg.name}${reg.shortName ? ` (${regName})` : ""}. The regulator does not merely consult on rates — it formally approves them through a quasi-judicial tariff determination process. Operators submit cost-of-service filings; the regulator reviews them, holds public hearings (in some countries), and issues a tariff order that becomes the legally binding rate schedule. The operator has no discretion to deviate.`,
      `Tariff orders are typically issued once per financial year, with quarterly or monthly adjustments to account for input-cost fluctuations — most commonly the pass-through for fuel costs in electricity, gas-purchase costs in gas, and chemical/energy costs in water. These adjustments can make the effective per-unit rate you pay fluctuate month to month even when the base tariff order has not changed.`,
      `${type === "electricity"
        ? `Residential electricity tariffs in ${country.name} are structured as a slab (also called block or tier) system. The first block of units per month carries the lowest per-unit rate; progressively higher blocks carry higher per-unit rates. This is designed to keep small consumers (single-room flats, low-income households) on an affordable rate while reflecting the higher system cost of large consumption. A household just over a slab boundary pays a higher rate on every unit above the boundary — reducing consumption by even a few units per month can shift you into a lower slab and amplify the saving across all those units. The specific slab boundaries and per-unit rates for each licensed operator are notified by ${regName} and are published on every bill.`
        : type === "gas"
          ? `Residential gas tariffs in ${country.name} typically have two components: a standing charge (flat per month) and a volumetric rate (per m³ or therm of gas consumed). In some operators the volumetric rate is also tiered by consumption level. The standing charge is set by reference to the sanctioned gas pressure and meter size; the volumetric rate is the component most affected by input-cost pass-throughs. ${regName} publishes the approved rates in its tariff determinations.`
          : `Water tariffs in ${country.name} are typically set by the relevant water authority or regulator. The standard structure includes a volumetric water charge, a sewerage/wastewater charge (often a percentage of the water volume), and sometimes an infrastructure levy tied to the cost of the treatment and distribution network. In some areas a lifeline block — a small volume at a subsidised rate — is provided to very-low-consumption households. ${regName}'s website publishes the current rate schedule.`}`,
      `Commercial and industrial consumers typically pay a different tariff from residential customers. Commercial tariffs are often structured as a flat per-unit rate (non-telescopic), meaning all consumption in a cycle is billed at the same rate rather than graduated. For a small business close to a commercial/residential tariff boundary, it is worth checking with the operator whether your connection is on the correct category — misclassification is a common billing error and is fully correctable through a written application.`,
      `Protected or "lifeline" tariffs exist in most ${country.name} category ${u.lower} operators for low-income or low-consumption households. These are approved by ${regName} as a social subsidy: consumers whose consumption stays below a defined monthly threshold pay a lower per-unit rate or receive a fixed discount. Eligibility criteria and the application mechanism vary by operator; check the operator's website or ${regName}'s consumer-affairs section for the local programme. For electricity consumers in Pakistan, the Cross Subsidy Scheme at css.pitc.com.pk is a notable example.`,
      `To verify the tariff on your bill, locate the tariff code printed in the identifiers block (typically a letter-number combination like "D-I" or "LT-1") and compare it to the rate table in ${regName}'s most recent tariff order. Both the regulator's website and the operator's own customer-service desk should be able to provide the current approved rate table on request. If the rate on your bill does not match the approved schedule, that is a billing error — raise it with the operator first, then with ${regName} if unresolved.`,
    ],
  });

  // 6 ── Payment methods
  sections.push({
    id: "payment-methods",
    imageQuery: type === "gas" ? "gas hob blue flame" : type === "water" ? "water tap dripping" : "electricity bill statement",
    heading: `How to pay your ${u.lower} bill in ${country.name} — all approved channels`,
    paragraphs: [
      `${country.name} ${u.lower} operators accept payment through a range of channels. The cheapest channel for most consumers is digital: a payment through the operator's portal or app using a linked bank account or a digital wallet funded from a bank balance. This typically incurs no fee, settles within minutes, and generates a digital receipt that serves as proof of payment. Payment through a bank's own mobile app using the domestic bill-pay network is equally free and equally instant.`,
      `Card payments — credit or debit — are accepted by most operators, usually with a small convenience fee of 1–2% to cover the card-network interchange charge. The fee is displayed before you confirm payment; you can always choose to use a bank-transfer or wallet channel to avoid it. Never pay a utility bill through a third-party "payment app" you do not recognise — the official payment channels are listed on the operator's own website, and using an unofficial channel risks the payment not reaching the operator's account.`,
      `For consumers who prefer in-person cash payment, every ${country.name} ${u.lower} operator maintains customer-service offices and often additional authorised payment points at partner banks or post offices. Cash payments are reflected in the operator's system within a few hours of the counter transaction. Always collect and keep the printed receipt — it is your only proof of payment for a cash transaction. For visa applications or other official uses, a cash payment receipt with the operator's stamp is accepted just as a digital receipt would be.`,
      `Auto-pay (also called direct debit or NACH mandate, depending on the country) is the most reliable long-term payment method. Set up once, it pulls the bill amount automatically a few days before the due date. The main risk is that it pulls whatever amount is billed — including any spike from a tariff revision or a billing error. Most consumers find it worth the occasional monitoring cost to never miss a payment. Setting up and cancelling auto-pay is typically done through the operator's portal or through your bank's standing-instruction service.`,
      `Late-payment carries a surcharge that is approved by ${regName}. The surcharge is typically a percentage of the overdue amount, applied from the day after the due date. After a country-specific period (usually 15–30 days), the operator can issue a disconnection notice. Disconnection itself happens after a further statutory notice period. Reconnection after disconnection for non-payment requires paying the full outstanding amount plus a reconnection fee. It is always financially better to pay late with a surcharge than to be disconnected and reconnected.`,
      `Disputing a bill does not pause the payment obligation in most ${country.name} operators' terms. If you believe your bill is wrong, the correct process is to pay it "under protest" — pay the amount to avoid the late-payment surcharge and the disconnection risk, while simultaneously raising a formal complaint with the operator. If the complaint is resolved in your favour, the adjustment appears as a credit on a future bill. Never withhold payment to "force" a resolution; it is more likely to result in disconnection than in a faster response from the customer-service team.`,
    ],
  });

  // 7 ── Complaints and escalation
  sections.push({
    id: "complaints",
    imageQuery: type === "gas" ? "gas hob blue flame" : type === "water" ? "water tap dripping" : "electric power lines sunset",
    heading: `Raising a complaint and escalating to ${regName}`,
    paragraphs: [
      `When a ${u.lower} bill looks wrong — an unexpectedly high amount, a meter reading that does not match the actual meter, a charge that does not appear in the tariff schedule — the first step is always the operator's own customer service. For most operators in ${country.name}, the helpline is the fastest route for straightforward billing queries; a walk-in customer-service centre is better for complex disputes that require documents. Always note the complaint reference number the operator gives you. Without a reference number, the complaint does not formally exist in the operator's system, and follow-up is difficult.`,
      `Prepare before you call or visit. The documents you need: the bill in dispute, your reference or account number, a photo of the actual meter reading (dated), and any prior complaint reference numbers. If the dispute is about a tariff classification or a meter fault, also bring the last two or three bills so the pattern is visible. The more prepared you are, the faster the customer-service agent can log and route the complaint.`,
      `${country.name}'s regulatory framework gives the operator a defined period to resolve each complaint category — typically 7–15 working days for billing disputes, 15–30 days for metering disputes. If the operator does not resolve within that period, or if you are unsatisfied with their response, you can escalate directly to ${regName}. The regulator's consumer-affairs office accepts complaints in writing, by email, and in many cases through an online portal. The regulator's website at ${reg.url} has the complaint form and the contact details.`,
      `${regName}'s consumer-affairs forum is a quasi-judicial process. You do not need a lawyer for routine consumer complaints; you can represent yourself. The regulator reviews the complaint, requests the operator's response, and can issue a binding order requiring the operator to correct the bill, refund an overcharge, or pay compensation for a service-quality breach. The process is free of charge for consumers.`,
      `Compensation is available for certain service-quality breaches — prolonged outages beyond the regulator's permitted duration, repeated billing errors, failure to reconnect within the stipulated period after payment. The compensation rates are published in ${regName}'s Standards of Performance regulation. Compensation is typically a small fixed amount per day of breach; it is paid as a credit on a future bill or, in some cases, as a refund. If you believe you are owed compensation, include the dates and the specific breach in your complaint letter to the operator and to the regulator.`,
      `Two things to remember throughout a dispute. First, keep a paper trail of every communication — every phone call (note the date, time, and agent name), every email, every visit receipt. The trail is what moves the complaint forward at each escalation level. Second, always pay the disputed bill amount (under protest if necessary) while the dispute is ongoing — letting the bill go unpaid risks disconnection, which is a separate problem from the billing dispute and is harder to reverse.`,
    ],
  });

  // 8 ── Consumer rights
  sections.push({
    id: "consumer-rights",
    imageQuery: "electric grid transformer",
    heading: `Consumer rights for ${u.lower} customers in ${country.name}`,
    paragraphs: [
      `Every ${u.lower} consumer in ${country.name} has enforceable rights under the framework ${regName} has put in place. These rights exist regardless of which operator supplies you, and they cannot be waived by the operator or by anything printed on the back of your bill. The key rights are: accurate billing, advance notice before disconnection, a defined complaints-resolution timeline, and access to the regulator's dispute-resolution forum.`,
      `Right to accurate billing. ${country.name} regulations require that bills reflect actual meter readings, not persistent estimates. Where estimates are permitted (meter inaccessible, meter fault), the operator must reconcile with an actual reading within a defined number of cycles. If you receive an unusually high estimated bill, photograph your actual meter reading on the bill date and raise it with the operator immediately. If the actual reading is lower, the correction should appear on the next bill.`,
      `Right to advance notice before disconnection. The operator cannot cut your supply without a formal written disconnection notice delivered to your registered address, with a minimum notice period (typically 5–15 days, depending on the country and the type of breach) before disconnection. An operator that disconnects without proper notice is in breach of ${regName}'s regulations and is liable to a formal complaint.`,
      `Right to a complaints timeline. ${regName} specifies maximum turnaround times for each complaint category. If the operator misses the deadline, you are entitled to escalate to the regulator without waiting further. Keep a record of the date you submitted the complaint and the date the operator is required to respond — the deadline is your trigger for escalation.`,
      `Right to meter testing. If you suspect your meter is over-counting, you can request a formal meter test through the operator. The operator sends an accredited technician to test the meter against a reference standard. If the meter tests within tolerance, the consumer typically pays a test fee. If the meter tests outside tolerance, the operator pays for the test and is required to adjust your recent bills for the period the meter was faulty — the adjustment is calculated using the discrepancy percentage and applied to the previous 3–6 months of bills, depending on the regulator's rules.`,
      `Right to a refund of security deposit. The deposit paid when a connection was first installed accrues interest at the rate notified by ${regName} each year. When the connection is permanently closed or transferred to a new occupant, the deposit plus accrued interest is refundable. Many consumers are unaware that the deposit earns interest; when moving out of a long-standing connection, it is worth requesting a deposit statement before closing the account.`,
    ],
    bullets: [
      `Right to accurate billing — actual meter readings, reconciled estimates within set periods`,
      `Right to advance disconnection notice — minimum 5–15 days written notice, country-dependent`,
      `Right to a complaints resolution timeline — defined by ${regName} for each complaint type`,
      `Right to meter testing — free if the meter is faulty; fee if the meter tests within tolerance`,
      `Right to compensation — for service-standard breaches (prolonged outages, repeated errors)`,
      `Right to security-deposit refund — with accrued interest, on permanent disconnection`,
      `Right to change tariff category — if the current classification does not match actual use`,
      `Right to ${regName} escalation — free-of-charge quasi-judicial consumer forum`,
    ],
  });

  // 9 ── Practical tips (electricity-specific or generic)
  if (type === "electricity") {
    sections.push({
      id: "energy-saving",
      imageQuery: "electric power lines sunset",
      heading: `Reducing your electricity bill in ${country.name} — practical steps that actually work`,
      paragraphs: [
        `The most effective way to lower an electricity bill is to understand exactly which appliances are driving consumption. Most ${country.name} households find, when they actually measure, that two or three large appliances account for 60–70% of the bill: the air conditioner or heater (depending on the climate), the water heater, and the refrigerator. Replacing a single old appliance with a high-efficiency model can cut consumption as much as a general "switch-off campaign" applied to every device in the house.`,
        `Before making any capital investment, check where your consumption sits on the tariff slab. If your household is sitting just above a slab boundary — say, 305 units in a billing period where the slab boundary is 300 units — a small reduction in consumption drops you into the lower slab and amplifies the saving across all 305 units (not just the 5 above the boundary). The slab structure means the marginal saving per unit is highest at slab boundaries; identify yours from your bill and work from there.`,
        `Air conditioning is typically the largest controllable load in ${country.region} households. A 3-star non-inverter unit uses roughly 30–40% more electricity per hour than a 5-star inverter unit of the same capacity. The upgrade payback period on energy savings alone is typically 3–5 years; if the old unit is also unreliable or close to end-of-life, the combined case for replacement is even clearer. Setting the thermostat to 24–26°C instead of 18–20°C also cuts consumption significantly — each degree lower typically increases consumption by 6–8%.`,
        `Water heaters (geysers, boilers) are the second-highest load in most ${country.region} households. For households with intermittent hot-water needs, a tankless on-demand heater uses substantially less electricity than a tank heater that maintains temperature 24 hours a day. For households with solar access, a solar water heater offsets the electric heater almost entirely for 8–9 months of the year. The upfront cost is meaningful but the operating savings are substantial over a 10–15 year product life.`,
        `Smart meters, where installed by your operator, give you 15-minute consumption data through the operator's app. This data is the best tool for identifying unexpected consumption: a spike at 3 AM (when the household is asleep) points to a leaking hot-water tank thermostat or a malfunctioning refrigerator, not to deliberate use. Run the app for a month and look for anomalies before concluding that the bill is simply "high" — anomalies often indicate fixable faults rather than fundamental overconsumption.`,
        `Solar net-metering, where available under ${regName}'s regulations, allows residential consumers to install rooftop solar panels and feed surplus generation into the grid for credit against future bills. The application process involves the operator and ${regName}; capital cost payback is typically 4–7 years in ${country.region} depending on the local solar resource, the tariff rate, and available subsidies. For households consuming above the lowest slab threshold, net-metering consistently pays back faster than the average because the credits are applied against the highest-slab units first.`,
      ],
    });
  } else if (type === "gas") {
    sections.push({
      id: "gas-saving",
      imageQuery: "gas hob blue flame",
      heading: `Reducing your gas bill in ${country.name} — practical steps`,
      paragraphs: [
        `Most household gas consumption in ${country.name} comes from the water heater (40–50% of the bill), the cooktop (20–30%), and the central heating boiler if fitted (up to 40% in winter). Understanding which load drives your bill is the first step to reducing it — the answer varies by household type, size, and season.`,
        `Water heater efficiency is the highest-impact single change. An aging tank heater running 24 hours a day to maintain temperature loses a significant portion of its heat through the tank walls. Insulating the tank, reducing the set temperature to 55–60°C (which is both safer and more efficient), and switching to a tankless on-demand unit if your consumption pattern is intermittent can each cut water-heating consumption by 15–30%.`,
        `For cooktop use, replacing an old burner with a modern high-efficiency burner, or switching to an induction cooktop (where electricity is less expensive than gas in your tariff situation), can reduce cooking-related gas costs. More practically, using a pressure cooker cuts cooking time (and therefore gas use) by 50–70% for most slow-cook meals.`,
        `Check your bill for the standing charge relative to the volumetric charge. If your household uses very little gas (a small flat, warmer climate), the standing charge may be a large fraction of your total bill. Some operators offer a low-usage tariff or a voluntary disconnection arrangement for seasonal users; check with the operator.`,
        `Boiler servicing is worth doing annually. A poorly maintained boiler operating at low efficiency can consume 15–20% more gas than a serviced one running at design efficiency. In most ${country.name} operators' territory, annual boiler servicing by a Gas Safe (or equivalent) registered engineer is also a lease and insurance requirement for rented properties.`,
        `If your gas bill shows an unusually high estimated reading, check the actual meter immediately. Gas meters are generally reliable, but they do occasionally develop faults (most commonly a stuck dial or a slow leak past a valve). A gas meter fault is a formal complaint — report it to the operator who is required to test it within the period specified in ${regName}'s regulations.`,
      ],
    });
  } else {
    sections.push({
      id: "water-saving",
      imageQuery: "water tap dripping",
      heading: `Reducing your water bill in ${country.name} — practical steps`,
      paragraphs: [
        `The highest-impact step for reducing a water bill in ${country.name} is identifying and fixing leaks. A dripping tap wastes 15–20 litres per day; a leaking toilet flap (which is often silent and invisible) wastes 100–200 litres per day. Together, a dripping tap and a leaking toilet can add 30–60 extra cubic metres per year to your bill — which, at most ${country.name} water tariff rates, amounts to a meaningful sum and is completely preventable with a cheap replacement washer or flap.`,
        `The simplest leak check uses your water meter. Turn off all taps and appliances, then read the meter. Wait 30 minutes without using any water, then read the meter again. If the reading has changed, you have an active leak somewhere in the property. Systematic isolation (turning off branches one by one) will locate the leak.`,
        `Toilet flushing is the largest indoor water use in most households. Low-flush or dual-flush toilets use 4–6 litres per flush versus the 9–13 litres of older single-flush models. If you cannot replace the toilet, a "cistern displacement device" (available free from many water companies on request) reduces the flush volume by 1–2 litres with no installation required.`,
        `Outdoor irrigation, where applicable, is often the largest discretionary load. Drip irrigation systems use 30–50% less water than sprinkler systems for the same garden area. Watering in the early morning or late evening (rather than midday) reduces evaporation loss by 20–30%. A water timer connected to the outdoor tap ensures watering happens only at the efficient time even when you are not at home.`,
        `Check your bill for the standing charge composition. Many ${country.name} water bills include a separate sewerage charge calculated as a percentage of the water volume. Reducing water consumption therefore reduces both the water charge and the sewerage charge simultaneously — the combined saving per unit is higher than the water rate alone.`,
        `If your water meter is in an accessible location, reading it monthly (even between bill cycles) gives you a consumption baseline that makes spike detection easy. An unusual monthly total that does not correspond to any change in behaviour almost always points to a leak or a meter fault — either of which is reportable to the operator and fixable before the next formal bill arrives.`,
      ],
    });
  }

  // 10 ── New connection
  sections.push({
    id: "new-connection",
    imageQuery: type === "gas" ? "gas hob blue flame" : type === "water" ? "water tap dripping" : "electric power lines sunset",
    heading: `Getting a new ${u.lower} connection in ${country.name}`,
    paragraphs: [
      `Applying for a new ${u.lower} connection in ${country.name} involves submitting an application to the licensed operator for your area, paying a security deposit and any connection fee, passing a site inspection, and waiting for the physical connection to be made. The overall process timeline is typically 15–45 working days for a standard residential connection; higher-load or commercial/industrial connections that require network upgrades can take 60–120 days.`,
      `The standard documents required for a residential new-connection application in ${country.name} are: a proof of ownership or tenancy (sale deed, allotment letter, or rental agreement with landlord's NOC), a national identity document, a proof of the service address, and photographs of the proposed meter location. Most operators also charge a non-refundable application fee at submission.`,
      `After submitting the application, the operator schedules a site visit to verify the wiring, the proposed meter location, the distance from the nearest supply point, and the requested sanctioned load. The site visit results in a Demand Notice listing the final costs: the security deposit (based on the sanctioned load, as per ${regName}'s approved schedule), any service-line extension cost, and the meter installation fee. Once the Demand Notice is paid, the physical connection and meter installation are scheduled.`,
      `The security deposit is refundable. It is held by the operator while the connection is active, accrues interest at the rate notified by ${regName} each year, and is returned — with accumulated interest — when the connection is permanently closed. When buying a property, confirm that the previous owner's deposit will be transferred or refunded, and check whether there are any arrears on the connection before the handover — outstanding arrears can delay or block new applications.`,
      `For tenants who want a connection in their own name, the same process applies: the landlord typically needs to provide an NOC (no-objection certificate) allowing the tenant to apply for a new connection at the address. The security deposit is then the tenant's liability. Some tenants prefer to have the connection remain in the landlord's name and simply pay the bill — this is administratively simpler but means the bill is not in your name for documentation purposes (proof of address, etc.).`,
    ],
  });

  // ─── FAQ ───────────────────────────────────────────────────────────────────

  const faq: FaqItem[] = [
    {
      q: `How do I find my ${u.lower} provider in ${country.name}?`,
      a: `Your ${u.lower} provider is determined by your address. Check any previous ${u.lower} bill — the operator's name and logo are printed at the top. If you have no previous bill, look at the physical meter (usually labelled with the operator's name) or ask your building management. The provider cards below link to the current providers listed for ${country.name}.`,
    },
    {
      q: `How do I check my ${u.lower} bill online in ${country.name}?`,
      a: `Click your provider's card below to go to their bill-check page, then enter your account or reference number in the form. The form either fetches your bill in real time or opens the official portal pre-filled. You can also check through the operator's own website, the operator's mobile app, or the ${u.lower} biller tile in any major banking app in ${country.name}.`,
    },
    {
      q: `What is the due date on a ${country.name} ${u.lower} bill?`,
      a: `${country.billingCycle === "monthly" ? "Bills are issued monthly and the due date is typically 14–21 days after the bill date." : country.billingCycle === "bimonthly" ? "Bills are issued every two months and the due date is typically 21–28 days after the bill date." : "Bills are issued quarterly and the due date is typically 28 days after the bill date."} The due date is printed on the bill. Paying after the due date but before disconnection avoids disconnection but incurs a late-payment surcharge.`,
    },
    {
      q: `How do I pay my ${u.lower} bill in ${country.name}?`,
      a: `Payment channels include the operator's portal and app (usually free), banking apps via the domestic bill-pay network (free), digital wallets (free for bank-funded payments, small fee for card-funded), and in-person cash payment at the operator's customer-service offices and partner banks. The operator's specific payment channels are listed on their individual bill-check page.`,
    },
    {
      q: `What happens if I miss my ${u.lower} bill due date in ${country.name}?`,
      a: `A late-payment surcharge is applied from the day after the due date. After 15–30 days (varies by operator), the operator can issue a disconnection notice. Supply is disconnected after a further notice period. Reconnection requires full payment of the outstanding amount plus a reconnection fee. To avoid all this, pay "under protest" if you are disputing a bill — pay the amount to maintain supply while raising the dispute formally.`,
    },
    {
      q: `How do I dispute a ${u.lower} bill in ${country.name}?`,
      a: `Contact the operator's customer service first (helpline or walk-in office). Note the complaint reference number. The operator has a defined period to respond — typically 7–15 working days for billing disputes. If unresolved, escalate to ${reg.name} (${regName}) at ${reg.url}. The regulator's consumer-affairs forum is free and you can represent yourself without a lawyer.`,
    },
    {
      q: `What is the ${u.lower} regulator in ${country.name}?`,
      a: `${reg.name}${reg.shortName ? ` (${reg.shortName})` : ""}. The regulator approves tariffs, sets service-quality standards, and adjudicates consumer complaints for all licensed ${u.lower} operators in ${country.name}. Their website is ${reg.url}.`,
    },
    {
      q: `How do I apply for a new ${u.lower} connection in ${country.name}?`,
      a: `Apply at the licensed operator's customer-service office or through their online portal. Documents needed: ownership/tenancy proof, national ID, address proof, and photographs of the proposed meter location. Timeline: 15–45 working days for a standard residential connection. A security deposit (refundable, as set by ${regName}) and connection fee are payable before installation.`,
    },
    {
      q: `Can I get a ${u.lower} bill as proof of address in ${country.name}?`,
      a: `Yes — a ${u.lower} bill is widely accepted as proof of address in ${country.name} by banks, visa authorities, and rental agencies, provided it is dated within the last 3 months and the name on the bill matches your ID. Download the PDF from the operator's portal for a clean copy suitable for official submission.`,
    },
    {
      q: `How do I change the name on my ${u.lower} bill in ${country.name}?`,
      a: `File a Change of Name (CON) application at the operator's customer-service office. Documents required: transfer document (sale deed, allotment letter), both buyer's and seller's national IDs, the last paid bill (must be clear of arrears), and the CON fee. Timeline: 7–21 working days. Clear any arrears before applying — outstanding balances delay or block CON applications.`,
    },
    {
      q: `What is a security deposit for a ${u.lower} connection?`,
      a: `The security deposit is a refundable amount paid when a new connection is established. The amount is set by ${regName} based on the sanctioned load. It accrues interest at the rate notified by the regulator annually. The deposit plus accumulated interest is refunded when the connection is permanently closed or transferred to a new occupant.`,
    },
    {
      q: `Is it possible to switch ${u.lower} provider in ${country.name}?`,
      a: `In most ${country.name} areas, ${u.lower} distribution is a licensed territorial monopoly — you receive supply from the operator licensed for your address and cannot switch to a different distributor. In a small number of cities with overlapping licences, a changeover process may be available. Check with ${regName} for the current position in your area.`,
    },
  ];

  // ─── image queries ─────────────────────────────────────────────────────────
  // Use pre-fetched electricity images that exist in images.json
  const imageQueries =
    type === "gas"
      ? ["gas hob blue flame", "electric grid transformer", "electricity bill statement"]
      : type === "water"
        ? ["water tap dripping", "electric grid transformer", "electricity bill statement"]
        : ["electric power lines sunset", "electric grid transformer", "electricity bill statement"];

  return { heroIntro, sections, faq, imageQueries };
}
