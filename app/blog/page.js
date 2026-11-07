import { getAllPosts } from "@/lib/posts";
import BlogTabs from "./BlogTabs";
import Navbar from "@/components/NavBar";
import SiteFooter from "@/components/SiteFooter";
import PageHeader from "@/components/PageHeader";

const DESCRIPTION =
  "Articles on React Native performance, FlatList optimisation, cursor pagination, image loading and building products end to end, written from real production work.";

export const metadata = {
  title: "Writing",
  description: DESCRIPTION,
  alternates: { canonical: "https://nitishpoonia.in/blog" },
  openGraph: {
    title: "Writing | Nitish Poonia",
    description: DESCRIPTION,
    url: "https://nitishpoonia.in/blog",
    type: "website",
    siteName: "Nitish Poonia",
    images: ["/opengraph-image"],
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts().catch(() => []);

  return (
    <div className="page-shell">
      <Navbar />
      <main className="page-main page-narrow">
        <PageHeader
          eyebrow="Writing"
          title="Notes from building"
          lede="Things I worked out while shipping: React Native performance, pagination, image loading. Plus the occasional note from away from the screen."
        />
        <BlogTabs posts={posts} />
      </main>
      <SiteFooter />
    </div>
  );
}
