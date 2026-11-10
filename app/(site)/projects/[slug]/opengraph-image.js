import { shareCard, OG_SIZE } from "@/lib/og";
import { getProjectBySlug } from "@/lib/project";

// This case study's link-preview card.
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Case study by Nitish Poonia";

export default async function Image({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  const meta = project ? [project.company, project.timeline].filter(Boolean).join(" · ") : "";
  return shareCard({
    eyebrow: meta ? `Case study · ${meta}` : "Case study",
    title: project?.title || "Nitish Poonia",
    footer: "Nitish Poonia",
  });
}
