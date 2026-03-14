"use client";
import Link from "next/link";
import SectionHeader from "./SectionHeader";
import { projects } from "@/content/projectOverview/projectOverview";

function ProjectCard({ project }) {
  console.log("Project", project);

  return (
    <Link
      href={project.link}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--ink)";
        e.currentTarget.querySelectorAll("[data-invert]").forEach((el) => {
          el.style.color = "rgba(247,246,242,0.5)";
        });
        e.currentTarget.querySelectorAll("[data-title]").forEach((el) => {
          el.style.color = "var(--bg)";
        });
        e.currentTarget.querySelectorAll("[data-num]").forEach((el) => {
          el.style.color = "rgba(247,246,242,0.3)";
        });
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.querySelectorAll("[data-invert]").forEach((el) => {
          el.style.color = "var(--mid)";
        });
        e.currentTarget.querySelectorAll("[data-title]").forEach((el) => {
          el.style.color = "var(--ink)";
        });
        e.currentTarget.querySelectorAll("[data-num]").forEach((el) => {
          el.style.color = "var(--faint)";
        });
      }}
      style={{
        padding: "clamp(1.5rem, 3vw, 2.5rem)",
        borderRight: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        transition: "background 0.25s ease",
        cursor: project.link ? "pointer" : "default",
        textDecoration: "none",
      }}
    >
      <div
        style={{
          border: "1px solid var(--border)",
          minHeight: "180px",
          marginBottom: "1.5rem",
          borderRadius: "6px",
        }}
      ></div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1.5rem",
        }}
      >
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
          flexDirection: "column",
          gap: "0.6rem",
        }}
      >
        {project.features.map((f, i) => (
          <li
            key={i}
            data-invert
            style={{
              fontSize: "1rem",
              color: "var(--mid)",
              lineHeight: 1.55,
              display: "flex",
              gap: "0.6rem",
              transition: "color 0.25s",
            }}
          >
            <span style={{ flexShrink: 0, marginTop: "1px" }}>—</span>
            {f}
          </li>
        ))}
      </ul>
    </Link>
  );
}

export default function Projects() {
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
        @media (max-width: 900px) {
          #projects .card-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          #projects div[style*="repeat(3"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
