"use client";

import { CONTACT } from "@/lib/contact";
import { Download } from "lucide-react";

export default function ResumeButton({ size = "md", label = "Download résumé" }) {
  const sizes = {
    sm: { fontSize: "0.72rem", padding: "0.6rem 1.25rem" },
    md: { fontSize: "0.78rem", padding: "0.85rem 1.6rem" },
    lg: { fontSize: "0.85rem", padding: "1rem 2rem" },
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "1.25rem",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <a
        href="/resume.pdf"
        download
        target="_blank"
        rel="noopener noreferrer"
        className="resume-btn"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.55rem",
          background: "var(--sec-accent)",
          color: "var(--sec-bg)",
          border: "1px solid var(--sec-accent)",
          fontFamily: "var(--font)",
          fontWeight: 600,
          letterSpacing: "0.01em",
          textDecoration: "none",
          borderRadius: "var(--r-pill)",
          transition:
            "transform var(--t-fast) var(--ease-soft), box-shadow var(--t-fast) var(--ease-soft), opacity var(--t-fast)",
          ...sizes[size],
        }}
      >
        <Download size={16} strokeWidth={2} />
        {label}
      </a>

      <a
        href={`mailto:${CONTACT.email}`}
        className="resume-email"
        style={{
          fontSize: sizes[size].fontSize,
          fontFamily: "var(--font)",
          fontWeight: 500,
          color: "var(--sec-mid)",
          textDecoration: "none",
          display: "inline-flex",
          alignItems: "center",
          gap: "0.35rem",
          transition: "color var(--t-fast) var(--ease-soft)",
        }}
      >
        or email
        <span className="resume-email-arrow" aria-hidden="true">
          →
        </span>
      </a>

      <style>{`
        .resume-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(62, 84, 73, 0.28);
        }
        .resume-btn:active { transform: translateY(0); }
        .resume-email:hover { color: var(--sec-ink); }
        .resume-email-arrow {
          display: inline-block;
          transition: transform var(--t-fast) var(--ease-soft);
        }
        .resume-email:hover .resume-email-arrow { transform: translateX(4px); }
        @media (prefers-reduced-motion: reduce) {
          .resume-btn:hover { transform: none; }
          .resume-email:hover .resume-email-arrow { transform: none; }
        }
      `}</style>
    </div>
  );
}
