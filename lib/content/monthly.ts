import type { Provider, Country } from "@/lib/types";
import { parseMonthYear, adjacentMonths, getSeason, type ParsedMonthYear } from "@/lib/seo/months";

export type MonthlyPageContent = {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  sections: MonthlySection[];
  faq: { q: string; a: string }[];
  prevMonth: string | null;
  nextMonth: string | null;
  lastReviewed: string;
};

type MonthlySection = {
  id: string;
  heading: string;
  body: string;
};

// Southern-hemisphere countries
const SOUTH_COUNTRIES = new Set(["australia", "new-zealand", "south-africa", "ghana", "tanzania", "nigeria", "kenya"]);

function hemisphere(countrySlug: string): "north" | "south" {
  return SOUTH_COUNTRIES.has(countrySlug) ? "south" : "north";
}

function seasonContext(parsed: ParsedMonthYear, countrySlug: string): string {
  const season = getSeason(parsed.month, hemisphere(countrySlug));
  const contexts: Record<typeof season, string> = {
    summer: "Summer months typically bring higher electricity consumption from air conditioning and cooling appliances, which can push bills above the monthly average.",
    winter: "Winter months tend to see increased energy use for heating, which often results in bills higher than the annual average.",
    spring: "Spring typically sees moderate energy consumption as temperatures are mild, so bills during this period are often closer to your annual average.",
    autumn: "Autumn brings cooling temperatures and generally moderate energy use before the winter heating season begins.",
  };
  return contexts[season];
}

function billingCycleNote(country: Country, parsed: ParsedMonthYear): string {
  if (country.billingCycle === "bimonthly") {
    const even = ["february", "april", "june", "august", "october", "december"];
    const isEven = even.includes(parsed.month);
    return isEven
      ? `${country.name} uses a bimonthly billing cycle, so a bill issued in ${parsed.label} covers two months of consumption.`
      : `Note: ${country.name} uses a bimonthly billing cycle. Bills are typically issued every two months, so you may not receive a new bill every single month.`;
  }
  return `${provider_stub_billing(country)} bills are issued on a monthly cycle, so your ${parsed.label} bill reflects consumption from the previous calendar month.`;
}

function provider_stub_billing(country: Country): string {
  return country.name;
}

function stepByStepGuide(provider: Provider, country: Country, parsed: ParsedMonthYear): string {
  const tier = provider.billCheckTier;
  if (tier === "A-real") {
    return `Checking your ${provider.name} bill for ${parsed.label} takes under a minute through the online portal. Here is the exact process:\n\n**Step 1 — Find your ${provider.referenceFormat.label}.** This is printed on the top-right section of any previous paper bill or on your meter card. It follows the format: ${provider.referenceFormat.example}.\n\n**Step 2 — Enter your reference.** Use the bill check form at the top of this page. Type or paste your ${provider.referenceFormat.label} and press "Check Bill".\n\n**Step 3 — View your ${parsed.label} bill.** Your current outstanding amount, due date, and consumption units are displayed immediately. No login required.\n\n**Step 4 — Pay online.** Use the payment link shown on the results screen to pay via debit card, bank transfer, or mobile wallet without visiting a payment centre.`;
  }
  if (tier === "B-deeplink") {
    return `To view your ${provider.name} bill for ${parsed.label}, follow these steps:\n\n**Step 1 — Locate your ${provider.referenceFormat.label}.** You can find this on any printed bill from ${provider.name} or on your account registration confirmation. Example format: ${provider.referenceFormat.example}.\n\n**Step 2 — Use the form above.** Enter your ${provider.referenceFormat.label} and click "Check Bill". You will be redirected directly to your account on the ${provider.name} official portal.\n\n**Step 3 — Review your bill.** The portal shows your ${parsed.label} consumption, charges, and due date.\n\n**Step 4 — Make a payment.** Use the official portal's payment page to settle your ${parsed.label} bill through the available options.`;
  }
  return `To check your ${provider.name} bill for ${parsed.label}:\n\n**Step 1 — Visit the ${provider.name} official portal.** Use the "Check Bill" button at the top of this page to open ${provider.portalUrl} in a new tab.\n\n**Step 2 — Log in or register.** First-time users must create an account using their ${provider.referenceFormat.label} (example: ${provider.referenceFormat.example}) and a registered mobile number or email.\n\n**Step 3 — Select billing period.** Navigate to the billing section and select ${parsed.label} to view your statement.\n\n**Step 4 — Download or pay.** You can download a PDF copy of the bill or proceed to online payment directly from the portal.`;
}

