"use client";
import { useEffect, useState } from "react";
import HireButton from "./HireButton";

const roles = [
  "Software Engineer",
  "React Native Developer",
  "Full-Stack Builder",
  "Vermiculturist",
  "Vegetable Grower",
  "Sculptor",
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
      {/* ── LEFT: Portrait ── */}
      <div
        style={{
          borderRight: "1px solid var(--border)",
          position: "relative",
          overflow: "hidden",
          minHeight: "100vh",
          background: "#eeede8",
        }}
      >
        {/*
          ┌──────────────────────────────────────────────────────┐
          │  TO ADD YOUR PHOTO:                                  │
          │  1. Put portrait.jpg in /public/                     │
          │  2. Replace the placeholder div below with:         │
          │                                                      │
          │  import Image from 'next/image'                      │
          │  <Image src="/portrait.jpg" alt="Nitish Poonia"      │
          │    fill style={{ objectFit:'cover',                  │
          │    objectPosition:'center top' }} />                 │
          └──────────────────────────────────────────────────────┘
        */}
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            style={{ opacity: 0.18 }}
          >
            <circle cx="60" cy="42" r="24" fill="#0d0d0d" />
            <ellipse cx="60" cy="105" rx="44" ry="30" fill="#0d0d0d" />
          </svg>
        </div>

        <span
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "2rem",
            fontSize: "0.6rem",
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--mid)",
          }}
        >
          Portrait
        </span>
      </div>

      {/* ── RIGHT: Name + Typewriter ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding:
            "clamp(5rem, 10vw, 9rem) var(--pad-x) clamp(2.5rem, 5vw, 4rem)",
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
          Based in India
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
          <HireButton size="md" />
        </div>

        <p
          style={{
            marginTop: "1.5rem",
            fontSize: "0.6rem",
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--faint)",
          }}
        >
          Scroll to explore ↓
        </p>
      </div>

      {/* Responsive: stack on mobile */}
      <style>{`
        @media (max-width: 768px) {
          #hero {
            grid-template-columns: 1fr !important;
          }
          #hero > div:first-child {
            min-height: 55vw !important;
            border-right: none !important;
            border-bottom: 1px solid var(--border);
          }
        }
      `}</style>
    </section>
  );
}
