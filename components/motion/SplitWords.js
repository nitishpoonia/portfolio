// Splits a headline into words that rise in one after another (see .split in app/styles/motion.css).
// Real spaces stay between the words, so screen readers and copy/paste read it normally.
// `start` offsets the stagger when a headline is split across several SplitWords.
export default function SplitWords({ text, start = 0 }) {
  if (typeof text !== "string") return text;
  const words = text.split(" ");
  return words.map((w, i) => (
    <span key={i}>
      <span className="w"><span style={{ "--i": start + i }}>{w}</span></span>
      {i < words.length - 1 ? " " : null}
    </span>
  ));
}
