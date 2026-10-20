import Link from "next/link";
import { listPostsAdmin, listProjectsAdmin } from "@/lib/admin";
import { glass } from "@/components/studio/ui";

export default async function Overview() {
  const [posts, projects] = await Promise.all([listPostsAdmin(), listProjectsAdmin()]);
  const stat = (items) => `${items.filter((i) => i.published).length} live · ${items.filter((i) => !i.published).length} drafts`;
  const cards = [
    ["/studio/posts", "Posts", stat(posts), "/studio/posts/new", "New post"],
    ["/studio/projects", "Projects", stat(projects), "/studio/projects/new", "New project"],
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {cards.map(([href, name, s, newHref, newLabel]) => (
        <div key={href} className={`${glass} flex flex-col gap-3 p-6`}>
          <Link href={href} className="text-xl font-semibold">{name}</Link>
          <p className="text-sm text-[#55555A]">{s}</p>
          <Link href={newHref} className="mt-2 inline-flex min-h-[44px] w-fit items-center rounded-full bg-[#0A0A0A] px-5 text-sm font-medium text-white">{newLabel}</Link>
        </div>
      ))}
    </div>
  );
}
