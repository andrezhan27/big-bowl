# Deployment readiness — 12 October 2026

The local production build is validated. Full branch IDs (`bigbowlroma`, `bigbowltelheiras`, `bigbowlspacio`) are used in reservation query strings and widget paths; older short query IDs still resolve. Public booking launch still needs the external restaurant setup described below. This audit did not deploy the site or submit reservations.

## Changes

- Converted all 22 photo/logo PNG files to WebP. Photos are capped at 1600px wide without enlargement; transparent logos use lossless WebP at 768px. Updated every application reference and removed the duplicate PNG originals. The favicon remains PNG.
- Photo/logo assets fell from 48,366,606 to 3,531,992 bytes (92.7%). The complete final image folder, including the social preview and favicon, is 3,686,404 bytes. A 1080px hero response from the production image optimiser is 68,588 bytes.
- Preserved responsive Next.js image optimisation, lazy loading below the hero, and the initial hero/logo preload. Restricted the optimiser to `/images/**`; external image URLs are rejected. Optimised responses use the framework's four-hour cache.
- Added canonical links for home and reservation pages, a sitemap, robots.txt, Open Graph/Twitter previews, and Restaurant JSON-LD with the owner-supplied addresses/hours. The canonical origin is `https://bigbowl.pt`.
- Added `nosniff`, `strict-origin-when-cross-origin`, and `SAMEORIGIN` response headers; removed the framework disclosure header. The reservation iframe and Google Maps embeds continue to load.
- Removed the page-hiding language bootstrap. The page now stays visible if JavaScript is unavailable, language switching works when local storage fails, and restaurants have a static no-JavaScript fallback.
- Added an accessible reservation-page heading. Added a timeout and response validation to the legal URL fetch so bad external data cannot crash the footer.
- Removed the unused Inter package; the existing local WOFF2 font remains in use. Added `npm run check` and reusable production HTTP smoke tests.

## Verification

- `npm run check`: ESLint, TypeScript, and production build passed.
- HTTP smoke tests: home; all three branch URLs; absent, invalid, and repeated branch parameters; robots.txt; sitemap.xml; the 404 page; canonical metadata; social image metadata; structured data; image optimisation and local image restrictions; and security headers passed.
- All 15 unique referenced image files exist. No PNG photo references remain.
- Isolated checks for storage-blocked language switching, cross-tab updates, malformed legal responses, and legal URL lookup passed.
- Mobile production inspection found no horizontal overflow, missing section targets, broken loaded images, or clipped review text.
- Production browser: desktop/mobile layouts, image rendering, English persistence after reload, and reservation navigation checked. No first-party console warnings/errors were observed during the desktop home/language test.
- The booking widget's selected branch and iframe URL agree. Roma loads the form; Telheiras and Spacio return `Reservation widget not found`.
- No real booking was submitted. No Lighthouse score or real-user Core Web Vitals measurement is claimed; those should be measured on the deployed domain.

## External setup and follow-ups

1. Create/enable the `bigbowltelheiras` and `bigbowlspacio` records in the booking service. Their supplied widget URLs currently do not resolve to forms.
2. Configure booking availability and confirm a test reservation with the booking system owner. Roma loads but the date shown during testing had no available times.
3. Privacy/terms are deferred at the owner’s request. When ready, populate `restaurants.privacy_policy_url` and `restaurants.terms_and_conditions_url`. The public REST query currently returns only `bigbowlroma`, with both fields empty; the other two branch records are absent. The footer automatically displays approved URLs when present.
4. In Vercel, set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` before building. Optionally set `SITE_URL=https://bigbowl.pt` (the default). The public key must be allowed to read the three restaurant legal URL records. Never deploy a service-role key to the browser.
5. Add `bigbowl.pt`, configure DNS according to the hosting provider, enable HTTPS, and redirect the alternate hostname to the primary domain. Verify `/robots.txt`, `/sitemap.xml`, and `/reservation` on the public domain.
6. The Menu CTA currently opens the visible specialties because no approved full-menu URL was supplied. Add `brand.menuUrl` if a separate menu should be available.

## Dependency audit

`npm audit --omit=dev` reports zero vulnerabilities in production dependencies. The full audit reports five high-severity entries in one development-only chain: `eslint-config-next → @next/eslint-plugin-next → fast-glob → micromatch → braces`.

The underlying issue is [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm), a stack-exhaustion issue in braces 3.0.3 and earlier. No patched version is published as of this audit; a targeted update stayed at 3.0.3. Keep CI glob patterns trusted and recheck when a fix is released. The forced audit suggestion downgrades Next's lint configuration across major versions and was not applied. This finding is not a runtime exposure in the deployed landing page.

## Re-run

```sh
npm ci
npm run check
npm run start -- --port 3001
# In a second terminal:
npm run check:smoke
npm audit --omit=dev
npm audit
```
