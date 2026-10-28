import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { BackToTop } from "@/components/BackToTop";
import { CartProvider } from "@/components/cart/CartProvider";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { revealBootScript } from "@/lib/reveal";

// Neue Haas Unica W1G (Monotype). Only Regular is installed so far; bold text is
// synthesised by the browser until NeueHaasUnicaW1G-Bold is added here.
const unica = localFont({
  src: [{ path: "../fonts/NeueHaasUnicaW1G-Regular.woff2", weight: "400", style: "normal" }],
  variable: "--font-unica",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Treat:Acne | Dermatologist-led online acne treatment",
    template: "%s | Treat:Acne",
  },
  description:
    "Your own personalised acne treatment plan in 24 hours or less. Dermatologist-led telehealth care, anywhere in Australia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: the reveal boot script adds a class to <html> before hydration
    <html lang="en-AU" className={unica.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealBootScript }} />
      </head>
      <body className="antialiased">
        <CartProvider>
          <ScrollReveal />
          <Header />
          <main>{children}</main>
          <Footer />
          <BackToTop />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
