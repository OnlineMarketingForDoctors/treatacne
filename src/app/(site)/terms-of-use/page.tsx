import type { Metadata } from "next";
import { Block, PageLayout } from "@/components/PageLayout";

export const metadata: Metadata = { title: "Terms of Use" };

// TODO: replace with the Terms of Use after legal review (due from Niyati).
export default function TermsOfUsePage() {
  return (
    <PageLayout title="Terms of Use">
      <Block>
        <p>Our Terms of Use will be published here shortly.</p>
      </Block>
    </PageLayout>
  );
}
