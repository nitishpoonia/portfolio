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
          gap: "2rem",
          borderBottom: "1px solid var(--border)",
          marginBottom: "clamp(2rem, 4vw, 3.5rem)",
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
                  ? "2px solid var(--ink)"
                  : "2px solid transparent",
                marginBottom: "-1px",
                padding: "0 0 0.75rem",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: isActive ? "var(--ink)" : "var(--mid)",
                transition: "color 0.15s",
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Post list */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {filtered.length === 0 ? (
          <p
            style={{
              color: "var(--mid)",
              fontSize: "0.9rem",
              padding: "2rem 0",
            }}
          >
            Nothing here yet — check back soon.
          </p>
        ) : (
          filtered.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: "2rem",
                alignItems: "start",
                padding: "clamp(1.5rem, 3vw, 2.5rem) 0",
                borderBottom: "1px solid var(--border)",
                textDecoration: "none",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--mid)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {post.tags.join(" · ")}
                </p>
                <h2
                  style={{
                    fontSize: "clamp(1rem, 1.8vw, 1.35rem)",
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    color: "var(--ink)",
                    marginBottom: "0.5rem",
                  }}
                >
                  {post.title}
                </h2>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--mid)",
                    lineHeight: 1.6,
                  }}
                >
                  {post.description}
                </p>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <p
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    color: "var(--mid)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {new Date(post.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <p
                  style={{
                    fontSize: "0.65rem",
                    color: "var(--ink)",
                    marginTop: "0.25rem",
                  }}
                >
                  {post.readingTime}
                </p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
