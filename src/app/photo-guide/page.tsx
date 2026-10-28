import type { Metadata } from "next";
import Image from "next/image";
import { FinalCta } from "@/components/FinalCta";
import { revealDelay } from "@/lib/reveal";

export const metadata: Metadata = {
  title: "Photo guide",
  description: "How to take clear skin photos for your Treat:Acne consultation.",
};

const tips = [
  "Take photos in natural daylight facing a window (light in front of you, not behind)",
  "Remove all makeup & cleanse skin before shooting",
  "Use a plain, light coloured wall as your background",
  "Hold the camera at eye level. Avoid low/high angles",
  "Images must be sharp & in focus before submitting",
];

const groups = [
  {
    title: "Face Photos",
    shots: [
      ["Front Face", "Looking straight ahead"],
      ["Left Profile", "Turn head left"],
      ["Right Profile", "Turn head right"],
    ],
  },
  {
    title: "Close-Up / Specific Areas",
    shots: [
      ["Close-up of main problem area"],
      ["Add another area (optional)"],
      ["Add another area (optional)"],
    ],
  },
  {
    title: "Body Acne",
    shots: [
      ["Chest", "- front torso"],
      ["Upper back", "- ask someone to help"],
      ["Other area", "(optional)"],
    ],
  },
];

// Reuses the photo figure and tips from Get Started step 3 (no upload buttons).
export default function PhotoGuidePage() {
  return (
    <>
      <section className="border-b border-brand px-5 pt-10 pb-16 lg:pt-[50px] lg:pb-[80px]">
        <div className="mx-auto max-w-[660px]">
          <h1 data-reveal="up" className="text-center text-h2 lg:text-h2-lg">
            Photo guide
          </h1>
          <p
            data-reveal="up"
            className="mx-auto mt-8 max-w-[560px] text-center text-[18px] leading-[1.2] text-black lg:mt-[55px] lg:text-big"
          >
            Clear photos will help your doctor make an accurate assessment. The whole process
            takes about 2 minutes.
          </p>

          <div
            data-reveal="up"
            className="mt-10 grid items-center gap-6 rounded-2xl bg-[#fcede6] p-5 sm:grid-cols-[1fr_auto] lg:mt-[60px]"
          >
            <div>
              <h2 className="text-small font-bold">Tips for great skin photos</h2>
              <ul className="mt-3 space-y-1 text-small">
                {tips.map((tip) => (
                  <li key={tip} className="flex gap-2">
                    <span aria-hidden>•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
            <Image
              src="/images/photo-guide-example.jpg"
              alt="Example photos: left profile, front face and right profile"
              width={292}
              height={144}
              className="w-full rounded-[4px] sm:w-[280px]"
            />
          </div>

          {groups.map((group) => (
            <div key={group.title} className="mt-12">
              <h2 className="border-b border-brand pb-3 text-small">{group.title}</h2>
              <ul className="mt-6 grid grid-cols-3 gap-3 sm:gap-7">
                {group.shots.map((shot, i) => (
                  <li
                    key={`${group.title}-${i}`}
                    data-reveal="up"
                    style={revealDelay(i * 80)}
                    className="text-center text-note text-black/60 sm:text-small"
                  >
                    <p className="min-h-[2.4em]">
                      {shot[0]}
                      {shot[1] && (
                        <>
                          <br />
                          {shot[1]}
                        </>
                      )}
                    </p>
                    <Silhouette />
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <p
            data-reveal="up"
            className="mt-12 rounded-2xl border border-brand p-5 text-body text-black"
          >
            Ready to upload? Use the private photo link we sent you by email or SMS. It&apos;s
            unique to you and goes straight to your secure file.
          </p>
        </div>
      </section>
      <FinalCta tone="white" />
    </>
  );
}

function Silhouette() {
  return (
    <div className="mt-3 aspect-square overflow-hidden rounded-full bg-[#eaeaea]">
      <svg viewBox="0 0 200 200" aria-hidden className="size-full" fill="#929292">
        <circle cx="100" cy="75" r="31" />
        <ellipse cx="100" cy="170" rx="60" ry="64" />
      </svg>
    </div>
  );
}
