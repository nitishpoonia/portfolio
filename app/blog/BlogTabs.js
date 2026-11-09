"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Code2, NotebookPen, ArrowUpRight } from "lucide-react";

const TABS = [
  { id: "tech", label: "Tech", icon: Code2 },
  { id: "personal", label: "Personal", icon: NotebookPen },
];

const fmt = (d) =>
  new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default function BlogTabs({ posts }) {
  const [active, setActive] = useState("tech");
  const calm = useReducedMotion();
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
            {active === tab.id && (
              <motion.span layoutId="blog-tab-pill" className="tab-pill-bg" aria-hidden="true"
                transition={calm ? { duration: 0 } : { type: "spring", bounce: 0.2, duration: 0.5 }} />
            )}
            <tab.icon size={16} strokeWidth={1.9} aria-hidden="true" />
            {tab.label}
            <span className="tab-count">{posts.filter((p) => p.category === tab.id).length}</span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="empty">Nothing here yet. Check back soon.</p>
      ) : (
        <ul className="glass list-panel tab-swap" role="tabpanel" key={active}>
          {filtered.map((post, i) => (
            <li key={post.slug} style={{ "--i": i }}>
              <Link href={`/blog/${post.slug}`} className="post-row">
                <span className="post-main">
                  <strong>{post.title}</strong>
                  {post.description && <span className="muted">{post.description}</span>}
                </span>
                <span className="post-meta mono">
                  <span>{fmt(post.date)}</span>
                  <span>{post.readingTime}</span>
                  <ArrowUpRight size={18} strokeWidth={1.8} className="card-arrow" aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
