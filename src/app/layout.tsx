import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ScrollReveal } from "@/components/ScrollReveal";
import { revealBootScript } from "@/lib/reveal";

// Neue Haas Unica W1G (Monotype). Only Regular is installed so far; bold text is
// synthesised by the browser until NeueHaasUnicaW1G-Bold is added here.
const unica = localFont({
  src: [{ path: "../fonts/NeueHaasUnicaW1G-Regular.woff2", weight: "400", style: "normal" }],
  variable: "--font-unica",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://treatacne.com.au"),
  title: {
    default: "Treat:Acne | Dermatologist-led online acne treatment",
    template: "%s | Treat:Acne",
  },
  description:
    "Dermatologist-led online acne care anywhere in Australia. Your first 30-minute consultation is free with our trained acne nurses. GP consultations $99.",
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
        <ScrollReveal />
        {children}
      </body>
    </html>
  );
}
