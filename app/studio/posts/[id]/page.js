import { notFound } from "next/navigation";
import { getPostAdmin } from "@/lib/admin";
import EntityForm from "@/components/studio/EntityForm";

const fields = [
  { name: "title", label: "Title", wide: true },
  { name: "slug", label: "Slug", hint: "auto from title if empty" },
  { name: "date", label: "Date", type: "date" },
  { name: "category", label: "Category", options: ["tech", "personal"] },
  { name: "tags", label: "Tags (comma separated)" },
  { name: "description", label: "Description (shown in Google and link previews)", wide: true, counter: [150, 160] },
];

const iso = (d) => (d ? new Date(d).toISOString() : null);

export default async function PostEditor({ params }) {
  const { id } = await params;
  const isNew = id === "new";
  const post = isNew ? null : await getPostAdmin(Number(id));
  if (!isNew && !post) notFound();
  const initial = post
    ? {
        ...post,
        // Older posts may have a category the blog no longer has a tab for; they show under Personal.
        category: post.category === "tech" ? "tech" : "personal",
        tags: (post.tags || []).join(", "),
        updated_at: iso(post.updated_at),
      }
    : { title: "", slug: "", date: new Date().toISOString().slice(0, 10), category: "tech", tags: "", description: "", content: "", published: false };
  return (
    <EntityForm kind="post" apiBase="/api/studio/posts" backHref="/studio/posts" publicPath="/blog"
      fields={fields} initial={initial} id={isNew ? null : post.id} />
  );
}
