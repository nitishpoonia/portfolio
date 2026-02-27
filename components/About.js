import SectionHeader from './SectionHeader';

export default function About() {
  return (
    <section id="about" style={{
      borderBottom: '1px solid var(--border)',
      padding: 'var(--pad-y) var(--pad-x)',
      maxWidth: 'var(--max)', margin: '0 auto',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(2rem, 5vw, 6rem)',
        alignItems: 'start',
      }}>
        <SectionHeader
          label="Philosophy"
          title="Code & Soil"
        />

        <div>
          <p style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
            fontWeight: 300,
            lineHeight: 1.75,
            color: 'var(--ink)',
          }}>
            When the screen stops making sense, the soil starts to. On those days
            you&apos;ll find me tending earthworms, coaxing vegetables from the ground,
            or shaping clay into something that didn&apos;t exist before.
          </p>
          <p style={{
            marginTop: '1.25rem',
            fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
            fontWeight: 300,
            lineHeight: 1.75,
            color: 'var(--mid)',
          }}>
            Writing code and working with living systems are, in the end, the same
            discipline — patience, iteration, and care for the thing you&apos;re building.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
