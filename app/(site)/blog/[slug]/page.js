import { notFound, permanentRedirect } from "next/navigation";
import { findRedirect } from "@/lib/redirects";
import { MDXRemote } from "next-mdx-remote/rsc";
import { articleOptions, mdxComponents, tableOfContents, mediaIdsIn } from "@/lib/mdx";
import { getMediaSizes } from "@/lib/media";
import { relatedPosts } from "@/lib/related";
import { PostArticle } from "@/components/ArticleViews";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { orEmpty } from "@/lib/db";
import { pageMeta, blogPostingLd } from "@/lib/meta";
import JsonLd from "@/components/JsonLd";

// Missing slug: if it was renamed in Studio, send visitors to the new address.
async function missing(slug) {
  const to = await findRedirect("posts", slug);
  if (to) permanentRedirect(`/blog/${to}`);
  notFound();
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) await missing(slug);

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
    image: false,
    publishedTime: post.date,
    modifiedTime: post.updatedAt ? new Date(post.updatedAt).toISOString() : undefined,
  });
}

export async function generateStaticParams() {
  const posts = await orEmpty(getAllPosts());
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) await missing(slug);
  const [all, media] = await Promise.all([orEmpty(getAllPosts()), getMediaSizes(mediaIdsIn(post.content))]);

  return (
    <main id="main" className="page-main page-narrow">
      <JsonLd data={blogPostingLd(post)} />
      <PostArticle
        post={post}
        toc={tableOfContents(post.content)}
        related={relatedPosts(post, all)}
        body={<MDXRemote source={post.content} options={articleOptions({ media })} components={mdxComponents} />}
      />
    </main>
  );
}
