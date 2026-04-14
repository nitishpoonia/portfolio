"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const links = [
  { label: "Projects", href: "/projects" },
  { label: "Design", href: "/design" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/portfolio#about" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

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
          gap: "0",
          background: "rgba(255,255,255,0.55)",
          backdropFilter: "blur(28px) saturate(180%)",
          WebkitBackdropFilter: "blur(28px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.7)",
          borderRadius: "999px",
          padding: "0.45rem 0.5rem 0.45rem 1.15rem",
          boxShadow:
            "0 1px 0 0 rgba(255,255,255,0.6) inset, 0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)",
          whiteSpace: "nowrap",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontSize: "0.82rem",
            fontWeight: 900,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--ink)",
            textDecoration: "none",
            marginRight: "1.75rem",
            flexShrink: 0,
          }}
        >
          NP
        </Link>

        {/* Nav links */}
        <ul
          style={{
            display: "flex",
            gap: "0.15rem",
            listStyle: "none",
            margin: 0,
            padding: 0,
            marginRight: "1.25rem",
          }}
        >
          {links.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                style={{
                  display: "block",
                  fontSize: "0.78rem",
                  fontWeight: 500,
                  letterSpacing: "0.01em",
                  color: "var(--mid)",
                  textDecoration: "none",
                  padding: "0.4rem 0.85rem",
                  borderRadius: "999px",
                  transition: "color 0.2s, background 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--ink)";
                  e.currentTarget.style.background = "rgba(0,0,0,0.06)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--mid)";
                  e.currentTarget.style.background = "transparent";
                }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Hire Me pill button */}
        <Link
          href="/#contact"
          style={{
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.04em",
            color: "rgba(255,255,255,0.95)",
            background: "rgba(10,10,10,0.82)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            textDecoration: "none",
            padding: "0.52rem 1.2rem",
            borderRadius: "999px",
            flexShrink: 0,
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 1px 3px rgba(0,0,0,0.18)",
            transition: "opacity 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.82")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          Hire Me
        </Link>
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
          padding: "1.1rem var(--pad-x)",
          backgroundColor: menuOpen ? "rgba(247,246,242,0.97)" : "transparent",
          backdropFilter: menuOpen ? "blur(12px)" : "none",
          borderBottom: menuOpen
            ? "1px solid var(--border)"
            : "1px solid transparent",
          transition: "background-color 0.3s ease, border-color 0.3s ease",
        }}
      >
        <Link
          href="/"
          style={{
            fontSize: "0.85rem",
            fontWeight: 900,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--ink)",
            textDecoration: "none",
            zIndex: 201,
          }}
        >
          NP
        </Link>

        {/* Burger button */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="hamburger"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px",
            color: "var(--ink)",
            zIndex: 201,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {menuOpen ? (
            <X size={22} strokeWidth={2} />
          ) : (
            <Menu size={22} strokeWidth={2} />
          )}
        </button>
      </nav>

      {/* Mobile fullscreen drawer */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 199,
          background: "var(--bg)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 var(--pad-x)",
          transform: menuOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
        className="mobile-drawer"
      >
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {links.map(({ label, href }, i) => (
            <li
              key={href}
              style={{
                borderBottom: "1px solid var(--border)",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(16px)",
                transition: `opacity 0.3s ease ${i * 0.05 + 0.1}s, transform 0.3s ease ${i * 0.05 + 0.1}s`,
              }}
            >
              <a
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "1.4rem 0",
                  fontSize: "clamp(1.4rem, 6vw, 2rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.02em",
                  color: "var(--ink)",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--mid)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--ink)")
                }
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Bottom contact strip inside drawer */}
        <div style={{ marginTop: "3rem" }}>
          <p
            style={{
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--mid)",
              marginBottom: "0.75rem",
            }}
          >
            Get in touch
          </p>
          <a
            href="mailto:nitishpoonia@zohomail.in"
            style={{
              fontSize: "0.85rem",
              fontWeight: 700,
              color: "var(--ink)",
              textDecoration: "none",
              display: "block",
              marginBottom: "0.4rem",
            }}
          >
            nitishpoonia@zohomail.in
          </a>
          <a
            href="https://github.com/nitishpoonia"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: "0.85rem",
              fontWeight: 700,
              color: "var(--mid)",
              textDecoration: "none",
            }}
          >
            github.com/nitishpoonia
          </a>
        </div>
      </div>

      <style>{`
        @media (min-width: 769px) {
          .nav-mobile-bar { display: none !important; }
          .mobile-drawer  { display: none !important; }
          .hamburger      { display: none !important; }
        }
        @media (max-width: 768px) {
          .nav-desktop-pill { display: none !important; }
          .nav-mobile-bar   { display: flex !important; }
        }
      `}</style>
    </>
  );
}
