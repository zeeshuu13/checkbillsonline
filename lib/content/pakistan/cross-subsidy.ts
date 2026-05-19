/**
 * Cross Subsidy Program (CSS) cluster content for Pakistan.
 *
 * Ported from the MEPCO/checkbills.pk project to mirror the same SEO/cluster
 * strategy. All paths are prefixed with `/pakistan/cross-subsidy-program`
 * so they nest correctly under the Pakistan country hub.
 *
 * Pure data — no React imports — so it can be reused by JSON-LD, sitemap
 * generators, and tests.
 */

import type { FaqItem } from "@/lib/seo/jsonLd";

export const CSS_PATH = "/pakistan/cross-subsidy-program";

/* ---------- FAQ sets (one per cluster page) ---------- */

export const CSS_FAQ_LANDING: FaqItem[] = [
  {
    q: "What is the Cross Subsidy Program (CSS) by PITC?",
    a: "The Cross Subsidy Program is a Government of Pakistan initiative administered through the Power Information Technology Company (PITC). It identifies genuine low-usage domestic electricity consumers and links them to the protected (lifeline) tariff slab, reducing the per-unit cost of their monthly bill. Eligible consumers register with their 14-digit reference number, CNIC, and a mobile number that receives a one-time password (OTP) for verification.",
  },
  {
    q: "Who is eligible for the Cross Subsidy Program?",
    a: "Domestic consumers whose monthly consumption stays under the protected threshold for the past six months (typically up to 200 units per month) and who have a single live electricity connection in their name or household are usually eligible. Commercial, industrial, and agricultural connections, joint or shared meters, and households with multiple connections in the same CNIC are typically excluded.",
  },
  {
    q: "How do I check my eligibility on checkbillsonline.com?",
    a: "Enter your 14-digit reference number on the Cross Subsidy Program page. We copy it to your clipboard and open the official css.pitc.com.pk homepage in a new tab. Paste the reference into the form there and submit — if you are eligible, PITC redirects you to the /register page that displays your meter owner details and asks for your CNIC and mobile for OTP. If you are not eligible, PITC keeps you on the homepage and shows an inline error. We never store your reference, CNIC, or mobile — all of that lives only on the official PITC system.",
  },
  {
    q: "Do I need a CNIC and a mobile number to register?",
    a: "Yes. The CSS portal validates that the CNIC matches the registered consumer name on the meter, and sends an OTP to the mobile number you enter. The mobile number must be biometrically verified (PTA SIM in the same household member's name) and reachable for SMS at the time of registration.",
  },
  {
    q: "Is there a fee to register on the Cross Subsidy Program?",
    a: "No. Registration on css.pitc.com.pk is completely free. Neither PITC nor your DISCO charges a registration fee. checkbillsonline.com also charges nothing — the form here is a convenience funnel to the official PITC portal. If anyone asks you to pay to register on CSS, it is a scam.",
  },
  {
    q: "How long does subsidy approval take after registration?",
    a: "After OTP verification, your application is queued for back-end consumer database checks by your DISCO and PITC. The official PITC notice indicates that the subsidy reflects in your bill from the next billing cycle in most cases. Households whose recent six-month average usage spikes above the protected threshold may need to maintain low usage for several billing cycles before the protected tariff is re-applied.",
  },
];

export const CSS_FAQ_ELIGIBILITY: FaqItem[] = [
  {
    q: "Is /check-eligibility a separate page I have to visit on the PITC site?",
    a: "No. css.pitc.com.pk has only one consumer-facing entry point — the homepage with a single reference-number form. /check-eligibility is just the URL the homepage form POSTs to internally; the server runs the eligibility logic and either redirects you to /register (eligible) or keeps you on the homepage with an inline error (ineligible). You never see a dedicated eligibility-result screen.",
  },
  {
    q: "What does the eligibility check actually verify on css.pitc.com.pk?",
    a: "The eligibility check looks up your 14-digit reference number in the PITC consumer master and runs three tests: (1) is the meter a domestic-tariff connection, (2) has the rolling six-month average stayed inside the protected band, and (3) does the consumer name on the meter have only one live connection nationally. All three must pass — if they do, you are redirected to /register; if any fails, you stay on the homepage with an error.",
  },
  {
    q: "What is a valid reference number for the eligibility check?",
    a: "Most DISCOs print a 14-digit reference number at the top of the paper bill. A few (newer SAP-based zones) print a 10-digit consumer number — both formats are accepted by the CSS portal. Strip spaces and hyphens before submitting. checkbillsonline.com validates 10–14 digits before redirecting so you do not waste time on the PITC side.",
  },
  {
    q: "Can my eligibility status change month-to-month?",
    a: "Yes. The CSS uses the six-month rolling average, so a single heavy-usage month (summer AC, festive season, water-pumping) can push your average above the protected slab and remove the subsidy until your average drops back. The protected slab is restored automatically once your six-month rolling consumption is again inside the threshold.",
  },
  {
    q: "Why does the form ask me to verify my CNIC and occupant details?",
    a: "Because the registered consumer name on the meter and the actual occupant of the home are often different — tenants commonly use a meter registered to the previous owner. CSS requires the current occupant to be CNIC-verified so the subsidy reaches the household actually paying the bill, not an absent legal owner.",
  },
  {
    q: "Does checkbillsonline.com see or store the data I enter?",
    a: "No. The reference number entry on checkbillsonline.com is a thin client-side form that copies the reference to your clipboard and opens css.pitc.com.pk in a new tab. We do not log, cache, or share your reference, CNIC, name, or mobile number. All eligibility logic and the OTP flow live on the PITC server.",
  },
];

