import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import Navbar from "@/components/NavBar";
import SiteFooter from "@/components/SiteFooter";

const mdxOptions = {
  mdxOptions: {
    rehypePlugins: [[rehypePrettyCode, { theme: "github-light", keepBackground: true }]],
  },
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const description =
    post.description && post.description.length >= 150
      ? post.description
      : `${post.description} Written from real production experience.`;

  return {
    title: post.title,
    description,
    alternates: { canonical: `https://nitishpoonia.in/blog/${slug}` },
    openGraph: {
      title: post.title,
      description,
      url: `https://nitishpoonia.in/blog/${slug}`,
      type: "article",
      siteName: "Nitish Poonia",
    images: ["/opengraph-image"],
      publishedTime: post.date,
    },
    twitter: { card: "summary_large_image", title: post.title, description, creator: "@nitishpoonia" },
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts().catch(() => []);
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const date = new Date(post.date).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="page-shell">
      <Navbar />
      <main className="page-main page-narrow">
        <header className="page-head">
          <Link href="/blog" className="crumb">← All writing</Link>
          <span className="mono">{date} · {post.readingTime}</span>
          <h1>{post.title}</h1>
          {post.description && <p className="page-lede">{post.description}</p>}
          {post.tags.length > 0 && (
            <div className="chip-row">{post.tags.map((t) => <span key={t} className="chip">{t}</span>)}</div>
          )}
        </header>

        <article className="glass article prose">
          <MDXRemote source={post.content} options={mdxOptions} />
        </article>

        <nav className="article-foot" aria-label="Post">
          <Link href="/blog" className="pill-btn pill-btn-line">← All writing</Link>
          <Link href="/projects" className="pill-btn pill-btn-dark">See my work</Link>
        </nav>
      </main>
      <SiteFooter />
    </div>
  );
}
