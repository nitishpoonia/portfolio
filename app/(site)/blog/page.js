import { getAllPosts } from "@/lib/posts";
import { Suspense } from "react";
import BlogTabs, { BlogTabsFromUrl } from "./BlogTabs";
import PageHeader from "@/components/PageHeader";
import { PenLine } from "lucide-react";
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
    <main id="main" className="page-main page-narrow">
      <PageHeader
        icon={PenLine}
        eyebrow="Writing"
        title="Notes from building"
        lede="Things I worked out while shipping: React Native performance, pagination, image loading. Plus the occasional note from away from the screen."
      />
      {/* The static page renders the default tab; the URL's ?tab= / ?tag= apply in the browser. */}
      <Suspense fallback={<BlogTabs posts={posts} />}>
        <BlogTabsFromUrl posts={posts} />
      </Suspense>
    </main>
  );
}
