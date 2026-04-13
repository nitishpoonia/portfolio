"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

export default function DesignGallery({ projects }) {
  const [lightbox, setLightbox] = useState(null); // { src, alt }
  const [visible, setVisible] = useState(false);

  const open = useCallback((screen) => {
    setLightbox(screen);
    // Delay visible to trigger the enter transition
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true));
    });
    document.body.style.overflow = "hidden";
  }, []);

  const close = useCallback(() => {
    setVisible(false);
    document.body.style.overflow = "";
    // Remove lightbox after exit transition (300ms)
    setTimeout(() => setLightbox(null), 300);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  return (
    <>
      {projects.map((project) => (
        <div key={project.slug}>
          {/* Project header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: "1rem",
              paddingBottom: "1.5rem",
              borderBottom: "1px solid var(--border)",
              marginBottom: "2rem",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.02em",
                  color: "var(--ink)",
                  marginBottom: "0.4rem",
                }}
              >
                {project.title}
              </h2>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "var(--mid)",
                  lineHeight: 1.6,
                  maxWidth: "50ch",
                }}
              >
                {project.description}
              </p>
            </div>

            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: "0.6rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    padding: "0.3rem 0.7rem",
                    border: "1px solid var(--border)",
                    color: "var(--mid)",
                  }}
                >
                  {tag}
                </span>
              ))}
              <Link
                href={project.caseStudyHref}
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--ink)",
                  textDecoration: "none",
                  borderBottom: "1.5px solid var(--ink)",
                  paddingBottom: "1px",
                }}
              >
                Read case study →
              </Link>
            </div>
          </div>

          {/* Screens grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1.5rem",
            }}
            className="screens-grid"
          >
            {project.screens.map((screen) => (
              <button
                key={screen.src}
                onClick={() => open(screen)}
                aria-label={`View ${screen.alt} fullscreen`}
                style={{
                  all: "unset",
                  display: "block",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  overflow: "hidden",
                  background: "var(--faint)",
                  aspectRatio: "390/844",
                  position: "relative",
                  cursor: "zoom-in",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 32px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <Image
                  src={screen.src}
                  alt={screen.alt}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={close}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(6px)",
            transition: "opacity 0.3s ease",
            opacity: visible ? 1 : 0,
            cursor: "zoom-out",
          }}
        >
          {/* Close button */}
          <button
            onClick={close}
            aria-label="Close"
            style={{
              position: "absolute",
              top: "1.25rem",
              right: "1.5rem",
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#fff",
              borderRadius: "50%",
              width: "2.5rem",
              height: "2.5rem",
              fontSize: "1.1rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.2s ease",
              lineHeight: 1,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.2)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.1)")
            }
          >
            ✕
          </button>

          {/* Image container */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              maxHeight: "90vh",
              maxWidth: "min(420px, 90vw)",
              width: "100%",
              aspectRatio: "390/844",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
              transition:
                "transform 0.3s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease",
              transform: visible ? "scale(1)" : "scale(0.85)",
              opacity: visible ? 1 : 0,
            }}
          >
            <Image
              src={lightbox.src}
              alt={lightbox.alt}
              fill
              style={{ objectFit: "contain" }}
              sizes="420px"
              priority
            />
          </div>

          {/* Caption */}
          <p
            style={{
              position: "absolute",
              bottom: "1.5rem",
              left: "50%",
              transform: "translateX(-50%)",
              color: "rgba(255,255,255,0.6)",
              fontSize: "0.75rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              transition: "opacity 0.3s ease",
              opacity: visible ? 1 : 0,
              whiteSpace: "nowrap",
            }}
          >
            {lightbox.alt}
          </p>
        </div>
      )}
    </>
  );
}
