import { notFound } from "next/navigation";
import { getPostAdmin } from "@/lib/admin";
import EntityForm from "@/components/studio/EntityForm";

const fields = [
  { name: "title", label: "Title", place: "title", hint: "Post title" },
  { name: "description", label: "Description", place: "lede", hint: "One or two sentences on what this post covers. Shown under the title, in Google and in link previews.", counter: [150, 160] },
  { name: "slug", label: "URL slug", hint: "auto from title" },
  { name: "date", label: "Publish date", type: "date" },
  { name: "category", label: "Category", options: ["tech", "career", "life"] },
  { name: "tags", label: "Tags", hint: "react-native, performance", help: "Comma separated" },
];

const iso = (d) => (d ? new Date(d).toISOString() : null);

export default async function PostEditor({ params }) {
  const { id } = await params;
  const isNew = id === "new";
  const post = isNew ? null : await getPostAdmin(Number(id));
  if (!isNew && !post) notFound();
  const initial = post
    ? { ...post, tags: (post.tags || []).join(", "), updated_at: iso(post.updated_at) }
    : { title: "", slug: "", date: new Date().toISOString().slice(0, 10), category: "tech", tags: "", description: "", content: "", published: false };
  return (
    <EntityForm kind="post" apiBase="/api/studio/posts" backHref="/studio/posts" publicPath="/blog"
      fields={fields} initial={initial} id={isNew ? null : post.id} />
  );
}
