import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Convenience } from "@/components/home/Convenience";
import { DermatologistPlan } from "@/components/DermatologistPlan";
import { QuizCard } from "@/components/home/QuizCard";
import { ShopTeaser } from "@/components/home/ShopTeaser";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Convenience />
      <DermatologistPlan />
      <QuizCard />
      <ShopTeaser />
      <Faq />
      <FinalCta />
    </>
  );
}
