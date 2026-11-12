import { capitals, landPath, MAP_H, MAP_W } from "./australiaMapData";

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

    </div>
  );
}
