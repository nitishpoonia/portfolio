import Link from "next/link";
import { Rocket, CodeXml, Fingerprint, Sparkles, Download, Mail, MessageCircle, BookOpen, ArrowRight } from "lucide-react";
import { getContact, whatsappHref } from "@/lib/site";
import { getSiteContent } from "@/lib/site-content";
import SplitWords from "@/components/motion/SplitWords";
import CopyEmail from "@/components/CopyEmail";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "Hire",
  description:
    "Nitish Poonia is a software developer who ships mobile and web products end to end and is now building AI systems in Python. Looking for a full-time role.",
  path: "/hire",
});

const REASONS = [
  {
    icon: Rocket,
    title: "I ship to real users",
    text: "My NFC attendance app is live on the App Store, and staff use it every day to clock their shifts.",
    href: "/projects/nfc-time-tracking",
    link: "Read the case study",
  },
  {
    icon: CodeXml,
    title: "I’m at home in other people’s code",
    text: "At Arthtech I took over an inherited React and React Native codebase, stabilised it, and kept shipping features on top.",
  },
  {
    icon: Fingerprint,
    title: "I own features end to end",
    text: "I own our biometric feature from design to release, and I make the builds the other developers test on.",
  },
  {
    icon: Sparkles,
    title: "I’m building with AI, not just calling it",
    text: "My current project is a health claims assistant in Python: code makes the exact decisions, the model handles language, and unclear cases go to a human.",
  },
];

export default async function HirePage() {
  const [contact, { availability }] = await Promise.all([getContact(), getSiteContent()]);

  return (
    <main id="main" className="page-main page-narrow">
      <header className="page-head">
        {availability.open && (
          <span className="status-pill"><span className="live-dot live-dot-dark" aria-hidden="true" />{availability.label}</span>
        )}
        <h1 className="split"><SplitWords text="Looking for my next team" /></h1>
        <p className="page-lede">
          I’m a software developer who takes products from idea to app store, and I’m now
          building AI systems too. I want a full-time role where I can do both: ship the product
          people touch and the intelligence underneath it.
        </p>
        <div className="btn-row btn-row-start">
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="pill-btn pill-btn-dark"><Download size={17} strokeWidth={1.9} aria-hidden="true" />Download résumé</a>
          <a href={`mailto:${contact.email}`} className="pill-btn pill-btn-line"><Mail size={17} strokeWidth={1.9} aria-hidden="true" />Email me</a>
          <CopyEmail email={contact.email} />
        </div>
      </header>

      <section className="section-block" aria-labelledby="why-h">
        <h2 id="why-h" className="h2">Why work with me</h2>
        <ul className="reason-grid">
          {REASONS.map(({ icon: Icon, ...r }, i) => (
            <li key={r.title} className="glass reason">
              <span className="card-top">
                <span className="card-icon" aria-hidden="true"><Icon size={18} strokeWidth={1.8} /></span>
                <span className="reason-num">{String(i + 1).padStart(2, "0")}</span>
              </span>
              <strong>{r.title}</strong>
              <p>{r.text}</p>
              {r.href && <Link href={r.href} className="reason-link">{r.link}<ArrowRight size={15} strokeWidth={2} aria-hidden="true" /></Link>}
            </li>
          ))}
        </ul>
      </section>

      <section className="section-block" aria-labelledby="fit-h">
        <div className="now-card">
          <h2 id="fit-h" className="h2">Where I fit best</h2>
          <p className="now-text">
            Product teams building AI-powered features, where one engineer can own a feature from
            the backend and model logic through to the mobile or web screen. I’m based in Chandigarh
            and currently a software developer at Arthtech Supports.
          </p>
          <div className="btn-row btn-row-start">
            <a href={whatsappHref(contact)} target="_blank" rel="noopener noreferrer" className="pill-btn pill-btn-light"><MessageCircle size={17} strokeWidth={1.9} aria-hidden="true" />Message me on WhatsApp</a>
            <Link href="/story" className="pill-btn pill-btn-ghost-light"><BookOpen size={17} strokeWidth={1.9} aria-hidden="true" />Read my story</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
