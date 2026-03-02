"use client";
import SectionHeader from "./SectionHeader";

// ── Update skill categories here ──────────────────────────────────────────────
const categories = [
  {
    label: "Mobile",
    solid: true,
    skills: [
      "React Native",
      "Async Storage",
      "Firebase Notifications",
      "Redux Saga",
      "React Query",
      "NFC Integration",
      "Stripe Payments",
      "React Navigation",
      "Native Modules", // ← you wrote Android + iOS native bridges
      "Offline Sync", // ← you built the queue system
      "App Store Submission", // ← you shipped to both stores
      "Push Notifications", // ← Firebase Notifications implies this
    ],
  },
  {
    label: "Frontend",
    solid: true,
    skills: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "TypeScript", // ← standard in RN professional projects
      "REST APIs", // ← you consumed APIs across all three apps
      "SEO & Meta Tags", // ← you built this into your portfolio
    ],
  },
  {
    label: "Design",
    solid: true,
    skills: [
      "Figma",
      "UI Design", // ← you went from wireframe to implementation
      "Responsive Design", // ← you built responsive layouts
      "Design to Code", // ← explicitly mentioned in your experience
    ],
  },
  {
    label: "Backend",
    solid: false,
    skills: [
      "Node.js",
      "Express",
      "PostgreSQL",
      "MongoDB",
      "REST API Design", // ← you collaborated on pagination API design
      "Cursor Pagination", // ← you implemented this specifically
    ],
  },
  {
    label: "DevOps & Cloud",
    solid: false,
    skills: [
      "Render",
      "Supabase",
      "Vercel",
      "Git & GitHub", // ← implied by your entire workflow
      "CI/CD via Vercel", // ← you use this for your portfolio
    ],
  },
];

function Pill({ label, solid }) {
  return (
    <span
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--ink)";
        e.currentTarget.style.color = "var(--bg)";
        e.currentTarget.style.borderColor = "var(--ink)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = solid ? "var(--ink)" : "transparent";
        e.currentTarget.style.color = solid ? "var(--bg)" : "var(--mid)";
        e.currentTarget.style.borderColor = solid
          ? "var(--ink)"
          : "var(--border)";
      }}
      style={{
        display: "inline-block",
        padding: "0.5rem 1.1rem",
        border: "1.5px solid",
        borderColor: solid ? "var(--ink)" : "var(--border)",
        background: solid ? "var(--ink)" : "transparent",
        color: solid ? "var(--bg)" : "var(--mid)",
        fontSize: "0.72rem",
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        borderRadius: "2px",
        cursor: "default",
        transition: "all 0.18s ease",
        fontFamily: "var(--font)",
      }}
    >
      {label}
    </span>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      style={{
        borderBottom: "1px solid var(--border)",
        padding: "var(--pad-y) var(--pad-x)",
        maxWidth: "var(--max)",
        margin: "0 auto",
      }}
    >
      <SectionHeader
        label="Tech Stack"
        title="Skills"
        subtitle="Tools I reach for every day, and tools I know well enough to ship with."
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "2.5rem",
        }}
      >
        {categories.map(({ label, solid, skills }) => (
          <div key={label}>
            <p
              style={{
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: solid ? "var(--ink)" : "var(--mid)",
                marginBottom: "1rem",
                paddingBottom: "0.75rem",
                borderBottom: "1px solid var(--border)",
              }}
            >
              {label}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
              {skills.map((s) => (
                <Pill key={s} label={s} solid={solid} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
