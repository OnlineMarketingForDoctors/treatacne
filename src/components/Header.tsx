"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SHOP_ENABLED, navLinks } from "@/lib/site";
import { useCart } from "@/components/cart/CartProvider";

export function Header() {
  const [open, setOpen] = useState(false);
  const cart = useCart();
  const cartLabel = cart.count > 0 ? `Cart (${cart.count})` : "Cart";

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-brand bg-white">
      <div className="flex h-[62px] items-stretch">
        <div className="flex flex-1 items-center px-5 lg:w-1/2 lg:flex-none lg:px-[30px]">
          <Link href="/" aria-label="Treat:Acne home">
            <Image
              src="/images/logo-dark.png"
              alt="Treat:Acne"
              width={364}
              height={56}
              priority
              className="h-auto w-[130px]"
            />
          </Link>
        </div>

        <nav
          aria-label="Main"
          className="hidden flex-1 items-center justify-end gap-5 border-l border-brand pr-6 pl-6 whitespace-nowrap lg:flex xl:gap-8 xl:pr-[70px]"
        >
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-small hover:underline xl:text-body">
              {link.label}
            </Link>
          ))}
          {SHOP_ENABLED && (
            <button type="button" onClick={cart.open} className="text-small hover:underline xl:text-body">
              {cartLabel}
            </button>
          )}
        </nav>
        <Link
          href="/get-started"
          className="hidden w-[153px] items-center justify-center bg-brand-soft text-body text-white transition-colors hover:bg-brand lg:flex"
        >
          Get Started
        </Link>

        {SHOP_ENABLED && (
          <button
            type="button"
            onClick={cart.open}
            className="min-w-[83px] border-l border-brand px-3 text-body lg:hidden"
          >
            {cartLabel}
          </button>
        )}
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="w-[83px] border-l border-brand text-body lg:hidden"
        >
          Menu
        </button>
      </div>

      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 flex flex-col bg-brand lg:hidden"
        >
          <div className="flex h-[62px] justify-end border-b border-brand bg-white">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="w-[83px] border-l border-brand text-body"
              autoFocus
            >
              Close
            </button>
          </div>
          <nav aria-label="Mobile" className="flex flex-1 flex-col gap-2 px-5 pt-[70px]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-[40px] leading-[1.6] text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/get-started"
            onClick={() => setOpen(false)}
            className="flex h-[98px] items-center border-t border-white/40 bg-brand-soft px-5 text-[40px] text-white"
          >
            Get Started →
          </Link>
        </div>
      )}
    </header>
  );
}
