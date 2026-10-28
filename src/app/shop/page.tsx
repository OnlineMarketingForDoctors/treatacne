import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FinalCta } from "@/components/FinalCta";
import { ProductCard } from "@/components/shop/ProductCard";
import { categories, products } from "@/lib/products";
import { revealDelay } from "@/lib/reveal";
import { SHOP_ENABLED } from "@/lib/site";
import { WaitlistForm } from "@/components/WaitlistForm";

export const metadata: Metadata = {
  title: "Shop",
  description: "Dermatologist-developed skincare is coming soon. Join the waitlist to be notified.",
};

export default async function ShopPage(props: { searchParams: Promise<{ category?: string }> }) {
  return SHOP_ENABLED ? <ProductListing {...props} /> : <ComingSoon />;
}

function ComingSoon() {
  return (
    <>
      <section className="grid border-b border-brand lg:min-h-[600px] lg:grid-cols-[34.7%_1fr]">
        <div className="flex flex-col justify-between gap-12 px-5 pt-8 pb-10 lg:px-[30px] lg:pt-[28px] lg:pb-[30px]">
          <h1 data-reveal="up" className="text-h2 lg:text-h2-lg">
            Dermatologist-developed skincare is coming soon.
          </h1>
          <div data-reveal="up" id="waitlist" className="scroll-mt-[80px]">
            <p className="mb-8 text-body text-black">
              Sign up and we&apos;ll email you as soon as our range is available.
            </p>
            <WaitlistForm />
          </div>
        </div>
        <div className="px-5 pb-5 lg:p-[28px]">
          <div className="relative aspect-[352/318] h-full overflow-hidden rounded-2xl lg:aspect-auto">
            <Image
              src="/images/products.jpg"
              alt="Treat:Acne skincare packaging"
              fill
              priority
              sizes="(min-width: 1024px) 60vw, 100vw"
              data-reveal="zoom"
              className="object-cover"
            />
          </div>
        </div>
      </section>
      <FinalCta tone="white" />
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

      <FinalCta tone="white" />
    </>
  );
}
