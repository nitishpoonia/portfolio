// Content for the Story page and the home page.
// Photos: drop an image into /public/photos and set `photo: "/photos/name.jpg"`.
// A chapter or collage slot with no photo simply renders without one.

export const CHAPTERS = [
  {
    big: "2024",
    when: "Dec 2024",
    title: "Vision Vivante: my first real codebase",
    text: "I joined as a software developer and was the sole developer on an NFC attendance system whose shift clock can't be gamed by changing the phone's time.",
    built: ["React Native", "NFC", "Offline Sync"],
    photo: null,
  },
  {
    big: "2025",
    when: "2025",
    title: "Hotel bookings, a farmer’s feed, and my first posts",
    text: "A hotel booking frontend with Stripe checkout, and a social feed for an agriculture lecturer and his students. I also started writing up what broke: FlatList performance, pagination, image loading.",
    built: ["Stripe", "React Query", "Google Sign-In"],
    photo: null,
  },
  {
    big: "Dec",
    when: "Dec 2025",
    title: "A product with a friend",
    text: "A library management SaaS: seat management for self-study centres, with seats matched against shift times. I built the Node and PostgreSQL backend. It is paused for now.",
    built: ["Node.js", "Express", "PostgreSQL"],
    photo: null,
  },
  {
    big: "2026",
    when: "2026",
    title: "Websites for real clients",
    text: "Next.js sites for an interior design studio, built with Sanity so their team edits content themselves, and for a packers-and-movers business.",
    built: ["Next.js", "Sanity", "Tailwind CSS"],
    photo: null,
  },
  {
    big: "Mar",
    when: "Mar 2026",
    title: "Arthtech Supports",
    text: "I own the biometric feature end to end, work on MDR, MPR and Arogya Scan, and make builds for the rest of the team.",
    built: ["React Native", "iOS", "Android"],
    photo: null,
  },
  {
    big: "Now",
    when: "Late 2026",
    title: "Moving into AI engineering",
    text: "I'm learning Python by building something real: a health claims assistant that answers member queries from synthetic FHIR patient records and flags the cases a human should see.",
    built: ["Python", "FastAPI", "Pydantic", "FHIR R4"],
    photo: null,
  },
];

// The "Now building" card on the home page. Set to null to hide it.
export const NOW_BUILDING = {
  title: "Health claims assistant",
  text: "A Python service that handles insurance member queries. It reads synthetic patient records in FHIR R4, the format hospitals and insurers exchange, answers the routine questions, and flags or escalates the rest for human review.",
  points: [
    "FastAPI backend with Pydantic models over Synthea-generated patients",
    "Exact checks live in code; the model handles understanding and wording",
    "Built for the business side: review queues and escalation, not a chatbot",
  ],
  tags: ["Python", "FastAPI", "Pydantic", "FHIR R4", "LLMs"],
  href: null, // add the GitHub link once the repo is public
};

export const SKILLS = [
  { label: "Mobile", items: ["React Native", "Native iOS/Android module bridging", "NFC", "Offline queueing", "Async Storage", "React Query", "App Store & Play Store releases"] },
  { label: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "REST APIs", "On-page SEO"] },
  { label: "Backend", items: ["Node.js", "Express", "PostgreSQL", "Redis", "bcrypt", "REST API design"] },
  { label: "AI & Python", items: ["Python", "FastAPI", "Pydantic", "uv", "LLM APIs", "FHIR R4 data"] },
  { label: "Integrations", items: ["Stripe", "OpenAI API", "Sanity CMS", "Google Sign-In"] },
  { label: "Tools", items: ["Git", "GitHub", "Render", "Vercel", "Figma", "Cursor"] },
];

// Tilted photos under the hero. Empty = section is hidden.
export const COLLAGE = [
  // { src: "/photos/one.jpg", alt: "…", tilt: -3 },
];

export const SOCIAL = [
  { label: "GitHub", href: "https://github.com/nitishpoonia" },
  { label: "YouTube", href: "https://www.youtube.com/@nitishpoonia" },
];
