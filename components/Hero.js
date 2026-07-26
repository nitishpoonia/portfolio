"use client";
import { motion, useReducedMotion } from "framer-motion";
import ResumeButton from "./ResumeButton";

const NAME_LINES = ["Nitish", "Poonia"];

const FACTS = [
  { label: "Focus", value: "Mobile & web, end to end" },
  { label: "Stack", value: "React Native · Next.js · Node · Postgres" },
  { label: "Shipped", value: "EDA Time Tracker · App Store" },
  { label: "Availability", value: "Open to full-time roles" },
];

/** One line of the name, revealed by a masked rise from below its own clip. */
function MaskLine({ children, delay, reduce }) {
  if (reduce) {
    return <span style={{ display: "block" }}>{children}</span>;
  }
  return (
    <span style={{ display: "block", overflow: "hidden", paddingBottom: "0.06em" }}>
      <motion.span
        style={{ display: "block", willChange: "transform" }}
        initial={{ y: "108%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

function FadeIn({ children, delay, reduce, style }) {
  return (
    <motion.div
      style={style}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: reduce ? 0 : delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="hero"
      className="band band-0"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        className="hero-grid"
        style={{
          maxWidth: "var(--max)",
          margin: "0 auto",
          width: "100%",
          padding: "clamp(7rem, 14vh, 11rem) var(--pad-x) clamp(3rem, 8vh, 5rem)",
          display: "grid",
          gridTemplateColumns: "1.35fr 1fr",
          gap: "clamp(2.5rem, 6vw, 6rem)",
          alignItems: "end",
        }}
      >
        {/* ── Left: identity ── */}
        <div>
          <FadeIn reduce={reduce} delay={0.05}>
            <p
              style={{
                fontFamily: "var(--mono)",
                fontSize: "0.72rem",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--sec-mid)",
                marginBottom: "1.4rem",
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
              }}
            >
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "var(--r-pill)",
                  background: "var(--sec-accent)",
                  display: "inline-block",
                }}
              />
              Software Developer
            </p>
          </FadeIn>

          <h1
            style={{
              fontFamily: "var(--display)",
              fontSize: "clamp(3.4rem, 11vw, 8.5rem)",
              fontWeight: 400,
              lineHeight: 0.92,
              letterSpacing: "-0.02em",
              color: "var(--sec-ink)",
              margin: "0 0 clamp(1.6rem, 4vw, 2.4rem)",
            }}
          >
            {NAME_LINES.map((line, i) => (
              <MaskLine key={line} delay={0.15 + i * 0.09} reduce={reduce}>
                {line}
              </MaskLine>
            ))}
          </h1>

          <FadeIn reduce={reduce} delay={0.5}>
            <p
              style={{
                fontSize: "clamp(1rem, 1.6vw, 1.2rem)",
                fontWeight: 400,
                lineHeight: 1.7,
                color: "var(--sec-ink)",
                maxWidth: "46ch",
                marginBottom: "0.9rem",
              }}
            >
              I build mobile and web products end to end — React Native and
              Next.js on the front, Node and PostgreSQL behind.
            </p>
            <p
              style={{
                fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
                lineHeight: 1.7,
                color: "var(--sec-mid)",
                maxWidth: "46ch",
                marginBottom: "clamp(2rem, 4vw, 2.75rem)",
              }}
            >
              Most of my work happens inside large existing codebases I
              didn&apos;t write.
            </p>

            <ResumeButton size="md" label="Download résumé" />
          </FadeIn>
        </div>

        {/* ── Right: facts card ── */}
        <FadeIn
          reduce={reduce}
          delay={0.6}
          style={{
            background: "var(--sec-card)",
            border: "1px solid var(--sec-line)",
            borderRadius: "var(--r-lg)",
            padding: "clamp(1.5rem, 3vw, 2.25rem)",
            boxShadow: "var(--sec-shadow)",
            backdropFilter: "blur(2px)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--mono)",
              fontSize: "0.62rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--sec-mid)",
              marginBottom: "1.25rem",
            }}
          >
            At a glance
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {FACTS.map(({ label, value }, i) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.3rem",
                  padding: "0.9rem 0",
                  borderTop: i === 0 ? "none" : "1px solid var(--sec-line)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: "0.6rem",
                    fontWeight: 500,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--sec-mid)",
                  }}
                >
                  {label}
                </span>
                <span
                  style={{
                    fontSize: "0.92rem",
                    fontWeight: 500,
                    color: "var(--sec-ink)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {value}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>

      <style>{`
        @media (max-width: 860px) {
          #hero .hero-grid {
            grid-template-columns: 1fr !important;
            align-items: start !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
