import { getAllPosts } from "@/lib/posts";
import BlogTabs from "./BlogTabs";
import BackButton from "@/components/BackButton";

export const metadata = {
  title: "Blog — React Native, Node.js & Mobile Development | Nitish Poonia",
  description:
    "In-depth articles on React Native performance, FlatList optimisation, cursor pagination, image loading, and full-stack mobile development — written from real production experience.",
  alternates: {
    canonical: "https://nitishpoonia.in/blog",
  },
  openGraph: {
    title: "Blog — React Native, Node.js & Mobile Development | Nitish Poonia",
    description:
      "In-depth articles on React Native performance, FlatList optimisation, cursor pagination, image loading, and full-stack mobile development — written from real production experience.",
    url: "https://nitishpoonia.in/blog",
    type: "website",
    siteName: "Nitish Poonia",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — React Native, Node.js & Mobile Development | Nitish Poonia",
    description:
      "In-depth articles on React Native performance, FlatList optimisation, cursor pagination, image loading, and full-stack mobile development — written from real production experience.",
    creator: "@nitishpoonia",
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
      <BackButton />
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

      <BlogTabs posts={posts} />
    </main>
  );
}
