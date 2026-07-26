"use client";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";
import { CONTACT } from "@/lib/contact";

const waUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
  CONTACT.whatsappMessage
)}`;

function ContactCard({ href, eyebrow, label, external }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="contact-card"
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "0.6rem",
        padding: "clamp(1.4rem, 3vw, 2rem)",
        background: "var(--sec-card)",
        border: "1px solid var(--sec-line)",
        borderRadius: "var(--r-lg)",
        textDecoration: "none",
        transition:
          "transform var(--t-med) var(--ease-soft), background var(--t-med) var(--ease-soft), border-color var(--t-med) var(--ease-soft)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--mono)",
          fontSize: "0.62rem",
          fontWeight: 500,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "var(--sec-mid)",
        }}
      >
        {eyebrow}
      </span>
      <span
        style={{
          fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)",
          fontWeight: 500,
          color: "var(--sec-ink)",
          letterSpacing: "-0.01em",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.75rem",
        }}
      >
        <span style={{ minWidth: 0, overflowWrap: "anywhere" }}>{label}</span>
        <span
          className="contact-arrow"
          aria-hidden="true"
          style={{ flexShrink: 0, color: "var(--sec-accent)" }}
        >
          →
        </span>
      </span>
    </a>
  );
}

export default function Contact() {
  return (
    <>
      <SectionHeader
        label="Get in touch"
        title="Let's talk"
        subtitle="Open to full-time roles. Happy to jump on a call, answer questions over email, or send my résumé."
      />

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Reveal>
          <a
            href="/resume.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
            className="contact-resume"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.6rem",
              padding: "clamp(1.6rem, 3vw, 2.4rem)",
              background: "var(--sec-accent)",
              border: "1px solid var(--sec-accent)",
              borderRadius: "var(--r-lg)",
              textDecoration: "none",
              transition: "transform var(--t-med) var(--ease-soft), box-shadow var(--t-med) var(--ease-soft)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--mono)",
                fontSize: "0.62rem",
                fontWeight: 500,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--sec-bg)",
                opacity: 0.72,
              }}
            >
              Résumé — PDF
            </span>
            <span
              style={{
                fontSize: "clamp(1rem, 1.7vw, 1.25rem)",
                fontWeight: 600,
                color: "var(--sec-bg)",
                letterSpacing: "-0.01em",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
              }}
            >
              Download my résumé
              <span className="contact-arrow" aria-hidden="true">→</span>
            </span>
          </a>
        </Reveal>

        <Reveal delay={0.06}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <ContactCard href={`mailto:${CONTACT.email}`} eyebrow="Email" label={CONTACT.email} />
            <ContactCard
              href="https://github.com/nitishpoonia"
              eyebrow="GitHub"
              label="github.com/nitishpoonia"
              external
            />
            <ContactCard href={waUrl} eyebrow="WhatsApp" label="Message me" external />
          </div>
        </Reveal>
      </div>

      <p
        style={{
          marginTop: "clamp(3.5rem, 7vw, 6rem)",
          fontFamily: "var(--mono)",
          fontSize: "0.62rem",
          fontWeight: 500,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--sec-mid)",
          textAlign: "center",
        }}
      >
        Nitish Poonia — {new Date().getFullYear()}
      </p>

      <style>{`
        .contact-card:hover {
          transform: translateY(-3px);
          background: var(--sec-card-hover);
          border-color: var(--sec-accent);
        }
        .contact-resume:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.35);
        }
        .contact-arrow { transition: transform var(--t-fast) var(--ease-soft); }
        .contact-card:hover .contact-arrow,
        .contact-resume:hover .contact-arrow { transform: translateX(4px); }
        @media (prefers-reduced-motion: reduce) {
          .contact-card:hover, .contact-resume:hover { transform: none; }
        }
      `}</style>
    </>
  );
}
