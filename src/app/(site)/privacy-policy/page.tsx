import type { Metadata } from "next";
import { Block, PageLayout } from "@/components/PageLayout";

export const metadata: Metadata = { title: "Privacy Policy" };

// TODO: replace with the Privacy Policy after legal review (due from Niyati).
export default function PrivacyPolicyPage() {
  return (
    <PageLayout title="Privacy Policy">
      <Block>
        <p>Our Privacy Policy will be published here shortly.</p>
      </Block>
    </PageLayout>
  );
}
