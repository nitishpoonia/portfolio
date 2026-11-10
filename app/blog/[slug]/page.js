import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxOptions } from "@/lib/mdx";
import { PostArticle } from "@/components/ArticleViews";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import Navbar from "@/components/NavBar";
import SiteFooter from "@/components/SiteFooter";
import { orEmpty } from "@/lib/db";

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
  const posts = await orEmpty(getAllPosts());
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="page-shell">
      <Navbar />
      <main className="page-main page-narrow">
        <PostArticle post={post} body={<MDXRemote source={post.content} options={mdxOptions} />} />
      </main>
      <SiteFooter />
    </div>
  );
}
