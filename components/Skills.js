'use client';
import SectionHeader from './SectionHeader';

// ── Update these arrays to add/remove skills ──────────────────────────────────
const proficient = [
  'React Native','React','Next.js','Figma',
  'Tailwind CSS','React Query','Redux Saga',
  'Async Storage','Firebase Notifications',
];
const familiar = [
  'Node.js','Express','MongoDB',
  'PostgreSQL','Render','Supabase',
];

function Pill({ label, solid }) {
  return (
    <span
      onMouseEnter={e => {
        e.currentTarget.style.background = 'var(--ink)';
        e.currentTarget.style.color = 'var(--bg)';
        e.currentTarget.style.borderColor = 'var(--ink)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = solid ? 'var(--ink)' : 'transparent';
        e.currentTarget.style.color = solid ? 'var(--bg)' : 'var(--mid)';
        e.currentTarget.style.borderColor = solid ? 'var(--ink)' : 'var(--border)';
      }}
      style={{
        display: 'inline-block',
        padding: '0.5rem 1.1rem',
        border: '1.5px solid',
        borderColor: solid ? 'var(--ink)' : 'var(--border)',
        background: solid ? 'var(--ink)' : 'transparent',
        color: solid ? 'var(--bg)' : 'var(--mid)',
        fontSize: '0.72rem', fontWeight: 700,
        letterSpacing: '0.08em', textTransform: 'uppercase',
        borderRadius: '2px', cursor: 'default',
        transition: 'all 0.18s ease',
        fontFamily: 'var(--font)',
      }}
    >{label}</span>
  );
}

export default function Skills() {
  return (
    <section id="skills" style={{
      borderBottom: '1px solid var(--border)',
      padding: 'var(--pad-y) var(--pad-x)',
      maxWidth: 'var(--max)', margin: '0 auto',
    }}>
      <SectionHeader
        label="Tech Stack"
        title="Skills"
        subtitle="Tools I reach for every day, and tools I know well enough to ship with."
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        <div>
          <p style={{
            fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.18em',
            textTransform: 'uppercase', color: 'var(--ink)', marginBottom: '1rem',
          }}>Proficient</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            {proficient.map(s => <Pill key={s} label={s} solid />)}
          </div>
        </div>

        <div>
          <p style={{
            fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.18em',
            textTransform: 'uppercase', color: 'var(--mid)', marginBottom: '1rem',
          }}>Familiar</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            {familiar.map(s => <Pill key={s} label={s} solid={false} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
