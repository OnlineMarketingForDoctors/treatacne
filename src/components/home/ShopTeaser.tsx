import Image from "next/image";
import { BoxLink } from "@/components/Button";

export function ShopTeaser() {
  return (
    <section className="grid border-t border-brand lg:min-h-[693px] lg:grid-cols-[34.7%_1fr]">
      <div className="flex flex-col">
        <h2
          data-reveal="up"
          className="px-5 pt-8 pb-6 text-h2 lg:flex-1 lg:rule-r lg:[--rule-y1:10px] lg:px-[30px] lg:pt-[30px] lg:text-h2-lg"
        >
          Shop our dermatologist-developed skincare
        </h2>
        <p className="rule-t px-5 py-7 text-small max-lg:order-2 lg:rule-r lg:[--rule-x1:10px] lg:[--rule-y0:10px] lg:px-[30px] lg:py-8 lg:text-body">
          Explore our curated range of science-backed cleansers, moisturisers, serums, and
          supplements—formulated by dermatologists to support clear, healthy skin at every stage of
          your acne journey.
        </p>
        <BoxLink
          href="/shop"
          tone="responsive"
          className="border-t border-brand max-lg:order-3 lg:rule-r"
        >
          Shop Now →
        </BoxLink>
        <div className="px-5 pb-5 max-lg:order-1 lg:hidden">
          <ShopImage />
        </div>
      </div>
      <div className="hidden p-[28px] lg:block">
        <ShopImage />
      </div>
    </section>
  );
}

function ShopImage() {
  return (
    <div className="relative aspect-[352/318] h-full w-full overflow-hidden rounded-2xl lg:aspect-auto">
      <Image
        src="/images/products.jpg"
        alt="Treat:Acne cleanser packaging"
        fill
        sizes="(min-width: 1024px) 60vw, 100vw"
        data-reveal="zoom"
        className="object-cover"
      />
    </div>
  );
}
