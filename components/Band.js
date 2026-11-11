import Link from "next/link";
import { ArrowRight } from "lucide-react";

// The site's layout unit: a label rail on the left (section title, a short note,
// an optional "see all" link) and the content on the right. Every public page is
// a stack of these, so everything lines up on the same two columns.
export default function Band({ id, title, titleId, note, href, linkLabel, live = false, as: Tag = "section", children, ...rest }) {
  const hid = titleId || (id ? `${id}-h` : undefined);
  return (
    <Tag id={id} className="band" aria-labelledby={title ? hid : undefined} {...rest}>
      <div className="rail">
        {title && (
          <h2 id={hid} className="rail-title">
            {live && <span className="live-dot live-dot-dark" aria-hidden="true" />}
            {title}
          </h2>
        )}
        {note && <p className="rail-note">{note}</p>}
        {href && (
          <Link href={href} className="rail-link">{linkLabel}<ArrowRight size={15} strokeWidth={1.9} aria-hidden="true" /></Link>
        )}
      </div>
      <div className="band-body">{children}</div>
    </Tag>
  );
}
