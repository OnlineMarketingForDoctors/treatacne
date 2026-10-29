import type { Metadata } from "next";
import { PageLayout } from "@/components/PageLayout";
import { Quiz } from "@/components/Quiz";

export const metadata: Metadata = {
  title: "Find the right care for your skin",
  description:
    "Answer 7 quick questions to see whether to start with our GP trained in acne or a dermatologist.",
};

export default function QuizPage() {
  return (
    <PageLayout
      title="Find the right care for your skin"
      intro={<p>Answer 7 quick questions to see where to start. It&apos;s optional, and you can book at any time.</p>}
    >
      <Quiz />
    </PageLayout>
  );
}
