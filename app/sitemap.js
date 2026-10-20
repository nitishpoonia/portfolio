import { getAllPosts } from "@/lib/posts";
import { getAllProjects } from "@/lib/project";

export default async function sitemap() {
  const posts = await getAllPosts();

  const postUrls = posts.map((post) => ({
    url: `https://nitishpoonia.in/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  const projectUrls = (await getAllProjects()).map((p) => ({
    url: `https://nitishpoonia.in/projects/${p.slug}`,
    lastModified: new Date(),
  }));

  return [
    { url: "https://nitishpoonia.in", lastModified: new Date() },
    { url: "https://nitishpoonia.in/projects", lastModified: new Date() },
    { url: "https://nitishpoonia.in/blog", lastModified: new Date() },
    { url: "https://nitishpoonia.in/hire", lastModified: new Date() },
    { url: "https://nitishpoonia.in/uses", lastModified: new Date() },
    ...postUrls,
    ...projectUrls,
  ];
}
