import Navbar from "@/components/NavBar";
import SectionHeader from "@/components/SectionHeader";
import HireButton from "@/components/HireButton";
import { CONTACT } from "@/lib/contact";

const hireWaUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
  "Hi Nitish, I have a project I'd like to build. Can we set up a quick call?",
)}`;

export const metadata = {
  title: "Hire Nitish Poonia — Mobile & Web App Developer",
  description:
    "Hire Nitish to build your mobile or web app. React Native, Next.js, Node.js. Fixed-price projects. Based in India, working globally.",
  alternates: { canonical: "https://nitishpoonia.in/hire" },
  openGraph: {
    title: "Hire Nitish Poonia — Mobile & Web App Developer",
    description:
      "Hire Nitish to build your mobile or web app. React Native, Next.js, Node.js. Fixed-price projects. Based in India, working globally.",
    url: "https://nitishpoonia.in/hire",
    type: "website",
  },
};

const services = [
  {
    label: "Mobile App",
    tech: "React Native",
    title: "Cross-platform mobile app",
    body: "One codebase, iOS and Android. Authentication, payments, push notifications, offline support — whatever your users need to actually use the product.",
    price: "$500 – $800",
  },
  {
    label: "Web App",
    tech: "Next.js",
    title: "Web application or dashboard",
    body: "Fast, SEO-friendly web apps — customer-facing storefronts, admin dashboards, booking systems, or internal tools.",
    price: "$600 – $1,200",
  },
  {
    label: "Full-Stack Project",
    tech: "Node.js + PostgreSQL",
    title: "Full-stack product",
    body: "Mobile or web app with a custom backend — APIs, database design, authentication, and third-party integrations all included.",
    price: "$1,000 – $1,800",
  },
];

const steps = [
  {
    num: "01",
    title: "Discovery Call",
    body: "We talk through your idea: what the product does, who uses it, and what success looks like. No technical knowledge required.",
  },
  {
    num: "02",
    title: "Proposal",
    body: "You get a clear scope document with a timeline and a fixed price. No hourly billing, no surprise invoices.",
  },
  {
    num: "03",
    title: "Build in Milestones",
    body: "I build in short cycles and share working software at each milestone. You give feedback before I move forward.",
  },
  {
    num: "04",
    title: "You Own Everything",
    body: "Source code, app accounts, assets — all transferred to you when we're done. No lock-in, no ongoing dependency on me.",
  },
];

const pricing = [
  { type: "Simple mobile app (MVP)", range: "$500 – $800" },
  { type: "Web app or dashboard", range: "$600 – $1,200" },
  { type: "Full-stack product", range: "$1,000 – $1,800" },
];

export default function HirePage() {
  return (
    <>
      <Navbar />
      <main>
        <style>{`
          /* ── Service cards: gap trick for seamless shared borders ── */
          .services-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1px;
            background: var(--border);
            border: 1px solid var(--border);
          }
          .service-card {
            background: var(--bg);
            padding: clamp(1.5rem, 3vw, 2.5rem);
            display: flex;
            flex-direction: column;
            transition: background 0.2s;
          }
          .service-card:hover { background: var(--white); }

          /* ── Process steps ── */
          .step-item {
            border-top: 1px solid var(--border);
            padding: 1.75rem 0;
            display: grid;
            grid-template-columns: 3rem 1fr;
            gap: 1rem;
            align-items: start;
          }

          /* ── Pricing rows ── */
          .pricing-row {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            padding: 1.25rem 0;
            border-bottom: 1px solid var(--border);
            gap: 2rem;
          }

          /* ── Mobile ── */
          @media (max-width: 768px) {
            .hire-hero-grid  { grid-template-columns: 1fr !important; }
            .services-grid   { grid-template-columns: 1fr !important; }
            .how-grid        { grid-template-columns: 1fr !important; }
            .hire-cta-inner  { flex-direction: column !important; align-items: flex-start !important; }
          }
        `}</style>

        {/* ──────────────────────────────────────────
            HERO
        ────────────────────────────────────────── */}
        <section
          style={{
            borderBottom: "1px solid var(--border)",
            padding: "calc(var(--pad-y) + 4rem) var(--pad-x) var(--pad-y)",
            maxWidth: "var(--max)",
            margin: "0 auto",
          }}
        >
          <div
            className="hire-hero-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(3rem, 6vw, 8rem)",
              alignItems: "start",
            }}
          >
            {/* Left column */}
            <div>
              <p
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--mid)",
                  marginBottom: "1rem",
                }}
              >
                Available for new projects
              </p>
              <h1
                style={{
                  fontSize: "clamp(2.6rem, 5.5vw, 5.5rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                  lineHeight: 0.95,
                  color: "var(--ink)",
                  marginBottom: "clamp(1.25rem, 3vw, 2rem)",
                }}
              >
                I build apps that move your business forward.
              </h1>
              <p
                style={{
                  fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
                  fontWeight: 300,
                  lineHeight: 1.75,
                  color: "var(--mid)",
                  maxWidth: "46ch",
                  marginBottom: "clamp(1.5rem, 3vw, 2.5rem)",
                }}
              >
                Mobile apps, web platforms, and full-stack products — from first
                conversation to live in the App Store. Fixed price. No
                surprises.
              </p>
              <HireButton
                size="md"
                label="Start a conversation"
                url={hireWaUrl}
              />
            </div>

            {/* Right column — facts table */}
            <div
              style={{ border: "1px solid var(--border)", alignSelf: "start" }}
            >
              {[
                { label: "Experience", value: "1+ Year" },
                { label: "Delivery", value: "Fixed-price milestones" },
                { label: "Timezone", value: "IST — UTC +5:30" },
                { label: "Status", value: "Open to projects" },
              ].map(({ label, value }, i) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "1.1rem 1.5rem",
                    borderBottom: i < 3 ? "1px solid var(--border)" : "none",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "var(--mid)",
                    }}
                  >
                    {label}
                  </span>
                  <span
                    style={{
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      color: "var(--ink)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────
            WHAT I BUILD
        ────────────────────────────────────────── */}
        <section
          style={{
            borderBottom: "1px solid var(--border)",
            padding: "var(--pad-y) var(--pad-x)",
            maxWidth: "var(--max)",
            margin: "0 auto",
          }}
        >
          <SectionHeader
            label="Services"
            title="What I build."
            subtitle="Three types of projects I take on. All scoped and priced upfront."
          />
          <div className="services-grid">
            {services.map((s) => (
              <div key={s.label} className="service-card">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1.5rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.6rem",
                      fontWeight: 700,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--mid)",
                    }}
                  >
                    {s.label}
                  </span>
                  <span
                    style={{
                      fontSize: "0.6rem",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      padding: "0.3rem 0.7rem",
                      border: "1px solid var(--border)",
                      color: "var(--mid)",
                    }}
                  >
                    {s.tech}
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: "clamp(1.1rem, 1.8vw, 1.4rem)",
                    fontWeight: 900,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.15,
                    color: "var(--ink)",
                    marginBottom: "0.75rem",
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 300,
                    lineHeight: 1.7,
                    color: "var(--mid)",
                    flex: 1,
                  }}
                >
                  {s.body}
                </p>
                <p
                  style={{
                    marginTop: "1.5rem",
                    fontSize: "1rem",
                    fontWeight: 900,
                    letterSpacing: "-0.02em",
                    color: "var(--ink)",
                  }}
                >
                  {s.price}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ──────────────────────────────────────────
            HOW IT WORKS
        ────────────────────────────────────────── */}
        <section
          style={{
            borderBottom: "1px solid var(--border)",
            padding: "var(--pad-y) var(--pad-x)",
            maxWidth: "var(--max)",
            margin: "0 auto",
          }}
        >
          <div
            className="how-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "clamp(3rem, 6vw, 8rem)",
              alignItems: "start",
            }}
          >
            <SectionHeader
              label="Process"
              title="How it works."
              subtitle="A straightforward process from first message to shipped product."
            />
            <div>
              {steps.map((step) => (
                <div key={step.num} className="step-item">
                  <span
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      color: "var(--faint)",
                      paddingTop: "0.2rem",
                    }}
                  >
                    {step.num}
                  </span>
                  <div>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: 900,
                        letterSpacing: "-0.01em",
                        color: "var(--ink)",
                        marginBottom: "0.4rem",
                      }}
                    >
                      {step.title}
                    </p>
                    <p
                      style={{
                        fontSize: "0.85rem",
                        fontWeight: 300,
                        lineHeight: 1.7,
                        color: "var(--mid)",
                      }}
                    >
                      {step.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ──────────────────────────────────────────
            PRICING
        ────────────────────────────────────────── */}
        <section
          style={{
            borderBottom: "1px solid var(--border)",
            padding: "var(--pad-y) var(--pad-x)",
            maxWidth: "var(--max)",
            margin: "0 auto",
          }}
        >
          <SectionHeader
            label="Pricing"
            title="What it costs."
            subtitle="Every project is scoped and priced before any work begins. You always know exactly what you're paying and what you're getting."
          />
          <div
            style={{ maxWidth: "52rem", borderTop: "1px solid var(--border)" }}
          >
            {pricing.map((row) => (
              <div key={row.type} className="pricing-row">
                <span
                  style={{
                    fontSize: "clamp(0.9rem, 1.4vw, 1rem)",
                    fontWeight: 400,
                    color: "var(--ink)",
                  }}
                >
                  {row.type}
                </span>
                <span
                  style={{
                    fontSize: "clamp(0.9rem, 1.4vw, 1rem)",
                    fontWeight: 900,
                    letterSpacing: "-0.01em",
                    color: "var(--ink)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {row.range}
                </span>
              </div>
            ))}
          </div>
          <p
            style={{
              marginTop: "1.5rem",
              fontSize: "0.8rem",
              fontWeight: 300,
              lineHeight: 1.7,
              color: "var(--mid)",
              maxWidth: "52rem",
            }}
          >
            These are starting ranges for typical projects. Complex integrations
            or custom backend work may adjust the final price. Every project
            gets a fixed quote after the discovery call.
          </p>
        </section>

        {/* ──────────────────────────────────────────
            CTA STRIP
        ────────────────────────────────────────── */}
        <section
          style={{
            background: "var(--ink)",
            padding: "clamp(3rem, 6vw, 5rem) var(--pad-x)",
          }}
        >
          <div
            className="hire-cta-inner"
            style={{
              maxWidth: "var(--max)",
              margin: "0 auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "2rem",
              flexWrap: "wrap",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(247,246,242,0.4)",
                  marginBottom: "0.75rem",
                }}
              >
                Ready to start?
              </p>
              <h2
                style={{
                  fontSize: "clamp(1.5rem, 3.5vw, 2.8rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                  color: "var(--bg)",
                  marginBottom: "0.75rem",
                }}
              >
                Let&apos;s talk about your project.
              </h2>
              <p
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 300,
                  color: "rgba(247,246,242,0.5)",
                  lineHeight: 1.6,
                }}
              >
                Fastest response on WhatsApp. Usually replies within a few
                hours.
              </p>
            </div>
            <HireButton
              size="md"
              label="Message me on WhatsApp"
              url={hireWaUrl}
            />
          </div>
        </section>
      </main>
    </>
  );
}
