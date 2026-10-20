import { notFound } from "next/navigation";
import { getPostAdmin } from "@/lib/admin";
import EntityForm from "@/components/studio/EntityForm";

const fields = [
  { name: "title", label: "Title", wide: true },
  { name: "slug", label: "Slug", hint: "auto from title if empty" },
  { name: "date", label: "Date", type: "date" },
  { name: "category", label: "Category", options: ["tech", "career", "life"] },
  { name: "tags", label: "Tags (comma separated)" },
  { name: "description", label: "Description (SEO, 150+ chars is best)", wide: true },
];

export default async function PostEditor({ params }) {
  const { id } = await params;
  const isNew = id === "new";
  const post = isNew ? null : await getPostAdmin(Number(id));
  if (!isNew && !post) notFound();
  const initial = post
    ? { ...post, tags: (post.tags || []).join(", ") }
    : { title: "", slug: "", date: new Date().toISOString().slice(0, 10), category: "tech", tags: "", description: "", content: "", published: false };
  return (
    <EntityForm kind="post" apiBase="/api/studio/posts" backHref="/studio/posts" publicPath="/blog"
      fields={fields} initial={initial} id={isNew ? null : post.id} />
  );
}
