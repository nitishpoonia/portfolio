import Navbar from "@/components/NavBar";
import SiteFooter from "@/components/SiteFooter";
import PageHeader from "@/components/PageHeader";
import { getContact, whatsappHref } from "@/lib/site";

const DESCRIPTION =
  "Nitish Poonia builds mobile and web products end to end with React Native, Next.js, Node and PostgreSQL, and is moving into AI engineering with Python. Open to full-time roles.";

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
  },
};

const SNAPSHOT = [
  { label: "Currently", value: "Software Developer at Arthtech Supports" },
  { label: "Focus", value: "Mobile and web, front to back" },
  { label: "Stack", value: "React Native · Next.js · Node · PostgreSQL" },
  { label: "Learning", value: "AI engineering · Python · FastAPI" },
  { label: "Shipped", value: "EDA Time Tracker, live on the App Store" },
  { label: "Availability", value: "Open to full-time roles" },
];

const WHAT = [
  "Ship into large codebases I didn't write: trace a bug to its real cause and make one fix authoritative rather than patching symptoms.",
  "Build the whole feature: React Native or Next.js on the front, Node and PostgreSQL behind, and the native module in between when there's no cross-platform API.",
  "Take a vague, real-world problem, like staff gaming a shift clock or a booking flow across mismatched supplier APIs, and turn it into something that holds up in production.",
  "Bring that product sense to AI features: I'm building a health claims assistant in Python where code makes the exact decisions and the model handles language.",
];

export default async function HirePage() {
  const contact = await getContact();

  return (
    <div className="page-shell">
      <Navbar />
      <main className="page-main page-narrow">
        <PageHeader
          eyebrow="Hire"
          title="Open to full-time roles"
          lede="I build mobile and web products end to end, and I'm moving deeper into AI engineering. Most of my work happens inside large existing codebases I didn't write."
        />

        <section className="glass stat-list" aria-label="Snapshot">
          {SNAPSHOT.map(({ label, value }) => (
            <div key={label} className="stat-row">
              <span className="mono">{label}</span>
              <span className="stat-value">{value}</span>
            </div>
          ))}
        </section>

        <section className="block" aria-labelledby="bring-h">
          <h2 id="bring-h" className="h2">What I bring</h2>
          <ul className="dot-list">
            {WHAT.map((w) => <li key={w}>{w}</li>)}
          </ul>
        </section>

        <section className="cta-grid" aria-label="Get in touch">
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="cta-card cta-card-dark">
            <span className="mono">Résumé · PDF</span>
            <strong>Download my résumé →</strong>
          </a>
          <a href={`mailto:${contact.email}`} className="glass cta-card">
            <span className="mono">Email</span>
            <strong className="break">{contact.email} →</strong>
          </a>
          <a href={whatsappHref(contact)} target="_blank" rel="noopener noreferrer" className="glass cta-card">
            <span className="mono">WhatsApp</span>
            <strong>Message me →</strong>
          </a>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
