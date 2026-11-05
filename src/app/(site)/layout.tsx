import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { MobileGetStarted } from "@/components/MobileGetStarted";
import { Schema } from "@/components/Schema";
import { CartProvider } from "@/components/cart/CartProvider";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { SHOP_ENABLED } from "@/lib/site";

// Public website chrome. The staff area (/staff) has its own plain layout.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Schema />
      <Header />
      {/* Bottom padding on phones leaves room for the sticky Get Started bar */}
      <main>{children}</main>
      <Footer />
      <div aria-hidden className="h-[52px] bg-brand lg:hidden" />
      <MobileGetStarted />
      <BackToTop />
      {SHOP_ENABLED && <CartDrawer />}
    </CartProvider>
  );
}
