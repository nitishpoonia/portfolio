import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/NavBar";
import SiteFooter from "@/components/SiteFooter";
import { CHAPTERS } from "@/lib/story";
import { CONTACT } from "@/lib/contact";

export const metadata = {
  title: "How I got here",
  description: "The path from Jalandhar to building mobile and web products, one chapter at a time.",
  alternates: { canonical: "https://nitishpoonia.in/story" },
};

export default function StoryPage() {
  return (
    <div className="page-shell">
      <Navbar />
      <main className="page-main story-main">
        <section className="hero" aria-labelledby="story-h">
          <span className="eyebrow">My story</span>
          <h1 id="story-h">How I got here</h1>
          <p>A few turns, in order. Keep scrolling.</p>
        </section>

        <ol className="timeline">
          {CHAPTERS.map((c, i) => (
            <li key={c.title} className="tl-row">
              <div className="tl-rail">
                <div className="tl-track" aria-hidden="true"><div className="tl-fill" /></div>
                <div className="tl-dot" aria-hidden="true">{i + 1}</div>
              </div>
              <article className="glass tl-card">
                <span className="tl-big" aria-hidden="true">{c.big}</span>
                <div className="tl-body">
                  <span className="mono">{c.when}</span>
                  <h2>{c.title}</h2>
                  <p>{c.text}</p>
                  {c.built.length > 0 && (
                    <div className="chip-row">{c.built.map((t) => <span key={t} className="chip">{t}</span>)}</div>
                  )}
                </div>
                {c.photo && (
                  <Image src={c.photo} alt={c.title} width={520} height={325}
                    className="tl-photo" style={{ "--tilt": i % 2 ? "2deg" : "-2deg" }} />
                )}
              </article>
            </li>
          ))}
        </ol>

        <section className="hero" aria-labelledby="end-h" style={{ paddingTop: "1rem" }}>
          <h2 id="end-h" className="h2">That’s the story so far.</h2>
          <p>The next chapter is open. If it could be with you, say hello.</p>
          <div className="btn-row">
            <a href={`mailto:${CONTACT.email}`} className="pill-btn pill-btn-dark">Email me</a>
            <Link href="/projects" className="pill-btn pill-btn-line">See my work</Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
