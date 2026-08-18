"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { CONTACT } from "@/lib/contact";

const links = [
  { label: "Work", href: "/projects" },
  { label: "Writing", href: "/blog" },
  { label: "About", href: "/#about" },
  { label: "Uses", href: "/uses" },
  { label: "Hire", href: "/hire" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const pillBg = "rgba(28, 22, 15, 0.62)";

  return (
    <>
      {/* ── Desktop pill navbar ── */}
      <nav
        className="nav-desktop-pill"
        style={{
          position: "fixed",
          top: "1.1rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 200,
          display: "flex",
          alignItems: "center",
          background: pillBg,
          backdropFilter: "blur(20px) saturate(160%)",
          WebkitBackdropFilter: "blur(20px) saturate(160%)",
          border: "1px solid rgba(237, 231, 216, 0.14)",
          borderRadius: "var(--r-pill)",
          padding: "0.4rem 0.4rem 0.4rem 1.25rem",
          boxShadow: "0 6px 26px rgba(18, 13, 8, 0.28)",
          whiteSpace: "nowrap",
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "var(--display)",
            fontSize: "1.05rem",
            fontWeight: 500,
            letterSpacing: "0.02em",
            color: "#f4efe2",
            textDecoration: "none",
            marginRight: "1.6rem",
            flexShrink: 0,
          }}
        >
          NP
        </Link>

        <ul
          style={{
            display: "flex",
            gap: "0.15rem",
            listStyle: "none",
            margin: 0,
            padding: 0,
            marginRight: "0.9rem",
          }}
        >
          {links.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className="nav-link"
                style={{
                  display: "block",
                  fontSize: "0.82rem",
                  fontWeight: 500,
                  color: "rgba(237, 231, 216, 0.72)",
                  textDecoration: "none",
                  padding: "0.45rem 0.9rem",
                  borderRadius: "var(--r-pill)",
                  transition:
                    "color var(--t-fast) var(--ease-soft), background var(--t-fast) var(--ease-soft)",
                }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="/resume.pdf"
          download
          target="_blank"
          rel="noopener noreferrer"
          className="nav-resume"
          style={{
            fontSize: "0.78rem",
            fontWeight: 600,
            color: "#12100b",
            background: "#a8c0b0",
            textDecoration: "none",
            padding: "0.5rem 1.15rem",
            borderRadius: "var(--r-pill)",
            flexShrink: 0,
            transition: "transform var(--t-fast) var(--ease-soft)",
          }}
        >
          Résumé
        </a>
      </nav>

      {/* ── Mobile top bar ── */}
      <nav
        className="nav-mobile-bar"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          display: "none",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.9rem var(--pad-x)",
          backgroundColor: menuOpen ? "rgba(18, 13, 8, 0.96)" : "rgba(28, 22, 15, 0.5)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(237, 231, 216, 0.1)",
          transition: "background-color var(--t-med) var(--ease-soft)",
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "var(--display)",
            fontSize: "1.1rem",
            fontWeight: 500,
            letterSpacing: "0.02em",
            color: "#f4efe2",
            textDecoration: "none",
            zIndex: 201,
          }}
        >
          NP
        </Link>

        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="hamburger"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px",
            color: "#f4efe2",
            zIndex: 201,
            display: "flex",
            alignItems: "center",
          }}
        >
          {menuOpen ? <X size={24} strokeWidth={2} /> : <Menu size={24} strokeWidth={2} />}
        </button>
      </nav>

      {/* Mobile fullscreen drawer */}
      <div
        className="mobile-drawer"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 199,
          background: "var(--soil-4)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 var(--pad-x)",
          transform: menuOpen ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.4s var(--ease-soft)",
        }}
        aria-hidden={!menuOpen}
      >
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {links.map(({ label, href }, i) => (
            <li
              key={href}
              style={{
                borderBottom: "1px solid rgba(237, 231, 216, 0.12)",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(16px)",
                transition: `opacity 0.35s var(--ease-soft) ${i * 0.05 + 0.12}s, transform 0.35s var(--ease-soft) ${i * 0.05 + 0.12}s`,
              }}
            >
              <a
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "1.35rem 0",
                  fontFamily: "var(--display)",
                  fontSize: "clamp(1.7rem, 8vw, 2.4rem)",
                  fontWeight: 400,
                  letterSpacing: "-0.01em",
                  color: "#ede7d8",
                  textDecoration: "none",
                }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div style={{ marginTop: "2.75rem", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          <p
            style={{
              fontFamily: "var(--mono)",
              fontSize: "0.64rem",
              fontWeight: 500,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#9c8f76",
              marginBottom: "0.4rem",
            }}
          >
            Get in touch
          </p>
          <a href="/resume.pdf" download target="_blank" rel="noopener noreferrer" style={drawerLink}>
            Download résumé
          </a>
          <a href={`mailto:${CONTACT.email}`} style={drawerLink}>
            {CONTACT.email}
          </a>
          <a href="https://github.com/nitishpoonia" target="_blank" rel="noopener noreferrer" style={{ ...drawerLink, color: "#9c8f76" }}>
            github.com/nitishpoonia
          </a>
        </div>
      </div>

      <style>{`
        .nav-link:hover {
          color: #f4efe2 !important;
          background: rgba(237, 231, 216, 0.1);
        }
        .nav-resume:hover { transform: translateY(-1px); }
        @media (min-width: 769px) {
          .nav-mobile-bar { display: none !important; }
          .mobile-drawer  { display: none !important; }
        }
        @media (max-width: 768px) {
          .nav-desktop-pill { display: none !important; }
          .nav-mobile-bar   { display: flex !important; }
        }
      `}</style>
    </>
  );
}

const drawerLink = {
  fontSize: "0.9rem",
  fontWeight: 500,
  color: "#ede7d8",
  textDecoration: "none",
};
