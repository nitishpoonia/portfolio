import HireButton from "./HireButton";

export default function HireStrip() {
  return (
    <section
      style={{
        borderBottom: "1px solid var(--border)",
        background: "var(--ink)",
        padding: "clamp(3rem, 6vw, 5rem) var(--pad-x)",
      }}
    >
      <div
        style={{
          maxWidth: "var(--max)",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "2rem",
          flexWrap: "wrap",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(247,246,242,0.4)",
              marginBottom: "0.75rem",
            }}
          >
            Have a product to build?
          </p>

          <h2
            style={{
              fontSize: "clamp(1.5rem, 3.5vw, 2.8rem)",
              fontWeight: 900,
              letterSpacing: "-0.03em",
              lineHeight: 1,
              color: "var(--bg)",
            }}
          >
            Your idea deserves to ship.
          </h2>
        </div>

        {/* Reusable CTA */}
        <HireButton size="md" label="WhatsApp me" variant="inverted" />
      </div>
    </section>
  );
}
