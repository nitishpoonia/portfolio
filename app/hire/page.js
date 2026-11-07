import Link from "next/link";
import Navbar from "@/components/NavBar";
import SiteFooter from "@/components/SiteFooter";
import { getContact, whatsappHref } from "@/lib/site";

const DESCRIPTION =
  "Nitish Poonia is a software developer who ships mobile and web products end to end and is now building AI systems in Python. Looking for a full-time role.";

export const metadata = {
  title: "Hire",
  description: DESCRIPTION,
  alternates: { canonical: "https://nitishpoonia.in/hire" },
  openGraph: {
    title: "Hire | Nitish Poonia",
    description: DESCRIPTION,
    url: "https://nitishpoonia.in/hire",
    type: "website",
    siteName: "Nitish Poonia",
    images: ["/opengraph-image"],
  },
};

const REASONS = [
  {
    title: "I ship to real users",
    text: "My NFC attendance app is live on the App Store, and staff use it every day to clock their shifts.",
    href: "/projects/nfc-time-tracking",
    link: "Read the case study",
  },
  {
    title: "I’m at home in other people’s code",
    text: "At Arthtech I took over an inherited React and React Native codebase, stabilised it, and kept shipping features on top.",
  },
  {
    title: "I own features end to end",
    text: "I own our biometric feature from design to release, and I make the builds the other developers test on.",
  },
  {
    title: "I’m building with AI, not just calling it",
    text: "My current project is a health claims assistant in Python: code makes the exact decisions, the model handles language, and unclear cases go to a human.",
  },
];

export default async function HirePage() {
  const contact = await getContact();

  return (
    <div className="page-shell">
      <Navbar />
      <main className="page-main page-narrow">
        <header className="page-head">
          <span className="status-pill"><span className="live-dot live-dot-dark" aria-hidden="true" />Open to full-time roles</span>
          <h1>Looking for my next team</h1>
          <p className="page-lede">
            I’m a software developer who takes products from idea to app store, and I’m now
            building AI systems too. I want a full-time role where I can do both: ship the product
            people touch and the intelligence underneath it.
          </p>
          <div className="btn-row btn-row-start">
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="pill-btn pill-btn-dark">Download résumé</a>
            <a href={`mailto:${contact.email}`} className="pill-btn pill-btn-line">Email me</a>
          </div>
        </header>

        <section className="block" aria-labelledby="why-h">
          <h2 id="why-h" className="h2">Why work with me</h2>
          <ul className="reason-grid">
            {REASONS.map((r, i) => (
              <li key={r.title} className="glass reason">
                <span className="reason-num">{String(i + 1).padStart(2, "0")}</span>
                <strong>{r.title}</strong>
                <p>{r.text}</p>
                {r.href && <Link href={r.href} className="reason-link">{r.link} →</Link>}
              </li>
            ))}
          </ul>
        </section>

        <section className="block" aria-labelledby="fit-h">
          <div className="now-card">
            <h2 id="fit-h" className="h2">Where I fit best</h2>
            <p className="now-text">
              Product teams building AI-powered features, where one engineer can own a feature from
              the backend and model logic through to the mobile or web screen. I’m based in Chandigarh
              and currently a software developer at Arthtech Supports.
            </p>
            <div className="btn-row btn-row-start">
              <a href={whatsappHref(contact)} target="_blank" rel="noopener noreferrer" className="pill-btn pill-btn-light">Message me on WhatsApp</a>
              <Link href="/story" className="pill-btn pill-btn-ghost-light">Read my story</Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
