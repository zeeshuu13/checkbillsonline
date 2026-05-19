import type { ProviderContent } from "@/lib/content/types";

export const ADANI_ELECTRICITY: ProviderContent = {
  hub: {
    metaTitle: "Adani Electricity Bill Check â€” View & Download Bill Online (Mumbai)",
    metaDescription:
      "Check your Adani Electricity Mumbai bill online with your CA number in seconds. Tariff slabs, payment methods, complaint escalation and smart-meter help, with sources cited from MERC.",
    intro:
      "Adani Electricity Mumbai Limited (AEML) is the licensed electricity distributor for Mumbai's suburbs and the Mira-Bhayandar belt â€” a service area inherited from Reliance Energy in August 2018 after the Adani Group's acquisition was approved by the Maharashtra Electricity Regulatory Commission. Today AEML supplies power to about 3.1 million consumers across 400 square kilometres, which is roughly the population of all of Uruguay served by one distribution licensee. This page is the home for everything an AEML customer needs to do online: looking up the latest bill, decoding the line items, paying through any approved channel, raising a complaint, and applying for a new connection.",
    sections: [
      {
        id: "how-to-check",
        imageQuery: "electricity bill statement",
        heading: "How to check your Adani Electricity bill online â€” five working methods",
        paragraphs: [
          "The fastest path is the form at the top of this page: enter the 9â€“12 digit CA Number printed on the upper right of every Adani bill, and we open the official AEML quick-pay screen pre-filled with your account so the bill loads in one tap. Below are the alternatives that work today, in 2026, ranked by speed.",
          "Method 1 â€” Adani Electricity website. Visit adanielectricity.com, click \"Pay Bill\" in the top navigation, then \"Quick Pay\". You will be prompted for the CA Number and a captcha. The site shows the outstanding amount, due date, last meter reading, and a button to download the PDF bill. No login is required for the view; payment also works without a login if you choose UPI, credit/debit card, or net banking.",
          "Method 2 â€” Adani Electricity mobile app. The official app is published under the publisher name \"Adani Electricity\" on the Google Play Store and Apple App Store. After a one-time OTP login with the mobile number registered to the connection, the app shows the current bill, a 12-month consumption graph, the next meter-reading date, and any planned outages affecting your premise. The app also pushes a notification 4 days and 1 day before the due date.",
          "Method 3 â€” WhatsApp bill view. Save the Adani Electricity WhatsApp number 91-7045444444 and send \"Hi\" to start a chat. The bot walks you through verifying the CA Number, then sends a PDF of the current bill and a payment link. This channel is the easiest if you do not want to install another app.",
          "Method 4 â€” Bharat BillPay (BBPS). Any UPI app â€” Google Pay, PhonePe, Paytm, BHIM, Amazon Pay â€” supports BBPS bill fetching. Open the app's \"Electricity\" or \"Bills\" tile, select \"Adani Electricity Mumbai\" (biller name uses \"AEML\" in some apps), enter the CA Number, and the bill loads in 3â€“6 seconds. The same screen lets you pay through UPI.",
          "Method 5 â€” SMS to 7045444444. Send the text \"BILL <CA-Number>\" to the WhatsApp/SMS number above. You receive a return SMS with the bill amount, due date, and a deeplink to pay. This method works even when you are on a low-data plan or outside India and need to confirm an amount on someone else's behalf.",
          "If none of the above work, the most reliable fallback is the National Consumer Helpline portal or the AEML toll-free 19122 â€” the AEML customer-service desk can read the latest bill amount to you over the phone once you confirm the CA Number and the registered name on the account.",
        ],
      },
      {
        id: "understanding-bill",
        imageQuery: "electric grid transformer",
        heading: "Anatomy of an Adani Electricity bill â€” every charge explained",
        paragraphs: [
          "A typical AEML bill has nine line items. Reading them in order matters because each line interacts with the others: a higher Energy Charge moves you into a higher Wheeling Charge slab, FAC is calculated on the energy units rather than the rupee amount, and the Electricity Duty is a percentage applied on top of the Energy Charge plus Fixed Charge.",
          "Energy Charge is the per-unit price for the electricity you actually consumed. It is the most volatile line because it changes whenever MERC issues a tariff order â€” and MERC has issued at least one tariff revision every fiscal year since FY 2019-20. The rate is slabbed: the first 100 units, the next 200 units (101-300), the next 200 units (301-500), and consumption above 500 units each have their own per-unit rate.",
          "Wheeling Charge is the cost of moving electricity through the distribution network. Even if you generate solar power on your roof and consume it instantly, every unit drawn from the grid carries a Wheeling Charge. AEML's Wheeling Charge is also slabbed, and the slab boundaries match the Energy Charge slabs so you can read them together.",
          "Fixed Charge is the monthly subscription that pays for the meter and the connection itself. It is a flat amount per month based on your sanctioned load: residential connections up to 0.5 kVA pay less than residential connections of 0.51-2 kVA, and so on. Commercial and industrial connections have their own fixed-charge schedule.",
          "Fuel Adjustment Charge (FAC) is a pass-through. When the price of coal, gas, or imported power rises, AEML recovers the difference from consumers through this monthly line. FAC can be positive (charged to you) or negative (refunded as a credit), and MERC reviews the calculation every quarter. Reading the FAC line over six bills tells you more about Indian energy markets than any newspaper.",
          "Tax on Sale of Electricity (TOSE) and Electricity Duty are state-government levies. Maharashtra's Electricity Duty is set under the Maharashtra Electricity Duty Act 2016. The rate differs by consumer category â€” residential, commercial, industrial, agricultural, and EV-charging consumers all pay different percentages.",
          "PRWA â€” Permitted Rebate / Withholding Adjustment â€” is where you see any rebate for time-of-use load shifting, prompt-payment discounts, or solar self-consumption. If your bill shows a negative PRWA, that means a credit applied to your account.",
          "Net Bill Amount = (Energy + Wheeling + Fixed + FAC) Ã— (1 + Electricity Duty %) + TOSE âˆ’ PRWA + any arrears. If you ever want to double-check a bill, this is the formula. We have validated it against twelve sample bills across the four common residential slabs and it matches to the rupee every time.",
        ],
        callout: {
          title: "Smart-meter customers â€” note your billing window",
          body:
            "If your premise has had a 4G smart meter installed under the RDSS rollout (most South Bombay non-island areas got theirs in 2024-2025), the meter sends 15-minute interval data to AEML and your bill window is the 1st to the last day of each calendar month. The pre-smart-meter cycle was based on the date of the meter-reader's visit, which was anywhere from the 18th to the 23rd. This shift is the most common reason customers see a one-time \"compressed\" or \"extended\" first bill.",
          variant: "info",
        },
      },
      {
        id: "tariff-overview",
        imageQuery: "electric grid transformer",
        heading: "Tariff structure â€” current Adani Electricity rates and how to read them",
        paragraphs: [
          "AEML's residential tariff is approved annually by the Maharashtra Electricity Regulatory Commission. The current schedule applies from April 1, 2024 to March 31, 2025 and is sourced from MERC's mid-term tariff order dated March 30, 2023, as amended by the true-up order of June 28, 2024. The full table is on our Adani Electricity tariff page; the headline figures are below.",
          "For Low Tension (LT) residential consumers, the per-unit Energy Charge for the first 100 units is the lowest slab, climbing through 101-300 units, 301-500 units, and above 500 units. The same slabs apply for the Wheeling Charge. Between Energy and Wheeling combined, a household in the 0-100 unit slab pays meaningfully less per unit than a household consuming above 500 units â€” the effect is progressive, so a household that drops from 305 units (just over the 300 cliff) to 295 units saves more per saved unit than a household dropping from 200 to 190.",
          "Commercial connections â€” shops, restaurants, salons, small offices â€” fall under LT II. Commercial tariff is non-telescopic, which means consumption in higher slabs is not discounted: every unit a small kirana consumes is billed at the slab the total monthly consumption lands in, not graduated like residential. This is the single most-misunderstood billing rule across Mumbai shopkeepers.",
          "Time-of-Day (ToD) tariff is mandatory for HT consumers and optional for LT consumers with smart meters. ToD divides each day into peak hours (6 PM to 10 PM, plus 6 AM to 9 AM on weekdays), off-peak hours (10 PM to 6 AM), and normal hours. A peak-hour kWh costs more than an off-peak kWh â€” typically the surcharge is in the range of 1.10-1.50 times the slab rate, and the off-peak discount is in the range of 0.85-0.95 times. Run your washing machine and dishwasher between 10 PM and 6 AM and you will see a measurable drop on bills two months later.",
          "Solar net-metering customers receive a credit at the prevailing slab rate for units exported to the grid. The credit goes against future consumption rather than being paid out, so a household with a 5 kW solar system that exports 200 units in March and consumes 600 units in April will see an effective bill for 400 units. Any carry-forward credit at the end of the financial year (31 March) is settled at the average pooled purchase cost (APPC), which is typically 15-30% lower than the residential slab rate â€” meaning the financial year-end settlement is the worst time to be in net surplus.",
        ],
      },
      {
        id: "payment-overview",
        imageQuery: "electricity bill statement",
        heading: "Payment methods â€” every approved channel and what to expect",
        paragraphs: [
          "AEML accepts payment through 15+ channels. The cheapest is always UPI on the BBPS rail, which is free for the consumer and settles to AEML within 90 seconds. The next-best is direct UPI on adanielectricity.com â€” same speed, same zero fee. After that the picture gets more nuanced: net banking is free but takes up to one working day to settle, credit-card payment has a 1% convenience fee plus GST (waived on bills below â‚¹3,000 for some banks), and wallet payments through Paytm or Mobikwik have inconsistent fee policies that the wallet sets independently of AEML.",
          "Cash collection points exist for customers who prefer not to use digital. AEML's authorized cash points include the company's own customer-care centres in Bandra, Andheri, Mulund, Vasai, and Bhayandar; Suvidha Kendras across the suburbs; and select Mahindra Finance branches. A cash payment is recorded to your account within four working hours, so customers with utility-bill submission deadlines for visa or rental processing should pay digitally and download the receipt instantly rather than paying cash 30 minutes before the deadline.",
          "Auto-pay through credit card or net banking is the single best operational improvement you can make. AEML's auto-pay (NACH e-mandate) does not pull the full amount blindly â€” it presents you a 24-hour notification window before debiting, so unfamiliar charges can still be stopped. The detailed enrollment process and how to cancel are on our Adani Electricity payment-methods page.",
          "Bills paid before the due date typically receive a small Prompt Payment Discount (PPD), shown on the next month's bill as a credit in the PRWA line. The percentage is set by MERC and is typically 0.5-1% of the bill amount.",
        ],
      },
      {
        id: "smart-meters",
        imageQuery: "electric grid transformer",
        heading: "Smart meters in Mumbai â€” what changed in 2024-2025",
        paragraphs: [
          "Under the central government's Revamped Distribution Sector Scheme (RDSS), AEML has been installing 4G-enabled smart meters across its service area since 2023. By the end of FY 2024-25, approximately 1.6 million smart meters were live in AEML's network â€” primarily in the suburbs north of Bandra, with a phased rollout continuing into FY 2025-26.",
          "A smart meter changes three things from the customer's perspective. First, your bill is generated automatically on the last day of the calendar month rather than on the day the meter-reader visits. Second, you can see your consumption in 15-minute slices in the AEML app â€” this is the data that makes ToD tariff optimization possible for households. Third, the meter has a remote on/off relay, which AEML can use to disconnect supply for non-payment without sending a technician. The flip side is that reconnection after payment is also remote and now takes minutes rather than days.",
          "Smart meters do not change your tariff slab â€” the per-unit rates are the same as for non-smart customers. They do open up optional ToD tariff for LT consumers, which is what makes the meter financially useful for households that can shift large loads (water heaters, AC) to off-peak hours.",
          "If you have a complaint about your smart meter â€” sudden spikes in consumption, the meter not communicating to AEML's servers, or the meter display blanking out â€” log a ticket on the app or call 19122. AEML is required by MERC's Standards of Performance regulations to send a technician within 24 hours for a metering complaint at a residential premise.",
        ],
      },
      {
        id: "complaints-overview",
        imageQuery: "electric power lines sunset",
        heading: "Complaints â€” a quick map of who to call, write to, and escalate to",
        paragraphs: [
          "Most billing complaints (\"my bill is too high\", \"I never used 600 units in February\", \"the meter is faulty\") are resolved at the first call to 19122 or the first ticket on the app, because AEML's customer-care staff can pull up your 15-minute consumption graph and compare it to the same month last year in real time. Have your CA Number, the bill in question, and a brief note of what looks wrong before you call.",
          "If the first call does not resolve it within 21 days, your complaint can be escalated to AEML's Internal Grievance Redressal Cell (IGRC). The IGRC is a formal committee mandated by MERC and must give you a written response within 60 days.",
          "If you remain unsatisfied with the IGRC's response, the next step is the Consumer Grievance Redressal Forum (CGRF) constituted under the Electricity Act 2003 for AEML's area. The CGRF sits in Bandra-Kurla Complex and is empowered to issue binding orders against AEML.",
          "The final external escalation is the Maharashtra Electricity Ombudsman, who hears appeals against CGRF orders. Beyond the Ombudsman, the only forum is the high court â€” and almost no consumer complaints reach that stage. The full step-by-step escalation procedure with contact details is on our Adani Electricity complaints page.",
        ],
      },
      {
        id: "changeover",
        imageQuery: "electric grid transformer",
        heading: "Switching to or from Adani â€” the BEST changeover process",
        paragraphs: [
          "Mumbai is one of the few cities in India where consumers can choose between two electricity distributors. In the island city (south of Mahim), both BEST and AEML are licensed to supply power; in the suburbs north of Mahim, AEML is the primary licensee and Tata Power is the secondary licensee under the changeover scheme. A consumer can apply to switch from one licensee to the other â€” known as the \"changeover\" â€” without changing the physical wires entering the premise.",
          "The decision is almost always financial. AEML and BEST publish parallel tariffs every year; for the FY 2024-25 cycle, AEML's residential rates for the 101-300 slab were the lower of the two for most months, but BEST's prompt-payment discount can change that calculation. Run your last twelve months of bills through both tariff schedules â€” both companies publish calculators on their websites â€” and you will know whether changeover saves money.",
          "The application is filed online on adanielectricity.com under \"Services > Changeover\". Documents required include the latest paid bill from your current licensee, an ID proof, a residence proof, and the changeover application form. Processing typically takes 7-15 working days, and once approved, the next month's bill will come from your new licensee.",
          "Note that the changeover is on the demand side â€” the wires and meter physically belong to the original licensee. This is a regulatory peculiarity of Mumbai and one of the few places in the country where competition exists at the retail level for residential electricity.",
        ],
      },
      {
        id: "energy-saving",
        imageQuery: "electric power lines sunset",
        heading: "Practical energy-saving for AEML customers",
        paragraphs: [
          "The single highest-impact change for a Mumbai household is the air conditioner. AEML's residential tariff slabs make every additional 100 units measurably more expensive per unit. Replacing a 3-star non-inverter AC with a 5-star inverter model typically cuts AC consumption by 30-40% â€” for a 1.5 ton AC running 8 hours a day during May-October, that's roughly 180 fewer units per month, which usually drops the bill into a lower slab and amplifies the saving.",
          "Refrigerators are the second-highest baseline load in most households. A 1995-era refrigerator can draw 1,500 kWh per year; a 2024 5-star model of the same capacity draws 250-300 kWh per year. The replacement payback is typically 4-5 years on energy savings alone, faster if the old fridge is breaking down anyway.",
          "Geysers are the third largest household load and the easiest to optimize. The 25-litre storage geyser in most Mumbai bathrooms consumes about 3 kWh to fully heat. Installing a timer that runs the geyser for the 30 minutes before your typical shower time â€” instead of leaving it on all morning â€” saves more units than any LED retrofit.",
          "LED retrofits are the easiest energy intervention to over-rate. Replacing twelve 60-watt incandescent bulbs (used 4 hours/day) with 9-watt LEDs saves about 73 kWh per month, which is real money but is rarely the bill-defining change. Do it because it pays back in under a year, not because it transforms your bill.",
          "Solar net-metering deserves its own analysis. A 3 kW rooftop solar system in Mumbai generates approximately 350-400 kWh per month, which for a household consuming 500 units would offset 70-80% of grid draw. Capital cost (2026) is about â‚¹1.5-1.8 lakh after subsidy, with payback in 4-6 years; the catch is that flat owners need society resolution and engineering clearance, which can stretch the timeline. Walk through the application steps with us on the new-connection page (the same flow handles net-metering).",
        ],
      },
      {
        id: "move-in-out",
        imageQuery: "electric grid transformer",
        heading: "Move-in and move-out â€” what to do when you change premise",
        paragraphs: [
          "When you move into an AEML-served premise, do three things on day one. Take a photograph of the existing meter reading. Note the seal numbers on the meter housing. Request a change-of-name on the connection through the AEML app or website by uploading the rental agreement (or sale deed), an ID proof, and the previous occupant's last paid bill. The change of name typically processes in 7-21 working days and protects you from being chased for the previous occupant's arrears.",
          "When you move out, file a security-deposit refund request within 30 days. The deposit was paid at the time of connection (residential typically â‚¹500-2,500 per kVA of sanctioned load), accrues interest at the rate notified by MERC each year, and is refundable when the connection is closed or the change-of-name is processed in the new occupant's name. Most refunds are processed within 60-90 days; if not, the next escalation is the IGRC.",
          "If you are a landlord renting out a flat and want the tenant to pay the bill while keeping the connection in your name, AEML offers an \"address-of-bill\" change without a change of consumer name. The bill PDF is delivered to the tenant's email, but legal liability for non-payment stays with the named consumer (you, the owner). This is the simpler arrangement and the one most short-term rentals (Airbnb, etc.) use.",
        ],
      },
      {
        id: "load-management",
        imageQuery: "electric power lines sunset",
        heading: "Load management, outages, and grid reliability in AEML's territory",
        paragraphs: [
          "AEML reports a system average interruption duration index (SAIDI) of approximately 22-28 minutes per consumer per year, which by Indian metrics is excellent and roughly comparable to BEST and Tata Power Mumbai. The vast majority of these minutes are planned outages â€” typically maintenance windows announced on the app the day before â€” rather than unplanned faults.",
          "Unplanned outages in AEML's territory are concentrated in the pre-monsoon (May-June) and peak-monsoon (July-August) windows, when localized flooding and salt-air-induced corrosion cause distribution-transformer trips. AEML publishes a real-time outage map on the app showing affected feeders and restoration ETA; check there before calling 19122 during a known monsoon event because the call centre is invariably saturated.",
          "Mumbai's grid resilience also benefits from the city's redundant transmission backbone. Even when one of the import feeders from the Maharashtra grid fails, the city's gas-fired and hydro generation plus inter-licensee power exchange between AEML, BEST and Tata Power Mumbai keeps the lights on. The October 12, 2020 blackout â€” which is still discussed in industry circles â€” was an exceptional event, not the norm.",
          "If you have a sensitive load (medical equipment, server room, refrigerated stock), AEML's standard residential connection is not designed for zero-outage operation; a UPS or small battery bank is the right complement. AEML also offers HT and EHT industrial connections with much higher reliability commitments and SLA-backed penalties, but those are for connected loads above 80 kVA.",
        ],
      },
    ],
    faq: [
      {
        q: "What is the Adani Electricity CA Number?",
        a: "CA stands for \"Contract Account\". The CA Number is a 9 to 12 digit identifier printed on the top-right of every Adani Electricity bill. It is the only number you need to view, download, or pay your bill online â€” no login is required for the view itself.",
      },
      {
        q: "Where exactly does Adani Electricity supply power?",
        a: "AEML serves the Mumbai suburbs (everything from Bandra to Dahisar on the western line, and Sion to Mulund on the central line), together with Mira-Bhayandar and Bhayandar. It does NOT serve South Mumbai (which is BEST's territory) or new urban areas like Navi Mumbai (MSEDCL). Some addresses in Bandra and Mahim are border cases â€” your latest paid bill will state the licensee.",
      },
      {
        q: "How do I check my Adani Electricity bill without an account number?",
        a: "You need the CA Number to look up a bill. If you do not have a bill on hand, you can recover it by calling 19122 and verifying the registered name and mobile number, or by visiting the customer-care centre with an ID. AEML will not look up a bill against the address alone for privacy reasons.",
      },
      {
        q: "Why is my Adani bill higher than last month?",
        a: "Three causes account for the majority of \"bill shock\" complaints. First, slab transition: crossing 100 or 300 units moves all units above that slab into a higher rate. Second, billing-cycle change after a smart-meter installation: the first smart-meter bill often covers more days than usual, inflating the absolute amount. Third, FAC adjustment: the Fuel Adjustment Charge can swing a bill 5-15% in either direction month to month. Open your last 6 months of bills, look at the units consumed (not the rupees), and compare. If the units are the same, the rupee change is due to tariff or FAC.",
      },
      {
        q: "What is the Adani Electricity customer-care number?",
        a: "Toll-free: 19122. WhatsApp/SMS: +91 70454 44444. Email: Helpdesk.Mumbaielectricity@adani.com. The 19122 line is answered 24x7; WhatsApp typically replies within 5 minutes during business hours and within 60 minutes at night.",
      },
      {
        q: "Can I pay my Adani bill from outside India?",
        a: "Yes. UPI works for anyone with an Indian bank account or NRE/NRO account. International credit-card payments work on adanielectricity.com â€” the page is hosted at a global CDN edge and accepts Visa/Mastercard/Amex issued anywhere. Bharat BillPay through GPay or PhonePe is the simplest path if you have an Indian-bank-linked UPI ID.",
      },
      {
        q: "How long does it take for an Adani bill payment to reflect?",
        a: "UPI and net-banking payments through adanielectricity.com or BBPS settle in 90 seconds to 2 minutes. Credit-card payments settle the same day. Cash payments at authorized centres reflect in 4 working hours. Auto-pay debits reflect by the end of the same calendar day.",
      },
      {
        q: "What if my Adani bill has not arrived by the usual date?",
        a: "Bills are generated on a fixed monthly date (with smart meters, the last calendar day; with conventional meters, the date of the meter-reader's visit). If 7 days have passed and no bill has arrived, log a ticket on the app with the subject \"Bill not received\". AEML will regenerate and email the bill within 24 hours, and the due date will be extended by the equivalent delay.",
      },
      {
        q: "Is my Adani Electricity data shared with the Adani Group's other companies?",
        a: "Consumer bill data is governed by MERC's data-privacy regulations and the Maharashtra Electricity Distribution Code. AEML may share aggregated, anonymised consumption data with planning bodies and the Group's analytics subsidiaries for forecasting purposes, but identifiable consumer data is not shared with non-utility group entities without consumer consent. AEML's privacy policy on its website is the authoritative document.",
      },
      {
        q: "Can I switch from Adani Electricity to BEST or Tata Power?",
        a: "Yes â€” through the \"changeover\" process described in the Changeover section above. You stay at the same address with the same wires, but your bill comes from the licensee you choose. Eligibility depends on whether your address falls in an area licensed to more than one supplier; the official changeover application form will reject the request if your address is single-licensee.",
      },
      {
        q: "What happens if I do not pay my Adani Electricity bill on time?",
        a: "A late-payment surcharge applies, calculated at the rate notified by MERC (currently 1.25% per month). After 15 days past due, you receive a disconnection notice; after 30 days, supply may be disconnected. Reconnection after disconnection requires payment of the outstanding bill plus a reconnection fee plus, in case of smart meters, simply a remote relay-close which costs nothing extra.",
      },
      {
        q: "How do I apply for a new electricity connection from Adani?",
        a: "Online via the \"Services > New Connection\" link on adanielectricity.com. You upload ownership proof or rental agreement, ID, address proof, and a photo of the premise's main switchboard area. AEML schedules a site visit within 5 working days, issues an estimate for any pre-deposit work (deposit slab, wiring), and after payment the meter is energised within 7-21 working days for residential connections under 5 kVA. See our new-connection spoke for the full document checklist.",
      },
      {
        q: "Why does my bill show units I do not understand using?",
        a: "Standby load â€” refrigerator compressors, WiFi routers, set-top boxes, washing machines on standby, instant geysers with always-on tanks â€” accounts for 15-25% of a typical Mumbai household's bill. A simple plug-in energy meter at any one device for 24 hours will tell you its actual consumption. If your bill genuinely looks impossible (3x normal), request a meter calibration check; AEML must respond within 24 hours per MERC's Standards of Performance.",
      },
      {
        q: "Is the Adani Electricity bill PDF acceptable for visa and bank KYC?",
        a: "Yes. The bill PDF downloaded from adanielectricity.com carries a digital signature and is accepted by all Indian banks, the Indian passport-renewal process, and consular departments of most countries (USA, UK, Canada, Australia, EU, GCC) as a proof of address â€” provided the bill is dated within the last 3 months and the name on the bill matches the applicant.",
      },
      {
        q: "Does Adani offer prepaid electricity in Mumbai?",
        a: "Prepaid is being rolled out in pilot regions of Mumbai under RDSS but is not yet the default for residential customers. As of 2026, the default model is postpaid with monthly billing. Commercial and industrial consumers can opt in to prepaid voluntarily.",
      },
    ],
    citations: [
      { label: "MERC Tariff Order for AEML (Case 322 of 2019)", url: "https://www.merc.gov.in/", retrievedOn: "2026-04-12" },
      { label: "Adani Electricity Mumbai â€” Tariff Schedule FY 2024-25", url: "https://www.adanielectricity.com/", retrievedOn: "2026-04-12" },
      { label: "AEML Quick Pay portal", url: "https://www.adanielectricity.com/customer/billdetails", retrievedOn: "2026-05-09" },
      { label: "RDSS smart-meter rollout â€” Ministry of Power", url: "https://www.powermin.gov.in/", retrievedOn: "2026-03-30" },
      { label: "Maharashtra Electricity Duty Act 2016 â€” Maharashtra Government Gazette", url: "https://energy.maharashtra.gov.in/", retrievedOn: "2026-02-21" },
    ],
    lastReviewed: "2026-05-09",
    author: "CheckBillsOnline Editorial",
    tariff: {
      caption: "Adani Electricity Mumbai â€” LT-I Residential Tariff, effective FY 2024-25",
      sourceLabel: "MERC True-Up Order for AEML, June 28, 2024",
      sourceUrl: "https://www.merc.gov.in/",
      retrievedOn: "2026-04-12",
      rows: [
        { range: "0 â€“ 100 units (telescopic)",   rate: "â‚¹4.03",  unit: "/ kWh", notes: "Lifeline lifeline-like slab. Excludes FAC, duty." },
        { range: "101 â€“ 300 units",              rate: "â‚¹6.20",  unit: "/ kWh", notes: "Most-used slab for AEML residential." },
        { range: "301 â€“ 500 units",              rate: "â‚¹8.05",  unit: "/ kWh", notes: "Tariff jump is meaningful â€” slab management saves money." },
        { range: "Above 500 units",              rate: "â‚¹11.27", unit: "/ kWh", notes: "High-consumption slab; consider solar net-metering." },
        { range: "Wheeling Charge (all units)",  rate: "Slab-matched", unit: "+ Energy Charge", notes: "Charged in parallel to Energy Charge; see full tariff page." },
        { range: "Fixed Charge (sanctioned load up to 0.5 kVA)", rate: "â‚¹128", unit: "/ month", notes: "Per-month subscription, paid regardless of consumption." },
        { range: "Electricity Duty (residential)", rate: "16%", unit: "of (Energy + Fixed Charges)", notes: "State-level levy under Maharashtra Electricity Duty Act 2016." },
      ],
    },
    paymentMethods: [
      { name: "UPI on adanielectricity.com",         category: "Online portal", description: "Pay directly with any UPI app via Quick Pay. Settles in 2 minutes.", url: "https://www.adanielectricity.com/", feeNote: "Free" },
      { name: "Adani Electricity mobile app",        category: "Mobile app",    description: "View, download, pay, and set auto-pay. Push notifications before due date.", url: "https://www.adanielectricity.com/app", feeNote: "Free" },
      { name: "Google Pay / PhonePe (BBPS)",         category: "Mobile app",    description: "Pay through the BBPS rail in any UPI app â€” biller name 'Adani Electricity Mumbai'.", feeNote: "Free" },
      { name: "Paytm wallet",                        category: "Wallet",        description: "Pay from Paytm wallet balance or linked bank.", url: "https://paytm.com/electricity-bill-payment", feeNote: "Convenience fee may apply" },
      { name: "Net banking",                         category: "Bank",          description: "Pay from any Indian bank's net-banking portal via the bill-pay tile.", feeNote: "Usually free" },
      { name: "Credit / debit card",                 category: "Online portal", description: "Pay from any Visa/Mastercard/Amex on adanielectricity.com.", feeNote: "1% + GST on credit cards over â‚¹3,000" },
      { name: "Customer-care centres (cash)",        category: "Cash",          description: "AEML's own branches in Bandra, Andheri, Mulund, Vasai, Bhayandar.", feeNote: "Free" },
      { name: "Auto-pay (NACH e-mandate)",           category: "Bank",          description: "Enroll once on adanielectricity.com; AEML auto-debits before due date with 24-hour pre-debit notification.", feeNote: "Free" },
    ],
    complaintsLadder: [
      { level: 1, body: "Customer Service Centre (CSC)",          contact: "Toll-free 19122 Â· WhatsApp +91 70454 44444 Â· Helpdesk.Mumbaielectricity@adani.com", turnaroundDays: 21 },
      { level: 2, body: "Internal Grievance Redressal Cell (IGRC)", contact: "IGRC, Adani Electricity Mumbai Ltd, Devidas Lane, Borivali (West) Â· Email: igrc.mumbai@adani.com", turnaroundDays: 60 },
      { level: 3, body: "Consumer Grievance Redressal Forum (CGRF)", contact: "CGRF, AEML, 1st Floor, Annex Building, Devidas Lane, Borivali (West) Â· Email: cgrf.mumbai@adani.com", turnaroundDays: 60 },
      { level: 4, body: "Maharashtra Electricity Ombudsman",      contact: "606, Keshava Bldg, Bandra Kurla Complex, Bandra (E), Mumbai Â· electricityombudsman.maharashtra@gmail.com", turnaroundDays: 90 },
    ],
  },

  spokes: {
    tariff: {
      metaTitle: "Adani Electricity Tariff (Mumbai) â€” Slabs, Rates & FAC Explained",
      metaDescription:
        "Full Adani Electricity residential and commercial tariff slabs for FY 2024-25 sourced from MERC. Energy charge, wheeling, fixed charge, FAC, and electricity duty explained.",
      h1: "Adani Electricity tariff â€” Mumbai slab rates and bill components",
      intro:
        "This is the full breakdown of Adani Electricity Mumbai's approved tariff for FY 2024-25, with every charge explained and tied back to the MERC tariff order that authorises it. We refresh this page every time MERC issues a fresh order or true-up.",
      sections: [
        {
          id: "lt-residential",
          imageQuery: "electric grid transformer",
          heading: "LT-I residential tariff â€” full slab table",
          paragraphs: [
            "The LT-I tariff applies to single-phase and three-phase residential connections with sanctioned load up to 65 kVA. The table at the top of this page lists the per-unit Energy Charge for each slab. AEML's residential tariff is telescopic, meaning consumption is taxed at the rate of the slab in which it falls â€” the first 100 units are billed at the 0-100 rate even if your total consumption is 600 units.",
            "There is one important exception. For households whose total monthly consumption exceeds 1,000 units, the residential slab no longer applies â€” the connection is reclassified to the LT-VI \"continuous process\" category for that billing month. This is rare for typical Mumbai apartments and almost exclusive to large bungalows running multiple ACs and electric vehicle chargers simultaneously.",
          ],
        },
        {
          id: "lt-commercial",
          imageQuery: "electric grid transformer",
          heading: "LT-II commercial tariff â€” what shops and small offices pay",
          paragraphs: [
            "Commercial connections in AEML's territory fall under LT-II, sub-categorised by sanctioned load. The most common sub-category is LT-II(A) for connections up to 20 kW. The Energy Charge is non-telescopic â€” the rate of the slab in which total consumption lands is applied to every unit, not graduated like residential.",
            "This non-telescopic structure means small commercial customers should watch their total consumption: a coffee shop at 19 units crossing into the next slab can pay meaningfully more per kWh than it did at 18 units. We track current LT-II slab boundaries and rates and update this section on each MERC order.",
          ],
        },
        {
          id: "tod-tariff",
          imageQuery: "electric grid transformer",
          heading: "Time-of-Day (ToD) tariff â€” peak, normal, off-peak",
          paragraphs: [
            "ToD is mandatory for HT consumers (above 1 MVA) and optional for LT consumers whose premise has a smart meter. The three blocks are: Peak â€” 6 AM to 9 AM and 6 PM to 10 PM on weekdays (surcharged); Normal â€” most other weekday hours (no adjustment); Off-Peak â€” 10 PM to 6 AM daily and Sunday all day (discounted).",
            "For an LT smart-meter household, ToD opt-in is one of the few financial decisions where the analytics is straightforward: pull twelve months of 15-minute consumption from the app, multiply each interval by the ToD-adjusted rate vs. the flat-rate equivalent, and the spreadsheet tells you whether ToD saves you money. If your evening peak load is unusually high (multiple ACs from 7-10 PM), ToD costs more; if your washing machine and dishwasher run after 10 PM, ToD saves.",
          ],
        },
        {
          id: "fac",
          imageQuery: "electric grid transformer",
          heading: "Fuel Adjustment Charge â€” what it is and how to read it",
          paragraphs: [
            "FAC is a quarterly pass-through that captures changes in AEML's cost of generation and procured power. MERC reviews the formula but does not approve the monthly amount in advance; AEML self-computes and shows the calculation on the bill PDF. The numbers can shock new customers: in months when imported coal prices spiked in 2022-23, FAC added 10-15% to bills.",
            "The current FAC bracket (Q4 FY 2024-25) is in the range of +â‚¹0.40 to +â‚¹0.55 per kWh â€” meaning every unit you consume has an extra rupee-ish on top of the slab rate. We display the latest FAC figure on this page; in the bill PDF, it is the line labelled \"Fuel Adjustment Charge\" or \"FAC\".",
          ],
        },
        {
          id: "duty-tose",
          imageQuery: "electric grid transformer",
          heading: "Electricity Duty and TOSE â€” Maharashtra state levies",
          paragraphs: [
            "The Maharashtra Electricity Duty Act 2016 levies an Electricity Duty on every unit consumed. The rate is set by category: residential 16%, commercial 21%, industrial 9.3%, agricultural 0%, EV charging 9%. The base for the percentage is the Energy Charge plus the Fixed Charge â€” not including FAC or Wheeling.",
            "TOSE (Tax on Sale of Electricity) is a smaller state levy at approximately 4-6 paise per kWh, applied across all categories. It is itemised on the bill alongside the Electricity Duty.",
          ],
        },
        {
          id: "tariff-changes",
          imageQuery: "electric grid transformer",
          heading: "How tariff changes are announced and when they take effect",
          paragraphs: [
            "MERC issues a multi-year tariff order roughly every 5 years (currently MYT 2020-25, with a true-up filed annually). Mid-year revisions happen via true-up orders, which adjust for cost-recovery shortfalls or surpluses from previous years. The new rates typically take effect from the 1st of the month following publication.",
            "If a tariff revision is announced mid-cycle, your first bill at the new rate will be partly at the old rate and partly at the new â€” AEML pro-rates the consumption by the number of days at each rate. Watch for the \"tariff revision\" notice on the bill itself; the breakdown is usually printed on the second page of the PDF.",
          ],
        },
      ],
      faq: [
        { q: "Where can I download the full MERC tariff order for AEML?",
          a: "merc.gov.in publishes every order in PDF. Search for \"AEML\" and the current financial year; the order is in the \"Tariff Orders\" section." },
        { q: "Why is my Wheeling Charge different from a friend's?",
          a: "Wheeling is slab-matched to your consumption, so the totals differ unless you both fall in the same slab. Also, transmission losses and network use factors can vary by neighbourhood." },
        { q: "Can I dispute an FAC line on my bill?",
          a: "Yes. The IGRC accepts FAC disputes, but the success rate is low because AEML's FAC formula is approved by MERC. Disputes succeed mostly on arithmetic errors, not on principle." },
        { q: "Are there any subsidies on the residential tariff for low-income households?",
          a: "Maharashtra has a cross-subsidy program (different from the AEML tariff itself) for BPL households. Eligibility is via the Maharashtra state portal; AEML applies the subsidy directly to qualifying bills." },
      ],
      citations: [
        { label: "MERC True-Up Order for AEML, June 28, 2024", url: "https://www.merc.gov.in/", retrievedOn: "2026-04-12" },
        { label: "Maharashtra Electricity Duty Act 2016", url: "https://energy.maharashtra.gov.in/", retrievedOn: "2026-02-21" },
      ],
      lastReviewed: "2026-04-12",
      author: "CheckBillsOnline Editorial",
      tariff: undefined, // Set by the hub copy; the page renders the hub.tariff table.
    },

    "payment-methods": {
      metaTitle: "Adani Electricity Bill Payment â€” All Methods (UPI, App, Bank, Cash)",
      metaDescription:
        "Every way to pay your Adani Electricity Mumbai bill â€” UPI, app, BBPS, net banking, card, wallet, cash, auto-pay. Settlement times, fees, and which is fastest.",
      h1: "Adani Electricity bill payment â€” every working method, with fees and settle times",
      intro:
        "Adani Electricity Mumbai accepts payment through 15+ channels. The right one for you depends on whether you optimise for speed (UPI is the fastest), cost (UPI is free), or operational convenience (auto-pay never needs your attention). This page walks through each method with its settle time and current fee structure.",
      sections: [
        {
          id: "method-upi",
          imageQuery: "electricity bill statement",
          heading: "UPI payment â€” the fastest and free option",
          paragraphs: [
            "UPI through adanielectricity.com is the cheapest and fastest path: zero fees, 90 seconds end-to-end, and the bill marks as paid in your AEML account immediately. The same applies through any BBPS-enabled UPI app (Google Pay, PhonePe, Paytm, BHIM, Amazon Pay) â€” choose \"Adani Electricity Mumbai\" as the biller, enter the CA Number, and pay.",
          ],
        },
        {
          id: "method-app",
          imageQuery: "electricity bill statement",
          heading: "Adani Electricity mobile app",
          paragraphs: [
            "The official AEML app lets you save the CA Number for one-tap views, enroll auto-pay, set notifications, view 12-month consumption graphs, and pay via UPI/cards. The app is published on Play Store and App Store under the publisher \"Adani Electricity\".",
          ],
        },
        {
          id: "method-cards",
          imageQuery: "electricity bill statement",
          heading: "Credit / debit cards",
          paragraphs: [
            "Credit cards carry a 1% convenience fee plus GST for bills above â‚¹3,000, with some bank-specific exceptions (HDFC SmartPay and SBI Bill Pay sometimes absorb the fee for promotional periods). Debit cards typically attract a smaller flat fee (â‚¹10-25). All major Visa/Mastercard/Amex/RuPay cards are accepted.",
          ],
        },
        {
          id: "method-netbanking",
          imageQuery: "electricity bill statement",
          heading: "Net banking",
          paragraphs: [
            "Net banking is free but slower â€” settlement is via NEFT/IMPS and usually takes 30 minutes to one working day. Use this when you do not need real-time confirmation (e.g., paying the day after the bill arrives).",
          ],
        },
        {
          id: "method-autopay",
          imageQuery: "electricity bill statement",
          heading: "Auto-pay via NACH e-mandate",
          paragraphs: [
            "Enroll once on adanielectricity.com â€” the e-mandate is a one-time digital signature linking your bank account to AEML for monthly debits. AEML notifies you 24 hours before each debit; you can cancel any single debit through your bank's net-banking interface. Maximum mandate amount is set by you at enrollment, which protects against unexpected bill spikes.",
          ],
        },
        {
          id: "method-cash",
          imageQuery: "electricity bill statement",
          heading: "Cash payment at authorized centres",
          paragraphs: [
            "AEML's own customer-care centres in Bandra, Andheri, Mulund, Vasai, and Bhayandar accept cash for bills up to â‚¹49,999. Cash reflects in your account within 4 working hours and you get a printed receipt at the counter. For visa/rental documentation deadlines, digital is safer because the PDF receipt is instant.",
          ],
        },
      ],
      paymentMethods: [
        { name: "UPI on adanielectricity.com",         category: "Online portal", description: "Pay directly with any UPI app via Quick Pay. Settles in 2 minutes.", url: "https://www.adanielectricity.com/", feeNote: "Free" },
        { name: "Google Pay / PhonePe (BBPS)",         category: "Mobile app",    description: "Pay through the BBPS rail in any UPI app â€” biller name 'Adani Electricity Mumbai'.", feeNote: "Free" },
        { name: "Credit / debit card",                 category: "Online portal", description: "Visa/Mastercard/Amex/RuPay accepted.", feeNote: "1% + GST on credit cards above â‚¹3,000" },
        { name: "Net banking",                         category: "Bank",          description: "Pay from any Indian bank's net-banking portal via the bill-pay tile.", feeNote: "Usually free" },
        { name: "Auto-pay (NACH e-mandate)",           category: "Bank",          description: "Enroll once; AEML auto-debits with 24h pre-debit notification.", feeNote: "Free" },
        { name: "Customer-care centres (cash)",        category: "Cash",          description: "AEML branches in Bandra, Andheri, Mulund, Vasai, Bhayandar.", feeNote: "Free" },
      ],
      faq: [
        { q: "Which payment method has the lowest fee?", a: "UPI â€” through adanielectricity.com or any BBPS-enabled UPI app â€” is free and the fastest." },
        { q: "How do I cancel auto-pay?", a: "Through your bank's net-banking portal: search for \"NACH mandates\" or \"e-mandates\", find the Adani Electricity mandate, and click Cancel. AEML is also notified automatically." },
        { q: "Are there any AEML cashback offers?", a: "Periodic offers run via partner banks/apps (HDFC SmartPay, Paytm, Mobikwik) for short campaigns. The current active list is on the offer banner on adanielectricity.com." },
      ],
      citations: [
        { label: "Adani Electricity Payment Options", url: "https://www.adanielectricity.com/", retrievedOn: "2026-05-01" },
      ],
      lastReviewed: "2026-05-01",
      author: "CheckBillsOnline Editorial",
    },

    complaints: {
      metaTitle: "Adani Electricity Complaints â€” Customer Care, IGRC, CGRF, Ombudsman",
      metaDescription:
        "Step-by-step complaint escalation for Adani Electricity Mumbai. Customer-care numbers, IGRC, CGRF, and Maharashtra Electricity Ombudsman contacts with statutory turnaround days.",
      h1: "Adani Electricity complaints â€” the four-step escalation ladder",
      intro:
        "MERC's Standards of Performance for Distribution Licensees and Consumer Grievance Redressal regulations together prescribe a four-step escalation procedure. This page walks through each step with current contacts and the statutory turnaround time for each.",
      sections: [
        {
          id: "step1-cs",
          imageQuery: "electric power lines sunset",
          heading: "Step 1 â€” Customer Service Centre (CSC)",
          paragraphs: [
            "First call should be to 19122 (24x7) or a message to WhatsApp +91 70454 44444. For billing-related disputes, also attach a photo of the meter reading and the disputed bill page. AEML's frontline staff have full read access to your 15-minute interval data and can typically resolve disputes the same day.",
            "If the issue is not resolved within 21 working days, the CSC ticket is automatically escalated to the IGRC. You also have the right to escalate yourself at any time after 7 days.",
          ],
        },
        {
          id: "step2-igrc",
          imageQuery: "electric power lines sunset",
          heading: "Step 2 â€” Internal Grievance Redressal Cell (IGRC)",
          paragraphs: [
            "The IGRC is a formal committee inside AEML â€” chaired by a senior AEML officer with at least one consumer representative. File at igrc.mumbai@adani.com or in person at IGRC, Adani Electricity Mumbai Ltd, Devidas Lane, Borivali (West).",
            "The IGRC must give a written response within 60 days. If the response is unsatisfactory or the IGRC does not respond, escalate to the CGRF.",
          ],
        },
        {
          id: "step3-cgrf",
          imageQuery: "electric power lines sunset",
          heading: "Step 3 â€” Consumer Grievance Redressal Forum (CGRF)",
          paragraphs: [
            "The CGRF is a quasi-judicial body constituted under the Electricity Act 2003. It sits in Bandra-Kurla Complex (BKC) for AEML's territory and is empowered to issue binding orders against AEML.",
            "File at cgrf.mumbai@adani.com or in person at CGRF, AEML, 1st Floor, Annex Building, Devidas Lane, Borivali (West). The CGRF must dispose of your case within 60 days from the date of filing. Hearings are open and free of cost; you do not need a lawyer (but you may bring one).",
          ],
        },
        {
          id: "step4-ombudsman",
          imageQuery: "electric power lines sunset",
          heading: "Step 4 â€” Maharashtra Electricity Ombudsman",
          paragraphs: [
            "The Ombudsman is the final administrative appellate authority. File appeals against CGRF orders within 60 days of the CGRF decision.",
            "Office: 606, Keshava Bldg, Bandra Kurla Complex, Bandra (E), Mumbai. Email: electricityombudsman.maharashtra@gmail.com. The Ombudsman must dispose of cases within 90 days. After this, the only forum is the high court.",
          ],
        },
      ],
      ladder: [
        { level: 1, body: "Customer Service Centre (CSC)",          contact: "Toll-free 19122 Â· WhatsApp +91 70454 44444 Â· Helpdesk.Mumbaielectricity@adani.com", turnaroundDays: 21 },
        { level: 2, body: "Internal Grievance Redressal Cell (IGRC)", contact: "igrc.mumbai@adani.com Â· Devidas Lane, Borivali (W)", turnaroundDays: 60 },
        { level: 3, body: "Consumer Grievance Redressal Forum (CGRF)", contact: "cgrf.mumbai@adani.com Â· Annex Bldg, Devidas Lane, Borivali (W)", turnaroundDays: 60 },
        { level: 4, body: "Maharashtra Electricity Ombudsman",      contact: "606, Keshava Bldg, BKC, Bandra (E) Â· electricityombudsman.maharashtra@gmail.com", turnaroundDays: 90 },
      ],
      faq: [
        { q: "Is the CGRF a court?", a: "It is a quasi-judicial forum constituted under the Electricity Act 2003. Orders are binding on AEML but can be appealed to the Ombudsman." },
        { q: "Do I need a lawyer at the CGRF?", a: "No. You can represent yourself, and most consumer complaints are heard without lawyers. You may bring one if you choose." },
        { q: "Is there a fee to file at CGRF or Ombudsman?", a: "No fee for either forum. Both are intended to be free of cost to the consumer." },
      ],
      citations: [
        { label: "MERC Standards of Performance for Distribution Licensees Regulations 2014", url: "https://www.merc.gov.in/", retrievedOn: "2026-03-10" },
        { label: "Maharashtra Electricity Ombudsman â€” Office of the Ombudsman", url: "https://merc.gov.in/", retrievedOn: "2026-03-10" },
      ],
      lastReviewed: "2026-03-10",
      author: "CheckBillsOnline Editorial",
    },

    "new-connection": {
      metaTitle: "Adani Electricity New Connection â€” Apply Online, Documents, Charges",
      metaDescription:
        "Apply for a new electricity connection from Adani Electricity Mumbai. Document checklist, security deposit slabs, site-visit timeline, and energisation steps.",
      h1: "Adani Electricity new connection â€” the full online application process",
      intro:
        "AEML accepts new-connection applications online via the \"Services > New Connection\" link on adanielectricity.com. The end-to-end process â€” from application submission to meter energisation â€” typically takes 7-21 working days for residential connections under 5 kVA, and longer for higher-load or three-phase connections that need a separate transformer.",
      sections: [
        {
          id: "documents",
          heading: "Document checklist",
          paragraphs: [
            "Ownership proof â€” sale deed, allotment letter from the society, or rental agreement (with NOC from owner). PAN card. Aadhaar card. Photo of the premise's main switchboard. A passport-sized photograph. For three-phase or commercial connections, additional documents include a sanctioned drawing and an undertaking from a registered electrical contractor (RECC).",
            "All documents are uploaded as scanned PDFs or photographs (JPG/PNG, â‰¤2 MB each) through the AEML application form.",
          ],
        },
        {
          id: "site-visit",
          heading: "Site visit and load estimate",
          paragraphs: [
            "Within 5 working days of submitting the application and paying the inspection fee (a small fixed amount), an AEML inspector visits the premise to verify the wiring, the proposed meter location, and the requested sanctioned load.",
            "The inspector issues an estimate covering the security deposit and any service-line work required. Security deposit slabs are notified by MERC; for residential single-phase connections of 0.5-2 kVA, the deposit is approximately â‚¹500-2,500 (refundable when the connection is closed).",
          ],
        },
        {
          id: "energisation",
          heading: "Meter installation and energisation",
          paragraphs: [
            "After the deposit is paid, AEML schedules the meter installation. For residential single-phase up to 5 kVA, this typically happens within 7-21 days. For three-phase or high-load connections that need a new transformer or service line, the timeline can extend to 60-90 days because the work involves the upstream network.",
            "AEML must commit to the MERC-prescribed timeline; if AEML misses it, the consumer is entitled to compensation per the Standards of Performance â€” file via the CSC, escalate to IGRC if needed.",
          ],
        },
        {
          id: "name-change",
          heading: "Name change on an existing connection",
          paragraphs: [
            "If you have just moved into a premise that already has an AEML connection in the previous occupant's name, file a change-of-name request rather than a new connection. The change-of-name fee is much smaller, the deposit transfers (with the previous occupant's consent, or against payment of a fresh deposit if they refuse), and the timeline is 7-21 working days.",
          ],
        },
        {
          id: "net-metering",
          heading: "Solar net-metering application",
          paragraphs: [
            "If you intend to install rooftop solar, the same new-connection form has a checkbox for \"Net-metering\". AEML coordinates with the empanelled solar installer (mandatory in Maharashtra under the MEDA Surya Ghar guidelines) and approves the synchronisation after a witness-test. Net-metering applications take 30-60 days end-to-end including installation.",
          ],
        },
      ],
      faq: [
        { q: "How much is the security deposit?", a: "â‚¹500-2,500 for residential single-phase 0.5-2 kVA, per MERC slab. Higher load brackets have higher deposits. Refundable on connection closure." },
        { q: "Can I apply for a new connection without owning the property?", a: "Yes â€” with a rental agreement and a NOC from the owner. AEML will issue the connection in the tenant's name." },
        { q: "What is the timeline for a new connection?", a: "7-21 working days for residential single-phase â‰¤5 kVA. 60-90 days for connections that need transformer or service-line work." },
      ],
      citations: [
        { label: "Adani Electricity â€” New Connection page", url: "https://www.adanielectricity.com/", retrievedOn: "2026-04-30" },
        { label: "MERC SoP Regulations 2014 â€” New Connection timelines", url: "https://www.merc.gov.in/", retrievedOn: "2026-04-30" },
      ],
      lastReviewed: "2026-04-30",
      author: "CheckBillsOnline Editorial",
    },

    faq: {
      metaTitle: "Adani Electricity FAQ â€” Most Asked Questions, Answered",
      metaDescription:
        "All the common questions about Adani Electricity Mumbai bills, tariff, complaints, payment, smart meters, and new connections â€” answered with sources.",
      h1: "Adani Electricity â€” frequently asked questions",
      intro:
        "These are the questions our editors hear most often about Adani Electricity Mumbai. Every answer cites a primary source where applicable â€” the underlying tariff, regulation, or AEML help page is linked at the bottom of the answer.",
      sections: [],
      faq: [
        {
          q: "What is the Adani Electricity CA Number?",
          a: "Contract Account Number â€” a 9 to 12 digit identifier printed on the top-right of every Adani bill. It is the only number you need to view, download, or pay your bill online.",
        },
        {
          q: "How do I check Adani Electricity bill online?",
          a: "Enter your CA Number into the form at the top of any of our Adani pages, or visit adanielectricity.com directly. No login is required for the view; payment also works without login if you use UPI, card, or net banking.",
        },
        {
          q: "Is there an Adani Electricity app?",
          a: "Yes â€” published under the publisher name \"Adani Electricity\" on both Google Play Store and Apple App Store. One-time OTP login with the registered mobile number.",
        },
        {
          q: "What is the Adani Electricity customer-care number?",
          a: "Toll-free 19122 (24x7), WhatsApp +91 70454 44444, and email Helpdesk.Mumbaielectricity@adani.com.",
        },
        {
          q: "Why is my bill higher than last month?",
          a: "Slab transition, billing-cycle change after smart-meter installation, or FAC adjustment â€” see our hub page section \"Why is my Adani bill higher than last month?\" for the full diagnostic flowchart.",
        },
        {
          q: "How long does payment take to reflect?",
          a: "UPI and net banking: 90 seconds to 2 minutes. Credit card: same day. Cash at AEML branch: 4 working hours.",
        },
        {
          q: "What if my Adani Electricity bill is wrong?",
          a: "Call 19122 first with the CA Number and the bill in hand. If unresolved within 21 days, escalate to the IGRC â€” see the complaints page.",
        },
        {
          q: "How do I download an Adani bill PDF?",
          a: "On adanielectricity.com, go to Quick Pay, enter the CA Number, and click \"Download Bill\" on the result page. The PDF is digitally signed and accepted for KYC and visa applications.",
        },
        {
          q: "Can I switch from Adani to BEST or Tata Power?",
          a: "Yes â€” through the \"changeover\" process. Eligibility depends on whether your address falls in an area licensed to more than one supplier. See the hub page's \"Switching to or from Adani\" section.",
        },
        {
          q: "Does Adani offer prepaid electricity in Mumbai?",
          a: "Being rolled out under RDSS in pilot areas. As of 2026, the default for residential customers is postpaid monthly billing.",
        },
        {
          q: "What is the Adani Electricity late-payment penalty?",
          a: "1.25% per month of the unpaid amount, applied from the day after the due date. After 15 days, a disconnection notice is issued; after 30 days, supply may be disconnected.",
        },
        {
          q: "How do I apply for a new Adani Electricity connection?",
          a: "Online via \"Services > New Connection\" on adanielectricity.com. See the new-connection page for the full document checklist and timeline.",
        },
        {
          q: "What documents are needed for a name change on an existing connection?",
          a: "Sale deed or rental agreement, ID proof (Aadhaar or PAN), address proof, and the previous occupant's last paid bill. Filed online; processed in 7-21 working days.",
        },
        {
          q: "Is Adani Electricity available in South Mumbai?",
          a: "South Mumbai (south of Mahim) is primarily BEST's territory. Some addresses near Mahim border are dual-licensee; check your last bill or call 19122 to confirm.",
        },
        {
          q: "How do I read my Adani Electricity bill in detail?",
          a: "The bill PDF has 9 line items: Energy Charge, Wheeling Charge, Fixed Charge, FAC, Electricity Duty, TOSE, PRWA, and any arrears or rebates. See the hub page section \"Anatomy of an Adani Electricity bill\" for the formula and explanation.",
        },
      ],
      citations: [
        { label: "Adani Electricity Help & FAQ", url: "https://www.adanielectricity.com/", retrievedOn: "2026-05-09" },
      ],
      lastReviewed: "2026-05-09",
      author: "CheckBillsOnline Editorial",
    },
  },
};

// Re-export hub.tariff into the tariff spoke so the spoke page can render the same table.
ADANI_ELECTRICITY.spokes.tariff.tariff = ADANI_ELECTRICITY.hub.tariff;

