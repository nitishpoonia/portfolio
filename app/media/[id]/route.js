import { getMedia } from "@/lib/media";

// Public image URL used inside posts and projects. Content never changes for an
// id, so browsers and Vercel's CDN can cache it forever.
export async function GET(_request, { params }) {
  const { id } = await params;
  const media = await getMedia(id);
  if (!media) return new Response("Not found", { status: 404 });
  return new Response(media.bytes, {
    headers: {
      "Content-Type": media.mime,
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
