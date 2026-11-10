import { getAllProjects } from "@/lib/project";
import ProjectCard from "./ProjectCard";
import PageHeader from "@/components/PageHeader";
import { Layers } from "lucide-react";
import { orEmpty } from "@/lib/db";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "Work",
  description:
    "Case studies and projects by Nitish Poonia: NFC attendance tracking, hotel booking with Stripe, a campus social feed, a study-centre SaaS backend, and client websites.",
  path: "/projects",
});

export default async function ProjectsPage() {
  const projects = await orEmpty(getAllProjects());

  return (
    <main id="main" className="page-main">
      <PageHeader
        icon={Layers}
        eyebrow="Work"
        title="Things I’ve built"
        lede="Internal tools, client apps and freelance sites. Each one opens into a case study: how the problem was framed and what actually shipped."
      />
      {projects.length > 0 ? (
        <ul className="card-grid card-grid-2">
          {projects.map((project) => (
            <li key={project.slug}><ProjectCard project={project} /></li>
          ))}
        </ul>
      ) : (
        <p className="empty">Case studies are on their way.</p>
      )}
    </main>
  );
}
