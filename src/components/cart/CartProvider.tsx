"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getProduct, type Product } from "@/lib/products";

type StoredItem = { slug: string; quantity: number };
export type CartLine = { product: Product; quantity: number };

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  add: (slug: string, quantity?: number) => void;
  setQuantity: (slug: string, quantity: number) => void;
  remove: (slug: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "treatacne-cart";
const MAX_QUANTITY = 10;

function readStorage(): StoredItem[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<StoredItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Restore the cart after hydration (localStorage isn't available on the server)
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from browser storage
    setItems(readStorage());
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Storage unavailable (e.g. private mode): the cart still works for this visit
    }
  }, [items, loaded]);

  const add = useCallback((slug: string, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.slug === slug);
      if (existing) {
        return prev.map((i) =>
          i.slug === slug ? { ...i, quantity: Math.min(i.quantity + quantity, MAX_QUANTITY) } : i,
        );
      }
      return [...prev, { slug, quantity }];
    });
    setIsOpen(true);
  }, []);

  const setQuantity = useCallback((slug: string, quantity: number) => {
    setItems((prev) =>
      quantity < 1
        ? prev.filter((i) => i.slug !== slug)
        : prev.map((i) => (i.slug === slug ? { ...i, quantity: Math.min(quantity, MAX_QUANTITY) } : i)),
    );
  }, []);

  const remove = useCallback((slug: string) => {
    setItems((prev) => prev.filter((i) => i.slug !== slug));
  }, []);

  const value = useMemo<CartContextValue>(() => {
    // Resolve against the catalogue so prices are always current; drop products that no longer exist
    const lines = items.flatMap((i) => {
      const product = getProduct(i.slug);
      return product ? [{ product, quantity: i.quantity }] : [];
    });
    return {
      lines,
      count: lines.reduce((n, l) => n + l.quantity, 0),
      subtotal: lines.reduce((n, l) => n + l.product.price * l.quantity, 0),
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      add,
      setQuantity,
      remove,
    };
  }, [items, isOpen, add, setQuantity, remove]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
