import Navbar from "@/components/NavBar";
import BackButton from "@/components/BackButton";

export const metadata = {
  title: "Uses — Nitish Poonia",
  description:
    "The editor, terminal, hardware and tools Nitish Poonia uses day to day for React Native and Next.js development.",
  alternates: { canonical: "https://nitishpoonia.in/uses" },
  openGraph: {
    title: "Uses — Nitish Poonia",
    description:
      "The editor, terminal, hardware and tools Nitish Poonia uses day to day.",
    url: "https://nitishpoonia.in/uses",
    type: "website",
    siteName: "Nitish Poonia",
  },
};

const SECTIONS = [
  {
    label: "Editor & Terminal",
    items: [
      { name: "VS Code", note: "primary editor" },
      { name: "iTerm2", note: "terminal" },
      { name: "zsh", note: "shell" },
    ],
  },
  {
    label: "Hardware",
    items: [
      { name: "MacBook Air, M2", note: "daily driver" },
      { name: "Acer monitor", note: "external display" },
      { name: "Logitech keyboard & mouse", note: "desk setup" },
    ],
  },
  {
    label: "Dev Stack & Tools",
    items: [
      { name: "React Native · Next.js", note: "frontend" },
      { name: "Node · PostgreSQL", note: "backend" },
      { name: "Postman", note: "API testing" },
      { name: "pgAdmin", note: "database browsing" },
    ],
  },
  {
    label: "Productivity",
    items: [
      { name: "Notion", note: "notes" },
      { name: "Todoist", note: "tasks" },
      { name: "Chrome", note: "browser" },
    ],
  },
];

export default function UsesPage() {
  return (
    <>
      <Navbar />
      <main className="band band-0" style={{ minHeight: "100vh" }}>
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            padding: "calc(var(--pad-y) + 4rem) var(--pad-x) var(--pad-y)",
          }}
        >
          <BackButton />

          <p
            style={{
              fontFamily: "var(--mono)",
              fontSize: "0.66rem",
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--sec-mid)",
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
            }}
          >
            <span
              aria-hidden="true"
              style={{ width: "18px", height: "1px", background: "var(--sec-accent)" }}
            />
            Uses
          </p>
          <h1
            style={{
              fontFamily: "var(--display)",
              fontSize: "clamp(2.3rem, 5.5vw, 4.2rem)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              lineHeight: 1.02,
              color: "var(--sec-ink)",
              marginBottom: "1.4rem",
              textWrap: "balance",
            }}
          >
            What I use
          </h1>
          <p
            style={{
              fontSize: "clamp(1.05rem, 1.7vw, 1.25rem)",
              lineHeight: 1.7,
              color: "var(--sec-ink)",
              maxWidth: "58ch",
            }}
          >
            The editor, hardware and tools behind the projects on this site.
          </p>

          <div
            style={{
              marginTop: "clamp(2.5rem, 5vw, 3.5rem)",
              display: "flex",
              flexDirection: "column",
              gap: "clamp(2rem, 4vw, 2.75rem)",
            }}
          >
            {SECTIONS.map(({ label, items }) => (
              <div key={label}>
                <h2
                  style={{
                    fontFamily: "var(--display)",
                    fontSize: "clamp(1.15rem, 2.2vw, 1.5rem)",
                    fontWeight: 400,
                    letterSpacing: "-0.01em",
                    color: "var(--sec-ink)",
                    marginBottom: "1rem",
                  }}
                >
                  {label}
                </h2>
                <div
                  style={{
                    background: "var(--sec-card)",
                    border: "1px solid var(--sec-line)",
                    borderRadius: "var(--r-lg)",
                    boxShadow: "var(--sec-shadow)",
                  }}
                >
                  {items.map(({ name, note }, i) => (
                    <div
                      key={name}
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "0.5rem 1.5rem",
                        justifyContent: "space-between",
                        padding: "0.95rem 1.5rem",
                        borderTop: i === 0 ? "none" : "1px solid var(--sec-line)",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "0.98rem",
                          fontWeight: 500,
                          color: "var(--sec-ink)",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {name}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--mono)",
                          fontSize: "0.66rem",
                          fontWeight: 500,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "var(--sec-mid)",
                        }}
                      >
                        {note}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
