import { revealDelay } from "@/lib/reveal";

/**
 * Numbered list from the "How it works" design. Sits in a column whose left edge is a
 * vertical line; lines break ~10px around each divider. `lastGap` keeps a gap below the
 * last item when another divider follows it. `firstDivider={false}` drops the line above the
 * first item on desktop (where the section border already sits there).
 */
export function NumberedList({
  items,
  lastGap = false,
  firstDivider = true,
}: {
  items: { title: string; body: string }[];
  lastGap?: boolean;
  firstDivider?: boolean;
}) {
  return (
    <ol>
      {items.map((item, i) => {
        const divider = i > 0 || firstDivider;
        const gapBelow = i < items.length - 1 || lastGap;
        return (
          <li
            key={item.title}
            data-reveal="up"
            style={revealDelay(i * 90)}
            className={`grid grid-cols-[44px_1fr] gap-x-5 px-5 pt-5 pb-6 lg:grid-cols-[110px_1fr] lg:pl-[28px] lg:pr-[30px] lg:rule-l ${
              divider ? "rule-t lg:[--rule-x0:10px] lg:[--rule-y0:10px]" : "rule-t lg:before:hidden"
            } ${gapBelow ? "lg:[--rule-y1:10px]" : ""}`}
          >
            <span aria-hidden className="text-[32px] leading-none font-light lg:text-[44px]">
              {i + 1}.
            </span>
            <div>
              <h3 className="text-body font-bold">{item.title}</h3>
              <p className="mt-3 max-w-[460px] text-body">{item.body}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
