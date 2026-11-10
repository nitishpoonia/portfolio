import Link from "next/link";
import { Mail, FileText } from "lucide-react";
import NavLinks from "./NavLinks";
import { getContact } from "@/lib/site";

export default async function Navbar() {
  const contact = await getContact();
  return (
    <header className="site-nav">
      <Link href="/" className="site-nav-logo" aria-label="Nitish Poonia, home">NP</Link>
      <NavLinks />
      <a href={`mailto:${contact.email}`} className="pill-btn pill-btn-dark site-nav-cta"><Mail size={16} strokeWidth={1.9} aria-hidden="true" />Email me</a>
      {/* Phones: the Email button doesn't fit, so the one always-visible action is the résumé. */}
      <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="site-nav-icon" aria-label="Résumé (PDF)">
        <FileText size={18} strokeWidth={1.9} aria-hidden="true" />
      </a>
    </header>
  );
}
