/**
 * A single stratum of the soil profile. Applies the depth band (0 = surface,
 * 5 = deepest) which paints the background + text and exposes the --sec-* tokens
 * that all child components read. Server component — no client JS needed.
 */
export default function Stratum({
  depth = 0,
  id,
  children,
  contain = true,
  style,
  ...rest
}) {
  return (
    <section
      id={id}
      className={`band band-${depth}`}
      style={{ position: "relative", ...style }}
      {...rest}
    >
      {contain ? (
        <div
          style={{
            maxWidth: "var(--max)",
            margin: "0 auto",
            padding: "var(--pad-y) var(--pad-x)",
          }}
        >
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  );
}
