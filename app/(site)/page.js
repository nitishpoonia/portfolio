import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, BookOpen, MessageCircle, Github, FileText, Smartphone, Globe, Sparkles, Mail, Download } from "lucide-react";
import HeroAvatar from "@/components/graphics/HeroAvatar";
import ClaimsFlow from "@/components/graphics/ClaimsFlow";
import { ProjectIcon } from "@/lib/icons";
import StackTabs from "@/components/StackTabs";
import { getHomeProjects } from "@/lib/project";
import { getAllPosts } from "@/lib/posts";
import { CHAPTERS, COLLAGE, NOW_BUILDING } from "@/lib/story";
import { getContact, whatsappHref } from "@/lib/site";
import SplitWords from "@/components/motion/SplitWords";
import CopyEmail from "@/components/CopyEmail";
import { orEmpty } from "@/lib/db";
import { SITE_URL, FEED, PERSON } from "@/lib/meta";
import JsonLd from "@/components/JsonLd";
import { formatDate } from "@/lib/format";


export const metadata = {
  alternates: { canonical: SITE_URL, types: FEED },
};

export default async function HomePage() {
  const [projects, posts, contact] = await Promise.all([
    orEmpty(getHomeProjects()),
    orEmpty(getAllPosts()),
    getContact(),
  ]);

  return (
    <main id="main" className="page-main">
      <JsonLd data={{ "@context": "https://schema.org", ...PERSON }} />
      <section className="hero" aria-labelledby="hero-h">
        <HeroAvatar src="/assets/Untitled-design.png" alt="Nitish Poonia" />
        <Link href="/hire" className="status-pill status-pill-link">
          <span className="live-dot live-dot-dark" aria-hidden="true" />Open to full-time roles
          <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
        </Link>
        <h1 id="hero-h" className="split"><SplitWords text="Hi, I’m Nitish. I build apps from Chandigarh." /></h1>
        <p>
          Software developer shipping mobile and web products with React Native, Next.js,
          Node and PostgreSQL, and now building AI systems in Python.
        </p>
        <ul className="hero-chips" aria-label="What I build">
          <li><Smartphone size={15} strokeWidth={1.9} aria-hidden="true" />Mobile apps</li>
          <li><Globe size={15} strokeWidth={1.9} aria-hidden="true" />Web products</li>
          <li><Sparkles size={15} strokeWidth={1.9} aria-hidden="true" />AI systems</li>
        </ul>
        <div className="btn-row">
          <Link href="/story" className="pill-btn pill-btn-dark"><BookOpen size={17} strokeWidth={1.9} aria-hidden="true" />Read my story</Link>
          <Link href="/projects" className="pill-btn pill-btn-line">See my work<ArrowRight size={17} strokeWidth={1.9} aria-hidden="true" /></Link>
        </div>
      </section>

      {COLLAGE.length > 0 && (
        <section aria-label="Photos" className="collage">
          {COLLAGE.map((p) => (
            <Image key={p.src} src={p.src} alt={p.alt} width={420} height={320}
              style={{ transform: `rotate(${p.tilt || 0}deg)` }} className="collage-photo" />
          ))}
        </section>
      )}

      {NOW_BUILDING && (
        <section id="now" className="section-block" aria-labelledby="now-h">
          <div className="now-card">
            <span className="now-eyebrow"><span className="live-dot" aria-hidden="true" />Now building</span>
            <h2 id="now-h" className="h2">{NOW_BUILDING.title}</h2>
            <p className="now-text">{NOW_BUILDING.text}</p>
            <ClaimsFlow />
            <ul className="now-points">
              {NOW_BUILDING.points.map((pt) => <li key={pt}>{pt}</li>)}
            </ul>
            <div className="chip-row">
              {NOW_BUILDING.tags.map((t) => <span key={t} className="chip chip-dark">{t}</span>)}
            </div>
            {NOW_BUILDING.href && (
              <a href={NOW_BUILDING.href} target="_blank" rel="noopener noreferrer" className="pill-btn pill-btn-light"><Github size={17} strokeWidth={1.9} aria-hidden="true" />View the code</a>
            )}
          </div>
        </section>
      )}



      {projects.length > 0 && (
        <section id="work" className="section-block" aria-labelledby="work-h">
          <div className="section-head">
            <h2 id="work-h" className="h2">Work</h2>
            <Link href="/projects" className="section-link">All work<ArrowRight size={15} strokeWidth={1.9} aria-hidden="true" /></Link>
          </div>
          <ul className="card-grid">
            {projects.map((p) => {
              return (
              <li key={p.link}>
                <Link href={p.link} className={`glass card${p.cover ? " card-has-cover" : ""}`}>
                  {p.cover && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.cover} alt="" loading="lazy" decoding="async" className="card-cover" />
                  )}
                  <span className="card-top">
                    <span className="card-icon" aria-hidden="true"><ProjectIcon tags={p.tags} size={18} strokeWidth={1.8} /></span>
                    <span className="mono card-meta">{p.number} · {p.timeline}</span>
                    {p.isBuilding && <span className="badge">Building now</span>}
                  </span>
                  <strong>{p.title}</strong>
                  <span className="muted card-grow">{p.tagline}</span>
                  <span className="chip-row">
                    {p.tags.map((t) => <span key={t} className="chip">{t}</span>)}
                  </span>
                </Link>
              </li>
              );
            })}
          </ul>
        </section>
      )}

      <section id="story" className="section-block" aria-labelledby="story-teaser-h">
        <div className="section-head">
          <h2 id="story-teaser-h" className="h2">How I got here</h2>
          <Link href="/story" className="section-link">Full story<ArrowRight size={15} strokeWidth={1.9} aria-hidden="true" /></Link>
        </div>
        <ol className="chapter-strip">
          {CHAPTERS.map((c, i) => (
            <li key={c.title}>
              <Link href={`/story#chapter-${i + 1}`} className={`glass chapter-card${c.current ? " is-current" : ""}`}>
                <span className="chapter-top">
                  <span className="mono">{String(i + 1).padStart(2, "0")} · {c.when}</span>
                  {c.current && <span className="live-dot" aria-hidden="true" />}
                </span>
                <strong>{c.title}</strong>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section id="stack" className="section-block" aria-labelledby="stack-h">
        <div className="glass panel">
          <h2 id="stack-h" className="h2">What I build with</h2>
          <p className="lede">Tools I reach for regularly, grouped by where they sit in a product.</p>
          <StackTabs />
          <div className="btn-row" style={{ marginTop: "1.5rem" }}>
            <a href={whatsappHref(contact, "Hi Nitish, I’d like to book a call.")}
              target="_blank" rel="noopener noreferrer" className="pill-btn pill-btn-dark"><MessageCircle size={17} strokeWidth={1.9} aria-hidden="true" />Book a call on WhatsApp</a>
          </div>
        </div>
      </section>

      {posts.length > 0 && (
        <section id="writing" className="section-block" aria-labelledby="writing-h">
          <div className="section-head">
            <h2 id="writing-h" className="h2">Writing</h2>
            <Link href="/blog" className="section-link">All posts<ArrowRight size={15} strokeWidth={1.9} aria-hidden="true" /></Link>
          </div>
          <ul className="glass list-panel">
            {posts.slice(0, 6).map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="list-row">
                  <span className="list-title"><FileText size={16} strokeWidth={1.8} aria-hidden="true" className="list-icon" />{post.title}</span>
                  <span className="list-end">
                    <time className="mono" dateTime={post.date}>{formatDate(post.date)}</time>
                    <ArrowUpRight size={16} strokeWidth={1.8} className="card-arrow" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
      <section id="contact" className="section-block" aria-labelledby="contact-h">
        <div className="now-card contact-card">
          <span className="now-eyebrow"><span className="live-dot" aria-hidden="true" />Let’s talk</span>
          <h2 id="contact-h" className="h2">Have a role or a product in mind?</h2>
          <p className="now-text">
            I’m looking for a team where I can ship the product people touch and the AI underneath it.
            The quickest way to reach me is email or WhatsApp.
          </p>
          <div className="btn-row btn-row-start">
            <a href={`mailto:${contact.email}`} className="pill-btn pill-btn-light"><Mail size={17} strokeWidth={1.9} aria-hidden="true" />Email me</a>
            <CopyEmail email={contact.email} className="pill-btn pill-btn-ghost-light" />
            <a href={whatsappHref(contact)} target="_blank" rel="noopener noreferrer" className="pill-btn pill-btn-ghost-light"><MessageCircle size={17} strokeWidth={1.9} aria-hidden="true" />WhatsApp</a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="pill-btn pill-btn-ghost-light"><Download size={17} strokeWidth={1.9} aria-hidden="true" />Résumé</a>
          </div>
        </div>
      </section>
    </main>
  );
}
