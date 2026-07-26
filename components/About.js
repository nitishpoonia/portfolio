import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import Image from "next/image";

export default function About() {
  return (
    <>
      <div
        className="about-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.15fr",
          gap: "clamp(2rem, 6vw, 5rem)",
          alignItems: "start",
        }}
      >
        <div>
          <SectionHeader label="Off screen" title="Code & Soil" />
          <Reveal delay={0.1}>
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "220px",
                aspectRatio: "3 / 4",
                overflow: "hidden",
                borderRadius: "var(--r-lg)",
                border: "1px solid var(--sec-line)",
              }}
            >
              <Image
                src="/assets/Untitled-design.png"
                alt="Nitish Poonia"
                fill
                sizes="220px"
                style={{ objectFit: "cover", objectPosition: "center top" }}
              />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.08}>
          <blockquote
            style={{
              margin: 0,
              fontFamily: "var(--display)",
              fontSize: "clamp(1.4rem, 2.8vw, 2.1rem)",
              fontWeight: 300,
              fontStyle: "italic",
              lineHeight: 1.4,
              letterSpacing: "-0.01em",
              color: "var(--sec-ink)",
              textWrap: "balance",
            }}
          >
            When the screen stops making sense, the soil starts to. On those days
            you&apos;ll find me tending earthworms, coaxing vegetables from the
            ground, or shaping clay into something that didn&apos;t exist before.
          </blockquote>

          <p
            style={{
              marginTop: "clamp(1.5rem, 3vw, 2rem)",
              fontSize: "clamp(1rem, 1.6vw, 1.15rem)",
              fontWeight: 400,
              lineHeight: 1.75,
              color: "var(--sec-mid)",
              maxWidth: "48ch",
            }}
          >
            Writing code and working with living systems are, in the end, the same
            discipline — patience, iteration, and care for the thing you&apos;re
            building.
          </p>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
