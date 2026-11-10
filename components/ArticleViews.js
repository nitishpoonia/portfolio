import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Mail, ListTree } from "lucide-react";
import SplitWords from "@/components/motion/SplitWords";
import { formatDate } from "@/lib/format";

// Shared by the public pages and the Studio preview, so a preview looks exactly
// like the live page. `body` is the rendered MDX; `toc` comes from tableOfContents().

function Contents({ toc }) {
  if (!toc || toc.length < 3) return null;
  return (
    <details className="glass toc">
      <summary>
        <ListTree size={17} strokeWidth={1.9} aria-hidden="true" />
        On this page <span className="mono">{toc.filter((h) => h.depth === 2).length} sections</span>
      </summary>
      <nav aria-label="On this page">
        <ol>
          {toc.map((h) => (
            <li key={h.id} className={h.depth === 3 ? "toc-sub" : undefined}>
              <a href={`#${h.id}`}>{h.text}</a>
            </li>
          ))}
        </ol>
      </nav>
    </details>
  );
}

function MoreList({ title, items }) {
  if (!items?.length) return null;
  return (
    <section className="section-block" aria-labelledby="more-h">
      <h2 id="more-h" className="h3">{title}</h2>
      <ul className="glass list-panel">
        {items.map((it) => (
          <li key={it.href}>
            <Link href={it.href} className="list-row">
              <span className="list-title">{it.title}</span>
              <span className="list-end">
                {it.meta && <span className="mono">{it.meta}</span>}
                <ArrowUpRight size={16} strokeWidth={1.8} className="card-arrow" aria-hidden="true" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function PostArticle({ post, body, toc, related, linkTags = true }) {
  const date = formatDate(post.date, "long");
  return (
    <>
      <div className="story-progress" aria-hidden="true" />
      <header className="page-head">
        <Link href="/blog" className="crumb"><ArrowLeft size={15} strokeWidth={2} aria-hidden="true" />All writing</Link>
        <span className="mono">{date} · {post.readingTime}</span>
        <h1 className="split"><SplitWords text={post.title} /></h1>
        {post.description && <p className="page-lede">{post.description}</p>}
        {post.tags.length > 0 && (
          <div className="chip-row">
            {post.tags.map((t) =>
              linkTags ? (
                <Link key={t} href={`/blog?tag=${encodeURIComponent(t)}`} className="chip chip-link">{t}</Link>
              ) : (
                <span key={t} className="chip">{t}</span>
              )
            )}
          </div>
        )}
      </header>

      <Contents toc={toc} />
      <article className="glass article prose">{body}</article>

      <MoreList
        title="Keep reading"
        items={related?.map((p) => ({ href: `/blog/${p.slug}`, title: p.title, meta: formatDate(p.date) }))}
      />

      <nav className="article-foot" aria-label="Post">
        <Link href="/blog" className="pill-btn pill-btn-line"><ArrowLeft size={17} strokeWidth={1.9} aria-hidden="true" />All writing</Link>
        <Link href="/projects" className="pill-btn pill-btn-dark">See my work<ArrowRight size={17} strokeWidth={1.9} aria-hidden="true" /></Link>
      </nav>
    </>
  );
}

export function ProjectArticle({ project, contact, body, toc, more }) {
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

      <Contents toc={toc} />
      <article className="glass article prose">{body}</article>

      <MoreList
        title="More work"
        items={more?.map((p) => ({ href: `/projects/${p.slug}`, title: p.title, meta: p.timeline }))}
      />

      <nav className="article-foot" aria-label="Project">
        <Link href="/projects" className="pill-btn pill-btn-line"><ArrowLeft size={17} strokeWidth={1.9} aria-hidden="true" />All work</Link>
        <a href={`mailto:${contact.email}?subject=${encodeURIComponent(`Re: ${project.title}`)}`} className="pill-btn pill-btn-dark">
          <Mail size={17} strokeWidth={1.9} aria-hidden="true" />Ask me about this project
        </a>
      </nav>
    </>
  );
}
