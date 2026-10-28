"use client";

import { useCart } from "@/components/cart/CartProvider";

export function AddToCartButton({ slug }: { slug: string }) {
  const { add } = useCart();

  return (
    <button
      type="button"
      onClick={() => add(slug)}
      className="flex h-[42px] w-full items-center justify-center rounded-full border border-brand text-body transition-colors hover:bg-brand hover:text-white focus-visible:bg-brand focus-visible:text-white"
    >
      Add to Cart
    </button>
  );
}
