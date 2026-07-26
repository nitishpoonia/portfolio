import Navbar from "@/components/NavBar";
import BackButton from "@/components/BackButton";
import { CONTACT } from "@/lib/contact";

export const metadata = {
  title: "Hire — Nitish Poonia | Software Developer, open to full-time roles",
  description:
    "Nitish Poonia is a software developer building mobile and web products end to end — React Native, Next.js, Node and PostgreSQL. Open to full-time roles.",
  alternates: { canonical: "https://nitishpoonia.in/hire" },
  openGraph: {
    title: "Hire — Nitish Poonia | Software Developer",
    description:
      "Software developer building mobile and web products end to end. Open to full-time roles.",
    url: "https://nitishpoonia.in/hire",
    type: "website",
    siteName: "Nitish Poonia",
  },
};

const SNAPSHOT = [
  { label: "Currently", value: "Software Developer at Arthtech Supports" },
  { label: "Focus", value: "Mobile & web, front to back" },
  { label: "Stack", value: "React Native · Next.js · Node · PostgreSQL" },
  { label: "Shipped", value: "EDA Time Tracker — live on the App Store" },
  { label: "Availability", value: "Open to full-time roles" },
];

const WHAT = [
  "Ship into large codebases I didn't write — trace a bug to its real cause and make one fix authoritative rather than patching symptoms.",
  "Build the whole feature: React Native or Next.js on the front, Node and PostgreSQL behind, and the native module in between when there's no cross-platform API.",
  "Take a vague, real-world problem — staff gaming a shift clock, a booking flow across mismatched supplier APIs — and turn it into something that holds up in production.",
];

export default function HirePage() {
  return (
    <>
      <Navbar />
      <main className="band band-0" style={{ minHeight: "100vh" }}>
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "calc(var(--pad-y) + 4rem) var(--pad-x) var(--pad-y)",
          }}
        >
          <BackButton />

          <p
            style={{
              fontFamily: "var(--mono)",
              fontSize: "0.66rem",
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--sec-mid)",
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
            }}
          >
            <span
              aria-hidden="true"
              style={{ width: "18px", height: "1px", background: "var(--sec-accent)" }}
            />
            Hire
          </p>
          <h1
            style={{
              fontFamily: "var(--display)",
              fontSize: "clamp(2.3rem, 5.5vw, 4.2rem)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              lineHeight: 1.02,
              color: "var(--sec-ink)",
              marginBottom: "1.4rem",
              textWrap: "balance",
            }}
          >
            Open to full-time roles
          </h1>
          <p
            style={{
              fontSize: "clamp(1.05rem, 1.7vw, 1.25rem)",
              lineHeight: 1.7,
              color: "var(--sec-ink)",
              maxWidth: "58ch",
            }}
          >
            I build mobile and web products end to end — React Native and Next.js
            on the front, Node and PostgreSQL behind. Most of my work happens
            inside large existing codebases I didn&apos;t write.
          </p>

          <div
            style={{
              marginTop: "clamp(2.5rem, 5vw, 3.5rem)",
              background: "var(--sec-card)",
              border: "1px solid var(--sec-line)",
              borderRadius: "var(--r-lg)",
              padding: "clamp(1.5rem, 3vw, 2.25rem)",
              boxShadow: "var(--sec-shadow)",
            }}
          >
            {SNAPSHOT.map(({ label, value }, i) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "0.5rem 1.5rem",
                  justifyContent: "space-between",
                  padding: "0.95rem 0",
                  borderTop: i === 0 ? "none" : "1px solid var(--sec-line)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: "0.66rem",
                    fontWeight: 500,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--sec-mid)",
                  }}
                >
                  {label}
                </span>
                <span
                  style={{
                    fontSize: "0.98rem",
                    fontWeight: 500,
                    color: "var(--sec-ink)",
                    letterSpacing: "-0.01em",
                    textAlign: "right",
                  }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>

          <h2
            style={{
              fontFamily: "var(--display)",
              fontSize: "clamp(1.5rem, 3vw, 2.1rem)",
              fontWeight: 400,
              letterSpacing: "-0.01em",
              color: "var(--sec-ink)",
              margin: "clamp(3rem, 6vw, 4.5rem) 0 1.5rem",
            }}
          >
            What I bring
          </h2>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1rem" }}>
            {WHAT.map((w, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  gap: "0.85rem",
                  fontSize: "clamp(0.98rem, 1.4vw, 1.08rem)",
                  lineHeight: 1.7,
                  color: "var(--sec-mid)",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    flexShrink: 0,
                    width: "6px",
                    height: "6px",
                    borderRadius: "var(--r-pill)",
                    background: "var(--sec-accent)",
                    marginTop: "0.6em",
                  }}
                />
                <span>{w}</span>
              </li>
            ))}
          </ul>

          <div
            style={{
              marginTop: "clamp(3rem, 6vw, 4.5rem)",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <a href="/resume.pdf" download target="_blank" rel="noopener noreferrer" className="hire-cta hire-cta-primary">
              <span className="hire-cta-eyebrow">Résumé — PDF</span>
              <span className="hire-cta-main">
                Download my résumé <span aria-hidden="true">→</span>
              </span>
            </a>
            <div className="hire-cta-row">
              <a href={`mailto:${CONTACT.email}`} className="hire-cta">
                <span className="hire-cta-eyebrow">Email</span>
                <span className="hire-cta-main">
                  {CONTACT.email} <span aria-hidden="true">→</span>
                </span>
              </a>
              <a
                href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hire-cta"
              >
                <span className="hire-cta-eyebrow">WhatsApp</span>
                <span className="hire-cta-main">
                  Message me <span aria-hidden="true">→</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        .hire-cta {
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
          padding: clamp(1.4rem, 3vw, 2rem);
          border-radius: var(--r-lg);
          border: 1px solid var(--sec-line);
          background: var(--sec-card);
          text-decoration: none;
          transition: transform var(--t-med) var(--ease-soft), border-color var(--t-med) var(--ease-soft), background var(--t-med) var(--ease-soft);
        }
        .hire-cta:hover {
          transform: translateY(-3px);
          border-color: var(--sec-accent);
          background: var(--sec-card-hover);
        }
        .hire-cta-primary {
          background: var(--sec-accent);
          border-color: var(--sec-accent);
        }
        .hire-cta-primary:hover { transform: translateY(-3px); box-shadow: 0 12px 28px rgba(62,84,73,0.25); }
        .hire-cta-eyebrow {
          font-family: var(--mono);
          font-size: 0.62rem;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--sec-mid);
        }
        .hire-cta-primary .hire-cta-eyebrow { color: var(--sec-bg); opacity: 0.78; }
        .hire-cta-primary .hire-cta-main { color: var(--sec-bg); }
        .hire-cta-main {
          font-size: clamp(0.95rem, 1.5vw, 1.15rem);
          font-weight: 600;
          color: var(--sec-ink);
          letter-spacing: -0.01em;
          word-break: break-word;
        }
        .hire-cta-row { display: flex; gap: 1rem; flex-wrap: wrap; }
        .hire-cta-row .hire-cta { flex: 1 1 240px; }
        @media (prefers-reduced-motion: reduce) {
          .hire-cta:hover, .hire-cta-primary:hover { transform: none; }
        }
      `}</style>
    </>
  );
}
