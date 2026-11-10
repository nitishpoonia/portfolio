import { getAllPosts } from "@/lib/posts";
import { orEmpty } from "@/lib/db";
import { SITE_URL, SITE_NAME } from "@/lib/meta";

// RSS 2.0 feed of published posts at /feed.xml. Built with the site and
// refreshed whenever Studio saves (revalidatePath("/", "layout")).
export const dynamic = "force-static";

const esc = (s) =>
  String(s ?? "").replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c]);
const rfc822 = (d) => new Date(/^\d{4}-\d{2}-\d{2}$/.test(d) ? `${d}T00:00:00Z` : d).toUTCString();

export async function GET() {
  const posts = await orEmpty(getAllPosts());
  const items = posts
    .map((p) => {
      const url = `${SITE_URL}/blog/${p.slug}`;
      return `    <item>
      <title>${esc(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${rfc822(p.date)}</pubDate>
      <description>${esc(p.description)}</description>
${(p.tags || []).map((t) => `      <category>${esc(t)}</category>`).join("\n")}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(SITE_NAME)}: Writing</title>
    <link>${SITE_URL}/blog</link>
    <description>Notes from building: React Native performance, pagination, image loading, and AI systems.</description>
    <language>en-in</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${posts[0] ? `    <lastBuildDate>${rfc822(posts[0].date)}</lastBuildDate>\n` : ""}${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
