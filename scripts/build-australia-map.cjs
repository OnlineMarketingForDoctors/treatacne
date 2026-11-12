// Builds src/components/home/australiaMapData.ts (the Home page map) from Natural Earth
// (world-atlas, public domain / ISC). Usage, from an empty folder:
//   npm pack world-atlas@2.0.2 topojson-client@3.1.0
//   mkdir wa tc && tar -xzf world-atlas-2.0.2.tgz -C wa && tar -xzf topojson-client-3.1.0.tgz -C tc
//   node <repo>/scripts/build-australia-map.cjs <that folder> <repo>/src/components/home/australiaMapData.ts
const fs = require("fs");
const path = require("path");
const [dir, out] = process.argv.slice(2);
const topojson = require(path.join(dir, "tc/package/dist/topojson-client.js"));
// The simple 1:110m outline: the map is a stylised dot-grid silhouette, not a detailed map
const topo = JSON.parse(fs.readFileSync(path.join(dir, "wa/package/countries-110m.json"), "utf8"));
const au = topojson.feature(topo, topo.objects.countries).features.find((f) => f.id === "036");

// Room left and right for the city names
const W = 1000, PAD = 30, PAD_L = 120, PAD_R = 170;
const LAT0 = -27, k = Math.cos((LAT0 * Math.PI) / 180);
const raw = ([lon, lat]) => [lon * k, -lat];
// Mainland and Tasmania only
const polys = au.geometry.coordinates.map((p) => p[0]).filter((ring) => {
  let a = 0;
  for (let i = 0; i < ring.length - 1; i++) a += ring[i][0] * ring[i + 1][1] - ring[i + 1][0] * ring[i][1];
  return Math.abs(a / 2) > 2;
});
const pts = polys.flat().map(raw);
const minX = Math.min(...pts.map((p) => p[0])), maxX = Math.max(...pts.map((p) => p[0]));
const minY = Math.min(...pts.map((p) => p[1])), maxY = Math.max(...pts.map((p) => p[1]));
const s = (W - PAD_L - PAD_R) / (maxX - minX);
const H = Math.round((maxY - minY) * s + 2 * PAD);
const P = (c) => { const [x, y] = raw(c); return [+((x - minX) * s + PAD_L).toFixed(1), +((y - minY) * s + PAD).toFixed(1)]; };
const land = polys.map((r) => r.map((c, i) => { const [x, y] = P(c); return `${i ? "L" : "M"}${x} ${y}`; }).join("") + "Z").join("");

// Capital cities, with label offsets (dx, dy) and anchor that keep names off the coast
const capitals = [
  ["Perth", 115.86, -31.95, -20, 9, "end"],
  ["Darwin", 130.84, -12.46, -18, -14, "end"],
  ["Adelaide", 138.6, -34.93, -16, 36, "end"],
  ["Brisbane", 153.03, -27.47, 20, 9, "start"],
  ["Sydney", 151.21, -33.87, 20, 9, "start"],
  ["Canberra", 149.13, -35.28, 34, 30, "start"],
  ["Melbourne", 144.96, -37.81, -14, 40, "end"],
  ["Hobart", 147.33, -42.88, 20, 9, "start"],
].map(([name, lon, lat, dx, dy, anchor]) => { const [x, y] = P([lon, lat]); return { name, x, y, dx, dy, anchor }; });

fs.writeFileSync(out, `// Generated from Natural Earth 1:110m (public domain, via the world-atlas package).
// Regenerate with scripts/build-australia-map.cjs (instructions at its top).

export const MAP_W = ${W};
export const MAP_H = ${H};
export const landPath = ${JSON.stringify(land)};
export const capitals = ${JSON.stringify(capitals, null, 2)};
`);
console.log("size", W, H, "polys", polys.length, "chars", land.length);
