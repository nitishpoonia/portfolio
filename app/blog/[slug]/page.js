import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
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
  const post = await getPostBySlug(slug);
  return {
    title: `${post.title} — Nitish Poonia`,
    description: post.description,
    alternates: {
      canonical: `https://nitishpoonia.in/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://nitishpoonia.in/blog/${slug}`,
      type: "article",
    },
  };
}

// Pre-generates all post pages at build time
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function PostPage({ params }) {
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  return (
    <main
      style={{
        maxWidth: "720px",
        margin: "0 auto",
        padding: "calc(var(--pad-y) + 4rem) var(--pad-x) var(--pad-y)",
      }}
    >
      <BackButton />

      {/* Header */}
      <div
        style={{
          marginBottom: "clamp(2.5rem, 5vw, 4rem)",
          borderBottom: "1px solid var(--border)",
          paddingBottom: "2rem",
        }}
      >
        <p
          style={{
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--mid)",
            marginBottom: "1rem",
          }}
        >
          {new Date(post.date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}{" "}
          · {post.readingTime}
        </p>
        <h1
          style={{
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            fontWeight: 900,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            color: "var(--ink)",
          }}
        >
          {post.title}
        </h1>
        <p
          style={{
            marginTop: "1rem",
            fontSize: "1.05rem",
            fontWeight: 300,
            color: "var(--mid)",
            lineHeight: 1.7,
          }}
        >
          {post.description}
        </p>
      </div>

      {/* MDX Content */}
      <div className="prose">
        <MDXRemote source={post.content} options={mdxOptions} />
      </div>

      <div style={{ marginTop: "4rem" }}>
        <BackButton />
      </div>
    </main>
  );
}
