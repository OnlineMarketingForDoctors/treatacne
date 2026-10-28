import type { Metadata } from "next";
import Link from "next/link";
import { FinalCta } from "@/components/FinalCta";
import { ProductCard } from "@/components/shop/ProductCard";
import { categories, products } from "@/lib/products";
import { revealDelay } from "@/lib/reveal";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Dermatologist-developed cleansers, moisturisers, serums and supplements to support clear, healthy skin.",
};

export default async function ShopPage({
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
