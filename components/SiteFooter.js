import Link from "next/link";
import { CONTACT } from "@/lib/contact";
import { SOCIAL } from "@/lib/story";

export default function SiteFooter() {
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
          <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>
          <Link href="/uses">Uses</Link>
          <Link href="/studio">Studio</Link>
        </nav>
      </div>
    </footer>
  );
}
