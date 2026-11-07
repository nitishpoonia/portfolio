import Link from "next/link";
import { SOCIAL } from "@/lib/story";
import { getContact } from "@/lib/site";

export default async function SiteFooter() {
  const contact = await getContact();
  return (
    <footer className="site-footer">
      <div className="glass site-footer-inner">
        <div className="site-footer-brand">
          <strong>Nitish Poonia</strong>
          <span>
            © {new Date().getFullYear()} Nitish Poonia · Layout ideas inspired by{" "}
            <a href="https://www.braydoncoyer.dev/" target="_blank" rel="noopener noreferrer">braydoncoyer.dev</a>
          </span>
        </div>
        <nav aria-label="Footer" className="site-footer-links">
          {SOCIAL.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>
          ))}
          <a href={`mailto:${contact.email}`}>Email</a>
          <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          <Link href="/uses">Uses</Link>
          <Link href="/studio" rel="nofollow">Studio</Link>
        </nav>
      </div>
    </footer>
  );
}
