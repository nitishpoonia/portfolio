"use client";

import { CONTACT } from "@/lib/contact";
import { MessageCircle } from "lucide-react";

export default function HireButton({
  size = "md",
  label = "Let's work together",
}) {
  const waUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    CONTACT.whatsappMessage,
  )}`;

  const sizes = {
    sm: { fontSize: "0.68rem", padding: "0.6rem 1.25rem" },
    md: { fontSize: "0.72rem", padding: "0.8rem 1.75rem" },
    lg: { fontSize: "0.8rem", padding: "1rem 2.25rem" },
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "0.75rem",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      {/* Primary — WhatsApp */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          background: "var(--ink)",
          color: "var(--bg)",
          border: "1.5px solid var(--ink)",
          fontFamily: "var(--font)",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          textDecoration: "none",
          borderRadius: "2px",
          transition: "all 0.2s ease",
          ...sizes[size],
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "var(--white)";
          e.currentTarget.style.color = "var(--ink)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "var(--ink)";
          e.currentTarget.style.color = "var(--bg)";
        }}
      >
        <MessageCircle size={16} />
        {label}
      </a>

      {/* Secondary — Email */}
      <a
        href={`mailto:${CONTACT.email}`}
        style={{
          fontSize: sizes[size].fontSize,
          fontFamily: "var(--font)",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "var(--mid)",
          textDecoration: "none",
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--white)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--mid)")}
      >
        or email →
      </a>
    </div>
  );
}
