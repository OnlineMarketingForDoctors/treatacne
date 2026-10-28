import type { Metadata } from "next";
import Image from "next/image";
import { FinalCta } from "@/components/FinalCta";
import { revealDelay } from "@/lib/reveal";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet the dermatologist-led team making specialist acne treatment accessible to patients across Australia.",
};

export default function AboutPage() {
  return (
    <>
      <section className="grid border-b border-brand px-5 pb-10 lg:grid-cols-[34.7%_1fr] lg:px-[30px] lg:pb-[30px]">
        <div className="pt-8 pb-6 lg:pt-[28px] lg:pr-10 lg:pb-0">
          <h1
            data-reveal="up"
            className="text-h2 lg:sticky lg:top-[92px] lg:max-w-[440px] lg:text-h2-lg"
          >
            Meet the dermatologist-led team making specialist acne treatment accessible to patients
            across Australia
          </h1>
        </div>

        <div>
          <div
            data-reveal="up"
            style={revealDelay(100)}
            className="space-y-5 pb-8 text-[18px] leading-[1.2] text-black lg:pt-[30px] lg:text-big"
          >
            <p>
              Treat:Acne was born from Dr. Niyati Sharma&apos;s personal experience with acne and her
              frustration seeing patients struggle with ineffective treatments and delayed access to
              proper care. As a Fellow of the Australasian College of Dermatologists, Dr. Sharma
              understood that effective acne treatment requires both medical expertise and genuine
              empathy—having experienced the emotional impact of acne herself, including scarring.
            </p>
            <p>
              This insight led her to create Treat:Acne: a dermatologist-founded platform that
              eliminates the guesswork and provides expert-led, personalised acne care across
              Australia. Her mission is simple—to provide the clear, evidence-based treatment pathway
              she wished existed during her own skin journey.
            </p>
          </div>

          <AboutRow image="/images/about-mission.jpg" label="Our Mission" alt="Young man applying cream to his face">
            <p>
              At Treat:Acne, our mission is to eliminate the confusion, frustration, and wasted time
              that comes with managing acne. We provide expert-led, personalised acne treatment
              through accessible telehealth consultations, bringing dermatologist-quality care
              directly to patients across Australia—especially those in regional and remote areas
              who have limited access to specialist care.
            </p>
            <p>
              Founded by a dermatologist who understands the emotional and psychological impact of
              acne firsthand, we&apos;re committed to delivering evidence-based treatments,
              science-backed skincare, and ongoing support that empowers patients to feel confident
              in their skin journey.
            </p>
          </AboutRow>

          <AboutRow image="/images/about-vision.jpg" label="Our Vision" alt="Smiling woman in the sunshine">
            <p>
              We envision a future where every Australian struggling with acne has immediate access
              to expert dermatological care, regardless of their location or circumstances. By
              combining cutting-edge telehealth technology with compassionate, personalised
              treatment, we aim to become the leading platform for acne care in
              Australia—transforming not just skin health, but the confidence and wellbeing of every
              patient we serve.
            </p>
            <p>
              Our vision is clear skin made simple: expert guidance, effective treatments, and
              lasting results delivered with the convenience and care every patient deserves.
            </p>
          </AboutRow>

          {/* Founder */}
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
            <div className="flex flex-col justify-between gap-8">
              <div data-reveal="up" style={revealDelay(100)}>
                <h2 className="text-h2 lg:text-h2-lg">Meet Dr Niyati Sharma</h2>
                <p className="mt-4 text-body">MBBS | FACD | MPH</p>
              </div>
              <div
                data-reveal="up"
                style={revealDelay(200)}
                className="space-y-3 text-small text-black"
              >
                <p>
                  Niyati Sharma is a qualified Dermatologist and a Fellow of the Australasian
                  College of Dermatologists. She is a consultant dermatologist at Monash Medical
                  Centre and the founder of Inside Out Dermatology, and also practises at East
                  Melbourne Dermatology &amp; Aesthetics.
                </p>
                <p>
                  Dr Niyati Sharma grew up in Melbourne, undertook her undergraduate medical degree
                  (MBBS) at Adelaide University before coming back to Melbourne to undertake her
                  internship at Royal Melbourne Hospital. After a few years of working in different
                  parts of Australia, including remote areas, she decided to specialise in
                  Dermatology with the Australasian College of Dermatologists. As part of her 4 year
                  post graduate training, Dr Sharma spent one year in Singapore at the National Skin
                  Centre learning the nuances of treating Asian skin and their diseases. After
                  finishing her Dermatology fellowship exams (FACD), Dr Sharma took further
                  sub-specialising at Ann &amp; Robert Lurie Children&apos;s Hospital in Chicago in
                  paediatric dermatology.
                </p>
              </div>
            </div>
          </div>

          {/* Meet the Team */}
          <div className="mt-[30px] border-t border-brand pt-[30px]">
            <h2 data-reveal="up" className="text-h2 lg:text-h2-lg">
              Meet the Team
            </h2>
            {team.map((member) => (
              <TeamMember key={member.name} {...member} />
            ))}
          </div>
        </div>
      </section>

      <FinalCta tone="white" />
    </>
  );
}

