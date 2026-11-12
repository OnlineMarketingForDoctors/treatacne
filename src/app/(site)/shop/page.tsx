import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FinalCta } from "@/components/FinalCta";
import { ProductCard } from "@/components/shop/ProductCard";
import { categories, products } from "@/lib/products";
import { revealDelay } from "@/lib/reveal";
import { PillLink } from "@/components/Button";
import { COURSE_PAGE, GET_STARTED_URL, SHOP_ENABLED } from "@/lib/site";
import { WaitlistForm } from "@/components/WaitlistForm";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Dermatologist-developed skincare for acne-prone skin is coming soon: two kits and five everyday essentials. Join the waitlist to be notified.",
  alternates: { canonical: "/shop" },
};

export default async function ShopPage(props: { searchParams: Promise<{ category?: string }> }) {
  return SHOP_ENABLED ? <ProductListing {...props} /> : <ComingSoon />;
}

// Planned range (Niyati's Shop brief). Cosmetic wording only: no claims that a product treats,
// cures or prevents acne (TGA). Sunscreen SPF 50+ must be TGA-listed (AUST L) before sale.
// Supplements and azelaic acid are left out for now.
const kits = [
  {
    name: "Acne Starter Kit",
    body: "The everyday basics for acne-prone skin, in one box.",
    items: ["Gentle cleanser", "Oil-free moisturiser", "Sunscreen SPF 50+"],
    image: "/images/hero-face.jpg",
    alt: "Smiling woman with cleanser on her face",
  },
  {
    // Public name: never name a prescription medicine on a public page (TGA).
    // TODO: confirm the public kit name and contents with the manufacturer.
    name: "Skin Support Kit",
    body: "Extra-gentle care for skin and lips that feel very dry during acne treatment.",
    items: ["Gentle cleanser", "Oil-free moisturiser", "Sunscreen SPF 50+", "Lip balm", "Barrier ointment for lips and nose"],
    image: "/images/man-mobile.jpg",
    alt: "Man applying cleanser to his face",
  },
];

const essentials = [
  { name: "Gentle cleanser", body: "Low-foaming, fragrance-free, for daily use." },
  { name: "Oil-free moisturiser", body: "Lightweight and non-comedogenic." },
  { name: "Niacinamide + hyaluronic serum", body: "Hydrating serum for oily and acne-prone skin." },
  { name: "Sunscreen SPF 50+", body: "Light, oil-free daily sun protection." },
  { name: "Lip balm", body: "For dry lips during treatment." },
];

// TODO: add "Made in Australia" once the manufacturer is confirmed.
const points = [
  { title: "Simple routines", body: "Cleanse, treat, moisturise, protect. No 10-step routines." },
  { title: "Made to go with treatment", body: "Gentle enough to use alongside prescription creams and tablets." },
];

const tag = "inline-block rounded-full bg-[#fcede6] px-3 py-1 text-note text-brand";

