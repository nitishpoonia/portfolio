import Link from "next/link";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import SplitWords from "@/components/motion/SplitWords";

// Shared by the public pages and the Studio preview, so a preview looks exactly
// like the live page. `body` is the rendered MDX.

export function PostArticle({ post, body }) {
  const date = new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
  return (
    <>
      <header className="page-head">
        <Link href="/blog" className="crumb"><ArrowLeft size={15} strokeWidth={2} aria-hidden="true" />All writing</Link>
        <span className="mono">{date} · {post.readingTime}</span>
        <h1 className="split"><SplitWords text={post.title} /></h1>
        {post.description && <p className="page-lede">{post.description}</p>}
        {post.tags.length > 0 && (
          <div className="chip-row">{post.tags.map((t) => <span key={t} className="chip">{t}</span>)}</div>
        )}
      </header>

      <article className="glass article prose">{body}</article>

      <nav className="article-foot" aria-label="Post">
        <Link href="/blog" className="pill-btn pill-btn-line"><ArrowLeft size={17} strokeWidth={1.9} aria-hidden="true" />All writing</Link>
        <Link href="/projects" className="pill-btn pill-btn-dark">See my work<ArrowRight size={17} strokeWidth={1.9} aria-hidden="true" /></Link>
      </nav>
    </>
  );
}

export function ProjectArticle({ project, contact, body }) {
  const meta = [project.company, project.timeline, project.role].filter(Boolean);
  return (
    <>
      <header className="page-head">
        <Link href="/projects" className="crumb"><ArrowLeft size={15} strokeWidth={2} aria-hidden="true" />All work</Link>
        {meta.length > 0 && <span className="mono">{meta.join(" · ")}</span>}
        <h1 className="split"><SplitWords text={project.title} /></h1>
        {project.tagline && <p className="page-lede">{project.tagline}</p>}
        {project.tags.length > 0 && (
          <div className="chip-row">{project.tags.map((t) => <span key={t} className="chip">{t}</span>)}</div>
        )}
      </header>

      <article className="glass article prose">{body}</article>

      <nav className="article-foot" aria-label="Project">
        <Link href="/projects" className="pill-btn pill-btn-line"><ArrowLeft size={17} strokeWidth={1.9} aria-hidden="true" />All work</Link>
        <a href={`mailto:${contact.email}?subject=${encodeURIComponent(`Re: ${project.title}`)}`} className="pill-btn pill-btn-dark">
          <Mail size={17} strokeWidth={1.9} aria-hidden="true" />Ask me about this project
        </a>
      </nav>
    </>
  );
}
