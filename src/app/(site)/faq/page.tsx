import type { Metadata } from "next";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about Treat:Acne: who it's for, referrals, fees, payment and cancellations, medicine, blood tests, teenagers and privacy.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <Faq />
      <FinalCta />
    </>
  );
}
