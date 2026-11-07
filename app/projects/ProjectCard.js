import Link from "next/link";

export default function ProjectCard({ project }) {
  const meta = [project.company, project.timeline].filter(Boolean).join(" · ");
  const building = (project.status || "").toLowerCase() === "currently building";
  return (
    <Link href={`/projects/${project.slug}`} className="glass card">
      <span className="card-top">
        <span className="mono">{meta}</span>
        {building ? <span className="badge">Building now</span> : <span className="card-arrow" aria-hidden="true">→</span>}
      </span>
      <strong>{project.title}</strong>
      <span className="muted card-grow">{project.tagline}</span>
      {project.tags.length > 0 && (
        <span className="chip-row">
          {project.tags.map((t) => <span key={t} className="chip">{t}</span>)}
        </span>
      )}
    </Link>
  );
}
