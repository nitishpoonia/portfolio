import Navbar from "@/components/NavBar";
import SectionHeader from "@/components/SectionHeader";
import HireButton from "@/components/HireButton";
import { CONTACT } from "@/lib/contact";

const hireWaUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
  "Hi Nitish, I have a project I'd like to build. Can we set up a quick call?",
)}`;

export const metadata = {
  title: "Nitish Poonia — Mobile & Web App Developer for Hire",
  description:
    "I build mobile apps and web platforms for startups and small businesses. React Native, Next.js, Node.js. Fixed price. From first conversation to App Store.",
  alternates: { canonical: "https://nitishpoonia.in" },
  openGraph: {
    title: "Nitish Poonia — Mobile & Web App Developer for Hire",
    description:
      "I build mobile apps and web platforms for startups and small businesses. React Native, Next.js, Node.js. Fixed price. From first conversation to App Store.",
    url: "https://nitishpoonia.in",
    type: "website",
  },
};

const pricing = [
  { type: "Simple mobile app (MVP)", range: "$500 \u2013 $800" },
  { type: "Web app or dashboard", range: "$600 \u2013 $1,200" },
  { type: "Full-stack product", range: "$1,000 \u2013 $1,800" },
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <style>{`
          .pricing-row {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            padding: 1.25rem 0;
            border-bottom: 1px solid var(--border);
            gap: 2rem;
          }
          @media (max-width: 768px) {
            .hire-hero-grid  { grid-template-columns: 1fr !important; }
            .hire-cta-inner  { flex-direction: column !important; align-items: flex-start !important; }
          }
        `}</style>

        {/* HERO */}
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
            <div>
              <h1
                style={{
                  fontSize: "clamp(2.8rem, 6vw, 6rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.02em",
                  lineHeight: 0.92,
                  color: "var(--ink)",
                  textTransform: "uppercase",
                  marginBottom: "clamp(1.5rem, 3vw, 2.5rem)",
                }}
              >
                I build digital products that move businesses forward.
              </h1>
              <p
                style={{
                  fontSize: "clamp(0.9rem, 1.4vw, 1rem)",
                  fontWeight: 400,
                  lineHeight: 1.75,
                  color: "var(--mid)",
                  maxWidth: "48ch",
                  marginBottom: "clamp(1.75rem, 3vw, 2.5rem)",
                }}
              >
                From concept to code, I deliver high-performance web and mobile
                solutions with a focus on speed, precision, and measurable
                results. Fixed-price. No surprises.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "1.5rem",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <HireButton
                  size="md"
                  label="Start a conversation"
                  url={hireWaUrl}
                />
              </div>
            </div>

            {/* Stats card */}
            <div
              style={{
                border: "1px solid var(--border)",
                alignSelf: "start",
                background: "#fff",
              }}
            >
              {[
                { label: "Experience", value: "1+ Year" },
                { label: "Delivery", value: "Fixed-price milestones" },
                { label: "Timezone", value: "IST — UTC +5:30" },
                { label: "Status", value: "Accepting new projects", dot: true },
              ].map(({ label, value, dot }, i, arr) => (
                <div
                  key={label}
                  style={{
                    padding: "1.25rem 1.75rem",
                    borderBottom:
                      i < arr.length - 1 ? "1px solid var(--border)" : "none",
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.6rem",
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--mid)",
                      marginBottom: "0.4rem",
                    }}
                  >
                    {label}
                  </p>
                  <p
                    style={{
                      fontSize: "clamp(0.95rem, 1.4vw, 1.15rem)",
                      fontWeight: 800,
                      color: "var(--ink)",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.2,
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    {dot && (
                      <span
                        style={{
                          display: "inline-block",
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          background: "#22c55e",
                          flexShrink: 0,
                        }}
                      />
                    )}
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section
          style={{
            borderBottom: "1px solid var(--border)",
            padding: "var(--pad-y) var(--pad-x)",
            maxWidth: "var(--max)",
            margin: "0 auto",
          }}
        >
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
            Services
          </p>

          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 0.95,
              color: "var(--ink)",
              marginBottom: "clamp(2.5rem, 5vw, 4rem)",
            }}
          >
            What I build
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "1px",
              background: "var(--border)",
            }}
            className="services-grid"
          >
            {[
              {
                title: "Mobile Apps",
                description:
                  "React Native. iOS and Android from a single codebase. Offline-first, performant, App Store ready.",
                tag: "React Native",
              },
              {
                title: "Web Platforms",
                description:
                  "Next.js full-stack. Fast, SEO-ready, deployable in minutes. From landing pages to complex dashboards.",
                tag: "Next.js",
              },
              {
                title: "Full Product Builds",
                description:
                  "Wireframe to deployment. Design, development, and launch. One person, one point of contact, no coordination overhead.",
                tag: "End-to-end",
              },
              {
                title: "UI/UX Design",
                description:
                  "Figma-based screen design and user flows before development starts. AI-assisted for speed, human-directed for quality. You see it before we build it.",
                tag: "Figma + AI",
              },
            ].map(({ title, description, tag }) => (
              <div
                key={title}
                style={{
                  background: "var(--bg)",
                  padding: "clamp(1.5rem, 3vw, 2.5rem)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "1rem",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "clamp(1rem, 1.8vw, 1.3rem)",
                      fontWeight: 800,
                      letterSpacing: "-0.02em",
                      color: "var(--ink)",
                    }}
                  >
                    {title}
                  </h3>
                  <span
                    style={{
                      fontSize: "0.6rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--mid)",
                      border: "1px solid var(--border)",
                      padding: "0.25rem 0.6rem",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {tag}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: "0.88rem",
                    color: "var(--mid)",
                    lineHeight: 1.7,
                  }}
                >
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How I Work Section */}
        <section
          style={{
            borderBottom: "1px solid var(--border)",
            padding: "var(--pad-y) var(--pad-x)",
            maxWidth: "var(--max)",
            margin: "0 auto",
          }}
        >
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
            Process
          </p>

          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 0.95,
              color: "var(--ink)",
              marginBottom: "clamp(2.5rem, 5vw, 4rem)",
            }}
          >
            How I work
          </h2>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {[
              {
                number: "01",
                title: "Discovery",
                body: "I start with your problem, not your feature list. Before any design or code, we define what success looks like, who the user is, and what the app needs to do on day one versus day one hundred.",
              },
              {
                number: "02",
                title: "Design",
                body: "I use AI design tools to produce UI direction fast — full screen flows, component layouts, interaction patterns. You see exactly what we are building before I write a line of code. Iteration at this stage costs minutes, not weeks.",
              },
              {
                number: "03",
                title: "Development",
                body: "React Native for mobile. Next.js for web. Node.js for backend. I use AI tools to write fast. I use my judgment to decide what ships. Every line of code in your product has been read, understood, and approved by me. You are not getting a codebase nobody understands.",
              },
              {
                number: "04",
                title: "Review and Iteration",
                body: "I do not blindly accept AI output. I review it, challenge it, rewrite it when it is wrong. This is what separates fast delivery from fast mistakes. Your product gets both speed and quality.",
              },
              {
                number: "05",
                title: "Deployment and Handover",
                body: "App Store submission, domain setup, server deployment, CI/CD pipeline. You own everything — code, accounts, assets, documentation. I do not create dependencies on myself.",
              },
            ].map(({ number, title, body }, i, arr) => (
              <div
                key={number}
                style={{
                  display: "grid",
                  gridTemplateColumns: "80px 1fr",
                  gap: "2rem",
                  padding: "clamp(1.5rem, 3vw, 2.5rem) 0",
                  borderBottom:
                    i < arr.length - 1 ? "1px solid var(--border)" : "none",
                }}
              >
                <span
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    color: "var(--faint)",
                    paddingTop: "0.2rem",
                  }}
                >
                  {number}
                </span>
                <div>
                  <h3
                    style={{
                      fontSize: "clamp(1rem, 1.8vw, 1.3rem)",
                      fontWeight: 800,
                      letterSpacing: "-0.02em",
                      color: "var(--ink)",
                      marginBottom: "0.6rem",
                    }}
                  >
                    {title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      color: "var(--mid)",
                      lineHeight: 1.75,
                      maxWidth: "60ch",
                    }}
                  >
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* AI Quality Callout */}
        <section
          style={{
            borderBottom: "1px solid var(--border)",
            padding: "var(--pad-y) var(--pad-x)",
            maxWidth: "var(--max)",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              border: "1.5px solid var(--ink)",
              padding: "clamp(2rem, 4vw, 3rem)",
              maxWidth: "720px",
            }}
          >
            <p
              style={{
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--mid)",
                marginBottom: "1.25rem",
              }}
            >
              A note on AI and code quality
            </p>

            <p
              style={{
                fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
                fontWeight: 700,
                color: "var(--ink)",
                lineHeight: 1.5,
                marginBottom: "1.25rem",
                letterSpacing: "-0.01em",
              }}
            >
              There are two kinds of developers using AI right now.
            </p>

            <p
              style={{
                fontSize: "0.9rem",
                color: "var(--mid)",
                lineHeight: 1.8,
                marginBottom: "1rem",
              }}
            >
              The first accepts whatever the AI produces, ships it, and moves
              on. The codebase works until it does not, and nobody knows why.
            </p>

            <p
              style={{
                fontSize: "0.9rem",
                color: "var(--mid)",
                lineHeight: 1.8,
                marginBottom: "1rem",
              }}
            >
              The second uses AI as a fast junior developer — gives it the task,
              reads what it produces, understands it, pushes back when it is
              wrong, and makes the final call on what goes into the product.
            </p>

            <p
              style={{
                fontSize: "0.9rem",
                fontWeight: 700,
                color: "var(--ink)",
                lineHeight: 1.8,
              }}
            >
              I am the second kind. AI makes me faster. It does not make the
              decisions.
            </p>
          </div>
        </section>

        {/* PRICING */}
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

        {/* CTA STRIP */}
        <section
          id="contact"
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
