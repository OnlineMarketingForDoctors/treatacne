import type { Metadata } from "next";
import Image from "next/image";
import { FinalCta } from "@/components/FinalCta";
import { PillLink } from "@/components/Button";
import { revealDelay } from "@/lib/reveal";
import { GET_STARTED_URL, keyMessage } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Treat:Acne was founded by dermatologist Dr Niyati Sharma. Meet our team: a GP with a special interest in acne, a doctor with advanced training in dermatology, and our acne nurses.",
  alternates: { canonical: "/about" },
};

// TODO: AHPRA registration numbers (due from Niyati)
const AHPRA_SHARMA = "[AHPRA number to come]";
const AHPRA_IYENGAR = "[AHPRA number to come]";

const sharmaBullets = [
  "Consultant dermatologist, Monash Medical Centre",
  "Founder, Inside Out Dermatology",
  "Trained in Asian skin at the National Skin Centre, Singapore",
  "Paediatric dermatology training, Ann & Robert H. Lurie Children's Hospital of Chicago",
  "Master of Public Health, Johns Hopkins University, USA",
];

// TODO: headshots and Dr Kaur's qualifications and bio (due from Niyati)
const team: { name: string; role: string; lines: string[] }[] = [
  {
    name: "Dr Laxmi Iyengar",
    role: "GP with a special interest in acne",
    lines: [
      "PhD, FRACGP, BSc (Hons 1). An evidence-based GP involved in dermatology clinical trials.",
      `AHPRA registration: ${AHPRA_IYENGAR}`,
    ],
  },
  {
    name: "Dr Nehal Kaur",
    role: "Doctor with advanced training in dermatology",
    lines: [
      "[Qualifications and 1–2 lines to come]",
      "Supports patients alongside our nurses at their free first consultation.",
    ],
  },
  {
    name: "Teesha",
    role: "Dermatology Nurse",
    lines: [
      "A degree in neurophysiology and a Master of Nursing Science from the University of Melbourne, with 4 years in dermatology. Your guide from first call to clear plan.",
    ],
  },
  {
    name: "Marnie",
    role: "Acne Nurse",
    lines: [
      "A nurse since 2008, supporting acne patients at Inside Out Dermatology for over 2 years. Practical, friendly, and in your corner.",
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="grid grid-cols-1 border-b border-brand px-5 pb-10 lg:grid-cols-[34.7%_1fr] lg:px-[30px] lg:pb-[30px]">
        <div className="pt-8 pb-6 lg:pt-[28px] lg:pr-10 lg:pb-0">
          <h1
            data-reveal="up"
            className="text-h2 lg:sticky lg:top-[92px] lg:max-w-[440px] lg:text-h2-lg"
          >
            Acne care, led by a dermatologist who&apos;s lived it.
          </h1>
        </div>

        <div>
          <div
            data-reveal="up"
            style={revealDelay(100)}
            className="pb-8 text-[18px] leading-[1.2] text-black lg:pt-[30px] lg:text-big"
          >
            <p>
              Dr Niyati Sharma knows acne from both sides of the consultation: she had it herself.
              As a dermatologist, she sees patients who have spent years, and a lot of money, on
              products and treatments that weren&apos;t right for their skin, while their acne kept
              leaving marks. The longer acne goes without effective treatment, the higher the risk
              of scarring. Treat:Acne is the clear, evidence-based pathway she wished she&apos;d
              had, available anywhere in Australia.
            </p>
          </div>

          <div className="grid gap-6 border-t border-brand py-[30px] lg:grid-cols-2 lg:gap-[30px]">
            <div
              data-reveal="up"
              className="relative flex aspect-[458/416] items-center justify-center overflow-hidden rounded-[14px]"
            >
              <Image
                src="/images/about-mission.jpg"
                alt="Young man applying cream to his face"
                fill
                sizes="(min-width: 1024px) 31vw, 100vw"
                className="object-cover"
              />
              <h2 className="relative text-h2 text-white lg:text-h2-lg">Our Mission</h2>
            </div>
            <p
              data-reveal="up"
              style={revealDelay(100)}
              className="self-center text-h2 text-black lg:text-[32px] lg:leading-[1.15]"
            >
              Dermatologist-designed acne care for every Australian, wherever they live.
            </p>
          </div>

          {/* Founder: photo beside bio */}
          <div className="grid gap-6 border-t border-brand pt-[30px] lg:grid-cols-2 lg:gap-[30px]">
            <div data-reveal="up" className="overflow-hidden rounded-[14px]">
              <Image
                src="/images/dr-niyati-sharma.jpg"
                alt="Dr Niyati Sharma"
                width={871}
                height={1205}
                sizes="(min-width: 1024px) 31vw, 100vw"
                className="w-full lg:h-[624px] lg:object-cover"
              />
            </div>
            <div data-reveal="up" style={revealDelay(100)}>
              <h2 className="text-h2 lg:text-h2-lg">Meet Dr Niyati Sharma</h2>
              <p className="mt-4 text-body text-black">
                MBBS, FACD, MPH. Specialist dermatologist and Fellow of the Australasian College of
                Dermatologists.
              </p>
              <ul className="mt-6 space-y-2 text-body text-black">
                {sharmaBullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span aria-hidden className="text-brand">
                      +
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-small text-black/70">AHPRA registration: {AHPRA_SHARMA}</p>
            </div>
          </div>

          {/* Team: 2 × 2 cards */}
          <div className="mt-[30px] border-t border-brand pt-[30px]">
            <h2 data-reveal="up" className="text-h2 lg:text-h2-lg">
              Meet the Team
            </h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:gap-[30px]">
              {team.map((member, i) => (
                <li key={member.name} data-reveal="up" style={revealDelay((i % 2) * 100)}>
                  {/* Photo placeholder until headshots arrive */}
                  <div
                    aria-hidden
                    className="flex aspect-[4/3] items-end justify-center overflow-hidden rounded-[14px] bg-cream"
                  >
                    <svg viewBox="0 0 120 100" className="w-[45%] text-brand-muted" fill="currentColor">
                      <circle cx="60" cy="38" r="22" />
                      <path d="M14 100c4-26 22-40 46-40s42 14 46 40z" />
                    </svg>
                  </div>
                  <h3 className="mt-5 text-[24px] leading-[1.15] lg:text-[28px]">{member.name}</h3>
                  <p className="mt-1 text-body">{member.role}</p>
                  {member.lines.map((line) => (
                    <p key={line} className="mt-3 text-body text-black">
                      {line}
                    </p>
                  ))}
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal="up" className="mt-[30px] border-t border-brand pt-[30px]">
            <p className="text-big">{keyMessage}</p>
            <PillLink href={GET_STARTED_URL} className="mt-6 w-full sm:w-auto">
              Get Started →
            </PillLink>
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
