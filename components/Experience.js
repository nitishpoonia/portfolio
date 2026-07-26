import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

const experiences = [
  {
    company: "Arthtech Supports",
    role: "Software Developer",
    period: "Mar 2026 – Present",
    responsibilities: [
      "Built an AI chat module into GoalMogul, an existing production React app, using the OpenAI API to take a user from a stated goal to an accountability partner chosen from their contacts.",
      "Replaced scattered fetch calls with a single axios client and a token-refresh interceptor, removing duplicate and dead requests and the auth token being attached by hand in every call.",
      "On MDR, a React Native medical records app, built a security flow for repeated failed logins — on the next successful login the user sees the attempt and can end all other sessions and reset their password.",
      "Traced paying users being blocked from the face-scan vitals module to a subscription gate implemented inconsistently across the app, and made a single gate authoritative.",
      "Wrote signup, login, emailed-token password reset and profile CRUD endpoints in Express and PostgreSQL, with bcrypt hashing and Redis-backed rate limiting.",
      "Mentor a junior frontend developer and set branching and commit conventions for a three-developer frontend team.",
    ],
  },
  {
    company: "Vision Vivante",
    role: "Software Developer",
    period: "Dec 2024 – Feb 2026",
    responsibilities: [
      "Sole developer on an NFC time tracking app, used daily by around 20 staff and live on the App Store — every structural decision, from folder layout to libraries, was mine.",
      "Wrote native iOS and Android modules so shift timing survived device clock changes, and queued scans on-device where facilities had no network.",
      "Built the booking frontend for a multi-supplier hotel app — search, filtering, guest details, Google sign-in — and integrated Stripe for one-off payments.",
      "Built a social feed for an agriculture lecturer and his students: infinite scroll, likes and comments with React Query optimistic updates, and polled messaging.",
    ],
  },
  {
    company: "Freelance",
    role: "Web Developer",
    period: "2025 – Present",
    responsibilities: [
      {
        url: "https://nivasaantarika.in",
        host: "nivasaantarika.in",
        text: " — Next.js site for an interior designer, with Sanity as the CMS so she edits her own content without a developer.",
      },
      {
        url: "https://keshavpackersmovers.com",
        host: "keshavpackersmovers.com",
        text: " — designed in Figma and approved with the client, then built with on-page SEO and an enquiry form that emails through.",
      },
    ],
  },
];

function ExperienceRow({ entry, isLast, index }) {
  return (
    <Reveal delay={index * 0.05}>
      <div
        className="exp-row"
        style={{
          display: "grid",
          gridTemplateColumns: "clamp(150px, 20%, 220px) 1fr",
          gap: "clamp(1.5rem, 4vw, 4rem)",
          padding: "clamp(2rem, 4vw, 3.25rem) 0",
          borderBottom: isLast ? "none" : "1px solid var(--sec-line)",
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "var(--mono)",
              fontSize: "0.68rem",
              fontWeight: 500,
              letterSpacing: "0.08em",
              color: "var(--sec-mid)",
              marginBottom: "0.4rem",
            }}
          >
            {entry.period}
          </p>
          <p
            style={{
              fontSize: "0.95rem",
              fontWeight: 600,
              color: "var(--sec-ink)",
              letterSpacing: "-0.01em",
            }}
          >
            {entry.company}
          </p>
        </div>

        <div>
          <h3
            style={{
              fontFamily: "var(--display)",
              fontSize: "clamp(1.25rem, 2.2vw, 1.7rem)",
              fontWeight: 500,
              letterSpacing: "-0.01em",
              color: "var(--sec-ink)",
              marginBottom: "1.4rem",
            }}
          >
            {entry.role}
          </h3>

          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: "0.9rem",
            }}
          >
            {entry.responsibilities.map((r, i) => (
              <li
                key={i}
                style={{
                  fontSize: "clamp(0.9rem, 1.2vw, 0.98rem)",
                  color: "var(--sec-mid)",
                  lineHeight: 1.7,
                  display: "flex",
                  gap: "0.85rem",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    flexShrink: 0,
                    width: "5px",
                    height: "5px",
                    borderRadius: "var(--r-pill)",
                    background: "var(--sec-accent)",
                    marginTop: "0.6em",
                  }}
                />
                {typeof r === "string" ? (
                  <span>{r}</span>
                ) : (
                  <span>
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="exp-link"
                    >
                      {r.host}
                    </a>
                    {r.text}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}

export default function Experience() {
  return (
    <>
      <SectionHeader label="Career" title="Where I've worked" />
      {experiences.map((e, i) => (
        <ExperienceRow
          key={e.company + e.period}
          entry={e}
          index={i}
          isLast={i === experiences.length - 1}
        />
      ))}
      <style>{`
        .exp-link {
          color: var(--sec-ink);
          font-weight: 600;
          text-decoration: underline;
          text-decoration-color: var(--sec-accent);
          text-underline-offset: 3px;
          text-decoration-thickness: 1.5px;
          transition: color var(--t-fast) var(--ease-soft);
        }
        .exp-link:hover { color: var(--sec-accent); }
        @media (max-width: 640px) {
          .exp-row { grid-template-columns: 1fr !important; gap: 1rem !important; }
        }
      `}</style>
    </>
  );
}
