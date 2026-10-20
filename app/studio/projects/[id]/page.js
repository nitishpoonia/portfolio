import { notFound } from "next/navigation";
import { getProjectAdmin } from "@/lib/admin";
import EntityForm from "@/components/studio/EntityForm";

const fields = [
  { name: "title", label: "Title", wide: true },
  { name: "slug", label: "Slug", hint: "auto from title if empty" },
  { name: "tagline", label: "Tagline" },
  { name: "role", label: "Role" },
  { name: "company", label: "Company" },
  { name: "timeline", label: "Timeline", hint: "Dec 2024 - Present" },
  { name: "type", label: "Type", options: ["case-study", "product", "client"] },
  { name: "status", label: "Status", options: ["", "Currently building", "Shipped", "Paused"] },
  { name: "tags", label: "Tech stack (comma separated)", wide: true },
];

export default async function ProjectEditor({ params }) {
  const { id } = await params;
  const isNew = id === "new";
  const p = isNew ? null : await getProjectAdmin(Number(id));
  if (!isNew && !p) notFound();
  const initial = p
    ? { ...p, status: p.status || "", tags: (p.tags || []).join(", ") }
    : { title: "", slug: "", tagline: "", role: "", company: "", timeline: "", type: "case-study", status: "", tags: "", content: "", published: false };
  return (
    <EntityForm kind="project" apiBase="/api/studio/projects" backHref="/studio/projects" publicPath="/projects"
      fields={fields} initial={initial} id={isNew ? null : p.id} />
  );
}
