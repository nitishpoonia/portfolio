import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

const categories = [
  {
    label: "Mobile",
    skills: [
      "React Native",
      "Native iOS/Android module bridging",
      "NFC",
      "Offline queueing",
      "Async Storage",
      "React Query",
      "App Store & Play Store releases",
    ],
  },
  {
    label: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "REST APIs", "On-page SEO"],
  },
  {
    label: "Backend",
    skills: ["Node.js", "Express", "PostgreSQL", "Redis", "bcrypt", "REST API design"],
  },
  {
    label: "Integrations",
    skills: ["Stripe", "OpenAI API", "Sanity CMS", "Google Sign-In"],
  },
  {
    label: "Tools",
    skills: ["Git", "GitHub", "Render", "Vercel", "Figma", "Cursor"],
  },
];

export default function Skills() {
  return (
    <>
      <SectionHeader
        label="Toolkit"
        title="What I build with"
        subtitle="Tools I reach for regularly, grouped by where they sit in a product."
      />

      <div
        className="skills-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "clamp(2rem, 4vw, 3rem)",
        }}
      >
        {categories.map(({ label, skills }, i) => (
          <Reveal key={label} delay={i * 0.05}>
            <div>
              <p
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "0.66rem",
                  fontWeight: 500,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--sec-ink)",
                  marginBottom: "1.1rem",
                  paddingBottom: "0.8rem",
                  borderBottom: "1px solid var(--sec-line)",
                }}
              >
                {label}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.55rem" }}>
                {skills.map((s) => (
                  <span key={s} className="skill-pill">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <style>{`
        .skill-pill {
          display: inline-block;
          padding: 0.5rem 1rem;
          border: 1px solid var(--sec-line);
          border-radius: var(--r-pill);
          color: var(--sec-mid);
          background: var(--sec-card);
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.01em;
          font-family: var(--font);
          transition: color var(--t-fast) var(--ease-soft),
                      background var(--t-fast) var(--ease-soft),
                      border-color var(--t-fast) var(--ease-soft);
        }
        .skill-pill:hover {
          color: var(--sec-bg);
          background: var(--sec-accent);
          border-color: var(--sec-accent);
        }
      `}</style>
    </>
  );
}
