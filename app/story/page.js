import Link from "next/link";
import Image from "next/image";
import { Mail, ArrowRight, ArrowDown } from "lucide-react";
import Navbar from "@/components/NavBar";
import SiteFooter from "@/components/SiteFooter";
import { CHAPTERS } from "@/lib/story";
import { getContact } from "@/lib/site";
import SplitWords from "@/components/motion/SplitWords";

export const metadata = {
  title: "How I got here",
  description: "The path from Jalandhar to building mobile, web and now AI products, one chapter at a time.",
  alternates: { canonical: "https://nitishpoonia.in/story" },
};

const chapterId = (i) => `chapter-${i + 1}`;

export default async function StoryPage() {
  const contact = await getContact();
  return (
    <div className="page-shell">
      <div className="story-progress" aria-hidden="true" />
      <Navbar />
      <main className="page-main story-main">
        <section className="hero" aria-labelledby="story-h">
          <span className="eyebrow">My story</span>
          <h1 id="story-h" className="split"><SplitWords text="How I got here" /></h1>
          <p>{CHAPTERS.length} chapters, in order. Jump to one, or keep scrolling.</p>

          <nav className="story-index" aria-label="Chapters">
            <ol>
              {CHAPTERS.map((c, i) => (
                <li key={c.title}>
                  <a href={`#${chapterId(i)}`} className={`story-index-link${c.current ? " is-current" : ""}`}>
                    <span className="story-index-num">{String(i + 1).padStart(2, "0")}</span>
                    {c.when}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <ArrowDown size={20} strokeWidth={1.8} className="story-cue" aria-hidden="true" />
        </section>

        <ol className="timeline" aria-label="Timeline">
          {CHAPTERS.map((c, i) => (
            <li key={c.title} id={chapterId(i)} className={`tl-row${c.current ? " tl-row-current" : ""}`}>
              <div className="tl-rail">
                <div className="tl-track" aria-hidden="true"><div className="tl-fill" /></div>
                <div className="tl-dot" aria-hidden="true">{i + 1}</div>
              </div>
              <article className="glass tl-card" aria-labelledby={`${chapterId(i)}-h`}>
                <span className="tl-big" aria-hidden="true">{c.big}</span>
                <div className="tl-body">
                  <div className="tl-meta">
                    <span className="mono">{c.when}</span>
                    {c.current && (
                      <span className="tl-now"><span className="live-dot live-dot-dark" aria-hidden="true" />In progress</span>
                    )}
                  </div>
                  <h2 id={`${chapterId(i)}-h`}>{c.title}</h2>
                  <p>{c.text}</p>
                  {c.built.length > 0 && (
                    <ul className="chip-row" aria-label="Tools">
                      {c.built.map((t) => <li key={t} className="chip">{t}</li>)}
                    </ul>
                  )}
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
                  <Image src={c.photo} alt={c.alt || c.title} width={520} height={325}
                    className="tl-photo" style={{ "--tilt": i % 2 ? "2deg" : "-2deg" }} />
                )}
              </article>
            </li>
          ))}
        </ol>

        <section className="hero story-end" aria-labelledby="end-h">
          <h2 id="end-h" className="h2">That’s the story so far.</h2>
          <p>The next chapter is open. If it could be with you, say hello.</p>
          <div className="btn-row">
            <a href={`mailto:${contact.email}`} className="pill-btn pill-btn-dark"><Mail size={17} strokeWidth={1.9} aria-hidden="true" />Email me</a>
            <Link href="/projects" className="pill-btn pill-btn-line">See my work<ArrowRight size={17} strokeWidth={1.9} aria-hidden="true" /></Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
