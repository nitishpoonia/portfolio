"use client";
import { useEffect, useState } from "react";
import HireButton from "./HireButton";

const roles = [
  "Available for new projects",
  "Building cross-platform apps",
  "Turning ideas into products",
  "Shipping in weeks, not months",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = roles[roleIndex];
    let timeout;

    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(
        () => setDisplayed(target.slice(0, displayed.length + 1)),
        65,
      );
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((roleIndex + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        borderBottom: "1px solid var(--border)",
      }}
    >
      {/* ── LEFT: Facts panel ── */}
      <div
        className="hero-facts"
        style={{
          borderRight: "1px solid var(--border)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding:
            "clamp(1.5rem, 5vw, 9rem) var(--pad-x) clamp(2.5rem, 5vw, 4rem)",
        }}
      >
        <p
          style={{
            fontSize: "clamp(0.85rem, 1.3vw, 1rem)",
            fontWeight: 300,
            lineHeight: 1.85,
            color: "var(--mid)",
            maxWidth: "34ch",
            marginBottom: "clamp(2rem, 4vw, 3rem)",
          }}
        >
          I build mobile and web products for startups and small businesses —
          from first conversation to live in the App Store.
        </p>

        {[
          { label: "Experience", value: "2+ Year" },
          { label: "Apps shipped", value: "3 Production apps" },
          { label: "Stack", value: "React Native · Next.js. · Node.js" },
          { label: "Availability", value: "Open to projects" },
        ].map(({ label, value }) => (
          <div
            key={label}
            style={{
              borderTop: "1px solid var(--border)",
              padding: "1rem 0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              gap: "1rem",
            }}
          >
            <span
              style={{
                fontSize: "0.63rem",
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--mid)",
                flexShrink: 0,
              }}
            >
              {label}
            </span>
            <span
              style={{
                fontSize: "0.82rem",
                fontWeight: 700,
                color: "var(--ink)",
                letterSpacing: "-0.01em",
                textAlign: "right",
              }}
            >
              {value}
            </span>
          </div>
        ))}
      </div>

      <div
        className="hero-text"
        style={{
          display: "flex",
          flexDirection: "column",
          padding:
            "clamp(1.5rem, 5vw, 9rem) var(--pad-x) clamp(2.5rem, 5vw, 4rem)",
        }}
      >
        <p
          className="fade-up delay-1"
          style={{
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--mid)",
            marginBottom: "1.2rem",
          }}
        >
          AI-Augmented Developer
        </p>

        <h1
          className="fade-up delay-2"
          style={{
            fontSize: "clamp(3.2rem, 6.5vw, 7rem)",
            fontWeight: 900,
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            color: "var(--ink)",
            marginBottom: "clamp(1.5rem, 4vw, 3rem)",
          }}
        >
          Nitish
          <br />
          Poonia
        </h1>

        {/* Typewriter */}
        <div
          className="fade-up delay-3"
          style={{
            borderTop: "1px solid var(--border)",
            paddingTop: "1.5rem",
          }}
        >
          <p
            style={{
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--mid)",
              marginBottom: "0.6rem",
            }}
          >
            Currently
          </p>
          <p
            style={{
              fontSize: "clamp(1.1rem, 2.2vw, 1.6rem)",
              fontWeight: 700,
              color: "var(--ink)",
              minHeight: "2.2em",
              letterSpacing: "-0.01em",
            }}
          >
            {displayed}
            <span className="cursor" />
          </p>
        </div>

        {/* Scroll hint */}
        <div className="fade-up delay-4" style={{ marginTop: "2.5rem" }}>
          <HireButton size="md" label="Start a project" />
        </div>

        <p
          style={{
            marginTop: "1.5rem",
            fontSize: "0.6rem",
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--mid)",
          }}
        >
          Scroll to explore ↓
        </p>
      </div>

      {/* Responsive: stack on mobile */}
      <style>{`
      .hero-text {
    justify-content: flex-end; /* default = laptop */
  }
  @media (max-width: 768px) {

.hero-text {
      justify-content: flex-start;
    }

  #hero {
    grid-template-columns: 1fr !important;
  }

  #hero > div:first-child {
    border-right: none !important;
    border-bottom: 1px solid var(--border);
    padding: 1.5rem var(--pad-x) 1.5rem !important;
    justify-content: flex-start !important;
  }

  #hero > div:last-child {
    padding: 1.5rem var(--pad-x) 2rem !important;
    justify-content: flex-start !important;

  }

  /* ← Add these two */
  #hero h1 {
    margin-bottom: 1rem !important;
    font-size: clamp(2.4rem, 10vw, 3.5rem) !important;
  }

  #hero .fade-up.delay-3 {
    padding-top: 1rem !important;
  }
}
`}</style>
    </section>
  );
}
