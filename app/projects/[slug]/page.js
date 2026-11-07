import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { getAllProjects, getProjectBySlug } from "@/lib/project";
import { getContact } from "@/lib/site";
import Navbar from "@/components/NavBar";
import SiteFooter from "@/components/SiteFooter";
import NfcTimerDemo from "@/components/NfcTimerDemo";

const mdxOptions = {
  mdxOptions: {
    rehypePlugins: [[rehypePrettyCode, { theme: "github-light", keepBackground: true }]],
  },
};

// Custom components available inside any case-study body.
const mdxComponents = { NfcTimerDemo };

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
  const projects = await getAllProjects().catch(() => []);
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const [project, contact] = await Promise.all([getProjectBySlug(slug), getContact()]);
  if (!project) notFound();

  const meta = [project.company, project.timeline, project.role].filter(Boolean);

  return (
    <div className="page-shell">
      <Navbar />
      <main className="page-main page-narrow">
        <header className="page-head">
          <Link href="/projects" className="crumb">← All work</Link>
          {meta.length > 0 && <span className="mono">{meta.join(" · ")}</span>}
          <h1>{project.title}</h1>
          {project.tagline && <p className="page-lede">{project.tagline}</p>}
          {project.tags.length > 0 && (
            <div className="chip-row">{project.tags.map((t) => <span key={t} className="chip">{t}</span>)}</div>
          )}
        </header>

        <article className="glass article prose">
          <MDXRemote source={project.content} options={mdxOptions} components={mdxComponents} />
        </article>

        <nav className="article-foot" aria-label="Project">
          <Link href="/projects" className="pill-btn pill-btn-line">← All work</Link>
          <a href={`mailto:${contact.email}?subject=${encodeURIComponent(`Re: ${project.title}`)}`} className="pill-btn pill-btn-dark">
            Ask me about this project
          </a>
        </nav>
      </main>
      <SiteFooter />
    </div>
  );
}
