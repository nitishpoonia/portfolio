import { getAllProjects, getProjectBySlug } from "@/lib/project";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import rehypePrettyCode from "rehype-pretty-code";
import BackButton from "@/components/BackButton";
import NfcTimerDemo from "@/components/NfcTimerDemo";
import { CONTACT } from "@/lib/contact";

const mdxOptions = {
  mdxOptions: {
    rehypePlugins: [
      [rehypePrettyCode, { theme: "github-light", keepBackground: true }],
    ],
  },
};

// Custom components available inside any case-study MDX file.
const mdxComponents = { NfcTimerDemo };

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  const fullTitle = `${project.title} — Case Study | Nitish Poonia`;
  const description =
    project.tagline && project.tagline.length >= 150
      ? project.tagline
      : `${project.tagline} Full case study covering challenges, solutions, and technical decisions made during development.`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: `https://nitishpoonia.in/projects/${slug}` },
    openGraph: {
      title: fullTitle,
      description,
      url: `https://nitishpoonia.in/projects/${slug}`,
      type: "article",
      siteName: "Nitish Poonia",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      creator: "@nitishpoonia",
    },
  };
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

const metaLabel = {
  fontFamily: "var(--mono)",
  fontSize: "0.66rem",
  fontWeight: 500,
  letterSpacing: "0.08em",
  color: "var(--sec-mid)",
};

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  return (
    <main
      className="band band-0"
      style={{ minHeight: "100vh" }}
    >
      <div
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          padding: "calc(var(--pad-y) + 4rem) var(--pad-x) var(--pad-y)",
        }}
      >
        <BackButton />

        {/* Header */}
        <div
          style={{
            paddingBottom: "2.5rem",
            borderBottom: "1px solid var(--sec-line)",
            marginBottom: "3rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.55rem",
              marginBottom: "1.5rem",
              alignItems: "center",
            }}
          >
            <span style={metaLabel}>{project.company}</span>
            <span style={{ color: "var(--sec-line)" }}>·</span>
            <span style={metaLabel}>{project.timeline}</span>
            <span style={{ color: "var(--sec-line)" }}>·</span>
            <span style={metaLabel}>{project.role}</span>
          </div>

          <h1
            style={{
              fontFamily: "var(--display)",
              fontSize: "clamp(2rem, 5vw, 3.4rem)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              lineHeight: 1.02,
              color: "var(--sec-ink)",
              marginBottom: "1.1rem",
              textWrap: "balance",
            }}
          >
            {project.title}
          </h1>

          <p
            style={{
              fontSize: "clamp(1.05rem, 1.7vw, 1.25rem)",
              fontWeight: 400,
              color: "var(--sec-mid)",
              lineHeight: 1.6,
              maxWidth: "52ch",
            }}
          >
            {project.tagline}
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
              marginTop: "1.75rem",
            }}
          >
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: "0.64rem",
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                  padding: "0.4rem 0.85rem",
                  borderRadius: "var(--r-pill)",
                  border: "1px solid var(--sec-line)",
                  color: "var(--sec-mid)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* MDX case study body */}
        <div className="prose">
          <MDXRemote
            source={project.content}
            options={mdxOptions}
            components={mdxComponents}
          />
        </div>

        {/* Bottom nav */}
        <div
          style={{
            marginTop: "5rem",
            paddingTop: "2rem",
            borderTop: "1px solid var(--sec-line)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <Link
            href="/projects"
            style={{
              fontFamily: "var(--mono)",
              fontSize: "0.7rem",
              fontWeight: 500,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--sec-mid)",
              textDecoration: "none",
            }}
          >
            ← All projects
          </Link>

          <a
            href={`mailto:${CONTACT.email}?subject=Re: ${project.title}`}
            style={{
              fontFamily: "var(--mono)",
              fontSize: "0.7rem",
              fontWeight: 500,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--accent-deep)",
              textDecoration: "none",
            }}
          >
            Discuss this project →
          </a>
        </div>
      </div>
    </main>
  );
}
