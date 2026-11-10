// One place for the site URL and the metadata every public page repeats.
export const SITE_URL = "https://nitishpoonia.in";
export const SITE_NAME = "Nitish Poonia";
// The site-wide share card (app/opengraph-image.js).
export const DEFAULT_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  type: "image/png",
  alt: "Nitish Poonia, software developer building mobile, web and AI products",
};

// RSS link for <head>. Pages that set `alternates` must repeat it (Next replaces, not merges).
export const FEED = { "application/rss+xml": [{ url: "/feed.xml", title: "Nitish Poonia: Writing" }] };

export const absolute = (path = "") => `${SITE_URL}${path === "/" ? "" : path}`;

// Metadata for a page: <title>, description, canonical URL, Open Graph and X card.
//   title:   page title; "| Nitish Poonia" is added by the root template (and to share titles unless shareTitle is given)
//   path:    "/blog", "/blog/my-post"
//   type:    "website" | "article"
//   image:   share image (path or { url, width, height, alt }); defaults to the site-wide card
export function pageMeta({ title, description, path, shareTitle, shareDescription, type = "website", image, publishedTime, modifiedTime }) {
  const url = absolute(path);
  const ogTitle = shareTitle ?? `${title} | ${SITE_NAME}`;
  const ogDescription = shareDescription ?? description;
  const images = [image || DEFAULT_IMAGE];
  return {
    title,
    description,
    alternates: { canonical: url, types: FEED },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url,
      type,
      siteName: SITE_NAME,
      locale: "en_IN",
      images,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: { card: "summary_large_image", title: ogTitle, description: ogDescription, creator: "@nitishpoonia", images },
  };
}
