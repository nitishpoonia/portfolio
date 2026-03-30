import { getAllPosts } from "@/lib/posts";
import { getAllProjects } from "@/lib/project";

export default function sitemap() {
  const posts = getAllPosts();

  const postUrls = posts.map((post) => ({
    url: `https://nitishpoonia.in/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  const projectUrls = getAllProjects().map((p) => ({
    url: `https://nitishpoonia.in/projects/${p.slug}`,
    lastModified: new Date(),
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
    { url: "https://nitishpoonia.in/projects", lastModified: new Date() },
    { url: "https://nitishpoonia.in/hire", lastModified: new Date() },
    ...postUrls,
    ...projectUrls,
  ];
}
