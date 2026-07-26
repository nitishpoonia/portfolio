import { getAllPosts } from "@/lib/posts";
import BlogTabs from "./BlogTabs";
import Navbar from "@/components/NavBar";
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
    <>
      <Navbar />
      <main className="band band-0" style={{ minHeight: "100vh" }}>
        <div
          style={{
            maxWidth: "var(--max)",
            margin: "0 auto",
            padding: "calc(var(--pad-y) + 4rem) var(--pad-x) var(--pad-y)",
          }}
        >
          <BackButton />
          <div style={{ marginBottom: "clamp(2.75rem, 6vw, 4.5rem)" }}>
            <p
              style={{
                fontFamily: "var(--mono)",
                fontSize: "0.66rem",
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--sec-mid)",
                marginBottom: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
              }}
            >
              <span
                aria-hidden="true"
                style={{ width: "18px", height: "1px", background: "var(--sec-accent)" }}
              />
              Notes
            </p>
            <h1
              style={{
                fontFamily: "var(--display)",
                fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                lineHeight: 1,
                color: "var(--sec-ink)",
              }}
            >
              Writing
            </h1>
            <p
              style={{
                marginTop: "1.25rem",
                fontSize: "clamp(0.95rem, 1.4vw, 1.1rem)",
                color: "var(--sec-mid)",
                lineHeight: 1.7,
                maxWidth: "54ch",
              }}
            >
              Things I worked out while building — React Native performance,
              pagination, image loading — plus the occasional note from away from
              the screen.
            </p>
          </div>

          <BlogTabs posts={posts} />
        </div>
      </main>
    </>
  );
}
