import Link from "next/link";
import { FileText, FolderKanban, Plus, ArrowUpRight } from "lucide-react";
import { listPostsAdmin, listProjectsAdmin } from "@/lib/admin";
import { ago } from "@/components/studio/time";
import { glass } from "@/components/studio/ui";

const Row = ({ it }) => (
  <li>
    <Link href={it.href} className="flex min-h-[52px] items-center justify-between gap-3 px-5 py-2.5 hover:bg-black/5">
      <span className="min-w-0">
        <span className="block truncate text-[15px] font-medium">{it.title}</span>
        <span className="block text-xs text-[#55555A]">{it.kind} · edited {ago(it.updated_at)}</span>
      </span>
      <span className={`shrink-0 rounded-full px-3 py-1 text-xs ${it.published ? "bg-[#0A0A0A] text-white" : "bg-black/10"}`}>
        {it.published ? "Live" : "Draft"}
      </span>
    </Link>
  </li>
);

export default async function Overview() {
  const [posts, projects] = await Promise.all([listPostsAdmin(), listProjectsAdmin()]);
  const all = [
    ...posts.map((p) => ({ ...p, kind: "Post", href: `/studio/posts/${p.id}` })),
    ...projects.map((p) => ({ ...p, kind: "Project", href: `/studio/projects/${p.id}` })),
  ].sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  const drafts = all.filter((i) => !i.published).slice(0, 4);
  const recent = all.filter((i) => i.published).slice(0, 5);

  const count = (items) => [items.filter((i) => i.published).length, items.filter((i) => !i.published).length];
  const cards = [
    ["/studio/posts", "Posts", FileText, count(posts), "/studio/posts/new", "New post"],
    ["/studio/projects", "Projects", FolderKanban, count(projects), "/studio/projects/new", "New project"],
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {cards.map(([href, name, Icon, [live, draft], newHref, newLabel]) => (
          <div key={href} className={`${glass} flex flex-col gap-3 p-6`}>
            <Link href={href} className="flex items-center gap-2 text-xl font-semibold">
              <Icon size={20} strokeWidth={1.9} aria-hidden="true" />{name}
            </Link>
            <p className="text-sm text-[#55555A]">
              <span className="text-2xl font-semibold text-[#0A0A0A]">{live}</span> live · {draft} draft{draft === 1 ? "" : "s"}
            </p>
            <Link href={newHref} className="mt-1 inline-flex min-h-[44px] w-fit items-center gap-1.5 rounded-full bg-[#0A0A0A] px-5 text-sm font-medium text-white">
              <Plus size={16} aria-hidden="true" />{newLabel}
            </Link>
          </div>
        ))}
      </div>

      {drafts.length > 0 && (
        <section aria-labelledby="drafts-h">
          <h2 id="drafts-h" className="mb-2 px-1 text-sm font-medium text-[#55555A]">Continue writing</h2>
          <ul className={`${glass} divide-y divide-black/10 overflow-hidden`}>
            {drafts.map((it) => <Row key={it.href} it={it} />)}
          </ul>
        </section>
      )}

      {recent.length > 0 && (
        <section aria-labelledby="recent-h">
          <div className="mb-2 flex items-center justify-between px-1">
            <h2 id="recent-h" className="text-sm font-medium text-[#55555A]">Recently updated on the site</h2>
            <Link href="/" target="_blank" className="inline-flex items-center gap-1 text-sm text-[#55555A] hover:text-[#0A0A0A]">
              Open site<ArrowUpRight size={14} aria-hidden="true" />
            </Link>
          </div>
          <ul className={`${glass} divide-y divide-black/10 overflow-hidden`}>
            {recent.map((it) => <Row key={it.href} it={it} />)}
          </ul>
        </section>
      )}
    </div>
  );
}
