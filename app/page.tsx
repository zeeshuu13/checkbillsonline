import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildHomeKeywords } from "@/lib/seo/homeKeywords";
import { CountryPicker } from "@/components/CountryPicker";
import { RemoteImage } from "@/components/RemoteImage";
import { FaqAccordion } from "@/components/FaqAccordion";
import { HomeBillCheckWidget } from "@/components/HomeBillCheckWidget";
import { COUNTRIES } from "@/lib/data/countries";
import { PROVIDERS, providersInCountry } from "@/lib/data/providers";
import { SITE } from "@/lib/site";
import { WebPageJsonLd, HowToJsonLd, SpeakableJsonLd } from "@/lib/seo/jsonLd";
import { currentMonthSlug, parseMonthYear, getAllMonthYearSlugs } from "@/lib/seo/months";

export const metadata = buildMetadata({
  path: "/",
  title: "Check Electricity Bills Online in Pakistan, India, UAE, USA, UK, Canada, Australia, New Zealand, Bangladesh, Sri Lanka, Nepal, Indonesia, Philippines, Malaysia, Vietnam, Thailand, Singapore, Saudi Arabia, Qatar, Kuwait, Oman, Bahrain, Egypt, Jordan, Nigeria, Kenya, South Africa, Ghana, Tanzania, Ireland | MEPCO, LESCO, IESCO, FESCO, GEPCO, PESCO, HAZECO, HESCO, SEPCO, QESCO, TESCO, K-Electric & All DISCOs, Adani Electricity, Tata Power Mumbai, BSES Rajdhani, DEWA, ADDC, SEWA, SEC, Kahramaa, MEW Kuwait, Mazoon Electricity, EWA Bahrain, EEHC, JEPCO, Con Edison, PG&E, Duke Energy, British Gas, Octopus Energy, Hydro One, AGL, Genesis Energy, Electric Ireland, DESCO, CEB, NEA, PLN, Meralco, TNB, EVN HCMC, MEA, SP Group, EKEDC, Kenya Power, Eskom, ECG, TANESCO — CheckBillsOnline.com",
  description:
    "Check MEPCO, LESCO, IESCO, FESCO, K-Electric, Adani Electricity, DEWA, SEC and 50+ utility bills online. Real-time Pakistan PITC fetch. India BBPS. Gulf deeplinks. Tariff tables, complaint guides, and payment methods for 30 countries.",
  keywords: buildHomeKeywords(),
});

const HOME_FAQ = [
  {
    q: "Is checkbillsonline.com free to use?",
    a: "Yes. Every bill check, tariff guide, complaint walkthrough, and FAQ on this site is free. We don't charge a fee. The operators we link to (PITC, the utility's own portals, Razorpay BBPS for India) don't charge for the bill view either. Payment fees, when they exist at all, come from the bank or wallet you choose. They're never ours.",
  },
  {
    q: "Which countries does CheckBillsOnline cover?",
    a: "Thirty, across seven regions. South Asia: India, Pakistan, Bangladesh, Sri Lanka, Nepal. Southeast Asia: Indonesia, Philippines, Malaysia, Vietnam, Thailand, Singapore. Middle East and GCC: UAE, Saudi Arabia, Qatar, Kuwait, Oman, Bahrain, Egypt, Jordan. Africa: Nigeria, Kenya, South Africa, Ghana, Tanzania. North America: USA, Canada. Europe: United Kingdom, Ireland. Oceania: Australia, New Zealand. Pick a country anywhere on this page to see every covered provider in that market.",
  },
  {
    q: "Does CheckBillsOnline store my bill data?",
    a: "No. For most providers the form on this page opens the utility's own portal in a new tab, with your reference number prefilled where the portal accepts it. For the two countries where we run a live lookup (Pakistan via PITC, India via Razorpay BBPS), the bill is fetched on our server and thrown away once the response goes back to your browser. Your reference, your account number, your CNIC, your mobile number, your bill amount: none of it is written to a database. Read the privacy policy for the long version.",
  },
  {
    q: "How does the MEPCO bill check work?",
    a: "You type your 14-digit MEPCO reference number into the form on the MEPCO bill check page. Our server fetches the bill in real time from bill.pitc.com.pk/mepcobill, which is the same PITC portal MEPCO itself uses. The official HTML comes back, and we display it inside a sandboxed iframe. You see exactly the bill the post office delivers. No login. No fee. The same flow works for LESCO, IESCO, FESCO, GEPCO, PESCO, HESCO, SEPCO, QESCO, TESCO, and HAZECO. K-Electric uses a separate Karachi-specific portal, also linked from our K-Electric page.",
  },
  {
    q: "What is the Cross Subsidy Program (CSS) and how do I apply?",
    a: "CSS is a Government of Pakistan program on css.pitc.com.pk. It registers verified low-usage domestic consumers for the protected (lifeline) tariff. Eligibility means a six-month rolling average at or below 200 units per month, and only one live connection per CNIC. Registration is free, takes about two minutes, and the protected tariff kicks in on your next bill cycle. Our Cross Subsidy Program guide walks through the eligibility rules, the four registration steps, and what households typically save. For a 150-unit-per-month family, savings usually land between Rs 1,500 and Rs 3,000 a bill.",
  },
  {
    q: "Does this site work for Indian electricity bills (Adani, Tata Power, BSES)?",
    a: "Yes. For Adani Electricity Mumbai, Tata Power Mumbai, and BSES Rajdhani Delhi, we use Razorpay BBPS to fetch the bill live. That's the same NPCI-licensed rail every Indian banking app uses. For other Indian providers we link out to the operator's own portal. Real-time fetch requires our Razorpay account to have BBPS activated. The current operational status is documented in docs/api-keys.md.",
  },
  {
    q: "How do I check my DEWA bill (Dubai) or other Gulf utility bills?",
    a: "Enter your 10-digit DEWA Premise account number on the DEWA bill check page. We open dewa.gov.ae's Quick Pay screen with your account already filled in. The same deep-link approach works for ADDC (Abu Dhabi), SEWA (Sharjah), Kahramaa (Qatar), and SEC (Saudi Arabia). Kuwait, Oman, and Bahrain are link-out only for now, because their portals don't yet accept URL-prefilled inputs.",
  },
  {
    q: "What if my bill is wrong? Can you help me dispute it?",
    a: "We can't dispute the bill on your behalf (we're not a utility), but every provider page on this site lays out the complaint escalation ladder in detail. It starts with the operator's customer service and goes through the country's regulator: NEPRA in Pakistan, MERC in India, Ofgem in the UK, and so on. We list who to call, what to bring, and the statutory turnaround days for each step. Most disputes resolve at step 1. Serious overbilling or wrong-tariff cases usually need step 3.",
  },
  {
    q: "Why is my electricity bill higher than last month?",
    a: "Three usual causes, regardless of country. First, slab transition: crossing a consumption threshold moves all your units into a higher per-unit rate. Second, fuel pass-through spikes: FPA in Pakistan, FAC in India, fuel-cost-adjustment in most Anglosphere markets. These change every month and move with input fuel costs. Third, meter-reader errors: estimate-based bills that don't actually match your meter. Take a phone photo of your meter today and compare the reading to the 'Current Reading' line on the bill. If they don't match, that's your dispute.",
  },
  {
    q: "Do you offer a bill calculator?",
    a: "Per-country bill calculators are coming in the next editorial phase. For now, every provider's tariff page lists the per-unit rates, fixed charges, and statutory levies from the regulator's current schedule. That's enough to compute an expected bill by hand. Pakistani consumers can also pull their FBR Iris tax-filer status, which determines a 7.5% withholding line that often makes a bigger difference than people realise.",
  },
];

