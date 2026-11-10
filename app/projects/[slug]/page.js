import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxOptions, mdxComponents } from "@/lib/mdx";
import { ProjectArticle } from "@/components/ArticleViews";
import { getAllProjects, getProjectBySlug } from "@/lib/project";
import { getContact } from "@/lib/site";
import Navbar from "@/components/NavBar";
import SiteFooter from "@/components/SiteFooter";
import { orEmpty } from "@/lib/db";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const title = `${project.title}: case study`;
  const description =
    project.tagline && project.tagline.length >= 150
      ? project.tagline
      : `${project.tagline} Case study covering the problem, the decisions and what shipped.`;

  return {
    title,
    description,
    alternates: { canonical: `https://nitishpoonia.in/projects/${slug}` },
    openGraph: { title, description, url: `https://nitishpoonia.in/projects/${slug}`, type: "article", siteName: "Nitish Poonia", images: ["/opengraph-image"] },
    twitter: { card: "summary_large_image", title, description, creator: "@nitishpoonia" },
  };
}

export async function generateStaticParams() {
  const projects = await orEmpty(getAllProjects());
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const [project, contact] = await Promise.all([getProjectBySlug(slug), getContact()]);
  if (!project) notFound();

  return (
    <div className="page-shell">
      <Navbar />
      <main id="main" className="page-main page-narrow">
        <ProjectArticle project={project} contact={contact}
          body={<MDXRemote source={project.content} options={mdxOptions} components={mdxComponents} />} />
      </main>
      <SiteFooter />
    </div>
  );
}
