export type NetMeteringEntry = {
  countrySlug: string;
  available: boolean;
  regulator?: string;
  regulatorUrl?: string;
  minCapacity?: string;
  maxCapacity?: string;
  exportRate: string;
  eligibility: string;
  applicationProcess?: string;
  notes?: string;
  lastUpdated: string;
};

export const NET_METERING: NetMeteringEntry[] = [
  {
    countrySlug: "pakistan",
    available: true,
    regulator: "NEPRA / AEDB",
    regulatorUrl: "https://www.aedb.org/",
    minCapacity: "1 kW",
    maxCapacity: "1 MW",
    exportRate: "Same as applicable import tariff (net-billed at consumer's slab rate)",
    eligibility: "Any licensed DISCO consumer with sanctioned load ≥1 kW. CNIC verification required. Single-phase up to 5 kW; three-phase above.",
    applicationProcess: "1. Contact your DISCO with a net-metering application form. 2. AEDB issues a generation licence for systems ≥25 kW. 3. DISCO installs bidirectional meter (at consumer cost). 4. Net metering starts from next billing cycle.",
    notes: "Bill shows 'units imported' and 'units exported'. If exported > imported in a month, the credit rolls forward to the next cycle (not paid out as cash). Rollover credits expire after 12 months.",
    lastUpdated: "2025-06-01",
  },
  {
    countrySlug: "india",
    available: true,
    regulator: "State ERCs (MERC, DERC, etc.)",
    regulatorUrl: "https://cercind.gov.in/",
    minCapacity: "1 kW",
    maxCapacity: "Varies by state; typically 10 kW (residential), 500 kW (commercial)",
    exportRate: "Varies by state — MERC (Maharashtra): ₹2.25–3.25/kWh. DERC (Delhi): ₹3.00/kWh. Check your state ERC order.",
    eligibility: "LT (low-tension) consumers; rooftop solar only; net metering licence from utility required. PM-Surya Ghar scheme subsidises installation for residential consumers.",
    applicationProcess: "Apply to your DISCO for a net metering connection agreement. Utility inspects and installs a bidirectional meter. Process takes 15–30 days.",
    notes: "Credit for excess units is at a fixed export tariff, not at the import tariff slab rate. Banking period: typically 12 months. Surplus beyond the banking period is settled at the rate determined by the state ERC.",
    lastUpdated: "2025-06-01",
  },
  {
    countrySlug: "uae",
    available: true,
    regulator: "DEWA (Dubai); Etihad WE / RSB (Abu Dhabi); SEWA (Sharjah)",
    regulatorUrl: "https://www.dewa.gov.ae/",
    minCapacity: "None stated",
    maxCapacity: "No explicit cap; subject to building approval",
    exportRate: "DEWA: AED 0.00 (no export payment — only self-consumption offset). Etihad WE: credits at retail tariff rate.",
    eligibility: "Property owners with DEWA/ADDC/SEWA connections; building authority solar permit required; installation by DEWA/utility-approved contractor.",
    applicationProcess: "Apply via DEWA Shams Dubai portal, ADDC's RSB, or SEWA's approved contractor programme. Process: 1. No-objection from municipality. 2. Contractor installs system. 3. Utility upgrades meter. 4. Shams registered.",
    notes: "In Dubai, exported energy is offset against the bill — no cash payment. Conceptually similar to net billing. Most effective when self-consumption ratio is high.",
    lastUpdated: "2025-06-01",
  },
  {
    countrySlug: "australia",
    available: true,
    regulator: "AER (Australian Energy Regulator)",
    regulatorUrl: "https://www.aer.gov.au/",
    minCapacity: "1 kW",
    maxCapacity: "10 kW (single phase), 30 kW (three phase)",
    exportRate: "Feed-in tariff (FiT) varies by retailer and state — typically AUD 0.06–0.12/kWh. Some retailers pay higher voluntary FiTs.",
    eligibility: "All residential and small commercial customers. No formal net metering — Australia uses 'gross metering' with a separate export tariff paid by the retailer.",
    applicationProcess: "Contact retailer. Electrician installs CEC-approved system. DNO (DNSP) approves grid connection. Application usually automated through retailer.",
    notes: "Australia uses gross metering (all generation measured, self-consumed units also measured) rather than strict net metering. Mandatory minimum FiT applies in most states.",
    lastUpdated: "2025-06-01",
  },
  {
    countrySlug: "uk",
    available: true,
    regulator: "Ofgem",
    regulatorUrl: "https://www.ofgem.gov.uk/",
    minCapacity: "None",
    maxCapacity: "3.68 kW single phase for standard export; higher with DNO approval",
    exportRate: "Smart Export Guarantee (SEG): minimum 0p/kWh guaranteed by Ofgem; in practice 4–24p/kWh depending on retailer tariff.",
    eligibility: "Any GB property with an eligible renewable installation (solar PV, micro-wind, micro-hydro, anaerobic digestion). Must have a smart meter.",
    applicationProcess: "1. Install MCS-certified system. 2. Apply for SEG tariff from an SEG licensee (your electricity supplier or another licenced SEG licensee). 3. Smart meter records export. 4. Payments quarterly or monthly.",
    notes: "The SEG replaced the Feed-in Tariff (FiT) for new installations from April 2019. Legacy FiT installations can still export under FiT but cannot switch to SEG.",
    lastUpdated: "2025-06-01",
  },
  {
    countrySlug: "malaysia",
    available: true,
    regulator: "Suruhanjaya Tenaga (Energy Commission)",
    regulatorUrl: "https://www.st.gov.my/",
    minCapacity: "12 kWp (under Net Energy Metering, NEM 3.0)",
    maxCapacity: "75 kWp (residential), 1 MWp (commercial/industrial)",
    exportRate: "NEM 3.0: 1:1 offset (exported units credited at retail tariff rate). Excess exported units are bought back by TNB at a 'displaced cost' rate.",
    eligibility: "Residential and commercial TNB customers. NEM quota allocated by ST; apply via MyEM.com.my portal.",
    applicationProcess: "1. Obtain NEM quota from ST via MyEM portal. 2. Appoint a Licensed Electrical Contractor (LEC). 3. TNB installs bidirectional meter. 4. System commissioned.",
    notes: "NEM 3.0 (from 2023): quota-based. Once quota is exhausted, applications are waitlisted. Check ST website for current quota status.",
    lastUpdated: "2025-06-01",
  },
  {
    countrySlug: "usa",
    available: true,
    regulator: "State PUCs / FERC",
    regulatorUrl: "https://www.ferc.gov/",
    exportRate: "Varies by state and utility. California NEM 3.0: avoided-cost rate (~3–5¢/kWh export, much lower than retail). Other states: retail rate offsets common.",
    eligibility: "Varies by state. Most states mandate net metering for systems up to a capacity cap (varies 10–1,000 kW by state and utility).",
    applicationProcess: "Varies by utility. Generally: installer submits interconnection application, utility approves, permits obtained, inspection, bidirectional meter installed.",
    notes: "Federal mandate under PURPA; implementation varies by state. NEM credit banking periods and excess payment rates differ significantly by state and IOU/co-op/municipal.",
    lastUpdated: "2025-06-01",
  },
  {
    countrySlug: "south-africa",
    available: true,
    regulator: "NERSA",
    regulatorUrl: "https://www.nersa.org.za/",
    exportRate: "Varies by municipality. Eskom: no export payment for embedded generation below 1 MVA. City Power Johannesburg: credits at Homeflex tariff.",
    eligibility: "Varies by municipality. Eskom large-power-user grid connection required for commercial export.",
    applicationProcess: "Contact your supply authority. Required: CoC (Certificate of Compliance), municipal approval, utility technical review.",
    notes: "South Africa's regulatory environment for distributed solar has been rapidly evolving since 2022; check your municipality's current policy before installing.",
    lastUpdated: "2025-06-01",
  },
];
