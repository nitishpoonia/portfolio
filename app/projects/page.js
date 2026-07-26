import { getAllProjects } from "@/lib/project";
import ProjectCard from "./ProjectCard";
import Navbar from "@/components/NavBar";
import BackButton from "@/components/BackButton";

export const metadata = {
  title: "Projects & Case Studies — Nitish Poonia | React Native Developer",
  description:
    "Case studies and projects by Nitish Poonia — NFC attendance tracking, hotel booking with Stripe, a campus social feed, and a study-centre SaaS backend.",
  alternates: { canonical: "https://nitishpoonia.in/projects" },
  openGraph: {
    title: "Projects & Case Studies — Nitish Poonia | React Native Developer",
    description:
      "Case studies and projects by Nitish Poonia — NFC attendance tracking, hotel booking with Stripe, a campus social feed, and a study-centre SaaS backend.",
    url: "https://nitishpoonia.in/projects",
    type: "website",
    siteName: "Nitish Poonia",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects & Case Studies — Nitish Poonia | React Native Developer",
    description:
      "Case studies and projects by Nitish Poonia — NFC attendance tracking, hotel booking with Stripe, a campus social feed, and a study-centre SaaS backend.",
    creator: "@nitishpoonia",
  },
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <>
      <Navbar />
      <main className="band band-0" style={{ minHeight: "100vh" }}>
        <div
          style={{
            maxWidth: "var(--max)",
            margin: "0 auto",
            padding: "calc(var(--pad-y) + 4rem) var(--pad-x) var(--pad-y)",
          }}
        >
          <BackButton />

          <div style={{ marginBottom: "clamp(2.75rem, 6vw, 4.5rem)" }}>
            <p
              style={{
                fontFamily: "var(--mono)",
                fontSize: "0.66rem",
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--sec-mid)",
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
              }}
            >
              <span
                aria-hidden="true"
                style={{ width: "18px", height: "1px", background: "var(--sec-accent)" }}
              />
              Work
            </p>
            <h1
              style={{
                fontFamily: "var(--display)",
                fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                lineHeight: 1,
                color: "var(--sec-ink)",
              }}
            >
              Projects
            </h1>
            <p
              style={{
                marginTop: "1.25rem",
                fontSize: "clamp(0.95rem, 1.4vw, 1.1rem)",
                color: "var(--sec-mid)",
                lineHeight: 1.7,
                maxWidth: "54ch",
              }}
            >
              Internal tools, client apps, and freelance sites. The detailed ones
              open into a full case study — how the problem was framed and what
              actually shipped.
            </p>
          </div>

          <div className="idx-grid">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </main>

      <style>{`
        .idx-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(1rem, 2vw, 1.5rem);
        }
        .idx-card {
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: clamp(1.5rem, 3vw, 2.1rem);
          background: var(--sec-card);
          border: 1px solid var(--sec-line);
          border-radius: var(--r-lg);
          text-decoration: none;
          box-shadow: var(--sec-shadow);
          transition: transform var(--t-med) var(--ease-soft), border-color var(--t-med) var(--ease-soft), background var(--t-med) var(--ease-soft);
        }
        .idx-card:hover {
          transform: translateY(-4px);
          border-color: var(--sec-accent);
          background: var(--sec-card-hover);
        }
        .idx-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0.8rem;
          margin-bottom: 1.4rem;
        }
        .idx-meta {
          font-family: var(--mono);
          font-size: 0.64rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--sec-mid);
        }
        .idx-arrow {
          font-size: 0.95rem;
          color: var(--sec-accent);
          transition: transform var(--t-med) var(--ease-soft);
        }
        .idx-card:hover .idx-arrow { transform: translateX(4px); }
        .idx-title {
          font-family: var(--display);
          font-size: clamp(1.3rem, 2vw, 1.65rem);
          font-weight: 500;
          letter-spacing: -0.01em;
          line-height: 1.1;
          color: var(--sec-ink);
          margin-bottom: 0.6rem;
        }
        .idx-tagline {
          font-size: 0.92rem;
          color: var(--sec-mid);
          line-height: 1.6;
          margin-bottom: 1.6rem;
          flex-grow: 1;
        }
        .idx-tags {
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          padding: 0;
          margin: 0;
        }
        .idx-tags li {
          font-family: var(--mono);
          font-size: 0.63rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          color: var(--sec-mid);
          border: 1px solid var(--sec-line);
          border-radius: var(--r-pill);
          padding: 0.33rem 0.7rem;
        }
        @media (max-width: 640px) {
          .idx-grid { grid-template-columns: 1fr; }
        }
        @media (prefers-reduced-motion: reduce) {
          .idx-card:hover { transform: none; }
        }
      `}</style>
    </>
  );
}