// ── Monthly section component ──────────────────────────────────────────────
function MonthlySection() {
  const curSlug = currentMonthSlug();
  const parsed = parseMonthYear(curSlug);
  const label = parsed?.label ?? curSlug;

  // Featured providers for monthly quick-links: all 12 PK DISCOs + top India + top Gulf
  const pkP = providersInCountry("pakistan");
  const inP = providersInCountry("india").slice(0, 3);
  const gulfP = PROVIDERS.filter((p) => ["uae", "saudi-arabia", "qatar"].includes(p.countrySlug)).slice(0, 3);
  const featured = [...pkP, ...inP, ...gulfP];

  return (
    <section aria-labelledby="monthly-heading" className="bg-slate-50 border-t border-slate-200">
      <div className="container-wide py-16">
        <div className="max-w-3xl mb-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Monthly bill guides</p>
          <h2 id="monthly-heading" className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            Check Your Bill for {label} — All Providers
          </h2>
          <p className="mt-3 text-slate-700">
            Each link below opens a dedicated guide for checking, understanding, and paying your utility bill for {label}. Tariff context, due-date pointers, and payment options are included on every page.
          </p>
        </div>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {featured.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/${p.countrySlug}/${p.routeSlug}/${curSlug}`}
                className="flex flex-col rounded-lg border border-slate-200 bg-white px-4 py-3 hover:border-brand-300 hover:bg-brand-50 no-underline group h-full"
              >
                <span className="text-sm font-semibold text-slate-900 group-hover:text-brand-800">{p.name}</span>
                <span className="text-xs text-slate-500 capitalize mt-0.5">{p.countrySlug.replace("-", " ")} &middot; {p.type}</span>
                <span className="mt-2 text-xs text-brand-700 group-hover:underline">Check {label} bill &rarr;</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex gap-4 flex-wrap">
          {getAllMonthYearSlugs().slice(0, 8).map((slug) => {
            const p = parseMonthYear(slug);
            return p ? (
              <Link key={slug} href={`/pakistan/mepco-bill-check/${slug}`}
                className={`rounded-full px-4 py-1.5 text-sm font-medium no-underline border ${slug === curSlug ? "bg-brand-700 text-white border-brand-700" : "bg-white text-slate-700 border-slate-200 hover:border-brand-300 hover:text-brand-700"}`}>
                {p.label}
              </Link>
            ) : null;
          })}
        </div>
      </div>
    </section>
  );
}

// ── Provider directory component ───────────────────────────────────────────
const REGION_GROUPS: { label: string; countries: string[] }[] = [
  { label: "Pakistan", countries: ["pakistan"] },
  { label: "India", countries: ["india"] },
  { label: "Gulf & Middle East", countries: ["uae", "saudi-arabia", "qatar", "kuwait", "oman", "bahrain", "egypt", "jordan"] },
  { label: "South & Southeast Asia", countries: ["bangladesh", "sri-lanka", "nepal", "indonesia", "philippines", "malaysia", "vietnam", "thailand", "singapore"] },
  { label: "Africa", countries: ["nigeria", "kenya", "south-africa", "ghana", "tanzania"] },
  { label: "Anglosphere", countries: ["usa", "uk", "canada", "australia", "new-zealand", "ireland"] },
];

function ProviderDirectory() {
  return (
    <section aria-labelledby="dir-heading" className="bg-white border-t border-slate-200">
      <div className="container-wide py-16">
        <div className="max-w-3xl mb-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Complete provider directory</p>
          <h2 id="dir-heading" className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            Every Utility Provider on CheckBillsOnline
          </h2>
          <p className="mt-3 text-slate-700">
            56 utility providers across 30 countries. Each link opens a full bill-check guide with tariff tables, payment channels, complaint escalation paths, and a live or deep-link bill form.
          </p>
        </div>
        <div className="space-y-10">
          {REGION_GROUPS.map((group) => {
            const groupProviders = PROVIDERS.filter((p) => group.countries.includes(p.countrySlug));
            if (groupProviders.length === 0) return null;
            return (
              <div key={group.label}>
                <h3 className="text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100">{group.label}</h3>
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {groupProviders.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/${p.countrySlug}/${p.routeSlug}`}
                        className="block rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 hover:border-brand-300 hover:bg-brand-50 no-underline group"
                      >
                        <span className="block text-sm font-semibold text-slate-900 group-hover:text-brand-800">{p.name}</span>
                        <span className="block text-xs text-slate-500 capitalize mt-0.5">{p.type} bill check</span>
                        {p.serviceAreas[0] && (
                          <span className="block text-xs text-slate-400 truncate">{p.serviceAreas[0]}</span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const pkProviders = providersInCountry("pakistan").slice(0, 12);
  const inProviders = providersInCountry("india").slice(0, 12);

  const gulfProviders = PROVIDERS.filter((p) =>
    ["uae", "saudi-arabia", "qatar", "kuwait", "oman", "bahrain", "egypt", "jordan"].includes(p.countrySlug)
  );
  const angloProviders = PROVIDERS.filter((p) =>
    ["usa", "uk", "canada", "australia", "new-zealand", "ireland"].includes(p.countrySlug)
  );
  const afroSeaProviders = PROVIDERS.filter((p) =>
    ["nigeria", "kenya", "south-africa", "ghana", "tanzania", "indonesia", "philippines", "malaysia", "vietnam", "thailand", "singapore", "bangladesh", "sri-lanka", "nepal"].includes(p.countrySlug)
  );

  return (
    <>
      <WebPageJsonLd url="/" name={SITE.name} description={SITE.description} />
      <HowToJsonLd />
      <SpeakableJsonLd cssSelectors={["#hero-heading", "#hero-intro"]} />

      {/* ────────────── 1. Hero ────────────── */}
      <section aria-labelledby="hero-heading" className="relative bg-gradient-to-b from-brand-50 via-white to-white border-b border-slate-200">
        <div className="container-wide py-16 md:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">{SITE.tagline}</p>
            <h1 id="hero-heading" className="mt-3 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900">
              Check your utility bill, in 30 countries, in seconds.
            </h1>
            <p id="hero-intro" className="mt-5 text-lg text-slate-700 max-w-xl">
              MEPCO. LESCO. The other nine Pakistan DISCOs that bill through PITC. Adani Electricity, Tata Power, and BSES on India&apos;s BBPS rail. DEWA, SEC, Kahramaa, and the rest of the Gulf. ConEd, PG&amp;E, British Gas, Octopus Energy, AGL, Hydro One, and the wider Anglosphere. We fetch the bill live where the operator allows it. Where they don&apos;t, we open the official portal with your reference number filled in. Either way the tariff guide on every page is sourced from the regulator that approved it.
            </p>
            <div className="mt-8 flex gap-3 flex-wrap">
              <Link href="#countries" className="rounded-md bg-brand-700 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-800 no-underline">
                Pick your country
              </Link>
              <Link href="/pakistan/mepco-bill-check" className="rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:border-brand-300 no-underline">
                Sample: MEPCO bill check (Pakistan)
              </Link>
              <Link href="/india/adani-electricity-bill-check" className="rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:border-brand-300 no-underline">
                Sample: Adani Electricity (India)
              </Link>
            </div>
            <ul className="mt-8 grid sm:grid-cols-2 gap-2 text-sm text-slate-700">
              <li className="flex gap-2"><span aria-hidden className="text-brand-600">✓</span> 30 countries, 100+ providers</li>
              <li className="flex gap-2"><span aria-hidden className="text-brand-600">✓</span> Real-time fetch where supported</li>
              <li className="flex gap-2"><span aria-hidden className="text-brand-600">✓</span> Tariff sourced from regulators</li>
              <li className="flex gap-2"><span aria-hidden className="text-brand-600">✓</span> Zero data stored, ever</li>
            </ul>
          </div>
          <div>
            <HomeBillCheckWidget />
          </div>
        </div>
      </section>

      {/* ────────────── 2. How it works ────────────── */}
      <section aria-labelledby="how-heading" className="bg-white border-b border-slate-200">
        <div className="container-wide py-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">How CheckBillsOnline works</p>
            <h2 id="how-heading" className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">
              Three steps from reference number to a verified bill on screen
            </h2>
            <p className="mt-4 text-slate-700">
              We didn&apos;t reinvent anything. The bill itself comes from your utility&apos;s own systems every time. What we add is a clean entry point, the regulatory context that explains why the bill looks the way it does, and a complete guide to every line item once the bill loads. The user journey is deliberately short.
            </p>
          </div>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <div className="text-3xl font-bold text-brand-700">1</div>
              <h3 className="mt-2 text-lg font-semibold text-slate-900">Pick country and provider</h3>
              <p className="mt-2 text-sm text-slate-700">
                Tap any country card on this page, or use the picker further down. You land on a provider hub with a single input field. It takes whatever identifier your local utility prints at the top of its bill: reference number, account number, consumer number, CA number, premise number. The label changes by country. The flow doesn&apos;t.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <div className="text-3xl font-bold text-brand-700">2</div>
              <h3 className="mt-2 text-lg font-semibold text-slate-900">Enter your reference</h3>
              <p className="mt-2 text-sm text-slate-700">
                We validate the shape of your input before submission. 10 to 14 digits for Pakistan. 9 to 12 for India. 10 for the UAE. Up to 15 for the USA. Each provider page lists the exact format with a worked example, and the form catches obvious typos before they reach the operator.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <div className="text-3xl font-bold text-brand-700">3</div>
              <h3 className="mt-2 text-lg font-semibold text-slate-900">Bill on screen, sources cited</h3>
              <p className="mt-2 text-sm text-slate-700">
                For supported providers, the bill loads in 2 to 5 seconds. For the rest, we open the operator&apos;s own portal in a new tab with your reference already filled in. Either way, the long-form guide below the form decodes every charge on the bill and tells you which regulator approved which line.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────── 2b. Pain points ────────────── */}
      <section aria-labelledby="pain-heading" className="bg-brand-50 border-b border-brand-100">
        <div className="container-wide py-16">
          <div className="max-w-3xl mb-10">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Common bill problems, solved</p>
            <h2 id="pain-heading" className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              What brought you here today?
            </h2>
            <p className="mt-3 text-slate-700">
              Every bill problem has a structured fix. Pick the one that matches your situation for a direct guide.
            </p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: "📈",
                q: "Bill too high this month?",
                detail: "Understand which tariff slab you landed in, check for fuel adjustment charges, and spot meter-read errors.",
                href: "/pakistan/mepco-bill-check/tariff",
                cta: "See tariff breakdown →",
              },
              {
                icon: "⏰",
                q: "Missed the due date?",
                detail: "Know the late payment surcharge, when disconnection notices are issued, and how to pay overdue bills quickly.",
                href: "/pakistan/mepco-bill-check/payment-methods",
                cta: "Payment options →",
              },
              {
                icon: "⚠️",
                q: "Bill shows wrong reading?",
                detail: "Learn how to raise a meter dispute, what evidence you need, and the statutory response deadlines in your country.",
                href: "/pakistan/mepco-bill-check/complaints",
                cta: "Complaint guide →",
              },
              {
                icon: "🏠",
                q: "Need a new connection?",
                detail: "Step-by-step new connection application — documents, fees, load category, and expected timelines.",
                href: "/pakistan/mepco-bill-check/new-connection",
                cta: "New connection steps →",
              },
              {
                icon: "💡",
                q: "Want to reduce your bill?",
                detail: "Pakistan's Cross Subsidy Program gives protected tariff rates to eligible low-usage households — free registration, instant impact.",
                href: "/pakistan/cross-subsidy-program",
                cta: "CSS program guide →",
              },
              {
                icon: "📦",
                q: "Moving house or premises?",
                detail: "Transfer your account, close your old connection, and avoid bills for a property you've left — the exact process for your utility.",
                href: "/pakistan/mepco-bill-check/faq",
                cta: "Moving FAQ →",
              },
            ].map((card) => (
              <li key={card.href}>
                <Link
                  href={card.href}
                  className="flex flex-col h-full rounded-xl border border-brand-200 bg-white p-5 hover:border-brand-400 hover:shadow-sm no-underline group transition-shadow"
                >
                  <span className="text-2xl mb-3" aria-hidden>{card.icon}</span>
                  <h3 className="text-base font-semibold text-slate-900 group-hover:text-brand-800">{card.q}</h3>
                  <p className="mt-2 text-sm text-slate-600 flex-1">{card.detail}</p>
                  <span className="mt-4 text-sm font-medium text-brand-700 group-hover:underline">{card.cta}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ────────────── 3. Featured providers ────────────── */}
      <section aria-labelledby="featured-heading" className="bg-slate-50 border-b border-slate-200">
        <div className="container-wide py-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Most-searched providers</p>
            <h2 id="featured-heading" className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">
              Jump straight to the bill check you need
            </h2>
            <p className="mt-4 text-slate-700">
              These nine providers cover most of the traffic across our 30 countries. Millions of Pakistani consumers, the Mumbai and Delhi distribution territories in India, all three of the UAE&apos;s major utilities, the two New York-area utilities, and the UK&apos;s biggest gas supplier. Tap any card to go straight to its bill-check page.
            </p>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { country: "pakistan", slug: "mepco-bill-check", name: "MEPCO", sub: "Multan Electric Power Company. Southern Punjab." },
              { country: "pakistan", slug: "lesco-bill-check", name: "LESCO", sub: "Lahore Electric Supply Company. Lahore plus four districts." },
              { country: "pakistan", slug: "k-electric-bill-check", name: "K-Electric", sub: "Karachi region. Separate Karachi-specific tariff." },
              { country: "india",    slug: "adani-electricity-bill-check", name: "Adani Electricity", sub: "Mumbai suburbs. 3.1 million consumers." },
              { country: "india",    slug: "tata-power-bill-check", name: "Tata Power Mumbai", sub: "South Mumbai. Changeover-eligible territory." },
              { country: "india",    slug: "bses-rajdhani-bill-check", name: "BSES Rajdhani", sub: "South and West Delhi. 2.7 million consumers." },
              { country: "uae",      slug: "dewa-bill-check", name: "DEWA", sub: "Dubai Electricity and Water Authority. All districts." },
              { country: "usa",      slug: "coned-bill-check", name: "Con Edison", sub: "New York City plus Westchester. 3.5 million customers." },
              { country: "uk",       slug: "british-gas-bill-check", name: "British Gas", sub: "Great Britain. The UK's largest gas supplier." },
            ].map((p) => (
              <li key={`${p.country}/${p.slug}`}>
                <Link
                  href={`/${p.country}/${p.slug}`}
                  className="block h-full rounded-lg border border-slate-200 bg-white p-5 hover:border-brand-300 hover:bg-brand-50 no-underline"
                >
                  <h3 className="text-lg font-semibold text-slate-900">{p.name}</h3>
                  <p className="mt-2 text-sm text-slate-600">{p.sub}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ────────────── 4. Pakistan deep-dive ────────────── */}
      <section aria-labelledby="pk-heading" className="bg-white border-b border-slate-200">
        <div className="container-wide py-16 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Pakistan: all 12 DISCOs</p>
            <h2 id="pk-heading" className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">
              MEPCO, LESCO, IESCO, and every Pakistan DISCO. One unified bill check.
            </h2>
            <p className="mt-4 text-slate-700">
              Pakistan&apos;s electricity distribution runs across eleven DISCOs that all bill through a single platform run by the Power Information Technology Company (PITC) at <span className="font-mono">bill.pitc.com.pk</span>. K-Electric in Karachi sits outside that, on its own portal. The eleven PITC DISCOs are MEPCO, LESCO, IESCO, FESCO, GEPCO, PESCO, HESCO, SEPCO, QESCO, TESCO, and HAZECO. They all accept the same 14-digit reference number printed at the top of the paper bill.
            </p>
            <p className="mt-4 text-slate-700">
              On this site, we mirror that PITC fetcher on our own server. When you enter your reference on, say, the MEPCO bill check page, the HTML that comes back is the same HTML the operator&apos;s own office sees. There&apos;s no login, there&apos;s no fee, and you see your bill within a few seconds.
            </p>
            <p className="mt-4 text-slate-700">
              The Cross Subsidy Program is the most useful Pakistan-specific thing on this site. CSS is administered by PITC on <span className="font-mono">css.pitc.com.pk</span>, and it registers verified low-usage domestic consumers for the protected (lifeline) tariff. To qualify you need a six-month rolling average at or below 200 units per month, and only one live connection per CNIC nationally. The protected slab is meaningfully cheaper than the unprotected one. Registration takes about two minutes, costs nothing, and asks for a CNIC plus a PTA biometric-verified mobile number for OTP. The new tariff applies on your next bill cycle if you qualify. For a 150-unit-a-month family, savings normally land between Rs 1,500 and Rs 3,000 every bill.
            </p>
            <p className="mt-4 text-slate-700">
              Disputed a bill? Pakistan&apos;s escalation path is the four-step NEPRA ladder. Step 1: your local subdivision SDO, 15 days. Step 2: the GM Customer Services at the DISCO head office, 30 days. Step 3: the Electric Inspector at the provincial energy department, 90 days. Step 4: NEPRA Consumer Affairs in Islamabad, also 90 days. Every provider page on this site walks through the ladder with current addresses and emails. Most disputes get sorted at step 1. Serious overbilling or wrong-tariff cases usually need step 3.
            </p>
            <p className="mt-4 text-slate-700">
              For payment, JazzCash and Easypaisa together handle over 60% of MEPCO and LESCO bill payments by volume. Both are free from wallet balance and they settle instantly. Bank apps over the 1Link rail handle most of the rest, also free. For households without smartphones, the *786# USSD code from any 1Link bank account works on a feature phone with no data plan.
            </p>
          </div>
          <div>
            <RemoteImage
              query="pakistan multan electric pole"
              alt="Electric distribution pole in southern Punjab, MEPCO territory, where 7.6 million consumers receive bills through the PITC platform."
              className="aspect-[3/4] w-full rounded-2xl"
              sizes="(min-width: 1024px) 360px, 100vw"
            />
          </div>
        </div>

        <div className="container-wide pb-16">
          <h3 className="text-xl font-semibold text-slate-900">All Pakistan electricity providers</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {pkProviders.map((p) => (
              <li key={p.slug}>
                <Link href={`/pakistan/${p.routeSlug}`} className="block rounded-md border border-slate-200 bg-white px-4 py-3 hover:border-brand-300 hover:bg-brand-50 no-underline">
                  <span className="font-medium text-slate-900">{p.name}</span>
                  <span className="block text-xs text-slate-500">{p.serviceAreas[0]}</span>
                </Link>
              </li>
            ))}
            <li>
              <Link href="/pakistan/cross-subsidy-program" className="block rounded-md border border-brand-300 bg-brand-50 px-4 py-3 hover:bg-brand-100 no-underline">
                <span className="font-medium text-brand-900">Cross Subsidy Program →</span>
                <span className="block text-xs text-brand-700">Register for the protected tariff</span>
              </Link>
            </li>
          </ul>
        </div>
      </section>

      {/* ────────────── 5. India deep-dive ────────────── */}
      <section aria-labelledby="in-heading" className="bg-slate-50 border-b border-slate-200">
        <div className="container-wide py-16 grid lg:grid-cols-3 gap-10">
          <div>
            <RemoteImage
              query="mumbai electric meter"
              alt="Indian residential electricity meter, Adani Electricity Mumbai service area, billed via the BBPS rail."
              className="aspect-[3/4] w-full rounded-2xl"
              sizes="(min-width: 1024px) 360px, 100vw"
            />
          </div>
          <div className="lg:col-span-2">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">India: Adani, Tata Power, BSES, and more</p>
            <h2 id="in-heading" className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">
              Indian electricity bills through BBPS. Fetched live, no login.
            </h2>
            <p className="mt-4 text-slate-700">
              India has the world&apos;s third-largest power-consumer base. Over 250 million domestic connections, more than 70 distribution licensees, and 30-odd state electricity regulatory commissions plus the federal CERC. What ties the system together is Bharat BillPay (BBPS), a payment rail run by NPCI that every major Indian banking app, UPI app, and bill-pay aggregator plugs into. Our India bill check rides on the same BBPS rail, through Razorpay&apos;s licensed integration. So when you enter your Adani Electricity CA Number, your Tata Power Mumbai consumer number, or your BSES Rajdhani CA Number, the bill comes back from the operator&apos;s authoritative database in real time.
            </p>
            <p className="mt-4 text-slate-700">
              The bigger structural difference between India and Pakistan is how the tariff itself is set. India sets tariff per state. Maharashtra&apos;s MERC writes the schedule for Adani Mumbai and Tata Power Mumbai. Delhi&apos;s DERC writes the one for BSES Rajdhani and BSES Yamuna. Karnataka&apos;s KERC handles BESCOM Bangalore. Each tariff order runs to hundreds of pages, and it&apos;s the authoritative source for slab rates, fixed charges, fuel pass-through (FAC), and any state-specific adjustments. Every Indian provider page on this site cites the latest tariff order with a retrieval date, so you can verify any number against the original.
            </p>
            <p className="mt-4 text-slate-700">
              India doesn&apos;t have a federal cross-subsidy program, but most states run something similar at their own level. Karnataka has Bhagya Jyothi and Kutir Jyothi for poor households. Maharashtra has a separate farmer-tariff bracket. Tamil Nadu has the free-100-units scheme. Each works differently from the others, and the eligibility paperwork is state-specific. Our state-level pages explain the application process for each.
            </p>
            <p className="mt-4 text-slate-700">
              Mumbai is unusual because retail electricity is genuinely competitive there. Most of the island city has dual licensees: BEST and AEML, BEST and Tata Power Mumbai. Consumers can apply for a &ldquo;changeover&rdquo; that switches the bill from one licensee to the other, without changing the physical wires. Our Adani Electricity hub walks through the decision tree based on your last twelve months of bills.
            </p>
          </div>
        </div>

        <div className="container-wide pb-16">
          <h3 className="text-xl font-semibold text-slate-900">India electricity providers covered</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {inProviders.map((p) => (
              <li key={p.slug}>
                <Link href={`/india/${p.routeSlug}`} className="block rounded-md border border-slate-200 bg-white px-4 py-3 hover:border-brand-300 hover:bg-brand-50 no-underline">
                  <span className="font-medium text-slate-900">{p.name}</span>
                  <span className="block text-xs text-slate-500">{p.serviceAreas[0]}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ────────────── 6. Gulf ────────────── */}
      <section aria-labelledby="gulf-heading" className="bg-white border-b border-slate-200">
        <div className="container-wide py-16 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Middle East and the GCC</p>
            <h2 id="gulf-heading" className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">
              DEWA, ADDC, SEWA, SEC, Kahramaa. Gulf utility bills with one tap.
            </h2>
            <p className="mt-4 text-slate-700">
              The Gulf utility market is unusual in two ways. First, most countries have a single operator covering the whole state. Saudi Electricity Company runs the whole of Saudi Arabia. Kahramaa runs the whole of Qatar. EWA runs the whole of Bahrain. That&apos;s very different from India or Pakistan, where dozens of licensees split each country. Second, the regulator is often part of the same government department as the operator. Kahramaa is both regulator and supplier. The UAE Ministry of Energy and Infrastructure oversees DEWA, ADDC, SEWA, and FEWA, but the utilities themselves set most of the consumer-facing operational rules.
            </p>
            <p className="mt-4 text-slate-700">
              For DEWA (Dubai), ADDC (Abu Dhabi city), and SEWA (Sharjah), our bill check uses a deep-link approach. You enter your 10-digit account number, and we open the operator&apos;s Quick Pay screen in a new tab with the account already filled. The bill loads on the operator&apos;s side, so you don&apos;t retype anything. SEC Saudi Arabia works the same way. Qatar (Kahramaa), Kuwait (MEW), Oman (Mazoon), and Bahrain (EWA) are link-out only for now, because their portals don&apos;t accept URL-prefilled inputs.
            </p>
            <p className="mt-4 text-slate-700">
              Tariff transparency in the Gulf is comparatively low. Most operators don&apos;t publish a consolidated tariff PDF online. Rates show up in the operator&apos;s consumer communications and on the printed bill itself, and that&apos;s it. We cite the operator&apos;s most recent tariff statement on every provider page with a retrieval date. For expats comparing rates across emirates or across GCC countries, the most useful single number is the per-unit kWh rate at the 4,000-units-a-month residential band, which GCCIA publishes annually.
            </p>
            <p className="mt-4 text-slate-700">
              Egypt and Jordan sit in this cluster too, even though they&apos;re not GCC members. Their electricity-sector regulatory model follows the regional pattern closely. Egypt&apos;s nine regional distribution companies route bills through a unified portal hosted by EEHC. Jordan&apos;s three distributors (JEPCO, IDECO, EDCO) bill bimonthly with a 10-digit subscription number used in eFAWATEERcom payments.
            </p>
          </div>
          <div>
            <RemoteImage
              query="electric grid transformer"
              alt="High-voltage transformer at an electricity substation. DEWA, SEC, Kahramaa and other Gulf utilities run grid infrastructure like this."
              className="aspect-[3/4] w-full rounded-2xl"
              sizes="(min-width: 1024px) 360px, 100vw"
            />
          </div>
        </div>

        <div className="container-wide pb-16">
          <h3 className="text-xl font-semibold text-slate-900">Middle East utility providers</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {gulfProviders.map((p) => (
              <li key={p.slug}>
                <Link href={`/${p.countrySlug}/${p.routeSlug}`} className="block rounded-md border border-slate-200 bg-white px-4 py-3 hover:border-brand-300 hover:bg-brand-50 no-underline">
                  <span className="font-medium text-slate-900">{p.name}</span>
                  <span className="block text-xs text-slate-500">{COUNTRIES.find((c) => c.slug === p.countrySlug)?.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ────────────── 7. Anglosphere ────────────── */}
      <section aria-labelledby="anglo-heading" className="bg-slate-50 border-b border-slate-200">
        <div className="container-wide py-16 grid lg:grid-cols-3 gap-10">
          <div>
            <RemoteImage
              query="london uk electric meter"
              alt="UK domestic electricity meter. One of 25+ competitive retail suppliers operating under Ofgem."
              className="aspect-[3/4] w-full rounded-2xl"
              sizes="(min-width: 1024px) 360px, 100vw"
            />
          </div>
          <div className="lg:col-span-2">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">USA, UK, Canada, Australia, NZ, Ireland</p>
            <h2 id="anglo-heading" className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">
              ConEd, PG&amp;E, British Gas, Octopus, AGL. Competitive retail markets.
            </h2>
            <p className="mt-4 text-slate-700">
              The Anglosphere runs the most fragmented retail electricity markets in the world. The United States alone has over 3,000 distribution utilities. Investor-owned ones (ConEd, PG&amp;E, Duke Energy, Dominion, Xcel, Southern Company), municipal ones, and rural cooperatives, all regulated by 50 separate state public utility commissions plus the federal FERC for interstate matters. The United Kingdom&apos;s domestic retail market has 25+ suppliers competing under Ofgem&apos;s price cap: Octopus Energy, British Gas, EDF, E.ON Next, OVO, ScottishPower, Bulb, Utilita, and others. Australia&apos;s National Electricity Market plugs AGL, Origin Energy, EnergyAustralia, and Red Energy into distributors owned by various state and private interests.
            </p>
            <p className="mt-4 text-slate-700">
              For Anglosphere markets, every bill check on this site is link-out. Every operator requires a one-time account login on its own portal to display the bill, and no major Anglosphere utility yet accepts URL-prefilled bill lookups from third-party referrers. So what we add instead is a thorough guide to each operator&apos;s tariff structure. Where the lines on the bill come from. Standing charges, unit rates, fuel cost adjustments, regional supplemental charges. Plus the country&apos;s complaint-escalation framework. UK consumers escalate to Ofgem. US consumers to the state PUC. Australian consumers to AER and the state ESC. Canadian consumers to the provincial regulator.
            </p>
            <p className="mt-4 text-slate-700">
              The single most useful thing across Anglosphere markets is that switching supplier is generally free, takes 14 to 30 days, and most consumers under-switch relative to the savings on offer. UK consumers in particular have benefited a lot from switching during the energy-cost spike years (2022 to 2024), because the price cap moves slower than the wholesale market. Our UK pages link out to the Ofgem comparison portal so you can compare retailers using your last bill as input.
            </p>
            <p className="mt-4 text-slate-700">
              Time-of-use tariffs are further developed in the Anglosphere than in South Asia or the Gulf, especially in homes with smart meters (SMETS2 in the UK, AMI in the US). Octopus Energy&apos;s Agile Octopus tariff prices in half-hour blocks following the UK wholesale spot market. PG&amp;E&apos;s peak and off-peak schedules vary by season. Our tariff pages explain the trade-offs for each operator.
            </p>
          </div>
        </div>

        <div className="container-wide pb-16">
          <h3 className="text-xl font-semibold text-slate-900">Anglosphere utility providers</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {angloProviders.map((p) => (
              <li key={p.slug}>
                <Link href={`/${p.countrySlug}/${p.routeSlug}`} className="block rounded-md border border-slate-200 bg-white px-4 py-3 hover:border-brand-300 hover:bg-brand-50 no-underline">
                  <span className="font-medium text-slate-900">{p.name}</span>
                  <span className="block text-xs text-slate-500">{COUNTRIES.find((c) => c.slug === p.countrySlug)?.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ────────────── 8. Africa + SE Asia ────────────── */}
      <section aria-labelledby="afro-heading" className="bg-white border-b border-slate-200">
        <div className="container-wide py-16 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Africa and Southeast Asia</p>
            <h2 id="afro-heading" className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">
              Kenya Power, Eskom, EKEDC, PLN, Meralco, TNB. And 15 more.
            </h2>
            <p className="mt-4 text-slate-700">
              Africa and Southeast Asia together account for over 1.5 billion people inside our 30-country coverage. The utility structure varies enormously. Kenya runs a single national distributor (KPLC). Nigeria has eleven DISCOs: EKEDC, IKEDC, AEDC, IBEDC, EEDC, PHED, KEDCO, KAEDCO, BEDC, YEDC, JEDC. South Africa has Eskom as the national generator, with municipal distribution handled metro by metro (City Power, eThekwini, City of Cape Town, Tshwane). Indonesia has PT PLN as a sole distributor for 80+ million customers. The Philippines has Meralco for Metro Manila and 100+ cooperatives for the rest of the country. Malaysia has Tenaga Nasional for Peninsular Malaysia, SESB for Sabah, and Sarawak Energy for Sarawak.
            </p>
            <p className="mt-4 text-slate-700">
              The bill-check experience in this region is mostly link-out, but the data points we expose still matter. Kenya Power&apos;s 11-digit account number and M-Pesa Paybill 888880 for instant payment. Nigeria&apos;s 13-digit meter number for the dominant prepaid customers, versus the 11-digit account number for postpaid. Indonesia&apos;s 12-digit ID Pelanggan, accepted by the PLN Mobile app. The Philippines&apos; 10-digit Customer Account Number, accepted in GCash, PayMaya, and most bank apps. Each provider page lists the format with a worked example so you know exactly what to type.
            </p>
            <p className="mt-4 text-slate-700">
              South Asia outside Pakistan and India (so Bangladesh, Sri Lanka, Nepal) has more centralised utility billing. Bangladesh has six state distribution utilities (DESCO, DPDC, BPDB, WZPDCL, NESCO, REB) and an SMS short code 16216 that works for any registered mobile number. Sri Lanka has the Ceylon Electricity Board plus the smaller LECO. Nepal has the Nepal Electricity Authority as the single national distributor, with the customer portal accepting an SC Number (Service Connection number) for bill checks.
            </p>
            <p className="mt-4 text-slate-700">
              Local payment rails in this region are often more developed than the operator portals. M-Pesa in Kenya. GCash and PayMaya in the Philippines. DANA, OVO, and GoPay in Indonesia. JazzCash in Pakistan (covered above). Bkash and Nagad in Bangladesh. Our provider pages list the dominant local wallet on every page, so the path from bill-view to bill-payment is a single tap.
            </p>
          </div>
          <div>
            <RemoteImage
              query="electric power lines sunset"
              alt="Electricity distribution lines at sunset. Kenya Power, Eskom, PLN, Meralco and other African and Southeast Asian utilities operate grid infrastructure like this."
              className="aspect-[3/4] w-full rounded-2xl"
              sizes="(min-width: 1024px) 360px, 100vw"
            />
          </div>
        </div>

        <div className="container-wide pb-16">
          <h3 className="text-xl font-semibold text-slate-900">Africa, Southeast Asia, and remaining South Asia providers</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {afroSeaProviders.map((p) => (
              <li key={p.slug}>
                <Link href={`/${p.countrySlug}/${p.routeSlug}`} className="block rounded-md border border-slate-200 bg-white px-4 py-3 hover:border-brand-300 hover:bg-brand-50 no-underline">
                  <span className="font-medium text-slate-900">{p.name}</span>
                  <span className="block text-xs text-slate-500">{COUNTRIES.find((c) => c.slug === p.countrySlug)?.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ────────────── 9. Bill types ────────────── */}
      <section aria-labelledby="types-heading" className="bg-slate-50 border-b border-slate-200">
        <div className="container-wide py-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">What we cover</p>
            <h2 id="types-heading" className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">
              Three utility types. What changes by type. What doesn&apos;t.
            </h2>
            <p className="mt-4 text-slate-700">
              CheckBillsOnline covers electricity, gas, and water bills. The underlying structure of a bill is similar across the three: a per-unit consumption charge, a fixed standing charge, statutory levies, and sometimes a fuel or input pass-through. The regulatory frameworks and the day-to-day consumer experience differ a lot more than that suggests.
            </p>
          </div>
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <RemoteImage
                query="electric grid transformer"
                alt="Distribution transformer. The backbone of every residential electricity grid."
                className="aspect-[4/3] w-full rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold text-slate-900">Electricity</h3>
              <p className="mt-2 text-sm text-slate-700">
                The biggest coverage on this site. Every one of our 30 countries has electricity-bill pages. Slabbed tariffs are universal in developing markets. Competitive retail with price-cap regulation dominates in mature ones. Fuel pass-through (called FPA, FAC, or fuel surcharge depending on the country) is the most volatile line on most electricity bills, often shifting 10 to 25 percent month-to-month with no change in your consumption. Our tariff pages show the slab table per provider and explain the math behind the pass-through.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <RemoteImage
                query="gas hob blue flame"
                alt="A gas hob with a blue flame. Domestic gas supply from a regulated retailer."
                className="aspect-[4/3] w-full rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold text-slate-900">Gas</h3>
              <p className="mt-2 text-sm text-slate-700">
                Gas is most relevant in the UK, Ireland, parts of the US (Northeast and California), Pakistan (SNGPL, SSGC), and parts of India. In the UK and Ireland, gas is usually bundled with electricity by the same retailer: British Gas, EDF, Bord Gáis Energy, Electric Ireland. In Pakistan, SNGPL covers the north and SSGC the south, and both bill separately from electricity. The line items on a gas bill are usually a unit (kWh or therm) charge plus a daily standing charge plus VAT or GST.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <RemoteImage
                query="water tap dripping"
                alt="A water tap with a falling drop. Municipal water supply, billed by a local water board or city utility."
                className="aspect-[4/3] w-full rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold text-slate-900">Water</h3>
              <p className="mt-2 text-sm text-slate-700">
                Water bills usually come from municipal water boards (India, Pakistan, much of Africa) or regulated water companies (UK Ofwat, USA per-utility). The bill is simpler than electricity. A per-cubic-metre volumetric charge plus a fixed standing charge, sometimes with sewerage charges added on the same bill. Water shortage tariffs and step-up rates, where additional consumption is priced higher to discourage use, are getting more common in water-stressed parts of the Middle East and Africa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────── 10. How to read a bill ────────────── */}
      <section aria-labelledby="anatomy-heading" className="bg-white border-b border-slate-200">
        <div className="container-wide py-16 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Bill anatomy</p>
            <h2 id="anatomy-heading" className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">
              How to read your electricity bill, anywhere in the world
            </h2>
            <p className="mt-4 text-slate-700">
              Almost every electricity bill in the world follows the same skeleton. Identifiers at the top. Consumption and charges in the middle. Statutory levies at the bottom. A payable total at the very end. Once you know the skeleton, the bill from any country becomes readable in under thirty seconds. The country-specific names and percentages differ. The structure doesn&apos;t.
            </p>
            <p className="mt-4 text-slate-700">
              <strong>Identifiers block.</strong> Your reference number, account number, or consumer number. Your registered consumer name. Your service address. The tariff code that puts you in a slab (residential, commercial, industrial, agricultural, every country has a similar taxonomy). Your sanctioned load in kW or kVA. The meter type, whether conventional, smart, or prepaid. The single most expensive mistake on most bills happens here. A residential property gets billed on a commercial tariff because the previous occupant ran a shop. Check the tariff code on every bill you receive.
            </p>
            <p className="mt-4 text-slate-700">
              <strong>Consumption block.</strong> Previous meter reading, current meter reading, units consumed during the cycle, and the per-unit energy charge applied to those units. Slabbed tariffs show each slab&apos;s rate explicitly. If your bill looks wrong, the first thing to check is whether the current reading on the bill matches the actual number on the meter today. Photograph the meter and compare. Meter-reader errors are the most common cause of bill-shock complaints, in every country we cover.
            </p>
            <p className="mt-4 text-slate-700">
              <strong>Fixed or standing charge.</strong> A flat monthly amount tied to your sanctioned load. You pay it regardless of consumption. Even a zero-consumption month carries it. The fixed charge funds the meter, the service-line maintenance, and the operator&apos;s customer-service infrastructure. If you can reduce your sanctioned load (where that makes sense), this is the easiest line to cut.
            </p>
            <p className="mt-4 text-slate-700">
              <strong>Fuel pass-through.</strong> Pakistan calls it FPA. India calls it FAC. The UK embeds it inside the unit rate itself. The US calls it Fuel Cost Adjustment. Australia handles it through quarterly retailer notifications. Whatever the name, this is the line that compensates the operator for fuel-cost changes between when the regulator set the base tariff and when the bill went out. The pass-through can be positive or negative. In volatile months it swings the bill 10 to 25 percent in either direction with no change in your consumption.
            </p>
            <p className="mt-4 text-slate-700">
              <strong>Statutory levies.</strong> Federal or national VAT or GST. Provincial or state electricity duty. Financing surcharges to repay sector debt (FC surcharge in Pakistan, Renewable Energy Obligation in the UK, system benefits charge in many US states). These are percentages applied on top of the base bill. The bill should show each rate so you can verify the math.
            </p>
            <p className="mt-4 text-slate-700">
              <strong>Total payable.</strong> The bottom line. Most bills print both the within-due-date and after-due-date amounts. The second one includes a late-payment surcharge. Pay before the due date when you can.
            </p>
          </div>
          <div>
            <RemoteImage
              query="electricity bill statement"
              alt="A printed electricity bill statement. The identifiers, consumption, charges, and levies structure is universal across countries."
              className="aspect-[3/4] w-full rounded-2xl"
              sizes="(min-width: 1024px) 360px, 100vw"
            />
          </div>
        </div>
      </section>

      {/* ────────────── 11. Payments ────────────── */}
      <section aria-labelledby="pay-heading" className="bg-slate-50 border-b border-slate-200">
        <div className="container-wide py-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Payment methods worldwide</p>
            <h2 id="pay-heading" className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">
              Pay your bill the cheap, fast way. Country by country.
            </h2>
            <p className="mt-4 text-slate-700">
              The fastest and cheapest payment path varies a lot by country, and using the local dominant rail almost always saves money compared with the operator&apos;s own portal. The recommendations below cover the top markets we serve. Detailed payment-method pages for every provider list each channel with current fees and settle times.
            </p>
          </div>
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-slate-900">Pakistan</h3>
              <p className="mt-2 text-sm text-slate-700">
                <strong>JazzCash</strong> and <strong>Easypaisa</strong> handle more than 60 percent of MEPCO and LESCO bill payments by volume. Both are free from wallet balance, both settle instantly, and you get a digital receipt by SMS. Bank apps over the 1Link rail are also free. The <strong>*786#</strong> USSD code works on feature phones with no internet.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-slate-900">India</h3>
              <p className="mt-2 text-sm text-slate-700">
                <strong>UPI</strong> through any banking app or wallet (GPay, PhonePe, Paytm) on the BBPS rail. Zero fee, instant settle. Auto-pay via NACH e-mandate is the operationally simplest option. The bank notifies you 24 hours before each debit, so unfamiliar amounts can be stopped.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-slate-900">UAE and GCC</h3>
              <p className="mt-2 text-sm text-slate-700">
                Direct on the operator&apos;s Quick Pay screen (DEWA, ADDC, SEWA, SEC) with debit or credit card, or via UAE Pass, mada, or Apple Pay where supported. Auto-debit through the bank is widely available. No dominant third-party wallet rail exists in the GCC retail space yet.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-slate-900">USA, UK, Australia</h3>
              <p className="mt-2 text-sm text-slate-700">
                Recurring direct debit from your bank account is universal and free. Most retailers offer a 1 to 3 percent discount for direct-debit customers, against paper-bill or pay-on-receipt customers. Credit cards work but usually carry a small convenience fee.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-slate-900">Kenya and Nigeria</h3>
              <p className="mt-2 text-sm text-slate-700">
                <strong>M-Pesa Paybill 888880</strong> in Kenya. It&apos;s the dominant Kenya Power payment channel, for both prepaid and postpaid. In Nigeria, Quickteller and the DISCO mobile apps handle most online payments, while <strong>USSD codes</strong> like *919# stay heavily used in lower-bandwidth zones.
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-slate-900">Indonesia and Philippines</h3>
              <p className="mt-2 text-sm text-slate-700">
                <strong>GoPay, OVO, and DANA</strong> in Indonesia. <strong>GCash and PayMaya</strong> in the Philippines. All four wallets support PLN and Meralco bill fetches with QR-code or deep-link integration. Free from wallet balance, instant settle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────── 12. CSS spotlight ────────────── */}
      <section aria-labelledby="css-heading" className="bg-brand-50 border-b border-brand-200">
        <div className="container-wide py-16 grid lg:grid-cols-3 gap-10 items-center">
          <div className="lg:col-span-2">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Pakistan spotlight</p>
            <h2 id="css-heading" className="mt-2 text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
              Cross Subsidy Program. Register once, save on every Pakistan electricity bill.
            </h2>
            <p className="mt-4 text-slate-800">
              The Cross Subsidy Program on <span className="font-mono">css.pitc.com.pk</span> is the single highest-value piece of paperwork most Pakistan households can complete. Verified low-usage domestic consumers qualify for the protected (lifeline) tariff, which is meaningfully cheaper per unit. To qualify, you need a six-month rolling average at or below 200 units per month, and only one live domestic connection per CNIC nationally. The protected slab is uniform across MEPCO, LESCO, IESCO, FESCO, GEPCO, PESCO, HESCO, SEPCO, QESCO, TESCO, and HAZECO. K-Electric runs a separate similar mechanism.
            </p>
            <p className="mt-4 text-slate-800">
              Registration is free. It takes about two minutes. You&apos;ll need the 14-digit reference, a CNIC, and a PTA biometric-verified mobile number for the OTP. If you qualify, the protected tariff reflects on your next bill cycle. For a 150-units-a-month household this is normally Rs 1,500 to Rs 3,000 saved every bill. Or Rs 18,000 to Rs 36,000 a year. Easily worth the two minutes.
            </p>
            <div className="mt-6">
              <Link href="/pakistan/cross-subsidy-program" className="inline-flex items-center rounded-md bg-brand-700 px-5 py-3 text-sm font-semibold text-white hover:bg-brand-800 no-underline">
                Open Cross Subsidy Program guide →
              </Link>
            </div>
          </div>
          <div>
            <RemoteImage
              query="pakistan electric grid"
              alt="Pakistan distribution grid. The 11 PITC DISCOs share the same protected-tariff framework administered by NEPRA and CSS."
              className="aspect-[4/3] w-full rounded-2xl"
              sizes="(min-width: 1024px) 360px, 100vw"
            />
          </div>
        </div>
      </section>

      {/* ────────────── 13. Monthly bill check guides ────────────── */}
      <MonthlySection />

      {/* ────────────── 14. Country picker ────────────── */}
      <CountryPicker />

      {/* ────────────── 15. Complete provider directory ────────────── */}
      <ProviderDirectory />

      {/* ────────────── 16. FAQ + final CTA ────────────── */}
      <section aria-labelledby="faq-heading" className="bg-white border-t border-slate-200">
        <div className="container-tight py-16">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-700">Frequently asked</p>
            <h2 id="faq-heading" className="mt-2 text-3xl md:text-4xl font-bold tracking-tight">
              Answers to the most-asked questions on CheckBillsOnline
            </h2>
            <p className="mt-4 text-slate-700">
              If your question isn&apos;t in the list below, every provider page on this site has its own FAQ block with provider-specific answers. Try the MEPCO, LESCO, Adani Electricity, or DEWA pages for examples.
            </p>
          </div>
          <div className="mt-8">
            <FaqAccordion items={HOME_FAQ} />
          </div>

          <div className="mt-12 rounded-2xl border border-brand-200 bg-brand-50 p-8 grid md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
                Try a sample bill check now
              </h2>
              <p className="mt-3 text-slate-700">
                The fastest way to understand what this site does is to load one bill end-to-end. Pick a sample below and see the long-form guide that loads alongside the bill itself.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Link href="/pakistan/mepco-bill-check" className="inline-flex justify-center rounded-md bg-brand-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-800 no-underline">
                MEPCO (Pakistan)
              </Link>
              <Link href="/india/adani-electricity-bill-check" className="inline-flex justify-center rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 hover:border-brand-300 no-underline">
                Adani Electricity (India)
              </Link>
              <Link href="/uae/dewa-bill-check" className="inline-flex justify-center rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 hover:border-brand-300 no-underline">
                DEWA (Dubai)
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
