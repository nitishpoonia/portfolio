import { getAllPosts } from "@/lib/posts";

export default function sitemap() {
  const posts = getAllPosts();

  const postUrls = posts.map((post) => ({
    url: `https://nitishpoonia.in/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [
    {
      url: "https://nitishpoonia.in",
      lastModified: new Date(),
    },
    {
      url: "https://nitishpoonia.in/blog",
      lastModified: new Date(),
    },
    ...postUrls,
  ];
}
