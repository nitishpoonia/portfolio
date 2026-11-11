import { notFound, permanentRedirect } from "next/navigation";
import { findRedirect } from "@/lib/redirects";
import { MDXRemote } from "next-mdx-remote/rsc";
import { articleOptions, mdxComponents, tableOfContents, mediaIdsIn } from "@/lib/mdx";
import { getMediaSizes } from "@/lib/media";
import { moreProjects } from "@/lib/related";
import { ProjectArticle } from "@/components/ArticleViews";
import { getAllProjects, getProjectBySlug } from "@/lib/project";
import { getContact } from "@/lib/site";
import { orEmpty } from "@/lib/db";
import { pageMeta } from "@/lib/meta";

// Missing slug: if it was renamed in Studio, send visitors to the new address.
async function missing(slug) {
  const to = await findRedirect("projects", slug);
  if (to) permanentRedirect(`/projects/${to}`);
  notFound();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) await missing(slug);

  const title = `${project.title}: case study`;
  const description =
    project.tagline && project.tagline.length >= 150
      ? project.tagline
      : [project.tagline, "Case study covering the problem, the decisions and what shipped."].filter(Boolean).join(" ");

  return pageMeta({ title, shareTitle: title, description, path: `/projects/${slug}`, type: "article", image: false });
}

export async function generateStaticParams() {
  const projects = await orEmpty(getAllProjects());
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const [project, contact, all] = await Promise.all([getProjectBySlug(slug), getContact(), orEmpty(getAllProjects())]);
  if (!project) await missing(slug);
  const media = await getMediaSizes(mediaIdsIn(project.content));

  return (
    <main id="main" className="page-main">
      <ProjectArticle
        project={project}
        contact={contact}
        toc={tableOfContents(project.content)}
        more={moreProjects(project, all)}
        body={<MDXRemote source={project.content} options={articleOptions({ media })} components={mdxComponents} />}
      />
    </main>
  );
}
