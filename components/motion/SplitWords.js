// Splits a headline into words that rise in one after another (see .split in globals.css).
// Real spaces stay between the words, so screen readers and copy/paste read it normally.
export default function SplitWords({ text, delay = 0 }) {
  if (typeof text !== "string") return text;
  const words = text.split(" ");
  return words.map((w, i) => (
    <span key={i}>
      <span className="w"><span style={{ "--i": i, "--d": `${delay}s` }}>{w}</span></span>
      {i < words.length - 1 ? " " : null}
    </span>
  ));
}
