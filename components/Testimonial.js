import SectionHeader from './SectionHeader';

export default function Testimonial() {
  return (
    <section id="testimonial" style={{
      borderBottom: '1px solid var(--border)',
      background: '#f0efe9',
      padding: 'var(--pad-y) var(--pad-x)',
    }}>
      <div style={{ maxWidth: 'var(--max)', margin: '0 auto' }}>
        <SectionHeader label="Reference" title="What they said." />

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gap: 'clamp(2rem, 5vw, 6rem)',
          alignItems: 'start',
        }}>
          {/* Source */}
          <div style={{
            borderTop: '2px solid var(--ink)',
            paddingTop: '1.25rem',
          }}>
            <p style={{
              fontSize: '0.8rem', fontWeight: 800,
              color: 'var(--ink)', marginBottom: '0.25rem',
            }}>Vision Vivante</p>
            <p style={{
              fontSize: '0.7rem', color: 'var(--mid)',
              lineHeight: 1.6,
            }}>Experience Letter</p>
          </div>

          {/* Quote */}
          <blockquote style={{ borderLeft: '3px solid var(--ink)', paddingLeft: '2rem' }}>
            <p style={{
              fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
              fontWeight: 300, lineHeight: 1.8,
              color: 'var(--ink)',
            }}>
              During his time with Vision Vivante, Nitish Poonia remained dedicated
              and loyal to his work and responsibilities. He has done an exemplary
              job while in this role, maintaining a professional and courteous
              attitude throughout.
            </p>
            <p style={{
              marginTop: '1rem',
              fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
              fontWeight: 300, lineHeight: 1.8,
              color: 'var(--mid)',
            }}>
              On behalf of Vision Vivante, I wholeheartedly recommend Nitish Poonia
              for any future role he may seek. His positive attitude, dedication, and
              exemplary performance make him an invaluable asset to any organisation.
            </p>
          </blockquote>
        </div>

        <style>{`
          @media (max-width: 768px) {
            #testimonial > div > div[style*="grid-template-columns"] {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
