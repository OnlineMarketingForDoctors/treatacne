# Treat:Acne website

Next.js 15 (App Router) + TypeScript + Tailwind CSS v4.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Status

Content follows the **Treat:Acne Website Build Guide** (Oct 2026), which overrides the Figma
placeholder copy. Shared copy, prices, FAQ and links live in `src/lib/site.ts`.

- [x] Home, About (incl. Meet the Team), How It Works
- [x] Pricing, Severe & persistent acne, FAQ, Learn, Photo guide, Quiz, Contact
- [x] Shop "coming soon" + waitlist. Product pages and cart are built but switched off
      (`SHOP_ENABLED` in `src/lib/site.ts`)
- [ ] Get Started 3-step form (needs secure Australian storage). `/get-started` is a temporary
      page with the booking button
- [ ] CMS so Niyati can edit prices, FAQ and team; GA4 + cookie notice; Learn articles

## Placeholders to replace

- **Healthengine booking link:** `BOOKING_URL` in `src/lib/site.ts` (all Book buttons use it).
- **Kajabi course checkout link:** `COURSE_URL` in `src/lib/site.ts`.
- **Team headshots** (About page shows initials), **Instagram/LinkedIn links**.
- **Privacy Policy and Terms of Use** pages show a "coming soon" line.
- **Email sign-up** (footer and Shop waitlist) shows a confirmation only; connect to Niyati's
  email platform.
- **Font:** Neue Haas Unica W1G Regular is installed (`src/fonts`). Bold is still missing, so
  bold text is synthesised by the browser. Confirm the web licence.
- **Photos:** `public/images/*` were cropped from the Figma JPG exports, except `man-desktop.jpg` /
  `man-mobile.jpg` and `about-mission.jpg` / `about-vision.jpg`, which were recreated without the
  baked-in text using Nano Banana Pro. `photo-guide-example.jpg` is low resolution. Swap in the
  original photos when available.
- **Products** (when the shop launches): `src/lib/products.ts` is a placeholder catalogue.
