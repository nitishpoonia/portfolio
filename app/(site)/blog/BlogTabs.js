"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Code2, NotebookPen, ArrowUpRight, X } from "lucide-react";
import { formatDate } from "@/lib/format";
import { useTabKeys } from "@/components/useTabKeys";

const TABS = [
  { id: "tech", label: "Tech", icon: Code2 },
  { id: "personal", label: "Personal", icon: NotebookPen },
];

// Anything that isn't "tech" lists under Personal, so no post is ever unreachable.
const tabOf = (p) => (p.category === "tech" ? "tech" : "personal");

// Reads ?tab= and ?tag= so a tab or tag filter can be linked and survives Back.
export function BlogTabsFromUrl({ posts }) {
  const params = useSearchParams();
  return <BlogTabs posts={posts} tab={params.get("tab")} tag={params.get("tag")} />;
}

export default function BlogTabs({ posts, tab, tag }) {
  const router = useRouter();
  const calm = useReducedMotion();
  const active = TABS.some((t) => t.id === tab) ? tab : "tech";
  const index = TABS.findIndex((t) => t.id === active);
  const select = (i) => router.replace(TABS[i].id === "tech" ? "/blog" : `/blog?tab=${TABS[i].id}`, { scroll: false });
  const keys = useTabKeys(TABS.length, index, select);

  const tagged = tag ? posts.filter((p) => p.tags?.includes(tag)) : null;
  const shown = tagged ?? posts.filter((p) => tabOf(p) === active);

  return (
    <div>
      {tagged ? (
        <p className="tag-filter" role="status">
          Posts tagged <span className="chip">{tag}</span>
          <Link href="/blog" className="tag-clear" scroll={false}><X size={14} strokeWidth={2} aria-hidden="true" />Show all</Link>
        </p>
      ) : (
        <div role="tablist" aria-label="Post categories" className="tab-row">
          {TABS.map((t, i) => (
            <button
              key={t.id}
              ref={keys.ref(i)}
              role="tab"
              id={`blog-tab-${t.id}`}
              aria-selected={active === t.id}
              aria-controls="blog-panel"
              tabIndex={active === t.id ? 0 : -1}
              className={`tab-pill${active === t.id ? " is-on" : ""}`}
              onClick={() => select(i)}
              onKeyDown={keys.onKeyDown}
            >
              {active === t.id && (
                <motion.span layoutId="blog-tab-pill" className="tab-pill-bg" aria-hidden="true"
                  transition={calm ? { duration: 0 } : { type: "spring", bounce: 0.2, duration: 0.5 }} />
              )}
              <t.icon size={16} strokeWidth={1.9} aria-hidden="true" />
              {t.label}
              <span className="tab-count">{posts.filter((p) => tabOf(p) === t.id).length}</span>
            </button>
          ))}
        </div>
      )}

      <div id="blog-panel" role={tagged ? undefined : "tabpanel"} aria-labelledby={tagged ? undefined : `blog-tab-${active}`}>
        {shown.length === 0 ? (
          <p className="empty">Nothing here yet. Check back soon.</p>
        ) : (
          <ul className="rows tab-swap" key={tag || active}>
            {shown.map((post, i) => (
              <li key={post.slug} style={{ "--i": i }}>
                <Link href={`/blog/${post.slug}`} className="row">
                  <span className="row-main">
                    <span className="row-title">{post.title}</span>
                    {post.description && <span className="row-text">{post.description}</span>}
                  </span>
                  <span className="row-end">
                    <span className="meta">{formatDate(post.date)}<br />{post.readingTime}</span>
                    <ArrowUpRight size={18} strokeWidth={1.8} className="row-arrow" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