export const CSS_FAQ_WHO_QUALIFIES: FaqItem[] = [
  {
    q: "What are the official protected-slab cut-offs?",
    a: "The protected tariff covers two micro-slabs: 1–100 units/month and 101–200 units/month. A consumer must stay at or under the 200-unit/month rolling average for at least six consecutive months to qualify. Tariff numbers themselves are notified by NEPRA from time to time — always cross-check the latest schedule on the NEPRA tariff page before assuming a specific PKR/unit rate.",
  },
  {
    q: "Are tenants eligible if the meter is in the landlord's name?",
    a: "Yes — and the CSS occupant flow exists specifically for this case. The tenant registers their own CNIC and mobile as the occupant; the consumer name on the meter (the landlord) is retained, but the subsidy is anchored to the verified occupant household. Most DISCOs do not require a fresh meter transfer to claim the subsidy as a tenant.",
  },
  {
    q: "What disqualifies a household from the Cross Subsidy Program?",
    a: "The most common disqualifications are: (1) usage above the six-month protected average, (2) the same CNIC appearing on more than one live domestic connection nationally, (3) a non-domestic tariff (commercial, industrial, agricultural, bulk supply) on the meter, and (4) the reference being marked Permanently Disconnected or Pending in the DISCO system.",
  },
  {
    q: "Can a shared / joint meter qualify?",
    a: "Joint or shared meters technically can qualify, but only one CNIC can be the registered occupant for CSS purposes. Multiple families splitting one meter usually exceed the protected average together even if each family is individually low-usage, which is why shared-meter households often see ineligible status.",
  },
  {
    q: "Does owning a solar net-metered system affect eligibility?",
    a: "Solar net-metering changes the way your billed units appear on the bill (imports minus exports). If your net billed units stay under the protected threshold the subsidy still applies, but most net-metered homes have a sanctioned load above the 1 kW protected ceiling, which can independently disqualify them. Check the eligibility tool to confirm.",
  },
];

export const CSS_FAQ_REGISTER: FaqItem[] = [
  {
    q: "What is the registration flow on css.pitc.com.pk?",
    a: "There are four ordered steps: (1) Verify Ref No — enter the 14-digit reference number, (2) Confirm Details — review the consumer name, father/husband, address, and sanctioned load shown by PITC, (3) OTP Verify — enter your CNIC and mobile number, receive a 4–6 digit OTP, and (4) Done — registration is queued for DISCO confirmation and reflects in your next bill cycle.",
  },
  {
    q: "What if the OTP never arrives on my mobile number?",
    a: "Three usual causes: the SIM is not PTA-biometric-verified, the number is on a Do-Not-Disturb (DND) registry that blocks transactional SMS, or there is a temporary SMS gateway delay. Wait two minutes and click resend; if it still fails, try a different family member's PTA-verified number. Do not enter someone else's number — the OTP confirmation legally binds that household.",
  },
  {
    q: "Can I register multiple meters for the same household?",
    a: "No. CSS treats one occupant CNIC as eligible for one connection at a time. If your household has two meters under different owner names you must pick the primary connection for the subsidy; the second meter will continue at the standard unprotected slab unless its consumption alone qualifies under a separate occupant CNIC.",
  },
  {
    q: "How do I correct wrong details shown during registration?",
    a: "Wrong consumer name, address, or father/husband typically means the underlying DISCO database is out of date. CSS itself cannot edit those fields; you must apply for a change at your DISCO subdivision (most DISCOs accept a written application + CNIC copy + property document) and re-register on CSS once your DISCO updates the meter record.",
  },
  {
    q: "Is the registration permanent?",
    a: "The registration record is permanent, but the subsidy itself is dynamic: every billing cycle PITC re-evaluates your rolling six-month average. If your usage exits the protected band, the subsidy pauses automatically; once your average returns to the protected range, it resumes without you having to register again.",
  },
];