export function buildMonthlyContent(
  provider: Provider,
  country: Country,
  monthSlug: string,
): MonthlyPageContent {
  const parsed = parseMonthYear(monthSlug);
  if (!parsed) throw new Error(`Invalid monthSlug: ${monthSlug}`);

  const { prev, next } = adjacentMonths(monthSlug);
  const utilType = provider.type === "electricity" ? "electricity" : provider.type === "gas" ? "gas" : "water";
  const base = `/${country.slug}/${provider.routeSlug}`;

  const metaTitle = `Check ${provider.name} Bill ${parsed.label} — Online Guide | CheckBillsOnline`;
  const metaDescription = `How to check your ${provider.name} ${utilType} bill for ${parsed.label}. Tariff rates, payment due date, online check options and customer support contacts.`;
  const h1 = `How to Check Your ${provider.name} Bill for ${parsed.label}`;

  const intro = `Your ${provider.name} ${utilType} bill for ${parsed.label} is available online. ${seasonContext(parsed, country.slug)} This guide walks you through the quickest way to view your outstanding amount, understand the charges, and pay — all without visiting a payment office. ${billingCycleNote(country, parsed)}`;

  const sections: MonthlySection[] = [
    {
      id: "how-to-check",
      heading: `How to Check Your ${provider.name} Bill Online — ${parsed.label}`,
      body: stepByStepGuide(provider, country, parsed),
    },
    {
      id: "bill-amount",
      heading: `Understanding Your ${parsed.label} Bill Amount`,
      body: `Your ${provider.name} ${utilType} bill for ${parsed.label} is calculated based on the units consumed during the billing period, applied against the current tariff slab rates set by ${country.electricityRegulator?.shortName ?? country.electricityRegulator?.name ?? "the national regulator"}. The bill typically includes:\n\n- **Energy charges** — the cost per unit (kWh for electricity) multiplied by your consumption\n- **Fixed charges / meter rent** — a flat monthly fee regardless of consumption\n- **Government levies and taxes** — VAT, electricity duty, or other statutory surcharges\n- **Fuel adjustment charges** — quarterly adjustments reflecting actual fuel procurement costs (where applicable)\n\nIf your ${parsed.label} bill appears higher than usual, the most common causes are increased seasonal consumption, a tariff revision effective from this period, or a meter-read catch-up after an estimated bill. Check the "units consumed" line on your bill first — if the number is higher than your typical month, the usage itself is the driver rather than an administrative error.\n\nFor exact slab rates, see our [${provider.name} Tariff Guide](${base}/tariff).`,
    },
    {
      id: "tariff-rates",
      heading: `${parsed.label} Tariff Rates for ${provider.name}`,
      body: `The tariff rates applicable to your ${parsed.label} bill are set by ${country.electricityRegulator?.name ?? "the national regulator"} and are periodically revised. The charges are structured in consumption slabs — lower-use households pay a lower per-unit rate, while higher-consumption users attract a higher rate.\n\nFor the complete, up-to-date slab table with exact rates and applicable surcharges, see our dedicated [${provider.name} Tariff page](${base}/tariff). That page is updated every time the regulator publishes a new tariff determination and cites the official source document with its retrieval date.\n\nWhen reading your ${parsed.label} bill, look for the "tariff category" or "consumer category" line — it tells you which rate band applies to your connection. Domestic consumers (Residential / Domestic) are billed at the residential slab rates, which are typically lower than commercial or industrial rates.`,
    },
    {
      id: "payment-options",
      heading: `Payment Options for Your ${parsed.label} ${provider.name} Bill`,
      body: `Once you have viewed your ${provider.name} bill for ${parsed.label}, you have several ways to settle it before the due date:\n\n${provider.billCheckTier === "A-real" ? `**Online payment** — The bill check result page above shows a direct payment link. You can pay by debit/credit card, internet banking, or mobile wallet without leaving your home.\n\n` : ""}**Official portal** — Log in to ${provider.portalUrl} to pay via the provider's own payment gateway.\n\n**Mobile apps** — Most ${country.name} utility providers support payment through the national payments app or the provider's own mobile app.\n\n**Bank/ATM** — Your ${provider.referenceFormat.label} serves as the payment reference at any bank branch or ATM that supports utility bill payments.\n\n**Franchise/agent locations** — Authorised collection agents accept cash payments across ${provider.serviceAreas.join(", ")}.\n\nFor the full list of payment channels and step-by-step payment instructions, see our [${provider.name} Payment Methods guide](${base}/payment-methods).`,
    },
    {
      id: "due-date",
      heading: `${provider.name} Bill Due Date — ${parsed.label}`,
      body: `Your ${parsed.label} bill from ${provider.name} will show a specific due date printed on the statement. In ${country.name}, utility bills must be paid within the period shown on the bill to avoid late payment surcharges.\n\nAs a general guide, ${country.billingCycle === "monthly" ? "monthly bills" : "bimonthly bills"} from ${provider.name} are typically due within 15 to 30 days of the bill issue date. The exact due date varies by billing cycle and your meter reading date, so always check the "Due Date" or "Last Date of Payment" line on your specific ${parsed.label} bill.\n\nPaying after the due date usually triggers a surcharge (typically 1–2% of the overdue amount in ${country.name}). If your payment is significantly delayed, the provider may issue a disconnection notice — see our [${provider.name} Complaints & Reconnection guide](${base}/complaints) for what to do if that happens.`,
    },
    {
      id: "support",
      heading: `${provider.name} Customer Support — ${parsed.label} Bill Queries`,
      body: `If you have a dispute or query about your ${parsed.label} bill, the fastest resolution paths are:\n\n**Phone:** Call ${provider.supportPhone} during business hours. Have your ${provider.referenceFormat.label} ready when you call.\n\n${provider.supportEmail ? `**Email:** Send a written query with your ${provider.referenceFormat.label} and a clear description of the issue to ${provider.supportEmail}.\n\n` : ""}**Service centres:** Visit any ${provider.name} service centre in ${provider.serviceAreas[0]} with your original bill and a copy of your CNIC or equivalent ID.\n\n**Online portal:** Log in to ${provider.portalUrl} and use the "Complaints" or "Contact Us" section to raise a formal complaint with a reference number.\n\nFor detailed escalation steps — including what to do if the provider does not resolve your complaint — see our full [${provider.name} Complaints guide](${base}/complaints).`,
    },
  ];

  const faq: { q: string; a: string }[] = [
    {
      q: `How do I check my ${provider.name} bill for ${parsed.label}?`,
      a: `Enter your ${provider.referenceFormat.label} in the form at the top of this page. Your ${parsed.label} bill amount, due date, and consumption details will be shown immediately.`,
    },
    {
      q: `When is the ${provider.name} ${parsed.label} bill due?`,
      a: `The exact due date is printed on your ${parsed.label} bill statement. ${country.name} ${utilType} bills are generally due within 15–30 days of the issue date. Check the "Due Date" line on your bill.`,
    },
    {
      q: `Why is my ${provider.name} ${parsed.label} bill higher than last month?`,
      a: `The most common reasons are increased seasonal consumption (${getSeason(parsed.month, hemisphere(country.slug))} months often use more energy), a tariff revision, or a meter-read catch-up after an estimated bill. Check the "units consumed" on your bill first.`,
    },
    {
      q: `Can I pay my ${provider.name} ${parsed.label} bill online?`,
      a: `Yes. Use the payment link on the bill check result page, or visit ${provider.portalUrl}. You can also pay at any authorised bank branch or agent location using your ${provider.referenceFormat.label}.`,
    },
    {
      q: `What is the ${provider.name} ${provider.referenceFormat.label}?`,
      a: `Your ${provider.referenceFormat.label} is a unique account identifier printed on every bill. It follows the format ${provider.referenceFormat.example}. Keep it handy for any bill check, payment, or customer support query.`,
    },
    {
      q: `What if I did not receive my ${provider.name} bill for ${parsed.label}?`,
      a: `You can view your outstanding ${parsed.label} bill online using the form above — no paper bill needed. If no bill appears, call ${provider.supportPhone} to confirm your meter reading cycle and billing status.`,
    },
    {
      q: `How do I complain about an incorrect ${provider.name} ${parsed.label} bill?`,
      a: `Call ${provider.supportPhone} or visit any ${provider.name} service centre with your bill and ${provider.referenceFormat.label}. You can also submit a complaint via ${provider.portalUrl}. For escalation paths, see our [Complaints guide](${base}/complaints).`,
    },
    {
      q: `What tariff rate applies to my ${provider.name} ${parsed.label} bill?`,
      a: `Your rate depends on your consumer category and consumption level. The current slab rates are published by ${country.electricityRegulator?.shortName ?? "the regulator"}. See our [${provider.name} Tariff page](${base}/tariff) for the complete table.`,
    },
  ];

  return {
    metaTitle,
    metaDescription,
    h1,
    intro,
    sections,
    faq,
    prevMonth: prev,
    nextMonth: next,
    lastReviewed: "2026-05-19",
  };
}
