import { shareCard, OG_SIZE } from "@/lib/og";
import { getSiteContent } from "@/lib/site-content";

// Site-wide link-preview card (home and any page without its own). Edit the text here.
export const alt = "Nitish Poonia, software developer building mobile, web and AI products";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function OpengraphImage() {
  const { availability } = await getSiteContent();
  return shareCard({
    eyebrow: availability.open ? availability.label : "Software developer",
    title: "Nitish Poonia",
    subtitle: "Software developer building mobile, web and AI products",
    footer: "Mobile · Web · AI",
  });
}
