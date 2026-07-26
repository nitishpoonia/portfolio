import Link from "next/link";

/** Soft Strata project card used on the projects index grid. */
export default function ProjectCard({ project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="idx-card">
      <div className="idx-card-top">
        <span className="idx-meta">
          {project.company ? `${project.company} · ` : ""}
          {project.timeline}
        </span>
        <span className="idx-arrow" aria-hidden="true">→</span>
      </div>

      <h2 className="idx-title">{project.title}</h2>
      <p className="idx-tagline">{project.tagline}</p>

      <ul className="idx-tags">
        {project.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </Link>
  );
}
