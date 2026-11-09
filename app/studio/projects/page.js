import { listProjectsAdmin } from "@/lib/admin";
import ListPage from "@/components/studio/ListPage";

export default async function ProjectsPage() {
  const items = (await listProjectsAdmin()).map((p) => ({
    id: p.id,
    title: p.title,
    published: p.published,
    updated_at: p.updated_at ? new Date(p.updated_at).toISOString() : null,
    meta: `/projects/${p.slug}${p.status ? " · " + p.status : ""}`,
  }));
  return <ListPage title="Projects" base="/studio/projects" items={items} />;
}
