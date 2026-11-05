import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { QuizCard } from "@/components/home/QuizCard";
import { Convenience } from "@/components/home/Convenience";
import { WhyChoose } from "@/components/home/WhyChoose";
import { DermatologistPlan } from "@/components/DermatologistPlan";
import { ShopTeaser } from "@/components/home/ShopTeaser";
import { Faq } from "@/components/Faq";
import { LearnCard } from "@/components/home/LearnCard";
import { FinalCta } from "@/components/FinalCta";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Section order from Niyati's review (2 Nov 2026).
export default function Home() {
  return (
    <>
      <Hero />
      <WhyChoose />
      <HowItWorks className="border-t" />
      <QuizCard />
      <DermatologistPlan />
      <Convenience />
      <ShopTeaser />
      <Faq limit={4} />
      <LearnCard />
      <FinalCta />
    </>
  );
}
