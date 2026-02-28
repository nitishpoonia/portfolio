

import Link from "next/link";

import { getAllProjects } from "@/lib/project";
import ProjectCard from "./ProjectCard";

export const metadata = {
  title: "Projects — Nitish Poonia",
  description:
    "Case studies of production apps built by Nitish Poonia — NFC time tracking, social platforms, and hotel booking systems.",
  alternates: {
    canonical: "https://nitishpoonia.in/projects",
  },
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <main
      style={{
        maxWidth: "var(--max)",
        margin: "0 auto",
        padding: "calc(var(--pad-y) + 4rem) var(--pad-x) var(--pad-y)",
      }}
    >
      {/* Header */}
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
          Every project below is a full case study — the real challenges, the
          decisions made, and what shipped.
        </p>
      </div>

      {/* Project list */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>

      {/* Back link */}
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
