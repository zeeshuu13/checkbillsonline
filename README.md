# checkbillsonline.com

Next.js 16 (App Router) + Tailwind CSS 4 site that explains how to check electricity, gas, and water bills across 30 countries. Sibling project to the existing MEPCO/checkbills.pk codebase at the parent directory — this folder is fully self-contained.

## Quick start

```bash
cd international
cp .env.example .env
# fill in PEXELS_API_KEY at minimum
npm install
npm run dev          # http://localhost:3100
```

The dev server runs on port 3100 to avoid colliding with the MEPCO site on 3000.

## Layout

```
international/
├── app/                      # Next.js App Router routes
│   ├── page.tsx              # global hub
│   ├── [country]/            # 30 country hubs + 3 utility-type hubs each
│   │   └── [providerBillCheck]/
│   │       └── [spoke]/      # tariff / payment-methods / complaints / new-connection / faq
│   ├── api/bill/{pk,in}/     # real-fetch endpoints
│   ├── sitemap.ts            # dynamic sitemap from data + providers
│   ├── robots.ts             # allows all, disallows /api
│   └── llms.txt/             # LLM access policy
├── components/               # ~22 reusable components
├── lib/
│   ├── data/                 # countries.ts, providers.ts, images.json
│   ├── content/              # authored long-form content per provider
│   ├── seo/                  # metadata + JSON-LD builders
│   ├── bill/                 # PITC fetcher (Pakistan)
│   └── pexels.ts             # Pexels API helper
├── scripts/fetch-images.mjs  # build-time Pexels fetcher
└── docs/                     # editorial + operations guides
```

## Phased rollout

Per the project plan (see `C:\Users\itsxh\.claude\plans\create-a-plan-for-ethereal-wall.md`):

| Phase | Scope                                      | Duration  |
| ----- | ------------------------------------------ | --------- |
| 0     | Foundation + 1 template country (India/Adani) | 2 weeks   |
| 1     | India + USA + UAE + Pakistan (4 pilots)    | 4 weeks   |
| 2     | 7 more countries                           | 8 weeks   |
| 3     | Remaining 19 countries                     | 16 weeks  |

Phase 0 deliverables are in this repository.

## Available scripts

```bash
npm run dev          # dev server on :3100
npm run build        # production build (SSG)
npm start            # serve production build
npm run lint         # next lint
npm run fetch:images # populate lib/data/images.json from Pexels API
```

## Authored content

The only currently-authored content is the template:

- `lib/content/india/adani-electricity.ts` — Adani Electricity Mumbai, ~5,200-word hub + 5 spokes.

To author a new provider, follow `docs/content-style-guide.md` and `docs/country-brief-template.md`.

## Bill-check tiers (per `Provider.billCheckTier`)

- **A-real**  — fetched on our server. Pakistan via PITC mirror, India via Razorpay BBPS.
- **B-deeplink** — opens the official portal with the reference number prefilled (about 8–10 providers).
- **C-linkout** — opens the official portal home; user logs in there. Default for US/UK/CA/AU.

## Deployment

The project is configured for both Vercel and Node-server self-hosting (mirroring the MEPCO project's Hostinger setup). The default `npm start` runs `next start -p 3100`; for Vercel, just connect the repo and use the `international/` folder as the project root.

## Required env vars

| Variable                    | Purpose                                    | Required at      |
| --------------------------- | ------------------------------------------ | ---------------- |
| `NEXT_PUBLIC_SITE_URL`      | Canonical site URL                         | build + runtime  |
| `PEXELS_API_KEY`            | Pexels search for build-time image fetch   | build (optional) |
| `RAZORPAY_KEY_ID`           | BBPS bill fetch (India real-time)          | runtime          |
| `RAZORPAY_KEY_SECRET`       | BBPS bill fetch (India real-time)          | runtime          |
| `PITC_INVOCATION_BUDGET_MS` | Per-call budget for Pakistan bill fetch    | runtime          |
| `NEXT_PUBLIC_GSC_VERIFICATION` | Google Search Console site verification | build (optional) |

See `docs/api-keys.md` for provisioning steps.

## Operational notes

- **AdSense.** Do not enable AdSense ads until Phase 1 is published and you have run through `docs/adsense-preflight.md`. The `<AdSlot>` component is feature-flagged by `NEXT_PUBLIC_ADSENSE_ENABLED`.
- **Content review cycle.** Every authored page has a visible `lastReviewed` date. Refresh on a 90-day cadence; the review is a manual editorial pass against the cited sources.
- **Tariff updates.** When a regulator issues a new order, update the relevant `lib/content/<country>/<provider>.ts` file and bump `lastReviewed`.
