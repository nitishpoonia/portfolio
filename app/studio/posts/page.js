import { listPostsAdmin } from "@/lib/admin";
import ListPage from "@/components/studio/ListPage";

export default async function PostsPage() {
  const items = await listPostsAdmin();
  return <ListPage title="Posts" base="/studio/posts" items={items} meta={(p) => `/blog/${p.slug} · ${p.date}`} />;
}
