# Big Bowl

A bilingual Big Bowl / 来一碗 website for Lisbon, built with Next.js 16, TypeScript, Tailwind CSS 4, Framer Motion 12, and Lucide.

## Local development

```bash
npm install
npm run dev
```

Use Node.js 22 or newer. Run `npm ci` and `npm run check` before deployment (lint, TypeScript, and production build). The build script uses Next.js Webpack because the local sandbox blocks a Turbopack worker port. Vercel can use this script as configured.

## Editing content

`src/lib/content.ts` holds the brand, PT/EN interface text, three ordered restaurants (Roma, Telheiras, Spacio), ratings, review excerpts, illustrative dish labels, map links, and reservation paths. The ratings and reviews are supplied by the project owner. The dish captions describe supplied photographs and are **not a verified full menu**. Replace them with approved menu copy before publishing. There is no supplied menu PDF or URL, so the full-menu CTA returns to the visible specialties.

The optimised WebP photos and transparent logos live in `public/images`. The favicon stays PNG for compatibility, and the social preview is a 1200×630 JPEG. The navbar and footer use the supplied transparent black and white logos. The bowl favicon is cropped from the same artwork. Adjust restaurant image focal points in `src/lib/content.ts` and hero imagery in `src/components/Hero.tsx`. The semantic red, warm neutral, and text palette lives in `src/app/globals.css` and is exposed to Tailwind.

The supplied Google Maps embed links are configured per restaurant. The restaurant addresses and opening hours are supplied by the project owner. Each Reserve button opens `/reservation?branch=bigbowlroma`, `/reservation?branch=bigbowltelheiras`, or `/reservation?branch=bigbowlspacio`; that page shows the branch dropdown above a full-width Intelis reservation widget that fills the remaining viewport. The widget provides the only scrolling area on this page. Changing branches switches the iframe between `https://reserve.intelis.pt/bigbowlroma`, `/bigbowltelheiras`, and `/bigbowlspacio`, and updates the URL. The booking form and reservation submission are handled by the embedded service.

The footer reads `privacy_policy_url` and `terms_and_conditions_url` from Supabase `restaurants` rows with IDs `bigbowlroma`, `bigbowltelheiras`, and `bigbowlspacio`. Set the public connection variables shown in `.env.example` (locally configured in `.env.local`). Missing links stay hidden until those rows have URLs. Shared policy URLs appear once; distinct branch policies include the branch names. The publishable key must have read access to those rows.

## Vercel

Import the repository into Vercel with Next.js defaults. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in Vercel to enable the legal footer links. Canonical links, the sitemap, robots.txt, social cards, and restaurant structured data use `https://bigbowl.pt`. `SITE_URL` can override that origin if needed. Vercel handles HTTPS and the Next.js runtime. Set `bigbowl.pt` as the primary domain and redirect alternate domains to it.

For production smoke tests, start the built server with `npm run start -- --port 3001`, then run `npm run check:smoke` in another terminal. `SMOKE_TEST_URL` overrides the local origin.

See [docs/deployment-readiness.md](docs/deployment-readiness.md) for verified checks and the remaining external setup.
