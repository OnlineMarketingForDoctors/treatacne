import Link from "next/link";
import { COURSE_PAGE, courseLine } from "@/lib/site";

/** Secondary line under the main Get Started / Book buttons, pointing to the course. */
export function CourseLine({ className = "" }: { className?: string }) {
  return (
    <p className={`text-note ${className}`}>
      {courseLine}{" "}
      <Link href={COURSE_PAGE} className="whitespace-nowrap underline underline-offset-2">
        See the course →
      </Link>
    </p>
  );
}
