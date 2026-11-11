import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Mail } from "lucide-react";
import { getSiteContent } from "@/lib/site-content";
import { getContact } from "@/lib/site";
import PageHeader from "@/components/PageHeader";
import Band from "@/components/Band";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "How I got here",
  description: "The path from Jalandhar to building mobile, web and now AI products, one chapter at a time.",
  path: "/story",
});

const chapterId = (i) => `chapter-${i + 1}`;

export default async function StoryPage() {
  const [contact, { chapters: CHAPTERS }] = await Promise.all([getContact(), getSiteContent()]);
  return (
    <>
      <div className="story-progress" aria-hidden="true" />
      <main id="main" className="page-main">
        <PageHeader eyebrow="My story" title="How I got here"
          lede={`${CHAPTERS.length} chapters, in order. Jump to one, or keep scrolling.`}>
          <nav className="story-index" aria-label="Chapters">
            <ol>
              {CHAPTERS.map((c, i) => (
                <li key={c.title}>
                  <a href={`#${chapterId(i)}`} className={`story-index-link${c.current ? " is-current" : ""}`}>{c.when}</a>
                </li>
              ))}
            </ol>
          </nav>
        </PageHeader>

        <ol className="timeline" aria-label="Timeline">
          {CHAPTERS.map((c, i) => (
            <li key={c.title} id={chapterId(i)} className={`tl-row${c.current ? " tl-row-current" : ""}`}>
              <div className="tl-when" aria-hidden="true">
                <span className="tl-big">{c.big}</span>
                {c.when !== c.big && <span className="meta">{c.when}</span>}
              </div>
              <div className="tl-rail" aria-hidden="true">
                <div className="tl-track"><div className="tl-fill" /></div>
                <div className="tl-dot" />
              </div>
              <article className="tl-card" aria-labelledby={`${chapterId(i)}-h`}>
                <div className="tl-body">
                  <p className="tl-meta">
                    <span className="sr-only">{c.when}. </span>
                    <span>Chapter {i + 1}</span>
                    {c.current && (
                      <span className="tl-now"><span className="live-dot live-dot-dark" aria-hidden="true" />In progress</span>
                    )}
                  </p>
                  <h2 id={`${chapterId(i)}-h`}>{c.title}</h2>
                  <p>{c.text}</p>
                  {c.built.length > 0 && <p className="row-stack" aria-label="Tools">{c.built.join(", ")}</p>}
                  {c.links?.length > 0 && (
                    <div className="tl-links">
                      {c.links.map((l) => (
                        <Link key={l.href} href={l.href} className="tl-link">
                          {l.label}<ArrowRight size={15} strokeWidth={1.9} aria-hidden="true" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                {c.photo && (
                  <Image src={c.photo} alt={c.alt || c.title} width={520} height={325} className="tl-photo" />
                )}
              </article>
            </li>
          ))}
        </ol>

        <Band title="What’s next" titleId="end-h">
          <p className="closing">That’s the story so far.</p>
          <p className="closing-text">The next chapter is open. If it could be with you, say hello.</p>
          <div className="btn-row">
            <a href={`mailto:${contact.email}`} className="pill-btn pill-btn-dark"><Mail size={17} strokeWidth={1.9} aria-hidden="true" />Email me</a>
            <Link href="/projects" className="pill-btn pill-btn-line">See my work<ArrowRight size={17} strokeWidth={1.9} aria-hidden="true" /></Link>
          </div>
        </Band>
      </main>
    </>
  );
}
