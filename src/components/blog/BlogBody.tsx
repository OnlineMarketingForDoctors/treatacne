import Link from "next/link";
import { Fragment } from "react";

/**
 * Renders the small Markdown subset the blog editor supports: "## " headings, "- " bullet
 * lists, paragraphs (blank line between), **bold** and [links](url). Text is never treated as
 * HTML, so pasted content can't inject markup.
 */
function inline(text: string, key: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\))/g);
  return parts.map((part, i) => {
    const k = `${key}-${i}`;
    const bold = /^\*\*([^*]+)\*\*$/.exec(part);
    if (bold) return <strong key={k} className="font-bold">{bold[1]}</strong>;
    const link = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(part);
    if (link) {
      const href = link[2];
      const safe = /^(https?:\/\/|\/|mailto:|tel:)/.test(href) ? href : "#";
      return safe.startsWith("/") ? (
        <Link key={k} href={safe} className="text-brand underline underline-offset-2">
          {link[1]}
        </Link>
      ) : (
        <a key={k} href={safe} target="_blank" rel="noopener" className="text-brand underline underline-offset-2">
          {link[1]}
        </a>
      );
    }
    return <Fragment key={k}>{part}</Fragment>;
  });
}

export function BlogBody({ markdown }: { markdown: string }) {
  const blocks = markdown.replace(/\r\n/g, "\n").trim().split(/\n{2,}/);
  return (
    <div className="space-y-5 text-body text-black lg:text-[18px] lg:leading-[1.5]">
      {blocks.map((block, i) => {
        const lines = block.split("\n");
        if (lines[0].startsWith("## ")) {
          const rest = lines.slice(1).join(" ").trim();
          return (
            <Fragment key={i}>
              <h2 className="pt-4 text-[24px] leading-[1.2] text-brand lg:text-[28px]">{lines[0].slice(3)}</h2>
              {rest && <p>{inline(rest, `p${i}`)}</p>}
            </Fragment>
          );
        }
        if (lines.every((l) => l.startsWith("- "))) {
          return (
            <ul key={i} className="space-y-2">
              {lines.map((l, j) => (
                <li key={j} className="flex gap-3">
                  <span aria-hidden className="text-brand">
                    +
                  </span>
                  <span>{inline(l.slice(2), `l${i}-${j}`)}</span>
                </li>
              ))}
            </ul>
          );
        }
        return <p key={i}>{inline(lines.join(" "), `p${i}`)}</p>;
      })}
    </div>
  );
}

/** Words in a post body (for the editor's word count) */
export const wordCount = (md: string) => md.replace(/[#*\-[\]()]/g, " ").split(/\s+/).filter(Boolean).length;
