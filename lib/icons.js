import { createElement } from "react";
import { Smartphone, Monitor, Server, Sparkles, Plug, Wrench, Globe, Layers } from "lucide-react";

// One icon per skill group (matches SKILLS labels in lib/story.js).
export const SKILL_ICONS = {
  Mobile: Smartphone,
  Frontend: Monitor,
  Backend: Server,
  "AI & Python": Sparkles,
  Integrations: Plug,
  Tools: Wrench,
};

// Pick an icon for a project from its tags.
export function projectIcon(tags = []) {
  const t = tags.join(" ").toLowerCase();
  if (/python|llm|ai\b|openai/.test(t)) return Sparkles;
  if (/react native|ios|android|nfc/.test(t)) return Smartphone;
  if (/next|sanity|tailwind|seo/.test(t)) return Globe;
  if (/node|express|postgres|api/.test(t)) return Server;
  return Layers;
}

// Renders the project's icon (a component so callers don't create one during render).
export function ProjectIcon({ tags, ...props }) {
  return createElement(projectIcon(tags), props);
}
