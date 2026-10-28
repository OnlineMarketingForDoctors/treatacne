import { PillLink } from "@/components/Button";

export function FinalCta({ tone = "cream" }: { tone?: "cream" | "white" }) {
  return (
    <section
      className={`px-5 py-[90px] text-center ${tone === "cream" ? "bg-cream lg:py-[85px]" : "bg-white lg:py-[110px]"}`}
    >
      <div data-reveal="up">
        <h2 className="text-h2 lg:text-h2-lg">Lets Get Started</h2>
        <p className="mt-5 text-body">Discover a better way to manage your skin.</p>
        <PillLink href="/get-started" className="mt-9 w-[230px]">
          Start My Journey →
        </PillLink>
      </div>
    </section>
  );
}
