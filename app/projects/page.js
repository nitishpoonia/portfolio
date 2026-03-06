
import { getAllProjects } from "@/lib/project";
import ProjectCard from "./ProjectCard";
import Link from "next/link";

export const metadata = {
  title: "Projects — Nitish Poonia",
  description:
    "Case studies of production apps built by Nitish Poonia — NFC time tracking, hotel booking, and an independent product build.",
  alternates: { canonical: "https://nitishpoonia.in/projects" },
};

export default function ProjectsPage() {
  const projects = getAllProjects();
  const featured = projects.find((p) => p.type === "product");
  const regular = projects.filter((p) => p.type !== "product");

  return (
    <main
      style={{
        maxWidth: "var(--max)",
        margin: "0 auto",
        padding: "calc(var(--pad-y) + 4rem) var(--pad-x) var(--pad-y)",
      }}
    >
      {/* Page header */}
      <div style={{ marginBottom: "clamp(3rem, 6vw, 5rem)" }}>
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
          Case Studies
        </p>
        <h1
          style={{
            fontSize: "clamp(2.4rem, 5.5vw, 5rem)",
            fontWeight: 900,
            letterSpacing: "-0.03em",
            lineHeight: 0.95,
            color: "var(--ink)",
          }}
        >
          Projects
        </h1>
        <p
          style={{
            marginTop: "1.25rem",
            fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)",
            color: "var(--mid)",
            lineHeight: 1.7,
            maxWidth: "52ch",
          }}
        >
          Full case studies — the real challenges, the decisions made, and what
          shipped.
        </p>
      </div>

      {/* ── Featured product build ── */}
      {featured && (
        <>
          <p
            style={{
              fontSize: "0.62rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--mid)",
              marginBottom: "0.75rem",
            }}
          >
            Currently Building
          </p>

          <FeaturedCard project={featured} />

          <p
            style={{
              fontSize: "0.62rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--mid)",
              margin: "3.5rem 0 0.75rem",
            }}
          >
            Client Work
          </p>
        </>
      )}

      {/* ── Regular list ── */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {regular.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>

      <Link
        href="/"
        style={{
          display: "inline-block",
          marginTop: "3.5rem",
          fontSize: "0.68rem",
          fontWeight: 700,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "var(--mid)",
          textDecoration: "none",
        }}
      >
        ← Back to home
      </Link>
    </main>
  );
}

// ── Featured card — server component safe (no hover handlers)
// uses CSS classes for interaction
function FeaturedCard({ project }) {
  return (
    <>
      <style>{`
        .featured-card {
          display: block;
          text-decoration: none;
          border: 1.5px solid var(--ink);
          background: var(--ink);
          padding: clamp(2rem, 4vw, 3rem);
          transition: background 0.25s ease;
          position: relative;
        }
        .featured-card:hover {
          background: var(--bg);
        }
        .featured-card .fc-label {
          font-size: 0.6rem; font-weight: 700; letter-spacing: 0.2em;
          text-transform: uppercase; color: rgba(247,246,242,0.45);
          transition: color 0.25s;
        }
        .featured-card:hover .fc-label { color: var(--mid); }

        .featured-card .fc-title {
          font-size: clamp(1.8rem, 3.5vw, 3rem);
          font-weight: 900; letter-spacing: -0.03em; line-height: 1;
          color: var(--bg); transition: color 0.25s;
          margin-bottom: 0.75rem;
        }
        .featured-card:hover .fc-title { color: var(--ink); }

        .featured-card .fc-tagline {
          font-size: clamp(0.85rem, 1.2vw, 0.95rem);
          color: rgba(247,246,242,0.45); line-height: 1.7;
          transition: color 0.25s; max-width: 52ch;
        }
        .featured-card:hover .fc-tagline { color: var(--mid); }

        .featured-card .fc-tag {
          font-size: 0.6rem; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          padding: 0.35rem 0.8rem;
          border: 1px solid rgba(247,246,242,0.15);
          color: rgba(247,246,242,0.45);
          transition: border-color 0.25s, color 0.25s;
        }
        .featured-card:hover .fc-tag {
          border-color: var(--border);
          color: var(--mid);
        }
        .featured-card .fc-arrow {
          font-size: 0.7rem; font-weight: 700;
          color: rgba(247,246,242,0.5);
          transition: color 0.25s;
        }
        .featured-card:hover .fc-arrow { color: var(--ink); }

        .fc-inner {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 2rem;
          align-items: end;
          margin-top: 1.75rem;
        }
        @media (max-width: 640px) {
          .fc-inner { grid-template-columns: 1fr; }
          .fc-tags  { justify-content: flex-start !important; }
        }
      `}</style>

      <a href={`/projects/${project.slug}`} className="featured-card">
        {/* Top row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.75rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#4ade80",
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            <span className="fc-label">Independent Build · In Progress</span>
          </div>
          <span className="fc-arrow">View case study →</span>
        </div>

        <div className="fc-inner">
          <div>
            <h2 className="fc-title">{project.title}</h2>
            <p className="fc-tagline">{project.tagline}</p>
          </div>

          <div
            className="fc-tags"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              justifyContent: "flex-end",
            }}
          >
            {project.tags.map((tag) => (
              <span key={tag} className="fc-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </a>
    </>
  );
}
