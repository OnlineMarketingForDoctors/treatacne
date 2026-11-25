import { tagline } from "@/lib/site";

/**
 * "DERMATOLOGIST-LED CARE" under the logo: uppercase, a touch heavier (a thin outline, as only
 * the Regular weight of the font is installed), inset slightly on the left and ending flush with
 * the logo's right edge. SVG text stretched with textLength, so it lines up at any size.
 */
export function Tagline({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 11" role="img" aria-label={tagline} className={`block h-auto ${className}`}>
      <text
        x="9"
        y="10"
        textLength="190.5"
        lengthAdjust="spacing"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.45"
        style={{ font: "13px var(--font-unica), sans-serif" }}
      >
        {tagline.toUpperCase()}
      </text>
    </svg>
  );
}
