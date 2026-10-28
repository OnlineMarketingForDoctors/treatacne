import type { Metadata } from "next";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about Treat:Acne: who it's for, referrals, costs, medication, blood tests and privacy.",
};

export default function FaqPage() {
  return (
    <>
      <Faq />
      <FinalCta tone="white" />
    </>
  );
}
