import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Mail, ListTree } from "lucide-react";
import SplitWords from "@/components/motion/SplitWords";
import { formatDate } from "@/lib/format";

// Shared by the public pages and the Studio preview, so a preview looks exactly
// like the live page. `body` is the rendered MDX; `toc` comes from tableOfContents().

// Contents list. Desktop: an open list in the left rail that follows the scroll.
// Phones: the same links in a collapsible box above the text. CSS shows one or the other.
function TocLinks({ toc }) {
  return (
    <ol>
      {toc.map((h) => (
        <li key={h.id} className={h.depth === 3 ? "toc-sub" : undefined}>
          <a href={`#${h.id}`}>{h.text}</a>
        </li>
      ))}
    </ol>
  );
}

function RailContents({ toc }) {
  if (!toc || toc.length < 3) return null;
  return (
    <nav className="toc-rail" aria-label="On this page">
      <p className="rail-label">On this page</p>
      {/* A long post lists only its main sections here, so the list fits beside the text. */}
      <TocLinks toc={toc.length > 10 ? toc.filter((h) => h.depth === 2) : toc} />
    </nav>
  );
}

function Contents({ toc }) {
  if (!toc || toc.length < 3) return null;
  return (
    <details className="toc">
      <summary>
        <ListTree size={17} strokeWidth={1.9} aria-hidden="true" />
        On this page <span className="meta">{toc.filter((h) => h.depth === 2).length} sections</span>
      </summary>
      <nav aria-label="On this page"><TocLinks toc={toc} /></nav>
    </details>
  );
}

// Article frame on the site grid: back link and contents in the rail, everything else beside it.
function ArticleGrid({ backHref, backLabel, toc, children }) {
  return (
    <div className="article-grid">
      <aside className="rail article-rail">
        <Link href={backHref} className="crumb"><ArrowLeft size={15} strokeWidth={2} aria-hidden="true" />{backLabel}</Link>
        <RailContents toc={toc} />
      </aside>
      <div className="article-col">{children}</div>
    </div>
  );
}

function MoreList({ title, items }) {
  if (!items?.length) return null;
  return (
    <section className="article-more" aria-labelledby="more-h">
      <h2 id="more-h" className="rail-title">{title}</h2>
      <ul className="rows">
        {items.map((it) => (
          <li key={it.href}>
            <Link href={it.href} className="row">
              <span className="row-main"><span className="row-title row-title-sm">{it.title}</span></span>
              <span className="row-end">
                {it.meta && <span className="meta">{it.meta}</span>}
                <ArrowUpRight size={18} strokeWidth={1.8} className="row-arrow" aria-hidden="true" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

// "At a glance" for a case study: the outcome line and links (live, store, repo).
function CaseSummary({ project }) {
  const links = project.links || [];
  if (!project.outcome && !links.length) return null;
  return (
    <section className="case-summary" aria-label="At a glance">
      {project.outcome && (
        <p className="case-outcome">
          <span className="eyebrow">Outcome</span>
          {project.outcome}
        </p>
      )}
      {links.length > 0 && (
        <div className="btn-row">
          {links.map((l) => {
            const external = /^https?:/.test(l.href);
            return (
              <a key={l.href} href={l.href} className="pill-btn pill-btn-line"
                {...(external && { target: "_blank", rel: "noopener noreferrer" })}>
                {l.label}<ArrowUpRight size={16} strokeWidth={1.9} aria-hidden="true" />
              </a>
            );
          })}
        </div>
      )}
    </section>
  );
}

export function PostArticle({ post, body, toc, related, linkTags = true }) {
  const date = formatDate(post.date, "long");
  return (
    <>
      <div className="story-progress" aria-hidden="true" />
      <ArticleGrid backHref="/blog" backLabel="All writing" toc={toc}>
        <header className="article-head">
          <p className="meta">{date}, {post.readingTime}</p>
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
        <article className="article prose">{body}</article>

        <MoreList
          title="Keep reading"
          items={related?.map((p) => ({ href: `/blog/${p.slug}`, title: p.title, meta: formatDate(p.date) }))}
        />

        <nav className="article-foot" aria-label="Post">
          <Link href="/blog" className="pill-btn pill-btn-line"><ArrowLeft size={17} strokeWidth={1.9} aria-hidden="true" />All writing</Link>
          <Link href="/projects" className="pill-btn pill-btn-dark">See my work<ArrowRight size={17} strokeWidth={1.9} aria-hidden="true" /></Link>
        </nav>
      </ArticleGrid>
    </>
  );
}

export function ProjectArticle({ project, contact, body, toc, more }) {
  const meta = [project.company, project.timeline, project.role].filter(Boolean);
  return (
    <ArticleGrid backHref="/projects" backLabel="All work" toc={toc}>
      <header className="article-head">
        {meta.length > 0 && <p className="meta">{meta.join(", ")}</p>}
        <h1 className="split"><SplitWords text={project.title} /></h1>
        {project.tagline && <p className="page-lede">{project.tagline}</p>}
        {project.tags.length > 0 && <p className="row-stack">{project.tags.join(", ")}</p>}
      </header>

      {project.cover && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={project.cover} alt="" className="case-cover" />
      )}
      <CaseSummary project={project} />
      <Contents toc={toc} />
      <article className="article prose">{body}</article>

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
    </ArticleGrid>
  );
}