function ComingSoon() {
  return (
    <>
      <section className="grid grid-cols-1 border-b border-brand bg-cream lg:min-h-[600px] lg:grid-cols-[1fr_1fr]">
        <div className="flex flex-col justify-center px-5 pt-10 pb-10 lg:px-[30px] lg:py-[60px]">
          <p data-reveal="up" className="text-small tracking-[0.12em] uppercase">
            Treat:Acne skincare
          </p>
          <h1 data-reveal="up" className="mt-4 max-w-[560px] text-h2 lg:text-h2-lg">
            Dermatologist-developed skincare, coming soon.
          </h1>
          <p data-reveal="up" className="mt-6 max-w-[520px] text-body text-black lg:text-big">
            A simple, gentle range for acne-prone skin, chosen by Dr Niyati Sharma to sit alongside
            your treatment. Join the waitlist and we&apos;ll email you when it&apos;s available.
          </p>
          <div data-reveal="up" id="waitlist" className="mt-8 max-w-[560px] scroll-mt-[90px]">
            <WaitlistForm />
          </div>
        </div>
        <div className="px-5 pb-5 lg:p-[30px]">
          {/* TODO: swap in Chris's new placeholder image when it arrives (same slot) */}
          <div className="relative aspect-[352/318] h-full overflow-hidden rounded-2xl lg:aspect-auto">
            <Image
              src="/images/products.jpg"
              alt="Treat:Acne skincare packaging"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              data-reveal="zoom"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="px-5 py-12 lg:px-[30px] lg:py-[60px]">
        <h2 data-reveal="up" className="text-h2 lg:text-h2-lg">
          The range
        </h2>
        <p data-reveal="up" className="mt-4 text-body text-black">
          Two kits and five everyday essentials. Fragrance-free, oil-free and non-comedogenic.
        </p>

        <h3 className="mt-10 text-[22px] leading-[1.2] lg:text-[26px]">Kits</h3>
        <ul className="mt-5 grid gap-5 lg:grid-cols-2 lg:gap-[30px]">
          {kits.map((kit, i) => (
            <li
              key={kit.name}
              data-reveal="up"
              style={revealDelay(i * 100)}
              className="grid overflow-hidden rounded-2xl border border-brand sm:grid-cols-[42%_1fr]"
            >
              <div className="relative aspect-[4/3] sm:aspect-auto">
                <Image src={kit.image} alt={kit.alt} fill sizes="(min-width: 1024px) 20vw, (min-width: 640px) 42vw, 100vw" className="object-cover" />
              </div>
              <div className="p-5 lg:p-6">
                <span className="inline-block rounded-full bg-brand px-3 py-1 text-note text-white">
                  Kit · Coming soon
                </span>
                <h4 className="mt-4 text-[22px] leading-[1.2]">{kit.name}</h4>
                <p className="mt-2 text-body text-black">{kit.body}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {kit.items.map((item) => (
                    <li key={item} className="rounded-full border border-brand/50 px-3 py-1 text-note text-black">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>

        <h3 className="mt-12 text-[22px] leading-[1.2] lg:text-[26px]">Individual products</h3>
        <ul className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 lg:gap-[20px]">
          {essentials.map((p, i) => (
            <li
              key={p.name}
              data-reveal="up"
              style={revealDelay((i % 5) * 70)}
              className="flex flex-col overflow-hidden rounded-2xl border border-brand/40"
            >
              {/* TODO: product photos when ready */}
              <div aria-hidden className="flex aspect-[4/3] items-center justify-center bg-cream text-note text-black/40">
                Photo coming soon
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h4 className="text-body">{p.name}</h4>
                <p className="mt-1 flex-1 text-small text-black">{p.body}</p>
                <span className={`mt-3 self-start ${tag}`}>Coming soon</span>
              </div>
            </li>
          ))}
        </ul>

        <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:gap-[30px]">
          {points.map((pt) => (
            <li key={pt.title} data-reveal="up" className="rounded-2xl bg-cream p-5 lg:p-6">
              <h3 className="text-body font-bold">{pt.title}</h3>
              <p className="mt-2 text-body text-black">{pt.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="px-5 pb-12 lg:px-[30px] lg:pb-[60px]">
        <div data-reveal="up" className="grid overflow-hidden rounded-2xl bg-brand text-white lg:grid-cols-2">
          <div className="relative h-[240px] lg:h-auto lg:min-h-[340px]">
            <Image src="/images/hero-face.jpg" alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover object-[50%_25%]" />
          </div>
          <div className="flex flex-col justify-center p-5 lg:p-[36px]">
            <h2 className="text-h2 lg:text-h2-lg">Not sure what your skin needs?</h2>
            <p className="mt-4 max-w-[480px] text-body">
              Skincare helps, but most acne needs a treatment plan. Start with a free call with our
              acne nurse, or learn the basics with our online course.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <PillLink href={GET_STARTED_URL} tone="light" className="bg-white !text-brand hover:!bg-cream">
                Get Started →
              </PillLink>
              <PillLink href={COURSE_PAGE} tone="light">
                Mastering Acne course →
              </PillLink>
            </div>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}

// Product grid, used once the shop launches (SHOP_ENABLED in lib/site.ts).
async function ProductListing({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category: categorySlug } = await searchParams;
  const category = categories.find((c) => c.slug === categorySlug);
  const shown = category ? products.filter((p) => p.category.slug === category.slug) : products;

  return (
    <>
      <section className="border-b border-brand px-5 pt-8 pb-16 lg:px-[30px] lg:pt-[28px] lg:pb-[100px]">
        {/* The design repeats the About heading here; this uses the shop line from the home page */}
        <h1 data-reveal="up" className="max-w-[640px] text-h2 lg:text-h2-lg">
          {category ? category.name : "Shop our dermatologist-developed skincare"}
        </h1>
        {category && (
          <Link href="/shop" className="mt-4 inline-block text-body underline underline-offset-2">
            View all products
          </Link>
        )}

        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 lg:mt-[105px] lg:grid-cols-4 lg:gap-x-[30px] lg:gap-y-[90px]">
          {shown.map((product, i) => (
            <li key={product.slug} data-reveal="up" style={revealDelay((i % 4) * 80)}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </section>

      <FinalCta />
    </>
  );
}
