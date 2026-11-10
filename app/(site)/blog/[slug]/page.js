import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { articleOptions, mdxComponents, tableOfContents, mediaIdsIn } from "@/lib/mdx";
import { getMediaSizes } from "@/lib/media";
import { relatedPosts } from "@/lib/related";
import { PostArticle } from "@/components/ArticleViews";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { orEmpty } from "@/lib/db";
import { pageMeta } from "@/lib/meta";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const description =
    post.description && post.description.length >= 150
      ? post.description
      : [post.description, "Written from real production experience."].filter(Boolean).join(" ");

  return pageMeta({
    title: post.title,
    shareTitle: post.title,
    description,
    path: `/blog/${slug}`,
    type: "article",
    publishedTime: post.date,
  });
}

export async function generateStaticParams() {
  const posts = await orEmpty(getAllPosts());
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  const [all, media] = await Promise.all([orEmpty(getAllPosts()), getMediaSizes(mediaIdsIn(post.content))]);

  return (
    <main id="main" className="page-main page-narrow">
      <PostArticle
        post={post}
        toc={tableOfContents(post.content)}
        related={relatedPosts(post, all)}
        body={<MDXRemote source={post.content} options={articleOptions({ media })} components={mdxComponents} />}
      />
    </main>
  );
}
