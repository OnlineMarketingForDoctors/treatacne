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

- **Font:** designs use Neue Haas Unica W1G (licensed, Monotype). Inter is used until the
  webfont files are supplied; add them with `@font-face` in `src/app/globals.css`.
- **Photos:** `public/images/*` were cropped from the Figma JPG exports. Swap in the original
  high-resolution photos when available.
- **FAQ answers** and **social links:** in `src/lib/site.ts`, need client approval.
- **Newsletter form:** shows a confirmation only; not yet connected to an email platform.
