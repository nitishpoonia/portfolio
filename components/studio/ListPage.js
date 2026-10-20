import Link from "next/link";
import { glass } from "./ui";

export default function ListPage({ title, base, items, meta }) {
  return (
    <>
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <Link href={`${base}/new`} className="inline-flex min-h-[44px] items-center rounded-full bg-[#0A0A0A] px-5 text-sm font-medium text-white">New</Link>
      </div>
      <ul className={`${glass} divide-y divide-black/10 overflow-hidden`}>
        {items.length === 0 && <li className="p-6 text-sm text-[#55555A]">Nothing yet.</li>}
        {items.map((it) => (
          <li key={it.id}>
            <Link href={`${base}/${it.id}`} className="flex min-h-[56px] items-center justify-between gap-3 px-5 py-3 hover:bg-black/5">
              <span className="min-w-0">
                <span className="block truncate font-medium">{it.title}</span>
                <span className="block text-xs text-[#55555A]">{meta(it)}</span>
              </span>
              <span className={`shrink-0 rounded-full px-3 py-1 text-xs ${it.published ? "bg-[#0A0A0A] text-white" : "bg-black/10"}`}>
                {it.published ? "Live" : "Draft"}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
