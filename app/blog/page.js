import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
  title: "Blog — Nitish Poonia",
  description:
    "Writing about React Native, mobile development, and building software systems.",
  alternates: {
    canonical: "https://nitishpoonia.in/blog",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main
      style={{
        maxWidth: "var(--max)",
        margin: "0 auto",
        padding: "calc(var(--pad-y) + 4rem) var(--pad-x) var(--pad-y)",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(2.4rem, 5.5vw, 5rem)",
          fontWeight: 900,
          letterSpacing: "-0.03em",
          lineHeight: 0.95,
          color: "var(--ink)",
          marginBottom: "clamp(3rem, 6vw, 5rem)",
        }}
      >
        Writing
      </h1>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {posts.map((post, i) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "2rem",
              alignItems: "start",
              padding: "clamp(1.5rem, 3vw, 2.5rem) 0",
              borderBottom: "1px solid var(--border)",
              textDecoration: "none",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--mid)",
                  marginBottom: "0.5rem",
                }}
              >
                {post.tags.join(" · ")}
              </p>
              <h2
                style={{
                  fontSize: "clamp(1rem, 1.8vw, 1.35rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  color: "var(--ink)",
                  marginBottom: "0.5rem",
                }}
              >
                {post.title}
              </h2>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "var(--mid)",
                  lineHeight: 1.6,
                }}
              >
                {post.description}
              </p>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <p
                style={{
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  color: "var(--mid)",
                  whiteSpace: "nowrap",
                }}
              >
                {new Date(post.date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
              <p
                style={{
                  fontSize: "0.65rem",
                  color: "var(--ink)",
                  marginTop: "0.25rem",
                }}
              >
                {post.readingTime}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
