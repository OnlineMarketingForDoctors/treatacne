import { capitals, landPath, MAP_H, MAP_W } from "@/components/home/australiaMapData";

/** Small outline map of Australia with the capital cities dotted (Contact page). */
export function AustraliaOutline({ className = "" }: { className?: string }) {
  // Trim the label margins the Home map keeps on each side
  const x0 = 100;
  const w = MAP_W - x0 - 150;
  return (
    <svg viewBox={`${x0} 0 ${w} ${MAP_H}`} aria-hidden className={`h-auto ${className}`}>
      <path d={landPath} className="fill-brand-muted stroke-brand" strokeWidth={4} strokeLinejoin="round" />
      {capitals.map((c) => (
        <circle key={c.name} cx={c.x} cy={c.y} r={9} className="fill-white stroke-brand" strokeWidth={4} />
      ))}
    </svg>
  );
}
