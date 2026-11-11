import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, BookOpen, MessageCircle, Github, Smartphone, Globe, Sparkles, Mail, Download } from "lucide-react";
import ClaimsFlow from "@/components/graphics/ClaimsFlow";
import { SKILL_ICONS } from "@/lib/icons";
import Band from "@/components/Band";
import ProjectRow from "@/components/ProjectRow";
import { getHomeProjects } from "@/lib/project";
import { getAllPosts } from "@/lib/posts";
import { COLLAGE } from "@/lib/story";
import { getSiteContent } from "@/lib/site-content";
import { getContact, whatsappHref } from "@/lib/site";
import SplitWords from "@/components/motion/SplitWords";
import CopyEmail from "@/components/CopyEmail";
import { orEmpty } from "@/lib/db";
import { SITE_URL, FEED, PERSON } from "@/lib/meta";
import JsonLd from "@/components/JsonLd";
import { formatDate } from "@/lib/format";


// What I build, as three facts under the hero (the stack names come from the intro line).
const BUILDS = [
  { icon: Smartphone, label: "Mobile apps", stack: "React Native" },
  { icon: Globe, label: "Web products", stack: "Next.js, Node, PostgreSQL" },
  { icon: Sparkles, label: "AI systems", stack: "Python" },
];

export const metadata = {
  alternates: { canonical: SITE_URL, types: FEED },
};

export default async function HomePage() {
  const [projects, posts, contact, site] = await Promise.all([
    orEmpty(getHomeProjects()),
    orEmpty(getAllPosts()),
    getContact(),
    getSiteContent(),
  ]);
  const { availability, now_building: NOW_BUILDING, chapters: CHAPTERS, skills } = site;

  return (
    <main id="main" className="page-main">
      <JsonLd data={{ "@context": "https://schema.org", ...PERSON }} />

      <section className="home-hero" aria-labelledby="hero-h">
        <div className="home-hero-text">
          {availability.open && (
            <Link href="/hire" className="status-pill status-pill-link">
              <span className="live-dot live-dot-dark" aria-hidden="true" />{availability.label}
              <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
            </Link>
          )}
          <h1 id="hero-h" className="split">
            <span className="hero-line"><SplitWords text="Hi, I’m Nitish." /></span>{" "}
            <span className="hero-line"><SplitWords text="I build apps from Chandigarh." start={3} /></span>
          </h1>
          <p className="home-hero-lede">
            Software developer shipping mobile and web products with React Native, Next.js,
            Node and PostgreSQL, and now building AI systems in Python.
          </p>
          <div className="btn-row">
            <Link href="/story" className="pill-btn pill-btn-dark"><BookOpen size={17} strokeWidth={1.9} aria-hidden="true" />Read my story</Link>
            <Link href="/projects" className="pill-btn pill-btn-line">See my work<ArrowRight size={17} strokeWidth={1.9} aria-hidden="true" /></Link>
          </div>
        </div>
        <Image src="/assets/Untitled-design.png" alt="Nitish Poonia" width={560} height={560} priority
          sizes="(max-width: 760px) 96px, 280px" className="home-hero-photo" />
        <ul className="build-row" aria-label="What I build">
          {BUILDS.map(({ icon: Icon, label, stack }) => (
            <li key={label}>
              <Icon size={18} strokeWidth={1.8} aria-hidden="true" />
              <strong>{label}</strong>
              <span>{stack}</span>
            </li>
          ))}
        </ul>
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
        <Band id="now" title="Now building" live>
          <div className="dark-card">
            <h3 className="dark-card-title">{NOW_BUILDING.title}</h3>
            <p className="dark-card-text">{NOW_BUILDING.text}</p>
            {NOW_BUILDING.diagram && <ClaimsFlow />}
            <ul className="now-points">
              {NOW_BUILDING.points.map((pt) => <li key={pt}>{pt}</li>)}
            </ul>
            <p className="dark-card-stack">{NOW_BUILDING.tags.join(", ")}</p>
            {NOW_BUILDING.href && (
              <a href={NOW_BUILDING.href} target="_blank" rel="noopener noreferrer" className="pill-btn pill-btn-light"><Github size={17} strokeWidth={1.9} aria-hidden="true" />View the code</a>
            )}
          </div>
        </Band>
      )}

      {projects.length > 0 && (
        <Band id="work" title="Work" note={`${projects.length} projects, newest first.`} href="/projects" linkLabel="All work">
          <ul className="rows">
            {projects.map((p) => (
              <li key={p.link}>
                <ProjectRow href={p.link} title={p.title} tagline={p.tagline} tags={p.tags} meta={p.timeline} building={p.isBuilding} cover={p.cover} />
              </li>
            ))}
          </ul>
        </Band>
      )}

      <Band id="story" title="How I got here" titleId="story-teaser-h" href="/story" linkLabel="Full story">
        <ol className="path">
          {CHAPTERS.map((c, i) => (
            <li key={c.title} className={c.current ? "is-current" : undefined}>
              <Link href={`/story#chapter-${i + 1}`} className="path-stop">
                <span className="path-dot" aria-hidden="true" />
                <span className="meta">{c.when}</span>
                <strong>{c.title}</strong>
              </Link>
            </li>
          ))}
        </ol>
      </Band>

      <Band id="stack" title="What I build with" note="Tools I reach for regularly, grouped by where they sit in a product.">
        <dl className="toolkit">
          {skills.map((group) => {
            const Icon = SKILL_ICONS[group.label];
            return (
              <div key={group.label} className="toolkit-row">
                <dt>{Icon && <Icon size={17} strokeWidth={1.8} aria-hidden="true" />}{group.label}</dt>
                <dd>{group.items.join(", ")}</dd>
              </div>
            );
          })}
        </dl>
      </Band>

      {posts.length > 0 && (
        <Band id="writing" title="Writing" href="/blog" linkLabel="All posts">
          <ul className="rows">
            {posts.slice(0, 6).map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="row">
                  <span className="row-main"><span className="row-title row-title-sm">{post.title}</span></span>
                  <span className="row-end">
                    <time className="meta" dateTime={post.date}>{formatDate(post.date)}</time>
                    <ArrowUpRight size={18} strokeWidth={1.8} className="row-arrow" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Band>
      )}

      <Band id="contact" title="Let’s talk">
        <p className="closing">Have a role or a product in mind?</p>
        <p className="closing-text">
          I’m looking for a team where I can ship the product people touch and the AI underneath it.
          The quickest way to reach me is email or WhatsApp.
        </p>
        <div className="btn-row">
          <a href={`mailto:${contact.email}`} className="pill-btn pill-btn-dark"><Mail size={17} strokeWidth={1.9} aria-hidden="true" />Email me</a>
          <CopyEmail email={contact.email} />
          <a href={whatsappHref(contact)} target="_blank" rel="noopener noreferrer" className="pill-btn pill-btn-line"><MessageCircle size={17} strokeWidth={1.9} aria-hidden="true" />WhatsApp</a>
          <a href={whatsappHref(contact, "Hi Nitish, I’d like to book a call.")} target="_blank" rel="noopener noreferrer" className="pill-btn pill-btn-line">Book a call</a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="pill-btn pill-btn-line"><Download size={17} strokeWidth={1.9} aria-hidden="true" />Résumé</a>
        </div>
      </Band>
    </main>
  );
}
