import { notFound } from "next/navigation";
import { getProjectAdmin } from "@/lib/admin";
import EntityForm from "@/components/studio/EntityForm";

const fields = [
  { name: "title", label: "Title", wide: true },
  { name: "tagline", label: "Tagline", wide: true, counter: [80, 160] },
  { name: "slug", label: "Slug", hint: "auto from title if empty" },
  { name: "timeline", label: "Timeline", hint: "Dec 2024 - Present" },
  { name: "role", label: "Role" },
  { name: "company", label: "Company" },
  { name: "type", label: "Type", options: ["case-study", "product", "client"] },
  { name: "status", label: "Status", options: ["", "Currently building", "Shipped", "Paused"] },
  { name: "tags", label: "Tech stack (comma separated)", wide: true },
  { name: "outcome", label: "Outcome (one line, shown at the top of the case study)", wide: true, counter: [40, 200], hint: "Live on the App Store, used daily by 40 staff" },
  { name: "links", label: "Links", type: "textarea", wide: true, rows: 3,
    hint: "Live site | https://example.com\nApp Store | https://apps.apple.com/…\nCode | https://github.com/…",
    help: "One per line: label | URL. Shown as buttons at the top of the case study." },
  { name: "cover", label: "Cover image (shown on the project card, 16:9 works best)", type: "image", wide: true },
  { name: "sort_order", label: "Order on home and Work (low first; empty = automatic)", type: "number", hint: "automatic" },
  { name: "featured", label: "Featured: always show first", type: "checkbox" },
];

const iso = (d) => (d ? new Date(d).toISOString() : null);

export default async function ProjectEditor({ params }) {
  const { id } = await params;
  const isNew = id === "new";
  const p = isNew ? null : await getProjectAdmin(Number(id));
  if (!isNew && !p) notFound();
  const initial = p
    ? {
        ...p,
        status: p.status || "",
        tags: (p.tags || []).join(", "),
        links: (p.links || []).map((l) => `${l.label} | ${l.href}`).join("\n"),
        sort_order: p.sort_order ?? "",
        updated_at: iso(p.updated_at),
      }
    : { title: "", slug: "", tagline: "", role: "", company: "", timeline: "", type: "case-study", status: "", tags: "",
        outcome: "", links: "", cover: "", sort_order: "", featured: false, content: "", published: false };
  return (
    <EntityForm kind="project" apiBase="/api/studio/projects" backHref="/studio/projects" publicPath="/projects"
      fields={fields} initial={initial} id={isNew ? null : p.id} />
  );
}
