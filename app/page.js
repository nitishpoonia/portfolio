import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/NavBar";
import SiteFooter from "@/components/SiteFooter";
import StackTabs from "@/components/StackTabs";
import { getHomeProjects } from "@/lib/project";
import { getAllPosts } from "@/lib/posts";
import { COLLAGE } from "@/lib/story";
import { CONTACT } from "@/lib/contact";

export const metadata = {
  title: "Nitish Poonia — Software Developer",
  description:
    "Software developer building mobile and web products end to end — React Native and Next.js on the front, Node and PostgreSQL behind. Open to full-time roles.",
  alternates: { canonical: "https://nitishpoonia.in" },
};

export default async function HomePage() {
  const [projects, posts] = await Promise.all([
    getHomeProjects().catch(() => []),
    getAllPosts().catch(() => []),
  ]);

  return (
    <div className="page-shell">
      <Navbar />
      <main className="page-main">
        <section className="hero" aria-labelledby="hero-h">
          <Image src="/assets/Untitled-design.png" alt="Nitish Poonia" width={120} height={120} priority className="hero-avatar" />
          <h1 id="hero-h">Hi, I’m Nitish. I build apps from Chandigarh.</h1>
          <p>
            Software developer working across React Native, Next.js, Node and PostgreSQL.
            Open to full-time roles.
          </p>
          <div className="btn-row">
            <Link href="/story" className="pill-btn pill-btn-dark">Read my story</Link>
            <Link href="/projects" className="pill-btn pill-btn-line">See my work</Link>
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

        <section id="stack" className="block" aria-labelledby="stack-h">
          <div className="glass panel">
            <h2 id="stack-h" className="h2">What I build with</h2>
            <p className="lede">Tools I reach for regularly, grouped by where they sit in a product.</p>
            <StackTabs />
            <div className="btn-row" style={{ marginTop: "1.5rem" }}>
              <a href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent("Hi Nitish, I’d like to book a call.")}`}
                target="_blank" rel="noopener noreferrer" className="pill-btn pill-btn-dark">Book a call on WhatsApp</a>
            </div>
          </div>
        </section>

        {projects.length > 0 && (
          <section id="work" className="block" aria-labelledby="work-h">
            <h2 id="work-h" className="h2">Work</h2>
            <ul className="card-grid">
              {projects.map((p) => (
                <li key={p.link}>
                  <Link href={p.link} className="glass card">
                    <span className="mono">{p.number} · {p.timeline}</span>
                    <strong>{p.title}</strong>
                    <span className="muted">{p.tagline}</span>
                    <span className="chip-row">
                      {p.tags.map((t) => <span key={t} className="chip">{t}</span>)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {posts.length > 0 && (
          <section id="writing" className="block" aria-labelledby="writing-h">
            <h2 id="writing-h" className="h2">Writing</h2>
            <ul className="glass list-panel">
              {posts.slice(0, 6).map((post) => (
                <li key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="list-row">
                    <span>{post.title}</span>
                    <span className="mono">{post.date}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/blog" className="pill-btn pill-btn-line" style={{ marginTop: "1rem" }}>All posts</Link>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
