# Content style guide

These rules exist because Google's March 2024 Helpful Content System update added **Scaled Content Abuse** as a policy violation that triggers manual action against entire sites. A 30-country utility-bill site is exactly the kind of property the policy targets unless every page meets the bar below.

## Hard rules — every authored page must pass

1. **Cite the regulator.** Every tariff number must have a `Citation` with a regulator URL and ISO `retrievedOn` date. The `CitationsBlock` component renders this at the bottom of every page.

2. **Three original data points per page.** No matter how similar the structure to a sibling page is, each provider page must include at least three facts that are unique to that provider/country: a local consumer-rights statute, a real phone number, a specific outage pattern, a recent rate-change date, etc.

3. **No template-spun paragraphs across countries.** If you find yourself writing "Provider X is the leading utility in Country Y serving Z million customers" as a recurring opening, rewrite. Each intro should reflect the actual market structure of that country (sole licensee vs. multi-licensee vs. cooperative).

4. **Visible `lastReviewed` and author byline.** Both are read from the content file's `lastReviewed` and `author` fields by `CitationsBlock`. The minimum review cadence is 90 days.

5. **Real `/about`, `/contact`, `/privacy`, `/terms`, `/disclaimer`, `/authors/...` pages.** Already shipped in Phase 0; refresh dates and contact details before going live.

6. **Phase ordering.** Phase 1 (4 countries, ~72 pages) must ship and reach AdSense approval before Phase 2 starts. Do not publish 540 pages then apply.

7. **No doorway pages.** A country hub must have unique editorial content, not just a list of links. The default country hub template currently has a short intro and a provider list — add 800–1200 words of country-specific narrative before declaring Phase complete for that country.

8. **Bill-check transparency.** Each provider page must show its `billCheckTier` label ("Live lookup", "Opens official portal pre-filled", "Opens official portal"). The `HeroBillCheck` component already does this — do not remove it.

9. **No fake forms.** Tier C (link-out) pages must not present a form that pretends to fetch a bill but actually only opens the portal. Use the existing component which is transparent about what happens.

10. **Photographer credits.** Every Pexels image must show "Photo by … on Pexels" — the `PexelsImage` component does this automatically. Do not remove the figcaption.

## Page structure (long-form hub)

Target word count: **5,000+ words**.

1. **Intro** — 300–500 words. What is this provider, where do they operate, what makes their market notable.
2. **How to check the bill** — 600–800 words. List every working method (portal, app, WhatsApp, BBPS/aggregator, SMS) with concrete steps.
3. **Anatomy of the bill** — 600–800 words. Every line item explained with what drives it.
4. **Tariff overview** — 500–700 words plus the `TariffTable` widget.
5. **Payment methods overview** — 400–500 words plus the `PaymentMethodGrid` widget.
6. **Smart meters / metering tech** — 400–600 words. Provider-specific.
7. **Complaints overview** — 300–500 words plus the `ComplaintsLadder` widget.
8. **Provider-specific operational topic** — 400–600 words. Examples: BEST/AEML changeover, ToD billing, monsoon outages, prepaid pilot.
9. **Energy saving** — 400–500 words. Bring local context (heat-pump adoption, AC penalties, solar net-metering).
10. **Move-in / move-out** — 300–400 words.
11. **FAQ** — 12–15 entries. ~80–150 words each.

## Spoke pages (5 per provider)

Target word count: **2,000–2,500 words each**.

- **Tariff** — full slab table, plus narrative explaining FAC, ToD, duty, TOSE.
- **Payment methods** — narrative for each method plus the grid.
- **Complaints** — narrative through each escalation step.
- **New connection** — documents, fees, timelines, deposit slabs.
- **FAQ** — 12–15 questions, sometimes deeper-cut than the hub FAQ.

## What NOT to do

- Do not write tariffs from memory or "industry estimates". Always pull from the regulator's most recent order PDF.
- Do not insert affiliate links into bill-pay flows. Link only to the utility's own portal.
- Do not promise availability ("works 100%", "always accurate"). Promise the review cadence ("last reviewed YYYY-MM-DD").
- Do not write content that would not look at home on a regulator's customer-education microsite. If a paragraph reads like marketing copy, rewrite it as a fact.

## AI-assistance protocol

We use AI tools to draft, but never to publish:

1. Feed the AI the **country brief** (`country-brief-template.md`) plus the **regulator order PDF excerpts** as ground truth.
2. Ask for a section draft per the structure above.
3. **Human editor pass** (1.5–2 hours per page) — verify tariff numbers, rewrite intro and conclusion, add 2–3 original insights.
4. Bump `lastReviewed` to today's date.
5. Commit with a descriptive message that names the country and provider.

If you cannot complete the human editor pass for a page, do not publish that page. Better to ship 60 well-edited pages than 540 with thin AI-drafted ones.
