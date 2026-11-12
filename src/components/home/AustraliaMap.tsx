import { actPath, bordersPath, capitals, landPath, MAP_H, MAP_W, stateLabels } from "./australiaMapData";

/**
 * Map of Australia: states and territories, capital cities, and a pulse at each capital to show
 * telehealth reaching every state and territory. Drawn as SVG from Natural Earth data.
 */
export function AustraliaMap({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${MAP_W} ${MAP_H}`}
      role="img"
      aria-labelledby="au-map-title"
      className={`h-auto w-full ${className}`}
    >
      <title id="au-map-title">
        Map of Australia with every capital city marked: telehealth is available in every state
        and territory.
      </title>
      <defs>
        <clipPath id="au-land">
          <path d={landPath} />
        </clipPath>
      </defs>

      <path d={landPath} className="fill-brand" />
      {/* State borders, clipped to the coastline */}
      <path
        d={bordersPath}
        clipPath="url(#au-land)"
        fill="none"
        stroke="white"
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
      <path d={actPath} fill="none" stroke="white" strokeWidth={2} />

      {/* ACT and TAS are too small to hold a label, so theirs sit offshore in black */}
      {stateLabels.map((s) =>
        s.abbr === "ACT" || s.abbr === "TAS" ? (
          <text key={s.abbr} x={s.x} y={s.y} className="fill-black text-[28px] tracking-[0.06em]">
            {s.abbr}
          </text>
        ) : (
          <text
            key={s.abbr}
            x={s.x}
            y={s.y}
            textAnchor="middle"
            className="fill-white text-[32px] tracking-[0.08em]"
          >
            {s.abbr}
          </text>
        ),
      )}

      {capitals.map((c, i) => (
        <g key={c.name}>
          <circle
            cx={c.x}
            cy={c.y}
            r={10}
            fill="none"
            stroke="white"
            strokeWidth={2}
            className="map-pulse"
            style={{ animationDelay: `${i * 0.35}s` }}
          />
          <circle cx={c.x} cy={c.y} r={8} fill="white" stroke="black" strokeWidth={2} />
          {c.name === "Canberra" && (
            <line x1={c.x + 9} y1={c.y + 3} x2={c.x + c.dx - 4} y2={c.y + c.dy - 9} stroke="black" strokeWidth={1.5} />
          )}
          <text
            x={c.x + c.dx}
            y={c.y + c.dy}
            textAnchor={c.anchor as "start" | "end"}
            className="fill-black text-[30px]"
            paintOrder="stroke"
            stroke="#f3f2ec"
            strokeWidth={5}
            strokeLinejoin="round"
          >
            {c.name}
          </text>
        </g>
      ))}
    </svg>
  );
}
