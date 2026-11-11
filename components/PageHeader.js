import SplitWords from "@/components/motion/SplitWords";

// Header for inner pages, on the same two columns as every Band: a small label
// (or anything passed as `rail`) on the left, then the title, lede and actions.
export default function PageHeader({ eyebrow, rail, title, lede, children }) {
  return (
    <header className="page-head">
      <div className="rail">{rail || (eyebrow && <p className="rail-label">{eyebrow}</p>)}</div>
      <div className="page-head-body">
        <h1 className="split"><SplitWords text={title} /></h1>
        {lede && <p className="page-lede">{lede}</p>}
        {children}
      </div>
    </header>
  );
}
