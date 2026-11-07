"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { label: "Home", href: "/" },
  { label: "Story", href: "/story" },
  { label: "Work", href: "/projects" },
  { label: "Writing", href: "/blog" },
  { label: "Hire", href: "/hire" },
];

export default function NavLinks() {
  const path = usePathname() || "/";
  const active = (href) => (href === "/" ? path === "/" : path.startsWith(href));
  return (
    <nav aria-label="Main" className="site-nav-links">
      {links.map((l) => (
        <Link key={l.href} href={l.href} aria-current={active(l.href) ? "page" : undefined} className="site-nav-link">
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