function AboutRow({
  image,
  label,
  alt,
  children,
}: {
  image: string;
  label: string;
  alt: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-6 border-t border-brand py-[30px] lg:grid-cols-2 lg:gap-[30px]">
      <div
        data-reveal="up"
        className="relative flex aspect-[458/416] items-center justify-center overflow-hidden rounded-[14px]"
      >
        <Image src={image} alt={alt} fill sizes="(min-width: 1024px) 31vw, 100vw" className="object-cover" />
        <h2 className="relative text-h2 text-white lg:text-h2-lg">{label}</h2>
      </div>
      <div data-reveal="up" style={revealDelay(100)} className="space-y-3 text-body text-black">
        {children}
      </div>
    </div>
  );
}

// TODO: headshots to follow from Niyati; initials are shown until then.
const team = [
  {
    name: "Dr Laxmi Iyengar",
    role: "GP with a special interest in acne",
    credentials: "PhD FRACGP BSc (Hons 1)",
    bio: "Dr Iyengar is a General Practitioner with a special interest in dermatology, including acne, rosacea and pigmentation. She is involved in dermatology clinical trials and takes an evidence-based, patient-centred approach to helping patients achieve long-term skin health. Like all our GPs, she is trained and guided by our dermatologist throughout your consultation process.",
  },
  {
    name: "Teesha Rees",
    role: "Dermatology Nurse",
    bio: "Teesha holds a Master's in Nursing and has over 5 years of dermatology nursing experience, including supporting patients through long-term treatments. She combines scientific expertise with genuine warmth, guiding patients through their skin journey with clarity and care.",
  },
  {
    name: "Marnie Pitts",
    role: "Acne Nurse",
    bio: "Marnie completed her Bachelor of Nursing at Deakin University in 2008 and has worked across the public health system and in skin clinics. For over 2 years she has worked at Inside Out Dermatology, consulting and supporting patients through every stage of their acne treatment. She is known for her friendly, practical approach.",
  },
];

function TeamMember({
  name,
  role,
  credentials,
  bio,
}: {
  name: string;
  role: string;
  credentials?: string;
  bio: string;
}) {
  const initials = name
    .replace(/^Dr /, "")
    .split(" ")
    .map((part) => part[0])
    .join("");
  return (
    <div className="mt-[30px] grid gap-6 border-t border-brand pt-[30px] lg:grid-cols-2 lg:gap-[30px]">
      <div
        data-reveal="up"
        aria-hidden
        className="flex aspect-[458/416] items-center justify-center rounded-[14px] bg-cream text-[72px] text-brand-muted"
      >
        {initials}
      </div>
      <div data-reveal="up" style={revealDelay(100)}>
        <h3 className="text-h2 lg:text-[32px] lg:leading-[1.1]">{name}</h3>
        <p className="mt-3 text-body">{role}</p>
        {credentials && <p className="mt-1 text-body italic">{credentials}</p>}
        <p className="mt-6 text-body text-black">{bio}</p>
      </div>
    </div>
  );
}
