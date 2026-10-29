import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { QuizCard } from "@/components/home/QuizCard";
import { Convenience } from "@/components/home/Convenience";
import { WhyChoose } from "@/components/home/WhyChoose";
import { DermatologistPlan } from "@/components/DermatologistPlan";
import { ShopTeaser } from "@/components/home/ShopTeaser";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";

// Section order follows the build guide (quiz now sits under the steps).
export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <QuizCard />
      <Convenience />
      <WhyChoose />
      <DermatologistPlan />
      <ShopTeaser />
      <Faq limit={4} />
      <FinalCta />
    </>
  );
}
