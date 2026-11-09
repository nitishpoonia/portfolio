import SplitWords from "@/components/motion/SplitWords";
// Shared header for inner pages: icon tile + eyebrow, big title, one-line lede.
export default function PageHeader({ icon: Icon, eyebrow, title, lede, children }) {
  return (
    <header className="page-head">
      {(Icon || eyebrow) && (
        <span className="eyebrow-row">
          {Icon && <span className="icon-tile" aria-hidden="true"><Icon size={20} strokeWidth={1.8} /></span>}
          {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        </span>
      )}
      <h1 className="split"><SplitWords text={title} /></h1>
      {lede && <p className="page-lede">{lede}</p>}
      {children}
    </header>
  );
}
