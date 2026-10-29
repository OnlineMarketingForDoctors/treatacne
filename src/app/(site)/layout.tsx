import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { CartProvider } from "@/components/cart/CartProvider";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { SHOP_ENABLED } from "@/lib/site";

// Public website chrome. The staff area (/staff) has its own plain layout.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Header />
      <main>{children}</main>
      <Footer />
      <BackToTop />
      {SHOP_ENABLED && <CartDrawer />}
    </CartProvider>
  );
}
