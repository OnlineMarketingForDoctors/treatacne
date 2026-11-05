import { tagline } from "@/lib/site";

/**
 * "Dermatologist-led care" set to exactly the width of the logo above it: SVG text
 * stretched with textLength, so it lines up on both sides at any size.
 */
export function Tagline({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 18" role="img" aria-label={tagline} className={`block h-auto ${className}`}>
      <text
        x="0"
        y="14"
        textLength="200"
        lengthAdjust="spacing"
        fill="currentColor"
        style={{ font: "16px var(--font-unica), sans-serif" }}
      >
        {tagline}
      </text>
    </svg>
  );
}
