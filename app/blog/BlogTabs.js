"use client";

import { useState } from "react";
import Link from "next/link";

const TABS = [
  { id: "tech", label: "Tech" },
  { id: "personal", label: "Personal" },
];

export default function BlogTabs({ posts }) {
  const [active, setActive] = useState("tech");
  const filtered = posts.filter((p) => p.category === active);

  return (
    <div>
      {/* Tab bar */}
      <div
        style={{
          display: "flex",
          gap: "1.75rem",
          borderBottom: "1px solid var(--sec-line)",
          marginBottom: "clamp(1.5rem, 4vw, 3rem)",
        }}
      >
        {TABS.map((tab) => {
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              style={{
                background: "none",
                border: "none",
                borderBottom: isActive
                  ? "2px solid var(--sec-accent)"
                  : "2px solid transparent",
                marginBottom: "-1px",
                padding: "0 0 0.85rem",
                cursor: "pointer",
                fontFamily: "var(--mono)",
                fontSize: "0.72rem",
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: isActive ? "var(--sec-ink)" : "var(--sec-mid)",
                transition: "color var(--t-fast) var(--ease-soft)",
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Post list */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {filtered.length === 0 ? (
          <p style={{ color: "var(--sec-mid)", fontSize: "0.92rem", padding: "2rem 0" }}>
            Nothing here yet — check back soon.
          </p>
        ) : (
          filtered.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="post-row">
              <div style={{ minWidth: 0 }}>
                <p className="post-tags">{post.tags.join(" · ")}</p>
                <h2 className="post-title">{post.title}</h2>
                <p className="post-desc">{post.description}</p>
              </div>
              <div className="post-meta">
                <p className="post-date">
                  {new Date(post.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <p className="post-reading">{post.readingTime}</p>
              </div>
            </Link>
          ))
        )}
      </div>

      <style>{`
        .post-row {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 1.5rem;
          align-items: start;
          padding: clamp(1.35rem, 3vw, 1.85rem);
          border: 1px solid var(--sec-line);
          border-radius: var(--r-lg);
          background: var(--sec-card);
          text-decoration: none;
          transition: transform var(--t-med) var(--ease-soft), border-color var(--t-med) var(--ease-soft), background var(--t-med) var(--ease-soft);
        }
        .post-row:hover {
          transform: translateY(-3px);
          border-color: var(--sec-accent);
          background: var(--sec-card-hover);
        }
        .post-tags {
          font-family: var(--mono);
          font-size: 0.62rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--sec-mid);
          margin-bottom: 0.55rem;
        }
        .post-title {
          font-family: var(--display);
          font-size: clamp(1.15rem, 1.9vw, 1.5rem);
          font-weight: 500;
          letter-spacing: -0.01em;
          color: var(--sec-ink);
          margin-bottom: 0.45rem;
          line-height: 1.15;
        }
        .post-desc {
          font-size: 0.9rem;
          color: var(--sec-mid);
          line-height: 1.6;
        }
        .post-meta { text-align: right; flex-shrink: 0; }
        .post-date {
          font-family: var(--mono);
          font-size: 0.64rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          color: var(--sec-mid);
          white-space: nowrap;
        }
        .post-reading {
          font-family: var(--mono);
          font-size: 0.64rem;
          color: var(--sec-accent);
          margin-top: 0.3rem;
          white-space: nowrap;
        }
        @media (max-width: 560px) {
          .post-row { grid-template-columns: 1fr; }
          .post-meta { text-align: left; display: flex; gap: 0.75rem; }
          .post-reading { margin-top: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .post-row:hover { transform: none; }
        }
      `}</style>
    </div>
  );
}
