# API keys

## Pexels (free)

Used to fetch hero / section imagery at build time.

1. Sign up at https://www.pexels.com/api/
2. Generate an API key from your account dashboard.
3. Set `PEXELS_API_KEY=<key>` in `.env`.
4. Run `npm run fetch:images` once to populate `lib/data/images.json`.

The script is idempotent — running it again only fetches images for queries that are not yet in the JSON file. Pass `--refresh` to force re-fetch.

## Razorpay BBPS (India bill fetch)

Used for Tier-A real bill lookup for Indian providers (Adani Electricity, BSES, Tata Power Mumbai).

1. Create a Razorpay account at https://razorpay.com.
2. Complete the Know-Your-Business (KYB) onboarding — you must be a registered business entity in India.
3. Request BBPS activation from Razorpay support. Approval typically takes 5-10 working days.
4. Obtain `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` from your Razorpay dashboard.
5. Provision biller IDs — Razorpay publishes the list of NPCI BBPS billers; our `lib/data/providers.ts` records the biller ID per provider in the `bbpsBillerId` field. Verify each against the current Razorpay biller catalogue before going live.
6. Per-fetch cost: typically ₹0.5–3 depending on plan tier.

Without these keys, `/api/bill/in` returns a 503 telling the user to use the official portal — the UI gracefully falls back to a link-out.

## Pakistan PITC

No API keys required. The fetch is a direct HTTPS scrape of `https://bill.pitc.com.pk/<provider-path>`, which is a public portal. The relevant configuration is the per-call budget:

- `PITC_INVOCATION_BUDGET_MS` — total wall-clock budget for one fetch (recommended 30000 on self-hosted, 8500 on Vercel Hobby).

The implementation lives in `lib/bill/pitcBillFetch.ts`; it is a near-copy of the MEPCO project's `lib/pitcBillFetch.ts` with the allow-list derived from `providers.ts`.

## Google Search Console

Used for SEO verification.

1. Add the property at https://search.google.com/search-console.
2. Use the HTML meta tag verification method.
3. Copy the `content="..."` value to `NEXT_PUBLIC_GSC_VERIFICATION`.
4. Submit `https://checkbillsonline.com/sitemap.xml` once verified.

## Bing Webmaster

1. Verify your site at https://www.bing.com/webmasters.
2. Choose meta-tag verification; copy the value to `NEXT_PUBLIC_BING_VERIFICATION`.

## Google AdSense

Do **not** enable AdSense until Phase 1 is fully published (4 pilot countries × 3 providers × 6 pages = 72 pages live) and you have run through `docs/adsense-preflight.md`.

When ready:

1. Apply for AdSense at https://www.google.com/adsense.
2. Once approved, set `NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-xxxxxxxxx`.
3. Toggle `NEXT_PUBLIC_ADSENSE_ENABLED=true`.

`<AdSlot>` reads both flags and renders the `<ins class="adsbygoogle">` only when both are set.
