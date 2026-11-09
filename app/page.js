import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, MessageCircle, Github, FileText, Smartphone, Globe, Sparkles } from "lucide-react";
import HeroAvatar from "@/components/graphics/HeroAvatar";
import ClaimsFlow from "@/components/graphics/ClaimsFlow";
import { ProjectIcon } from "@/lib/icons";
import Navbar from "@/components/NavBar";
import SiteFooter from "@/components/SiteFooter";
import StackTabs from "@/components/StackTabs";
import { getHomeProjects } from "@/lib/project";
import { getAllPosts } from "@/lib/posts";
import { COLLAGE, NOW_BUILDING } from "@/lib/story";
import { getContact, whatsappHref } from "@/lib/site";
import SplitWords from "@/components/motion/SplitWords";

export const metadata = {
  alternates: { canonical: "https://nitishpoonia.in" },
};

export default async function HomePage() {
  const [projects, posts, contact] = await Promise.all([
    getHomeProjects().catch(() => []),
    getAllPosts().catch(() => []),
    getContact(),
  ]);

  return (
    <div className="page-shell">
      <Navbar />
      <main className="page-main">
        <section className="hero" aria-labelledby="hero-h">
          <HeroAvatar src="/assets/Untitled-design.png" alt="Nitish Poonia" />
          <h1 id="hero-h" className="split"><SplitWords text="Hi, I’m Nitish. I build apps from Chandigarh." /></h1>
          <p>
            Software developer shipping mobile and web products with React Native, Next.js,
            Node and PostgreSQL, and now building AI systems in Python. Open to full-time roles.
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

        {projects.length > 0 && (
          <section id="work" className="section-block" aria-labelledby="work-h">
            <h2 id="work-h" className="h2">Work</h2>
            <ul className="card-grid">
              {projects.map((p) => {
                return (
                <li key={p.link}>
                  <Link href={p.link} className="glass card">
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

        {posts.length > 0 && (
          <section id="writing" className="section-block" aria-labelledby="writing-h">
            <h2 id="writing-h" className="h2">Writing</h2>
            <ul className="glass list-panel">
              {posts.slice(0, 6).map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="list-row">
                    <span className="list-title"><FileText size={16} strokeWidth={1.8} aria-hidden="true" className="list-icon" />{post.title}</span>
                    <span className="mono">{post.date}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="btn-row btn-row-start"><Link href="/blog" className="pill-btn pill-btn-line">All posts<ArrowRight size={17} strokeWidth={1.9} aria-hidden="true" /></Link></div>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