export const CSS_FAQ_BENEFITS: FaqItem[] = [
  {
    q: "How much can I save under the Cross Subsidy Program?",
    a: "Savings depend on your slab and your DISCO. Protected slabs typically run several rupees per unit lower than the equivalent unprotected slabs, plus a lower fixed-charge component and softer FPA pass-through. A 150-unit/month household commonly sees Rs 1,500–Rs 3,000 less per bill after CSS registration. Always run an exact estimate using your latest bill before assuming a specific saving.",
  },
  {
    q: "Does the cross subsidy apply to all bill line-items or only the energy charge?",
    a: "The subsidy targets the per-unit energy charge first — that is where the protected/unprotected delta is largest. GST, TV fee, financial cost (FC) surcharge, and meter rent are largely unaffected because they are fixed or percentage-based statutory levies. FPA (fuel price adjustment) is sometimes waived or reduced for protected slabs depending on the monthly NEPRA notification.",
  },
  {
    q: "Will I see CSS savings on my very next bill?",
    a: "Yes in most cases — provided you complete OTP verification before your DISCO closes the current month's bill run. Each DISCO has a cut-off date (commonly the 25th–28th of the month) after which the next month's bill is locked. Register early in the month to ensure your savings reflect in the immediate cycle.",
  },
  {
    q: "What happens to my savings if my usage spikes once?",
    a: "A one-month spike does not instantly remove your subsidy because the rolling six-month average smooths it out. Two or three consecutive heavy-usage months, however, will push the average above the protected threshold and your bill returns to unprotected pricing the following cycle. Reduce usage promptly to re-enter the protected band.",
  },
  {
    q: "Are CSS savings stackable with other government relief packages?",
    a: "Generally yes — relief packages announced for specific months (Ramazan relief, winter relief, IMF-conditional reliefs) are additive to the CSS subsidy unless the notification explicitly says otherwise. Always read your bill's adjustment lines to confirm which reliefs were applied that month.",
  },
];

/* ---------- Cluster link metadata (used by sitemap + cluster band) ---------- */

export const CSS_CLUSTER_LINKS: { href: string; label: string; hint: string }[] = [
  { href: `${CSS_PATH}`,                          label: "Cross Subsidy Program — overview", hint: "What CSS is and who it is for" },
  { href: `${CSS_PATH}/check-eligibility`,        label: "Check eligibility online",          hint: "Enter reference number and view your status" },
  { href: `${CSS_PATH}/who-qualifies`,            label: "Who qualifies",                     hint: "Protected category rules, six-month average, disqualifications" },
  { href: `${CSS_PATH}/how-to-register`,          label: "How to register (step by step)",    hint: "Verify Ref No → Confirm Details → OTP → Done" },
  { href: `${CSS_PATH}/benefits-and-savings`,     label: "Benefits & savings",                hint: "Protected vs unprotected tariff impact on your bill" },
];

/* ---------- Keyword pools (for <meta keywords>, mirrors MEPCO buildXKeywords100) ---------- */

const CORE = [
  "cross subsidy program", "css program pakistan", "css.pitc.com.pk", "pitc cross subsidy",
  "protected consumer pakistan", "lifeline tariff pakistan", "electricity subsidy pakistan",
  "domestic protected slab", "200 units protected tariff", "low usage electricity subsidy pakistan",
];

function pool(extra: string[]): string[] {
  return [...new Set([...CORE, ...extra])].slice(0, 60);
}

export const CSS_KEYWORDS = {
  landing: pool([
    "register for cross subsidy", "how to register css", "pitc css portal",
    "checkbills cross subsidy", "discos protected consumer registration",
  ]),
  eligibility: pool([
    "check eligibility cross subsidy", "css eligibility check pakistan",
    "css reference number check", "pitc 14 digit reference check",
  ]),
  whoQualifies: pool([
    "who qualifies cross subsidy", "protected consumer eligibility rules",
    "tenant eligibility css", "shared meter css eligibility",
  ]),
  howToRegister: pool([
    "how to register on css.pitc.com.pk", "css registration steps",
    "otp verification css pakistan", "css cnic registration",
  ]),
  benefits: pool([
    "cross subsidy savings", "protected tariff savings pakistan",
    "css how much saving per month", "lifeline tariff bill impact",
  ]),
};
