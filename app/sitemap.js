import { SITE_URL } from "@/lib/meta";
import { getAllPosts } from "@/lib/posts";
import { getAllProjects } from "@/lib/project";
import { orEmpty } from "@/lib/db";

const BASE = SITE_URL;

export default async function sitemap() {
  const [posts, projects] = await Promise.all([orEmpty(getAllPosts()), orEmpty(getAllProjects())]);
  const at = (d) => (d ? new Date(d) : undefined);

  return [
    ...["", "/story", "/projects", "/blog", "/hire", "/uses"].map((path) => ({ url: `${BASE}${path}` })),
    ...projects.map((p) => ({ url: `${BASE}/projects/${p.slug}`, lastModified: at(p.updatedAt) })),
    ...posts.map((post) => ({ url: `${BASE}/blog/${post.slug}`, lastModified: at(post.updatedAt || post.date) })),
  ];
}
