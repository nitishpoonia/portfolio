// Shown while a page that wasn't built ahead of time (a just-published post) renders.
export default function Loading() {
  return (
    <main id="main" className="page-main page-narrow" aria-busy="true">
      <div className="page-head loading-head" aria-hidden="true">
        <span className="skeleton skeleton-line" style={{ width: "30%" }} />
        <span className="skeleton skeleton-title" />
        <span className="skeleton skeleton-line" style={{ width: "80%" }} />
      </div>
      <p className="sr-only" role="status">Loading…</p>
    </main>
  );
}
