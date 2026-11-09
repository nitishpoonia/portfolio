import { notFound } from "next/navigation";
import { getProjectAdmin } from "@/lib/admin";
import EntityForm from "@/components/studio/EntityForm";

const fields = [
  { name: "title", label: "Title", place: "title", hint: "Project name" },
  { name: "tagline", label: "Tagline", place: "lede", hint: "One line on what it is and why it matters. Shown under the title and in link previews.", counter: [80, 160] },
  { name: "status", label: "Status", options: ["", "Currently building", "Shipped", "Paused"] },
  { name: "type", label: "Type", options: ["case-study", "product", "client"] },
  { name: "slug", label: "URL slug", hint: "auto from title" },
  { name: "role", label: "Role", hint: "Frontend developer" },
  { name: "company", label: "Company" },
  { name: "timeline", label: "Timeline", hint: "Dec 2024 - Present" },
  { name: "tags", label: "Tech stack", hint: "React Native, Node.js", help: "Comma separated" },
];

const iso = (d) => (d ? new Date(d).toISOString() : null);

export default async function ProjectEditor({ params }) {
  const { id } = await params;
  const isNew = id === "new";
  const p = isNew ? null : await getProjectAdmin(Number(id));
  if (!isNew && !p) notFound();
  const initial = p
    ? { ...p, status: p.status || "", tags: (p.tags || []).join(", "), updated_at: iso(p.updated_at) }
    : { title: "", slug: "", tagline: "", role: "", company: "", timeline: "", type: "case-study", status: "", tags: "", content: "", published: false };
  return (
    <EntityForm kind="project" apiBase="/api/studio/projects" backHref="/studio/projects" publicPath="/projects"
      fields={fields} initial={initial} id={isNew ? null : p.id} />
  );
}
