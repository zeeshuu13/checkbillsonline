# Country brief template

Fill one of these before authoring content for any new country. The brief feeds into the AI-drafting step (per `content-style-guide.md`) and is the source-of-truth your editor falls back to during the review pass.

Allow **half a day to one day** to research each country.

---

## Country snapshot

- **Country slug:** (e.g., `india`)
- **Currency:** code, symbol
- **Voltage and frequency:** (e.g., 230V 50Hz)
- **Billing cycle norm:** (monthly / bimonthly / quarterly)
- **Capital timezone:** IANA
- **Electrification rate:** %
- **Population:** millions

## Regulator(s)

For each utility type (electricity, gas, water):

- Regulator name (full and short)
- Regulator website URL
- Most recent tariff order URL
- Most recent tariff order date

## Market structure

One paragraph explaining the structure: monopoly, regional split, competitive retail, co-op model, single national + multiple local? Cite the relevant electricity act / law.

## Top 3-5 providers

For each:

- Marketing name
- Legal name
- Headquarters city
- Service area (cities / regions)
- Approx. customer count
- Established year
- Bill reference format (regex + example + label, e.g., "CA Number, 9-12 digits")
- Official portal URL
- Whether portal accepts deep-link with reference number in querystring (Tier B test it manually)
- Support phone, support email
- Bill-check tier (A / B / C)

## Tariff slabs

For the flagship residential tariff, list slab boundaries and per-unit rates. Cite the source order URL and date retrieved.

Same for commercial if commercial tariff is non-telescopic (e.g., India LT-II).

## Payment methods

Local payment methods that are dominant. Not just "card/UPI/net banking" but the actual market mix — for Kenya, M-Pesa Paybill; for Indonesia, GoPay/OVO; for Pakistan, Easypaisa/JazzCash. Include the dominant method's typical fee.

## Complaints escalation

The country's formal complaint ladder:

1. Provider customer-service (toll-free number, email)
2. Internal grievance cell (if applicable)
3. Consumer forum / Ombudsman / regulatory complaint mechanism
4. Final external authority

Include statutory turnaround days where defined.

## 5 unique local-context facts

These are the originality safety net. Each page must have at least 3 of these baked into its narrative. Examples:

- Pakistan: load-shedding schedules, K-Electric's federal/provincial dispute
- India: Mumbai's dual-licensee changeover, prepaid pilot under RDSS
- USA: state PUC regulation rather than federal, demand-charge tariff for some Californian utilities
- Nigeria: meter shortage and DISCO band classification (A/B/C/D/E)
- UK: standing charges, Ofgem price cap, smart meter SMETS2 rollout

## Holiday and bill-due caveats

Are there country-specific situations where bills are delayed? (Eid in Pakistan, Diwali in India, Chinese New Year in Singapore.)

## New connection cost

Approximate security deposit slab and timeline for a residential single-phase connection.

## Solar / net-metering policy

Whether net-metering is available, the export tariff (gross/net/banking), and the typical residential capacity cap.

---

## Sources used to compile this brief

List every URL you visited with a "retrieved YYYY-MM-DD" date. Anything sourced from a regulator PDF should include the PDF URL and the page number.
