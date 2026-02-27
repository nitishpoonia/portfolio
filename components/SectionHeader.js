// Reusable large section header — prominent H2 + optional sub
export default function SectionHeader({ label, title, subtitle }) {
  return (
    <div style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}>
      {label && (
        <p style={{
          fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.22em',
          textTransform: 'uppercase', color: 'var(--mid)', marginBottom: '1rem',
        }}>{label}</p>
      )}
      <h2 style={{
        fontSize: 'clamp(2.4rem, 5.5vw, 5rem)',
        fontWeight: 900,
        letterSpacing: '-0.03em',
        lineHeight: 0.95,
        color: 'var(--ink)',
        maxWidth: '14ch',
      }}>{title}</h2>
      {subtitle && (
        <p style={{
          marginTop: '1.25rem',
          fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)',
          fontWeight: 400,
          color: 'var(--mid)',
          lineHeight: 1.7,
          maxWidth: '52ch',
        }}>{subtitle}</p>
      )}
    </div>
  );
}
