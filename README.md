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
- [x] Get Started 3-step form (`/get-started`) with secure storage, photo uploads and a
      thank-you screen linking to Healthengine
- [x] Staff area (`/staff`) with login + two-factor to review submissions
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

## Get Started form and staff area

**How it works**

1. The patient fills in the 3-step form. Only first name, last name, date of birth and mobile are
   required (plus guardian consent for under-18s and the step 3 consents).
2. On submit, the server (`src/app/(site)/get-started/actions.ts`) saves the answers to Supabase
   using the secret key and issues one-time upload links. Photos go straight from the browser into
   the private `submissions` bucket.
3. A notification email with **only a secure link** goes to info@treatacne.com.au (no names,
   health details or photos).
4. Staff open the link, sign in at `/staff` with password + two-factor, review the answers and
   photos, and set the status (New, Reviewed, Added to Xestro). Every view and status change is
   logged.

**Security:** data is stored in Supabase's Sydney region and encrypted at rest. Row-level
security means the public key can't read or write anything; staff can read only after
two-factor sign-in and only if listed in `staff_members`. Database changes are recorded in
`supabase/migrations`.

**Environment variables** (Vercel > Project > Settings > Environment Variables): see
`.env.example`.

**Adding a staff member**

1. Supabase dashboard > Authentication > Users > **Add user** > Create new user. Enter their
   email and a strong temporary password, and tick **Auto Confirm User**.
2. In the SQL editor, run (with their email and name):
   ```sql
   insert into public.staff_members (user_id, name)
   select id, 'Marnie Pitts' from auth.users where email = 'marnie@example.com';
   ```
3. Give them the temporary password securely. On first sign-in at `/staff` they set up an
   authenticator app, and they can change their password under "Change password".

To remove access, delete the user in Authentication > Users (this also removes them from
`staff_members`).

**Testing locally in a proxied environment:** start the server with
`NODE_USE_ENV_PROXY=1` so server-side calls to Supabase go through the proxy.

**DLQI:** the Dermatology Life Quality Index is built into step 2 of the form (ages 16+) and the
staff page shows the score out of 30 with its band. It is switched off until the Cardiff University
licence is confirmed: set `DLQI_ENABLED = true` in `src/lib/dlqi.ts`. Under-16s would need the
separate Children's DLQI (CDLQI), which has its own licence.

**Still to do:** password-reset emails and cleaning up incomplete submissions.

