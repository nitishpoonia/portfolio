import { getAllProjects } from "@/lib/project";
import ProjectCard from "./ProjectCard";
import Navbar from "@/components/NavBar";
import SiteFooter from "@/components/SiteFooter";
import PageHeader from "@/components/PageHeader";

const DESCRIPTION =
  "Case studies and projects by Nitish Poonia: NFC attendance tracking, hotel booking with Stripe, a campus social feed, a study-centre SaaS backend, and client websites.";

export const metadata = {
  title: "Work",
  description: DESCRIPTION,
  alternates: { canonical: "https://nitishpoonia.in/projects" },
  openGraph: {
    title: "Work | Nitish Poonia",
    description: DESCRIPTION,
    url: "https://nitishpoonia.in/projects",
    type: "website",
    siteName: "Nitish Poonia",
  },
};

export default async function ProjectsPage() {
  const projects = await getAllProjects().catch(() => []);

  return (
    <div className="page-shell">
      <Navbar />
      <main className="page-main">
        <PageHeader
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
      <SiteFooter />
    </div>
  );
}
