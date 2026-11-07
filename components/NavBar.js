import Link from "next/link";
import NavLinks from "./NavLinks";
import { getContact } from "@/lib/site";

export default async function Navbar() {
  const contact = await getContact();
  return (
    <header className="site-nav">
      <Link href="/" className="site-nav-logo" aria-label="Nitish Poonia, home">NP</Link>
      <NavLinks />
      <a href={`mailto:${contact.email}`} className="pill-btn pill-btn-dark site-nav-cta">Email me</a>
    </header>
  );
}
