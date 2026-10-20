"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CONTACT } from "@/lib/contact";

const links = [
  { label: "Home", href: "/" },
  { label: "Story", href: "/story" },
  { label: "Work", href: "/projects" },
  { label: "Writing", href: "/blog" },
  { label: "Stack", href: "/#stack" },
  { label: "Hire", href: "/hire" },
];

export default function Navbar() {
  const path = usePathname();
  const active = (href) => (href === "/" ? path === "/" : !href.includes("#") && path.startsWith(href));
  return (
    <header className="site-nav">
      <span className="site-nav-logo" aria-hidden="true">NP</span>
      <nav aria-label="Main" className="site-nav-links">
        {links.map((l) => (
          <Link key={l.href} href={l.href} aria-current={active(l.href) ? "page" : undefined} className="site-nav-link">
            {l.label}
          </Link>
        ))}
      </nav>
      <a href={`mailto:${CONTACT.email}`} className="pill-btn pill-btn-dark site-nav-cta">Email me</a>
    </header>
  );
}
