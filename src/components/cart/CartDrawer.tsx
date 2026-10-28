"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/products";
import { useCart } from "@/components/cart/CartProvider";

export function CartDrawer() {
  const { lines, subtotal, isOpen, close, setQuantity, remove } = useCart();
  const [notice, setNotice] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close cart"
        tabIndex={-1}
        onClick={close}
        className="absolute inset-0 hidden bg-black/30 sm:block"
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Your cart"
        className="absolute inset-y-0 right-0 flex w-full flex-col bg-white sm:w-[420px] sm:border-l sm:border-brand"
      >
        <div className="flex h-[62px] shrink-0 items-stretch border-b border-brand">
          <h2 className="flex flex-1 items-center px-5 text-body">Your Cart</h2>
          <button
            type="button"
            onClick={close}
            autoFocus
            className="w-[83px] border-l border-brand text-body"
          >
            Close
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-start gap-4 p-5">
            <p className="text-body text-black">Your cart is empty.</p>
            <Link href="/shop" onClick={close} className="text-body underline underline-offset-2">
              Shop Now →
            </Link>
          </div>
        ) : (
          <ul className="flex-1 overflow-y-auto">
            {lines.map(({ product, quantity }) => (
              <li
                key={product.slug}
                className="grid grid-cols-[90px_1fr] gap-[18px] border-b border-brand px-5 py-5"
              >
                <Link href={`/shop/${product.slug}`} onClick={close}>
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={180}
                    height={180}
                    className="size-[90px] rounded-[10px] object-cover"
                  />
                </Link>
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="flex items-baseline justify-between gap-3">
                      <Link
                        href={`/shop/${product.slug}`}
                        onClick={close}
                        className="text-body hover:underline"
                      >
                        {product.name}
                      </Link>
                      <span className="text-body text-black">
                        {formatPrice(product.price * quantity)}
                      </span>
                    </div>
                    <p className="mt-1 text-small text-black">{product.size}</p>
                  </div>
                  <div className="flex items-center justify-between text-small">
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        aria-label={`Decrease quantity of ${product.name}`}
                        onClick={() => setQuantity(product.slug, quantity - 1)}
                        className="px-1"
                      >
                        -
                      </button>
                      <span aria-live="polite" className="min-w-3 text-center">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        aria-label={`Increase quantity of ${product.name}`}
                        onClick={() => setQuantity(product.slug, quantity + 1)}
                        className="px-1"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(product.slug)}
                      className="text-brand-muted hover:text-brand"
                    >
                      × Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {lines.length > 0 && (
          <div className="shrink-0">
            <div className="flex justify-between px-5 py-4 text-body">
              <span>Subtotal</span>
              <span className="text-black">{formatPrice(subtotal)}</span>
            </div>
            {notice && (
              <p role="status" className="px-5 pb-4 text-small text-black">
                Online checkout is coming soon.
              </p>
            )}
            {/* TODO: connect to Stripe Checkout */}
            <button
              type="button"
              onClick={() => setNotice(true)}
              className="flex h-[85px] w-full items-center bg-brand-soft px-[30px] text-body text-white transition-colors hover:bg-brand"
            >
              Go to Checkout →
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
