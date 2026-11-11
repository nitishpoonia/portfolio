import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

// One project as a ruled row: title, one-line description, stack as plain text,
// then the dates. Used on the home page and the Work page.
export default function ProjectRow({ href, title, tagline, tags = [], meta, building = false, cover }) {
  return (
    <Link href={href} className="row row-project">
      <span className="row-main">
        <span className="row-title">
          {title}
          {building && <span className="badge">Building now</span>}
        </span>
        {tagline && <span className="row-text">{tagline}</span>}
        {tags.length > 0 && <span className="row-stack">{tags.join(", ")}</span>}
      </span>
      {cover && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={cover} alt="" loading="lazy" decoding="async" className="row-cover" />
      )}
      <span className="row-end">
        {meta && <span className="meta">{meta}</span>}
        <ArrowUpRight size={18} strokeWidth={1.8} className="row-arrow" aria-hidden="true" />
      </span>
    </Link>
  );
}
