"use client";

import { useState } from "react";
import Link from "next/link";

const TABS = [
  { id: "tech", label: "Tech" },
  { id: "personal", label: "Personal" },
];

const fmt = (d) =>
  new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default function BlogTabs({ posts }) {
  const [active, setActive] = useState("tech");
  const filtered = posts.filter((p) => p.category === active);

  return (
    <div>
      <div role="tablist" aria-label="Post categories" className="tab-row">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={active === tab.id}
            className={`tab-pill${active === tab.id ? " is-on" : ""}`}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
            <span className="tab-count">{posts.filter((p) => p.category === tab.id).length}</span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="empty">Nothing here yet. Check back soon.</p>
      ) : (
        <ul className="glass list-panel" role="tabpanel">
          {filtered.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="post-row">
                <span className="post-main">
                  <strong>{post.title}</strong>
                  {post.description && <span className="muted">{post.description}</span>}
                </span>
                <span className="post-meta mono">
                  <span>{fmt(post.date)}</span>
                  <span>{post.readingTime}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
