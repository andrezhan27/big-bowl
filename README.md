# Big Bowl landing page

Next.js 16 App Router landing page for Big Bowl / 来一碗 in Lisbon. Built with TypeScript, Tailwind CSS 4, Framer Motion 12 and Lucide.

## Run locally

```bash
npm install
npm run dev
```

Validation: `npm run lint`, `npm run typecheck`, `npm run build`.

## Content and business details

The identity and photographs come from `public/images`. The exterior photograph confirms the Big Bowl / 来一碗 name and its red signage. The semantic palette in `src/app/globals.css` is a visual selection from those supplied assets, with the red sign as the primary reference. `src/lib/content.ts` holds brand details, PT/EN copy, sample dish captions, locations and their optional contact fields. The dish captions describe visible ingredients and are illustrative, **not a verified menu**. Replace them with approved menu copy before publishing. No full menu PDF or URL was supplied, so its CTA returns to the visible specialties.

The supplied filenames indicate Roma, Telheiras and Spacio spaces. Their exact addresses, phone numbers, hours, directions links and reservation URLs were not supplied, so those fields remain unset. Enter confirmed values in each location object. Directions, phone and booking actions only render when corresponding data exists. An iframe appears only for a configured reservation URL. The hero reservation CTA leads to the contact section until a booking destination is available.

Replace images in `public/images` and update paths and focal points in `src/lib/content.ts` or `src/components/Hero.tsx`. The navbar uses a cropped copy of the supplied logo (`logo-nav.png`) to preserve the complete icon and lettering. The favicon currently uses the supplied logo image.

## Deploy to Vercel

Import the repository into Vercel and use the Next.js defaults. No environment variables are required. Add verified booking, menu and operational details before public launch. No canonical domain or business structured data is configured.
