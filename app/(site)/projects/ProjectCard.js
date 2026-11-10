import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ProjectIcon } from "@/lib/icons";

export default function ProjectCard({ project }) {
  const meta = [project.company, project.timeline].filter(Boolean).join(" · ");
  const building = (project.status || "").toLowerCase() === "currently building";
  return (
    <Link href={`/projects/${project.slug}`} className={`glass card${project.cover ? " card-has-cover" : ""}`}>
      {project.cover && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={project.cover} alt="" loading="lazy" decoding="async" className="card-cover" />
      )}
      <span className="card-top">
        <span className="card-icon" aria-hidden="true"><ProjectIcon tags={project.tags} size={18} strokeWidth={1.8} /></span>
        {building ? <span className="badge">Building now</span> : <ArrowUpRight size={20} strokeWidth={1.8} className="card-arrow" aria-hidden="true" />}
      </span>
      <span className="mono">{meta}</span>
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
