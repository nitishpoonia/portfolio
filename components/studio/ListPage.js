"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { ago } from "./time";
import { glass, input } from "./ui";

// items: [{ id, title, published, updated_at (ISO), meta }]
export default function ListPage({ title, base, items }) {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all");
  const counts = {
    all: items.length,
    live: items.filter((i) => i.published).length,
    drafts: items.filter((i) => !i.published).length,
  };
  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return items.filter(
      (i) =>
        (filter === "all" || (filter === "live") === i.published) &&
        (!needle || `${i.title} ${i.meta}`.toLowerCase().includes(needle))
    );
  }, [items, q, filter]);

  return (
    <>
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <Link href={`${base}/new`} className="inline-flex min-h-[44px] items-center gap-1.5 rounded-full bg-[#0A0A0A] px-5 text-sm font-medium text-white">
          <Plus size={16} aria-hidden="true" />New
        </Link>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="relative min-w-[200px] flex-1">
          <Search size={16} aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#55555A]" />
          <label htmlFor="q" className="sr-only">Search {title.toLowerCase()}</label>
          <input id="q" type="search" className={`${input} pl-10`} placeholder={`Search ${title.toLowerCase()}`} value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div role="group" aria-label="Filter" className="flex rounded-full border border-black/15 bg-white/70 p-1">
          {[["all", "All"], ["live", "Live"], ["drafts", "Drafts"]].map(([k, l]) => (
            <button key={k} type="button" aria-pressed={filter === k} onClick={() => setFilter(k)}
              className={`min-h-[36px] rounded-full px-3.5 text-sm ${filter === k ? "bg-[#0A0A0A] text-white" : "hover:bg-black/5"}`}>
              {l} <span className="opacity-60">{counts[k]}</span>
            </button>
          ))}
        </div>
      </div>

      <ul className={`${glass} divide-y divide-black/10 overflow-hidden`}>
        {shown.length === 0 && (
          <li className="p-6 text-sm text-[#55555A]">{items.length ? "Nothing matches." : "Nothing yet."}</li>
        )}
        {shown.map((it) => (
          <li key={it.id}>
            <Link href={`${base}/${it.id}`} className="flex min-h-[60px] items-center justify-between gap-3 px-5 py-3 hover:bg-black/5">
              <span className="min-w-0">
                <span className="block truncate font-medium">{it.title}</span>
                <span className="block truncate text-xs text-[#55555A]">{[it.meta, it.updated_at && `edited ${ago(it.updated_at)}`].filter(Boolean).join(" · ")}</span>
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
