import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import rehypePrettyCode from "rehype-pretty-code";
import Navbar from "@/components/NavBar";
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

  const fullTitle = `${post.title} | Nitish Poonia`;
  const description =
    post.description && post.description.length >= 150
      ? post.description
      : `${post.description} Written from real production experience building React Native apps.`;

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: `https://nitishpoonia.in/blog/${slug}`,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: `https://nitishpoonia.in/blog/${slug}`,
      type: "article",
      siteName: "Nitish Poonia",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      creator: "@nitishpoonia",
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
    <>
      <Navbar />
      <main className="band band-0" style={{ minHeight: "100vh" }}>
        <div
          style={{
            maxWidth: "720px",
            margin: "0 auto",
            padding: "calc(var(--pad-y) + 4rem) var(--pad-x) var(--pad-y)",
          }}
        >
          <BackButton />

          <div
            style={{
              marginBottom: "clamp(2.5rem, 5vw, 4rem)",
              borderBottom: "1px solid var(--sec-line)",
              paddingBottom: "2rem",
            }}
          >
            <p
              style={{
                fontFamily: "var(--mono)",
                fontSize: "0.66rem",
                fontWeight: 500,
                letterSpacing: "0.08em",
                color: "var(--sec-mid)",
                marginBottom: "1.25rem",
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
                fontFamily: "var(--display)",
                fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
                color: "var(--sec-ink)",
                textWrap: "balance",
              }}
            >
              {post.title}
            </h1>
            <p
              style={{
                marginTop: "1.1rem",
                fontSize: "clamp(1.05rem, 1.7vw, 1.2rem)",
                fontWeight: 400,
                color: "var(--sec-mid)",
                lineHeight: 1.6,
              }}
            >
              {post.description}
            </p>
          </div>

          <div className="prose">
            <MDXRemote source={post.content} options={mdxOptions} />
          </div>

          <div style={{ marginTop: "4rem" }}>
            <BackButton />
          </div>
        </div>
      </main>
    </>
  );
}
