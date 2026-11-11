import { getAllProjects } from "@/lib/project";
import Band from "@/components/Band";
import ProjectRow from "@/components/ProjectRow";
import PageHeader from "@/components/PageHeader";
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
        eyebrow="Work"
        title="Things I’ve built"
        lede="Internal tools, client apps and freelance sites. Each one opens into a case study: how the problem was framed and what actually shipped."
      />
      <Band title="Projects" titleId="projects-h" note={projects.length ? `${projects.length} case studies.` : undefined}>
        {projects.length > 0 ? (
          <ul className="rows">
            {projects.map((p) => (
              <li key={p.slug}>
                <ProjectRow href={`/projects/${p.slug}`} title={p.title} tagline={p.tagline} tags={p.tags} cover={p.cover}
                  meta={[p.company, p.timeline].filter(Boolean).join(", ")}
                  building={(p.status || "").toLowerCase() === "currently building"} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty">Case studies are on their way.</p>
        )}
      </Band>
    </main>
  );
}
