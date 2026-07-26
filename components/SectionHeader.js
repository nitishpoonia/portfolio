import Reveal from "./Reveal";

/** Reusable section header — mono eyebrow + Fraunces display title + optional sub. */
export default function SectionHeader({ label, title, subtitle }) {
  return (
    <div style={{ marginBottom: "clamp(2.75rem, 6vw, 4.5rem)" }}>
      {label && (
        <Reveal>
          <p
            style={{
              fontFamily: "var(--mono)",
              fontSize: "0.66rem",
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--sec-mid)",
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: "18px",
                height: "1px",
                background: "var(--sec-accent)",
                display: "inline-block",
              }}
            />
            {label}
          </p>
        </Reveal>
      )}
      <Reveal delay={0.06}>
        <h2
          style={{
            fontFamily: "var(--display)",
            fontSize: "clamp(2.2rem, 5.5vw, 4rem)",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            lineHeight: 1,
            color: "var(--sec-ink)",
            maxWidth: "16ch",
            textWrap: "balance",
          }}
        >
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.12}>
          <p
            style={{
              marginTop: "1.25rem",
              fontSize: "clamp(0.95rem, 1.4vw, 1.1rem)",
              fontWeight: 400,
              color: "var(--sec-mid)",
              lineHeight: 1.7,
              maxWidth: "52ch",
            }}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
