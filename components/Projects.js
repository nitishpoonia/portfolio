import Link from "next/link";
import SectionHeader from "./SectionHeader";
import { getHomeProjects } from "@/lib/project";

function ProjectCard({ project }) {
  return (
    <Link
      href={project.link}
      className={`home-project-card ${project.isBuilding ? "is-building" : ""}`}
      style={{
        padding: "clamp(1.5rem, 3vw, 2.5rem)",
        borderRight: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        transition: "background 0.25s ease, border-color 0.25s ease",
        cursor: project.link ? "pointer" : "default",
        textDecoration: "none",
      }}
    >
      <div
        style={{
          border: project.isBuilding
            ? "1.5px solid var(--ink)"
            : "1px solid var(--border)",
          minHeight: "180px",
          marginBottom: "1.5rem",
          borderRadius: "6px",
          transition: "border-color 0.25s ease",
        }}
      ></div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "0.8rem",
          marginBottom: "1.5rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.55rem" }}>
          <span
            data-num
            style={{
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: "var(--faint)",
              transition: "color 0.25s",
            }}
          >
            {project.number}
          </span>
          <span
            data-invert
            style={{
              fontSize: "0.62rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--mid)",
              transition: "color 0.25s",
            }}
          >
            {project.timeline}
          </span>
          {project.isBuilding && (
            <span className="build-badge">Currently Building</span>
          )}
        </div>
        {project.link && (
          <span
            data-invert
            style={{ fontSize: "0.7rem", transition: "color 0.25s" }}
          >
            →
          </span>
        )}
      </div>

      <h3
        data-title
        style={{
          fontSize: "clamp(1.1rem, 1.8vw, 1.45rem)",
          fontWeight: 800,
          letterSpacing: "-0.02em",
          color: "var(--ink)",
          marginBottom: "0.5rem",
          transition: "color 0.25s",
        }}
      >
        {project.title}
      </h3>

      <p
        data-invert
        style={{
          fontSize: "0.85rem",
          color: "var(--mid)",
          marginBottom: "1.75rem",
          lineHeight: 1.6,
          transition: "color 0.25s",
        }}
      >
        {project.tagline}
      </p>

      <ul
        style={{
          listStyle: "none",
          display: "flex",
          flexWrap: "wrap",
          gap: "0.6rem",
        }}
      >
        {project.tags.map((tag) => (
          <li
            key={tag}
            data-invert
            style={{
              fontSize: "0.66rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--mid)",
              lineHeight: 1.2,
              border: "1px solid var(--border)",
              padding: "0.35rem 0.65rem",
              transition: "color 0.25s",
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
    <section
      id="projects"
      style={{
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div
        style={{
          padding: "var(--pad-y) var(--pad-x) 0",
          maxWidth: "var(--max)",
          margin: "0 auto",
        }}
      >
        <SectionHeader
          label="Work"
          title="Projects"
          subtitle="Built at Vision Vivante (Dec 2024 – Jan 2025) — from first wireframe to shipped product."
        />
      </div>

      {/* Card grid — full bleed border effect */}
      <div
        className="card-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          borderTop: "1px solid var(--border)",
          borderLeft: "1px solid var(--border)",
          marginTop: 0,
        }}
      >
        {projects.map((p) => (
          <ProjectCard key={p.number} project={p} />
        ))}
      </div>
      <div style={{ padding: "2rem var(--pad-x)", textAlign: "right" }}>
        <Link
          href="/projects"
          style={{
            fontSize: "0.68rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--mid)",
            textDecoration: "none",
            border: "1px solid var(--border)",
            padding: "0.5rem 0.75rem",
          }}
        >
          View all projects →
        </Link>
      </div>
      <style>{`
        .home-project-card:hover {
          background: var(--ink);
          border-color: var(--ink);
        }
        .home-project-card:hover [data-invert] {
          color: rgba(247, 246, 242, 0.55) !important;
        }
        .home-project-card:hover [data-title] {
          color: var(--bg) !important;
        }
        .home-project-card:hover [data-num] {
          color: rgba(247, 246, 242, 0.34) !important;
        }
        .home-project-card.is-building {
          border-right: 1.5px solid var(--ink) !important;
          border-bottom: 1.5px solid var(--ink) !important;
        }
        .home-project-card.is-building .build-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          font-size: 0.56rem;
          font-weight: 700;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          border: 1.5px solid var(--ink);
          color: var(--ink);
          padding: 0.22rem 0.45rem;
        }
        .home-project-card.is-building .build-badge::before {
          content: "";
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: #4ade80;
          flex-shrink: 0;
        }
        .home-project-card.is-building:hover .build-badge {
          border-color: rgba(247, 246, 242, 0.45);
          color: rgba(247, 246, 242, 0.75);
        }
        @media (max-width: 900px) {
          #projects .card-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 600px) {
          #projects .card-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
