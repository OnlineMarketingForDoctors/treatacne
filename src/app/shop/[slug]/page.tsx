import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DermatologistPlan } from "@/components/DermatologistPlan";
import { FinalCta } from "@/components/FinalCta";
import { AddToCartButton } from "@/components/shop/AddToCartButton";
import { ProductGallery } from "@/components/shop/ProductGallery";
import { formatPrice, getProduct, products } from "@/lib/products";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const product = getProduct((await params).slug);
  return product ? { title: product.name, description: product.description[0] } : {};
}

export default async function ProductPage({ params }: { params: Params }) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  return (
    <>
      <section className="grid gap-8 px-5 pt-5 pb-10 lg:grid-cols-[45.7%_30.6%] lg:gap-[4.6%] lg:px-[30px] lg:pt-[30px] lg:pb-[30px]">
        <div data-reveal="up">
          <ProductGallery images={product.images} name={product.name} />
        </div>

        <div data-reveal="up" className="lg:pt-[33px]">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-x-2.5 text-body">
              <li>
                <Link href="/shop" className="hover:underline">
                  Shop
                </Link>
              </li>
              <li aria-hidden>•</li>
              <li>
                <Link href={`/shop?category=${product.category.slug}`} className="hover:underline">
                  {product.category.name}
                </Link>
              </li>
              <li aria-hidden>•</li>
              <li>
                <span aria-current="page" className="underline underline-offset-2">
                  {product.name}
                </span>
              </li>
            </ol>
          </nav>

          <div className="mt-8 border-t border-brand pt-3 lg:mt-[37px]">
            <div className="flex items-baseline justify-between gap-6 text-[26px] leading-[1.1] lg:text-[32px]">
              <h1>{product.name}</h1>
              <p>{formatPrice(product.price)}</p>
            </div>
            <p className="mt-10 border-b border-brand pb-3 text-body text-black lg:mt-[50px]">
              {product.size}
            </p>
          </div>

          <div className="mt-4 space-y-3 text-body text-black">
            {product.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-10 lg:mt-[45px]">
            <AddToCartButton slug={product.slug} />
          </div>
        </div>
      </section>

      <DermatologistPlan />
      <FinalCta tone="white" />
    </>
  );
}
