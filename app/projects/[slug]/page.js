import { getAllProjects, getProjectBySlug } from "@/lib/project";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import rehypePrettyCode from "rehype-pretty-code";
import BackButton from "@/components/BackButton";
const mdxOptions = {
  mdxOptions: {
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: "github-light",
          keepBackground: true,
        },
      ],
    ],
  },
};
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  return {
    title: `${project.title} — Nitish Poonia`,
    description: project.tagline,
    alternates: {
      canonical: `https://nitishpoonia.in/projects/${slug}`,
    },
    openGraph: {
      title: project.title,
      description: project.tagline,
      url: `https://nitishpoonia.in/projects/${slug}`,
      type: "article",
    },
  };
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  return (
    <main
      style={{
        maxWidth: "760px",
        margin: "0 auto",
        padding: "calc(var(--pad-y) + 4rem) var(--pad-x) var(--pad-y)",
      }}
    >
      {/* Back */}
      <BackButton />

      {/* Header */}
      <div
        style={{
          paddingBottom: "2.5rem",
          borderBottom: "1px solid var(--border)",
          marginBottom: "3rem",
        }}
      >
        {/* Meta row */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            marginBottom: "1.25rem",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: "0.62rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--mid)",
            }}
          >
            {project.company}
          </span>

          <span style={{ color: "var(--border)", fontSize: "0.8rem" }}>·</span>

          <span
            style={{
              fontSize: "0.62rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--mid)",
            }}
          >
            {project.timeline}
          </span>

          <span style={{ color: "var(--border)", fontSize: "0.8rem" }}>·</span>

          <span
            style={{
              fontSize: "0.62rem",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--mid)",
            }}
          >
            {project.role}
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: "clamp(1.8rem, 4vw, 3.2rem)",
            fontWeight: 900,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            color: "var(--ink)",
            marginBottom: "1rem",
          }}
        >
          {project.title}
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontSize: "clamp(1rem, 1.6vw, 1.15rem)",
            fontWeight: 300,
            color: "var(--mid)",
            lineHeight: 1.7,
          }}
        >
          {project.tagline}
        </p>

        {/* Tags */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            marginTop: "1.5rem",
          }}
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: "0.62rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "0.35rem 0.8rem",
                border: "1.5px solid var(--ink)",
                color: "var(--ink)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* MDX case study body */}
      <div className="prose">
        <MDXRemote source={project.content} options={mdxOptions} />
      </div>

      {/* Bottom nav */}
      <div
        style={{
          marginTop: "5rem",
          paddingTop: "2rem",
          borderTop: "1px solid var(--border)",
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
            fontSize: "0.68rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--mid)",
            textDecoration: "none",
          }}
        >
          ← All projects
        </Link>

        <a
          href={`mailto:nitishpoonia@zohomail.in?subject=Re: ${project.title}`}
          style={{
            fontSize: "0.68rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--ink)",
            textDecoration: "none",
          }}
        >
          Discuss this project →
        </a>
      </div>
    </main>
  );
}
