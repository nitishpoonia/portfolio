import { getAllPosts } from "@/lib/posts";
import { getAllProjects } from "@/lib/project";

const BASE = "https://nitishpoonia.in";

export default async function sitemap() {
  const [posts, projects] = await Promise.all([
    getAllPosts().catch(() => []),
    getAllProjects().catch(() => []),
  ]);
  const now = new Date();

  return [
    ...["", "/story", "/projects", "/blog", "/hire", "/uses"].map((path) => ({ url: `${BASE}${path}`, lastModified: now })),
    ...projects.map((p) => ({ url: `${BASE}/projects/${p.slug}`, lastModified: now })),
    ...posts.map((post) => ({ url: `${BASE}/blog/${post.slug}`, lastModified: new Date(post.date) })),
  ];
}
