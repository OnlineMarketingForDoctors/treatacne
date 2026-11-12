// Builds src/components/home/australiaMapData.ts (the Home page map) from Natural Earth
// (world-atlas, public domain / ISC). Usage, from an empty folder:
//   npm pack world-atlas@2.0.2 topojson-client@3.1.0
//   mkdir wa tc && tar -xzf world-atlas-2.0.2.tgz -C wa && tar -xzf topojson-client-3.1.0.tgz -C tc
//   node <repo>/scripts/build-australia-map.cjs <that folder> <repo>/src/components/home/australiaMapData.ts
const fs = require("fs");
const path = require("path");
const dir = process.argv[2];
const out = process.argv[3];
const topojson = require(path.join(dir, "tc/package/dist/topojson-client.js"));
const topo = JSON.parse(fs.readFileSync(path.join(dir, "wa/package/countries-50m.json"), "utf8"));
const au = topojson.feature(topo, topo.objects.countries).features.find((f) => f.id === "036");

// Extra room left and right for the city names that sit offshore
const W = 1000, PAD = 18, PAD_L = 110, PAD_R = 170;
const LAT0 = -27, k = Math.cos((LAT0 * Math.PI) / 180);
const raw = ([lon, lat]) => [lon * k, -lat];
// Keep mainland, Tasmania and the bigger islands (drop tiny specks and far-off islands)
const polys = au.geometry.coordinates
  .map((p) => p[0])
  .filter((ring) => {
    const lons = ring.map((c) => c[0]), lats = ring.map((c) => c[1]);
    const inBox = Math.min(...lons) > 112 && Math.max(...lons) < 155 && Math.min(...lats) > -44.5 && Math.max(...lats) < -9.5;
    let a = 0; for (let i = 0; i < ring.length - 1; i++) a += ring[i][0] * ring[i + 1][1] - ring[i + 1][0] * ring[i][1];
    return inBox && Math.abs(a / 2) > 0.15;
  });
const pts = polys.flat().map(raw);
const minX = Math.min(...pts.map((p) => p[0])), maxX = Math.max(...pts.map((p) => p[0]));
const minY = Math.min(...pts.map((p) => p[1])), maxY = Math.max(...pts.map((p) => p[1]));
const s = (W - PAD_L - PAD_R) / (maxX - minX);
const H = Math.round((maxY - minY) * s + 2 * PAD);
const P = (c) => { const [x, y] = raw(c); return [+((x - minX) * s + PAD_L).toFixed(1), +((y - minY) * s + PAD).toFixed(1)]; };
const d = (ring, close = true) => ring.map((c, i) => { const [x, y] = P(c); return `${i ? "L" : "M"}${x} ${y}`; }).join("") + (close ? "Z" : "");

const land = polys.map((r) => d(r)).join("");

// State borders (lon, lat). Mostly straight survey lines; the NSW/Qld and NSW/Vic river borders
// are close approximations. Clipped to the coastline in the SVG.
const borders = [
  [[129, -14.0], [129, -32.5]], // WA | NT, SA
  [[129, -26], [138, -26]], // NT | SA
  [[138, -26], [138, -15.5]], // NT | Qld
  [[138, -26], [141, -26], [141, -38.5]], // SA | Qld, NSW, Vic
  [[141, -29], [148.9, -29], [149.5, -28.6], [150.6, -28.65], [151.5, -28.9], [152.0, -28.6], [152.5, -28.25], [153.6, -28.17]], // Qld | NSW
  [[141, -34.0], [142.3, -34.6], [143.4, -35.2], [144.5, -36.0], [145.7, -35.95], [146.9, -36.08], [147.6, -36.2], [148.2, -36.8], [150.2, -37.55]], // NSW | Vic
].map((l) => d(l, false)).join("");
const act = d([[148.76, -35.12], [149.21, -35.12], [149.4, -35.32], [149.25, -35.55], [149.1, -35.92], [148.9, -35.75], [148.76, -35.45], [148.76, -35.12]]);

// Capital cities: label offsets (dx, dy, anchor) keep names off the coast and each other
const cities = [
  ["Perth", 115.86, -31.95, -16, 9, "end"],
  ["Darwin", 130.84, -12.46, -14, -12, "end"],
  ["Adelaide", 138.6, -34.93, -14, 34, "end"],
  ["Brisbane", 153.03, -27.47, 16, 9, "start"],
  ["Sydney", 151.21, -33.87, 16, 9, "start"],
  ["Canberra", 149.13, -35.28, 40, 18, "start"],
  ["Melbourne", 144.96, -37.81, -10, 40, "end"],
  ["Hobart", 147.33, -42.88, 16, 9, "start"],
].map(([name, lon, lat, dx, dy, anchor]) => { const [x, y] = P([lon, lat]); return { name, x, y, dx, dy, anchor }; });

const states = [
  ["WA", 121.5, -25.5], ["NT", 133.5, -19.8], ["SA", 134.6, -30.0], ["QLD", 144.6, -22.5],
  ["NSW", 145.6, -31.8], ["VIC", 143.4, -36.9], ["TAS", 141.6, -42.2], ["ACT", 151.1, -37.35],
].map(([abbr, lon, lat]) => { const [x, y] = P([lon, lat]); return { abbr, x, y }; });

const src = `// Generated from Natural Earth 1:50m (public domain, via the world-atlas package).
// State borders are drawn from their survey lines; river borders are close approximations.
// Regenerate with scripts/build-australia-map.cjs (instructions at its top).

export const MAP_W = ${W};
export const MAP_H = ${H};
export const landPath = ${JSON.stringify(land)};
export const bordersPath = ${JSON.stringify(borders)};
export const actPath = ${JSON.stringify(act)};
export const capitals = ${JSON.stringify(cities, null, 2)};
export const stateLabels = ${JSON.stringify(states, null, 2)};
`;
fs.writeFileSync(out, src);
console.log("size", W, H, "land chars", land.length, "polys", polys.length);
