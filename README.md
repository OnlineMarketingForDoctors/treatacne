# Treat:Acne website

Next.js 15 (App Router) + TypeScript + Tailwind CSS v4.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Status

- [x] Home page (desktop + mobile, mobile menu drawer, FAQ accordion)
- [ ] About, How it works, Pricing, Shop, Product, Contact, Quiz, Get Started form

## Placeholders to replace

- **Font:** Neue Haas Unica W1G Regular is installed (`src/fonts`). Bold is still missing, so
  bold text is synthesised by the browser. Add the Bold file in `src/app/layout.tsx`.
- **Photos:** `public/images/*` were cropped from the Figma JPG exports. Swap in the original
  high-resolution photos when available.
- **FAQ answers** and **social links:** in `src/lib/site.ts`, need client approval.
- **Newsletter form:** shows a confirmation only; not yet connected to an email platform.
