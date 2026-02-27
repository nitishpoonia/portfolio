"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
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

  const navBg = scrolled || menuOpen ? "rgba(247,246,242,0.97)" : "transparent";

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1.1rem var(--pad-x)",
          backgroundColor: navBg,
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom:
            scrolled || menuOpen
              ? "1px solid var(--border)"
              : "1px solid transparent",
          transition: "background-color 0.3s ease, border-color 0.3s ease",
        }}
      >
        {/* Logo */}
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

        {/* Desktop links */}
        <ul
          style={{
            display: "flex",
            gap: "2.5rem",
            listStyle: "none",
            margin: 0,
          }}
          className="nav-desktop"
        >
          {links.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--mid)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--ink)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--mid)")
                }
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Burger button — mobile only */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="hamburger"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px",
            color: "var(--ink)",
            zIndex: 201,
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
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .hamburger   { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-drawer { display: none !important; }
        }
      `}</style>
    </>
  );
}
