import type { Metadata } from "next";
import { PageLayout } from "@/components/PageLayout";
import { Quiz } from "@/components/Quiz";

export const metadata: Metadata = {
  title: "Find the right care for your skin",
  description:
    "Answer 7 quick questions to see where to start: our GP with a special interest in acne, our dermatologist, or our online course.",
  alternates: { canonical: "/quiz" },
};

export default function QuizPage() {
  return (
    <PageLayout
      title="Find the right care for your skin"
      intro={<p>7 quick questions. A guide only, not a diagnosis.</p>}
    >
      <Quiz />
    </PageLayout>
  );
}
