// Runs before first paint so content doesn't flash in and then hide.
// If the observer never starts (e.g. JS error), content is shown after 3s.
export const revealBootScript = `document.documentElement.classList.add("reveal-ready");setTimeout(function(){if(!window.__reveal)document.documentElement.classList.remove("reveal-ready")},3000);`;

/** Inline style for staggering items, e.g. `style={revealDelay(i * 80)}`. */
export function revealDelay(ms: number) {
  return { "--reveal-delay": `${ms}ms` } as React.CSSProperties;
}
