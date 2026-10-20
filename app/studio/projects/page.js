import { listProjectsAdmin } from "@/lib/admin";
import ListPage from "@/components/studio/ListPage";

export default async function ProjectsPage() {
  const items = await listProjectsAdmin();
  return <ListPage title="Projects" base="/studio/projects" items={items} meta={(p) => `/projects/${p.slug}${p.status ? " · " + p.status : ""}`} />;
}
