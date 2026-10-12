# Big Bowl

A bilingual Big Bowl / 来一碗 website for Lisbon, built with Next.js 16, TypeScript, Tailwind CSS 4, Framer Motion 12, and Lucide.

## Local development

```bash
npm install
npm run dev
```

Run `npm run lint`, `npm run typecheck`, and `npm run build` before deployment. The build script uses Next.js Webpack because the local sandbox blocks a Turbopack worker port. Vercel can use this script as configured.

## Editing content

`src/lib/content.ts` holds the brand, PT/EN interface text, three ordered restaurants (Roma, Telheiras, Spacio), ratings, review excerpts, illustrative dish labels, map links, and reservation paths. The ratings and reviews are supplied by the project owner. The dish captions describe supplied photographs and are **not a verified full menu**. Replace them with approved menu copy before publishing. There is no supplied menu PDF or URL, so the full-menu CTA returns to the visible specialties.

The supplied photos and logo live in `public/images`. The navbar and footer use trimmed copies of the supplied transparent logos. The bowl favicon is cropped from the same artwork. Adjust restaurant image focal points in `src/lib/content.ts` and hero imagery in `src/components/Hero.tsx`. The semantic red, warm neutral, and text palette lives in `src/app/globals.css` and is exposed to Tailwind.

The supplied Google Maps embed links are configured per restaurant. Exact addresses, opening hours, phone numbers, and a booking service or backend were not supplied. Each Reserve button opens `/reservation?branch=roma`, `/reservation?branch=telheiras`, or `/reservation?branch=spacio`; that page presents the selected restaurant and map. It does **not** submit a reservation. Add verified contact information and a real booking integration before treating the route as transactional.

## Vercel

Import the repository into Vercel with Next.js defaults. No environment variables are required. No canonical domain or structured business data is configured. Add verified operational details before public launch.
