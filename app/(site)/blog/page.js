import { getAllPosts } from "@/lib/posts";
import { Suspense } from "react";
import BlogTabs, { BlogTabsFromUrl } from "./BlogTabs";
import PageHeader from "@/components/PageHeader";
import Band from "@/components/Band";
import { orEmpty } from "@/lib/db";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: "Writing",
  description:
    "Articles on React Native performance, FlatList optimisation, cursor pagination, image loading and building products end to end, written from real production work.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await orEmpty(getAllPosts());

  return (
    <main id="main" className="page-main">
      <PageHeader
        eyebrow="Writing"
        title="Notes from building"
        lede="Things I worked out while shipping: React Native performance, pagination, image loading. Plus the occasional note from away from the screen."
      />
      {/* The static page renders the default tab; the URL's ?tab= / ?tag= apply in the browser. */}
      <Band title="Posts" titleId="posts-h" note={`${posts.length} posts. Pick a tab, or follow a tag from any post.`}>
        <Suspense fallback={<BlogTabs posts={posts} />}>
          <BlogTabsFromUrl posts={posts} />
        </Suspense>
      </Band>
    </main>
  );
}
