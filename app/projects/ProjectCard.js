"use client";
import Link from "next/link";

export default function ProjectCard({ project, index }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
      onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto",
        gap: "2rem",
        alignItems: "start",
        padding: "clamp(2rem, 4vw, 3rem) 0",
        borderBottom: "1px solid var(--border)",
        textDecoration: "none",
        transition: "opacity 0.2s",
      }}
    >
      {/* Left */}
      <div>
        <p
          style={{
            fontSize: "0.62rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--mid)",
            marginBottom: "0.6rem",
          }}
        >
          {String(index + 1).padStart(2, "0")} · {project.timeline}
        </p>

        <h2
          style={{
            fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            color: "var(--ink)",
            marginBottom: "0.5rem",
          }}
        >
          {project.title}
        </h2>

        <p
          style={{
            fontSize: "0.88rem",
            color: "var(--mid)",
            lineHeight: 1.6,
            marginBottom: "1rem",
            maxWidth: "55ch",
          }}
        >
          {project.tagline}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: "0.62rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "0.3rem 0.7rem",
                border: "1px solid var(--border)",
                color: "var(--mid)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Right */}
      <div
        style={{
          fontSize: "0.75rem",
          fontWeight: 700,
          color: "var(--mid)",
          whiteSpace: "nowrap",
          paddingTop: "0.25rem",
        }}
      >
        Read case study →
      </div>
    </Link>
  );
}
