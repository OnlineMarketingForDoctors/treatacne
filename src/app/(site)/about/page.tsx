import type { Metadata } from "next";
import Image from "next/image";
import { FinalCta } from "@/components/FinalCta";
import { revealDelay } from "@/lib/reveal";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Treat:Acne was founded by dermatologist Dr Niyati Sharma. Meet our team: a GP with a special interest in acne, a doctor with advanced training in dermatology, and our acne nurses.",
  alternates: { canonical: "/about" },
};

const sharmaBullets = [
  "Consultant dermatologist, Monash Medical Centre",
  "Founder, Inside Out Dermatology",
  "Trained in Asian skin at the National Skin Centre, Singapore",
  "Paediatric dermatology training, Ann & Robert H. Lurie Children's Hospital of Chicago",
  "Master of Public Health, Johns Hopkins University, USA",
];

const strip = [
  { src: "/images/about-mission.jpg", alt: "Young man applying cream to his face", caption: "A plan built around your skin" },
  { src: "/images/phone.jpg", alt: "Person holding a phone showing the Treat:Acne app", caption: "Consultations from home, Australia-wide" },
  { src: "/images/hero-face.jpg", alt: "Smiling woman with cleanser on her face", caption: "Simple routines you can keep up" },
];

// TODO: team headshots, and Dr Kaur's qualifications and bio (due from Niyati).
// Dr Iyengar's AHPRA number can be added to her lines if she agrees.
const team: { name: string; role: string; lines: string[]; confirm?: string }[] = [
  {
    name: "Dr Laxmi Iyengar",
    role: "GP with a special interest in acne",
    lines: ["PhD, FRACGP, BSc (Hons 1). An evidence-based GP involved in dermatology clinical trials."],
  },
  {
    name: "Dr Nehal Kaur",
    role: "Doctor with advanced training in dermatology",
    confirm: "[Qualifications and 1–2 line bio to come]",
    lines: ["Supports patients alongside our nurses at their free first consultation."],
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
      {/* Intro and mission beside the hero photo */}
      <section className="grid grid-cols-1 border-b border-brand bg-cream lg:grid-cols-2">
        <div className="flex flex-col justify-center px-5 pt-10 pb-8 lg:px-[30px] lg:py-[60px]">
          <h1 data-reveal="up" className="max-w-[600px] text-h2 lg:text-h2-lg">
            Acne care, led by a dermatologist who&apos;s lived it.
          </h1>
          <p data-reveal="up" style={revealDelay(100)} className="mt-6 max-w-[600px] text-body text-black lg:text-big">
            Dr Niyati Sharma knows acne from both sides of the consultation: she had it herself. As a
            dermatologist, she sees patients who have spent years, and a lot of money, on products and
            treatments that weren&apos;t right for their skin, while their acne kept leaving marks. The
            longer acne goes without effective treatment, the higher the risk of scarring. Treat:Acne is
            the clear, evidence-based pathway she wished she&apos;d had, available anywhere in Australia.
          </p>
          <p data-reveal="up" style={revealDelay(200)} className="mt-6 max-w-[600px] text-body text-black lg:text-big">
            <span className="text-brand">Our mission:</span> dermatologist-designed acne care for every
            Australian, wherever they live.
          </p>
        </div>
        <div className="px-5 pb-5 lg:p-[30px]">
          <div className="relative aspect-[1100/999] h-full overflow-hidden rounded-2xl lg:aspect-auto lg:min-h-[480px]">
            <Image
              src="/images/about-vision.jpg"
              alt="Smiling woman in the sunshine"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              data-reveal="zoom"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <div className="px-5 lg:px-[30px]">
        {/* Founder: photo beside bio */}
        <section className="grid gap-6 py-12 lg:grid-cols-[minmax(0,360px)_1fr] lg:gap-[40px] lg:py-[60px]">
          <div data-reveal="up" className="overflow-hidden rounded-2xl">
            <Image
              src="/images/dr-niyati-sharma.jpg"
              alt="Dr Niyati Sharma"
              width={871}
              height={1205}
              sizes="(min-width: 1024px) 360px, 100vw"
              className="w-full"
            />
          </div>
          <div data-reveal="up" style={revealDelay(100)} className="self-center">
            <h2 className="text-h2 lg:text-h2-lg">Meet Dr Niyati Sharma</h2>
            <p className="mt-4 max-w-[640px] text-body text-black">
              MBBS, FACD, MPH. Specialist dermatologist and Fellow of the Australasian College of
              Dermatologists. AHPRA: MED0001212738
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
          </div>
        </section>

        {/* Photo strip */}
        <section className="border-t border-brand py-12 lg:py-[60px]">
          <h2 data-reveal="up" className="text-h2 lg:text-h2-lg">
            Care that fits into your day
          </h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-3 lg:gap-[30px]">
            {strip.map((s, i) => (
              <li key={s.src} data-reveal="up" style={revealDelay(i * 100)}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image src={s.src} alt={s.alt} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover" />
                </div>
                <p className="mt-3 text-small text-black">{s.caption}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Team: 2 × 2 cards */}
        <section className="border-t border-brand py-12 lg:py-[60px]">
          <h2 data-reveal="up" className="text-h2 lg:text-h2-lg">
            Meet the team
          </h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:gap-[30px]">
            {team.map((member, i) => (
              <li
                key={member.name}
                data-reveal="up"
                style={revealDelay((i % 2) * 100)}
                className="rounded-2xl border border-brand/40 p-4 lg:p-5"
              >
                {/* Headshot placeholder until photos arrive */}
                <div aria-hidden className="flex aspect-[16/7] items-end justify-center overflow-hidden rounded-xl bg-cream">
                  <svg viewBox="0 0 120 100" className="w-[22%] text-brand-muted" fill="currentColor">
                    <circle cx="60" cy="38" r="22" />
                    <path d="M14 100c4-26 22-40 46-40s42 14 46 40z" />
                  </svg>
                </div>
                <h3 className="mt-5 text-[22px] leading-[1.15] lg:text-[24px]">{member.name}</h3>
                <p className="mt-1 text-small">{member.role}</p>
                {member.lines.map((line) => (
                  <p key={line} className="mt-3 text-small text-black">
                    {member.confirm && <span className="mr-1 text-black/50">{member.confirm}</span>}
                    {line}
                  </p>
                ))}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <FinalCta />
    </>
  );
}
