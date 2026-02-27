'use client';
import SectionHeader from './SectionHeader';

const email  = 'nitishpoonia@zohomail.in';
const github = 'https://github.com/nitishpoonia';

function ContactCard({ href, eyebrow, label, external }) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'var(--ink)';
        e.currentTarget.querySelectorAll('[data-c]').forEach(el => {
          el.style.color = 'rgba(247,246,242,0.5)';
        });
        e.currentTarget.querySelectorAll('[data-main]').forEach(el => {
          el.style.color = 'var(--bg)';
        });
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'transparent';
        e.currentTarget.querySelectorAll('[data-c]').forEach(el => {
          el.style.color = 'var(--mid)';
        });
        e.currentTarget.querySelectorAll('[data-main]').forEach(el => {
          el.style.color = 'var(--ink)';
        });
      }}
      style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        padding: 'clamp(1.5rem, 3vw, 2.5rem)',
        border: '1px solid var(--border)',
        textDecoration: 'none', transition: 'background 0.2s',
      }}
    >
      <span data-c style={{
        fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em',
        textTransform: 'uppercase', color: 'var(--mid)',
        marginBottom: '0.75rem', transition: 'color 0.2s',
      }}>{eyebrow}</span>
      <span data-main style={{
        fontSize: 'clamp(0.85rem, 1.4vw, 1.05rem)',
        fontWeight: 700, color: 'var(--ink)',
        letterSpacing: '-0.01em', wordBreak: 'break-all',
        transition: 'color 0.2s',
      }}>{label} →</span>
    </a>
  );
}

export default function Contact() {
  return (
    <section
      id="contact"
      style={{
        padding: "var(--pad-y) var(--pad-x)",
        maxWidth: "var(--max)",
        margin: "0 auto",
      }}
    >
      <SectionHeader
        label="Get in touch"
        title="Let's work together."
        subtitle="Available for freelance projects, full-time roles, and consulting. Fastest response on WhatsApp."
      />

      <div
        style={{
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <ContactCard
          href={`mailto:${email}`}
          eyebrow="Email"
          label={email}
          external={false}
        />
        <ContactCard
          href={github}
          eyebrow="GitHub"
          label="github.com/nitishpoonia"
          external
        />
      </div>

      {/* Footer */}
      <p
        style={{
          marginTop: "clamp(3rem, 6vw, 5rem)",
          fontSize: "0.62rem",
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--faint)",
          textAlign: "center",
        }}
      >
        Nitish Poonia — {new Date().getFullYear()}
      </p>
    </section>
  );
}
