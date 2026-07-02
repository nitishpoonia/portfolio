import SectionHeader from "./SectionHeader";

// ── Add future roles here ─────────────────────────────────────────────────────
const experiences = [
  {
    company: "Arthtech Supports",
    role: "Software Developer — MDR (MyDigiRecords)",
    period: "Mar 2026 – Present",
    responsibilities: [
      "Took ownership of an existing production React Native app via knowledge transfer after the prior developer left.",
      "Fixed a production Android crash (Fragment$InstantiationException) affecting live users.",
      "Implemented multi-device session management, including authentication failure monitoring and notification tap handling.",
      "Own incremental feature development and frontend bug resolution on the app.",
    ],
  },
  {
    company: "Vision Vivante",
    role: "Software Developer",
    period: "Dec 2024 – Jan 2026",
    responsibilities: [
      "Built and shipped a production NFC attendance app in React Native, deployed across multiple company facilities.",
      "Owned frontend, API integration, and built two native modules for an OS-independent clock system to prevent device time manipulation.",
      "Built frontend to 70–80% completion across three additional products — a hotel booking platform, a gaming app, and an agri social platform — in a fast-moving, under-resourced environment; owned full-stack development independently on the gaming app.",
    ],
  },
  {
    company: "Self-Employed",
    role: "Freelance Web Developer",
    period: "2026 – Present",
    responsibilities: [
      "Building a client website using Next.js and Sanity.io as a headless CMS, handling requirements, design implementation, and content modeling directly with the client.",
    ],
  },
];

function ExperienceRow({ entry, isLast }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "clamp(140px, 18%, 200px) 1fr",
        gap: "clamp(1.5rem, 4vw, 4rem)",
        padding: "clamp(2rem, 4vw, 3.5rem) 0",
        borderBottom: isLast ? "none" : "1px solid var(--border)",
      }}
    >
      {/* Meta */}
      <div>
        <p
          style={{
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--mid)",
            marginBottom: "0.35rem",
          }}
        >
          {entry.period}
        </p>
        <p
          style={{
            fontSize: "0.8rem",
            fontWeight: 800,
            color: "var(--ink)",
            letterSpacing: "0.02em",
          }}
        >
          {entry.company}
        </p>
      </div>

      {/* Role + responsibilities */}
      <div>
        <h3
          style={{
            fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: "var(--ink)",
            marginBottom: "1.5rem",
          }}
        >
          {entry.role}
        </h3>

        <ul
          style={{
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: "0.85rem",
          }}
        >
          {entry.responsibilities.map((r, i) => (
            <li
              key={i}
              style={{
                fontSize: "clamp(0.85rem, 1.2vw, 0.95rem)",
                fontWeight: 400,
                color: "var(--mid)",
                lineHeight: 1.75,
                display: "flex",
                gap: "0.75rem",
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  color: "var(--faint)",
                  marginTop: "2px",
                }}
              >
                —
              </span>
              {r}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <section
      id="experience"
      style={{
        borderBottom: "1px solid var(--border)",
        padding: "var(--pad-y) var(--pad-x)",
        maxWidth: "var(--max)",
        margin: "0 auto",
      }}
    >
      <SectionHeader label="Career" title="Experience" />

      {experiences.map((e, i) => (
        <ExperienceRow
          key={e.company + e.period}
          entry={e}
          isLast={i === experiences.length - 1}
        />
      ))}

      <style>{`
        @media (max-width: 600px) {
          #experience div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
