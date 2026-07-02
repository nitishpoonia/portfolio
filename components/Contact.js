'use client';
import SectionHeader from './SectionHeader';
import { CONTACT } from '@/lib/contact';

const email = 'nitishpoonia@zohomail.in';
const waUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`;

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
        title="Let's talk."
        subtitle="Open to full-time roles. Happy to jump on a call, answer questions over email, or send over my resume."
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Resume — primary inverted card */}
        <a
          href="/resume.pdf"
          download
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={e => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = 'var(--border)';
            e.currentTarget.querySelectorAll('[data-c]').forEach(el => { el.style.color = 'var(--mid)'; });
            e.currentTarget.querySelectorAll('[data-main]').forEach(el => { el.style.color = 'var(--ink)'; });
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'var(--ink)';
            e.currentTarget.style.borderColor = 'var(--ink)';
            e.currentTarget.querySelectorAll('[data-c]').forEach(el => { el.style.color = 'rgba(247,246,242,0.45)'; });
            e.currentTarget.querySelectorAll('[data-main]').forEach(el => { el.style.color = 'var(--bg)'; });
          }}
          style={{
            display: 'flex', flexDirection: 'column',
            padding: 'clamp(1.5rem, 3vw, 2.5rem)',
            background: 'var(--ink)',
            border: '1px solid var(--ink)',
            textDecoration: 'none',
            transition: 'background 0.2s, border-color 0.2s',
          }}
        >
          <span data-c style={{
            fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em',
            textTransform: 'uppercase', color: 'rgba(247,246,242,0.45)',
            marginBottom: '0.75rem', transition: 'color 0.2s',
          }}>Resume — PDF</span>
          <span data-main style={{
            fontSize: 'clamp(0.95rem, 1.6vw, 1.2rem)',
            fontWeight: 700, color: 'var(--bg)',
            letterSpacing: '-0.01em', transition: 'color 0.2s',
          }}>Download my resume →</span>
        </a>

        {/* Email + GitHub + WhatsApp — secondary row */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <ContactCard
            href={`mailto:${email}`}
            eyebrow="Email"
            label={email}
            external={false}
          />
          <ContactCard
            href="https://github.com/nitishpoonia"
            eyebrow="GitHub"
            label="github.com/nitishpoonia"
            external
          />
          <ContactCard
            href={waUrl}
            eyebrow="WhatsApp"
            label="Message me"
            external
          />
        </div>
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
