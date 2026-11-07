// Shared header for inner pages: eyebrow, big title, one-line lede.
export default function PageHeader({ eyebrow, title, lede, children }) {
  return (
    <header className="page-head">
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h1>{title}</h1>
      {lede && <p className="page-lede">{lede}</p>}
      {children}
    </header>
  );
}
