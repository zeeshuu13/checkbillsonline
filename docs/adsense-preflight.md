# AdSense pre-flight checklist

Google's AdSense Program Policies have a real teeth — in particular, **Scaled Content Abuse** (March 2024 Helpful Content update) and **Spammy automatically-generated content**. Apply the checklist below before submitting; if any item is unchecked, fix first.

## Pre-application — site state

- [ ] **At least 4 countries fully published** (Phase 1 complete: India + USA + UAE + Pakistan, 3 providers each, 6 pages each = 72 pages).
- [ ] Every published page has **5,000+ words** for hubs and **2,000+ words** for spokes.
- [ ] Every published page has a **visible `lastReviewed` date** and **named author byline** at the bottom.
- [ ] Every tariff number on the site cites a **regulator URL** with **retrieval date**.
- [ ] Each country page has **at least 3 original data points** unique to that country (load-shedding, regulatory law, specific incident).
- [ ] No **template-spun paragraphs** across countries — intros and conclusions are written per-country.

## Pre-application — required pages

- [ ] `/about` — explains who we are, what we do, what we don't do.
- [ ] `/contact` — real email, response-time expectation, link to corrections form.
- [ ] `/privacy` — current effective date, third-party services named, cookies policy, data-retention spelled out.
- [ ] `/terms` — current effective date, jurisdiction, limitation of liability.
- [ ] `/disclaimer` — non-affiliation statement, editorial-not-advice statement, tariff-may-change statement.
- [ ] `/authors/editorial` (and any other author profiles).
- [ ] All these reachable from the footer of every page.

## Pre-application — site quality

- [ ] **Lighthouse Performance ≥ 90, Accessibility = 100, Best Practices = 100, SEO = 100** for any 5 randomly selected published pages.
- [ ] Mobile rendering verified — no overflow, no broken nav, hero stacks properly.
- [ ] Sitemap submitted to Google Search Console, all 72 pages indexable.
- [ ] No mixed-content warnings, no 4xx links in the footer or cluster bands.
- [ ] Robots.txt allows Googlebot.
- [ ] Schema markup validates in Rich Results Test for at least 3 page types (hub, spoke, FAQ).

## Pre-application — content quality (manual audit)

- [ ] No empty utility-type hubs ("We are still compiling…" copy is fine for a few water/gas pages while we build the catalog; **electricity must have content for every published country**).
- [ ] No duplicated content blocks — every section was rewritten per page, not copied.
- [ ] No spammy keyword stuffing ("Adani Electricity Adani Electricity Adani Electricity Mumbai pay bill cheap fast"). Read 5 random pages out loud as a final check.
- [ ] No AI-tell phrases: "as a language model", "in conclusion, …", "delve into", "tapestry of", "in today's fast-paced world". Search the codebase before applying.

## Application

- [ ] Apply at https://www.google.com/adsense — link to the verified Search Console property.
- [ ] Choose AdSense for content; do not enable Auto Ads until your manual placements have been live for two weeks.
- [ ] Wait for approval (1-14 days typical). If rejected, read the rejection reason verbatim and address it — do not re-apply blindly.

## Post-approval

- [ ] Set `NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-...`
- [ ] Set `NEXT_PUBLIC_ADSENSE_ENABLED=true`
- [ ] Place ads only **after** primary content, never inside the hero, never inside the bill-check form, never above the H1.
- [ ] Cap ad density: max 2 ad units per page, max 1 above the fold.
- [ ] Block ad categories that clash with utility content (no gambling, no get-rich schemes) — set in AdSense dashboard.
- [ ] Monitor Search Console for any "Site reputation abuse" or "Scaled content abuse" notifications. If you get one, **immediately remove ads** and audit your site's content against this checklist before requesting reconsideration.

## What gets sites banned

These come straight from Google's published actions in 2024-2025. We avoid every one of them:

- AI-generated content published without human review.
- Pages that exist only to rank for a keyword combination with no unique insight.
- Pages that link out to other low-quality pages on the same domain to inflate page count.
- Pages that contain ads but no editorial content above the first ad.
- Sites that publish at velocity inconsistent with the editorial team size.
