import Link from "next/link";
import { Github, Youtube, Mail, MessageCircle, Laptop, LockKeyhole } from "lucide-react";
import { SOCIAL } from "@/lib/story";
import { getContact } from "@/lib/site";

const SOCIAL_ICONS = { GitHub: Github, YouTube: Youtube };

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
          <span className="social-row">
            {SOCIAL.map((s) => {
              const Icon = SOCIAL_ICONS[s.label];
              return Icon ? (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="social-btn" aria-label={s.label}>
                  <Icon size={18} strokeWidth={1.8} />
                </a>
              ) : null;
            })}
            <a href={`mailto:${contact.email}`} className="social-btn" aria-label="Email"><Mail size={18} strokeWidth={1.8} /></a>
            <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="WhatsApp">
              <MessageCircle size={18} strokeWidth={1.8} />
            </a>
          </span>
        </div>
        <nav aria-label="Footer" className="site-footer-links">
          {SOCIAL.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>
          ))}
          <Link href="/uses"><Laptop size={15} strokeWidth={1.8} aria-hidden="true" />Uses</Link>
          <Link href="/studio" rel="nofollow"><LockKeyhole size={15} strokeWidth={1.8} aria-hidden="true" />Studio</Link>
        </nav>
      </div>
    </footer>
  );
}
