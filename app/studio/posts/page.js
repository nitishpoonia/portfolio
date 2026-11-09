import { listPostsAdmin } from "@/lib/admin";
import ListPage from "@/components/studio/ListPage";

export default async function PostsPage() {
  const items = (await listPostsAdmin()).map((p) => ({
    id: p.id,
    title: p.title,
    published: p.published,
    updated_at: p.updated_at ? new Date(p.updated_at).toISOString() : null,
    meta: `/blog/${p.slug} · ${p.date}`,
  }));
  return <ListPage title="Posts" base="/studio/posts" items={items} />;
}
