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
              TreatAcne was born from Dr. Niyati Sharma&apos;s personal experience with acne and her
              frustration seeing patients struggle with ineffective treatments and delayed access to
              proper care. As a Fellow of the Australasian College of Dermatologists, Dr. Sharma
              understood that effective acne treatment requires both medical expertise and genuine
              empathy—having experienced the emotional impact of acne herself, including scarring.
            </p>
            <p>
              This insight led her to create TreatAcne: a dermatologist-founded platform that
              eliminates the guesswork and provides expert-led, personalized acne care across
              Australia. Her mission is simple—to provide the clear, evidence-based treatment pathway
              she wished existed during her own skin journey.
            </p>
          </div>

          <AboutRow image="/images/about-mission.jpg" label="Our Mission" alt="Young man applying cream to his face">
            <p>
              At TreatAcne, our mission is to eliminate the confusion, frustration, and wasted time
              that comes with managing acne. We provide expert-led, personalized acne treatment
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
              combining cutting-edge telehealth technology with compassionate, personalized
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
                  Niyati Sharma is a qualified Dermatologist and is a fellow of the Australasian
                  College of Dermatologists and a consultant dermatologist at the Box Hill hospital,
                  and Monash Medical Centre. She is also the founder of Inside Out Dermatology.
                </p>
                <p>
                  Dr Niyati Sharma grew up in Melbourne, undertook her undergraduate medical degree
                  (MBBS) at Adelaide University before coming back to Melbourne to undertake her
                  internship at Royal Melbourne Hospital. After a few years of working in different
                  parts of Australia, including remote areas, she decided to specialise in
                  Dermatology with the Australian College of Dermatologists. As part of her 4 year
                  post graduate training, Dr Sharma spent one year in Singapore at the National Skin
                  Centre learning the nuances of treating Asian skin and their diseases. After
                  finishing her Dermatology fellowship exams (FACD), Dr Sharma took further
                  sub-specialising at Ann &amp; Robert Lurie Children&apos;s Hospital in Chicago in
                  paediatric dermatology.
                </p>
              </div>
            </div>
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
