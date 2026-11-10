import { shareCard, OG_SIZE } from "@/lib/og";
import { getPostBySlug } from "@/lib/posts";
import { formatDate } from "@/lib/format";

// This post's link-preview card: its title on the site's card design.
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Blog post by Nitish Poonia";

export default async function Image({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return shareCard({
    eyebrow: post ? `Writing · ${formatDate(post.date)} · ${post.readingTime}` : "Writing",
    title: post?.title || "Nitish Poonia",
    footer: "Nitish Poonia",
  });
}
