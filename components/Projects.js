import Link from "next/link";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import { getHomeProjects } from "@/lib/project";

function ProjectCard({ project }) {
  return (
    <Link
      href={project.link}
      className="home-project-card"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: "clamp(1.5rem, 3vw, 2.1rem)",
        background: "var(--sec-card)",
        border: "1px solid var(--sec-line)",
        borderRadius: "var(--r-lg)",
        textDecoration: "none",
        transition:
          "transform var(--t-med) var(--ease-soft), background var(--t-med) var(--ease-soft), border-color var(--t-med) var(--ease-soft)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "0.8rem",
          marginBottom: "1.5rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--mono)",
            fontSize: "0.64rem",
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--sec-mid)",
          }}
        >
          {project.timeline}
        </span>
        <span
          className="card-arrow"
          aria-hidden="true"
          style={{
            fontSize: "0.95rem",
            color: "var(--sec-accent)",
            transition: "transform var(--t-med) var(--ease-soft)",
          }}
        >
          →
        </span>
      </div>

      <h3
        style={{
          fontFamily: "var(--display)",
          fontSize: "clamp(1.25rem, 2vw, 1.6rem)",
          fontWeight: 500,
          letterSpacing: "-0.01em",
          color: "var(--sec-ink)",
          marginBottom: "0.6rem",
          lineHeight: 1.1,
        }}
      >
        {project.title}
      </h3>

      <p
        style={{
          fontSize: "0.9rem",
          color: "var(--sec-mid)",
          marginBottom: "1.6rem",
          lineHeight: 1.6,
          flexGrow: 1,
        }}
      >
        {project.tagline}
      </p>

      <ul
        style={{
          listStyle: "none",
          display: "flex",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        {project.tags.map((tag) => (
          <li
            key={tag}
            style={{
              fontFamily: "var(--mono)",
              fontSize: "0.64rem",
              fontWeight: 500,
              letterSpacing: "0.04em",
              color: "var(--sec-mid)",
              lineHeight: 1.2,
              border: "1px solid var(--sec-line)",
              borderRadius: "var(--r-pill)",
              padding: "0.35rem 0.7rem",
            }}
          >
            {tag}
          </li>
        ))}
      </ul>
    </Link>
  );
}

export default function Projects() {
  const projects = getHomeProjects();

  return (
    <>
      <SectionHeader
        label="Work"
        title="Selected projects"
        subtitle="Internal tools, client apps, and freelance sites. The detailed ones open into a full case study — how the problem was framed and what actually shipped."
      />

      <div
        className="card-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "clamp(1rem, 2vw, 1.5rem)",
        }}
      >
        {projects.map((p, i) => (
          <Reveal key={p.number} delay={(i % 2) * 0.06} style={{ height: "100%" }}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>

      <div style={{ marginTop: "2.5rem" }}>
        <Reveal>
          <Link href="/projects" className="view-all">
            View all projects
            <span className="view-all-arrow" aria-hidden="true">→</span>
          </Link>
        </Reveal>
      </div>

      <style>{`
        .home-project-card:hover {
          transform: translateY(-4px);
          background: var(--sec-card-hover);
          border-color: var(--sec-accent);
        }
        .home-project-card:hover .card-arrow { transform: translateX(4px); }
        .home-project-card > * { flex-shrink: 0; }
        .view-all {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--mono);
          font-size: 0.74rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--sec-ink);
          text-decoration: none;
          border: 1px solid var(--sec-line);
          border-radius: var(--r-pill);
          padding: 0.7rem 1.3rem;
          transition: background var(--t-fast) var(--ease-soft), border-color var(--t-fast) var(--ease-soft);
        }
        .view-all:hover { background: var(--sec-card-hover); border-color: var(--sec-accent); }
        .view-all-arrow { transition: transform var(--t-fast) var(--ease-soft); }
        .view-all:hover .view-all-arrow { transform: translateX(4px); }
        @media (max-width: 640px) {
          .card-grid { grid-template-columns: 1fr !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .home-project-card:hover { transform: none; }
        }
      `}</style>
    </>
  );
}
