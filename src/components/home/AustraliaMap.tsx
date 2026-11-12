import { capitals, landPath, MAP_H, MAP_W } from "./australiaMapData";

const at = (name: string) => capitals.find((c) => c.name === name)!;
const pct = (c: { x: number; y: number }) => ({ left: `${(c.x / MAP_W) * 100}%`, top: `${(c.y / MAP_H) * 100}%` });

// Floating pills, placed next to a capital (like the search chips in the reference design)
const pills = [
  { text: "Free nurse call", near: "Darwin", shift: "-translate-x-[105%] -translate-y-[160%] -rotate-2", icon: "phone" },
  { text: "Secure video consult", near: "Brisbane", shift: "-translate-x-[75%] -translate-y-[210%] rotate-2", icon: "video" },
  { text: "Treatment posted to your door", near: "Perth", shift: "-translate-x-[62%] translate-y-[150%] rotate-1", icon: "box" },
] as const;

const icons = {
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />,
  video: (
    <>
      <rect x="2.5" y="6" width="13" height="12" rx="2" />
      <path d="m15.5 10.5 6-3.5v10l-6-3.5" />
    </>
  ),
  box: <path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5zM3 7.5 12 12l9-4.5M12 12v9" />,
};

/**
 * Stylised map of Australia: a dot-grid silhouette with the capital cities marked, showing
 * telehealth in every state and territory. Outline from Natural Earth (see australiaMapData).
 */
export function AustraliaMap({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} role="img" aria-labelledby="au-map-title" className="h-auto w-full">
        <title id="au-map-title">
          Map of Australia with every capital city marked: telehealth is available in every state
          and territory.
        </title>
        <defs>
          <pattern id="au-dots" width="15" height="15" patternUnits="userSpaceOnUse">
            <circle cx="7.5" cy="7.5" r="2" fill="white" fillOpacity="0.45" />
          </pattern>
          <radialGradient id="au-glow">
            <stop offset="0%" stopColor="white" stopOpacity="0.55" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>

        <path d={landPath} fill="white" fillOpacity="0.06" />
        <path d={landPath} fill="url(#au-dots)" />
        <path d={landPath} fill="none" stroke="white" strokeOpacity="0.75" strokeWidth={2} strokeLinejoin="round" />

        {capitals.map((c, i) => (
          <g key={c.name}>
            <circle cx={c.x} cy={c.y} r={26} fill="url(#au-glow)" />
            <circle
              cx={c.x}
              cy={c.y}
              r={9}
              fill="none"
              stroke="white"
              strokeWidth={2}
              className="map-pulse"
              style={{ animationDelay: `${i * 0.35}s` }}
            />
            <circle cx={c.x} cy={c.y} r={8} fill="white" />
            <text
              x={c.x + c.dx}
              y={c.y + c.dy}
              textAnchor={c.anchor as "start" | "end"}
              className="fill-white text-[23px] font-bold tracking-[0.14em] uppercase"
            >
              {c.name}
            </text>
          </g>
        ))}
      </svg>

      {/* Decorative: the same facts are in the text beside the map */}
      {pills.map((p) => (
        <span
          key={p.text}
          aria-hidden
          style={pct(at(p.near))}
          className={`absolute hidden items-center gap-2 rounded-full bg-white px-4 py-2 text-small whitespace-nowrap text-black shadow-lg lg:flex ${p.shift}`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="text-brand">
            {icons[p.icon]}
          </svg>
          {p.text}
        </span>
      ))}
    </div>
  );
}
