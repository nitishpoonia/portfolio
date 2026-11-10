import { shareCard, OG_SIZE } from "@/lib/og";

// Site-wide link-preview card (home and any page without its own). Edit the text here.
export const alt = "Nitish Poonia, software developer building mobile, web and AI products";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpengraphImage() {
  return shareCard({
    eyebrow: "Open to full-time roles",
    title: "Nitish Poonia",
    subtitle: "Software developer building mobile, web and AI products",
    footer: "Mobile · Web · AI",
  });
}
