import Image from "next/image";

const tips = [
  "Take photos in natural daylight facing a window (light in front of you, not behind)",
  "Remove all makeup & cleanse skin before shooting",
  "Use a plain, light coloured wall as your background",
  "Hold the camera at eye level. Avoid low/high angles",
  "Images must be sharp & in focus before submitting",
];

/** "Tips for great skin photos" card from Get Started step 3 */
export function PhotoTips({ className = "" }: { className?: string }) {
  return (
    <div
      className={`grid items-center gap-6 rounded-2xl bg-[#fcede6] p-5 sm:grid-cols-[1fr_auto] ${className}`}
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
  );
}

/** Grey person placeholder used for empty photo slots */
export function Silhouette() {
  return (
    <div className="aspect-square overflow-hidden rounded-full bg-[#eaeaea]">
      <svg viewBox="0 0 200 200" aria-hidden className="size-full" fill="#929292">
        <circle cx="100" cy="75" r="31" />
        <ellipse cx="100" cy="170" rx="60" ry="64" />
      </svg>
    </div>
  );
}
