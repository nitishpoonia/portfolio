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
//   image:   share image (path or { url, width, height, alt }); defaults to the site-wide card.
//            false = leave it to an opengraph-image.js file in the page's own folder
export function pageMeta({ title, description, path, shareTitle, shareDescription, type = "website", image, publishedTime, modifiedTime }) {
  const url = absolute(path);
  const ogTitle = shareTitle ?? `${title} | ${SITE_NAME}`;
  const ogDescription = shareDescription ?? description;
  const images = image === false ? undefined : [image || DEFAULT_IMAGE];
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
      ...(images && { images }),
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: { card: "summary_large_image", title: ogTitle, description: ogDescription, creator: "@nitishpoonia", ...(images && { images }) },
  };
}

// schema.org Person for Nitish, used on the home page and as the author of posts.
export const PERSON = {
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "Nitish Poonia",
  url: SITE_URL,
  image: `${SITE_URL}/assets/Untitled-design.png`,
  jobTitle: "Software Developer",
  worksFor: { "@type": "Organization", name: "Arthtech Supports" },
  address: { "@type": "PostalAddress", addressLocality: "Chandigarh", addressCountry: "IN" },
  sameAs: ["https://github.com/nitishpoonia", "https://www.youtube.com/@nitishpoonia"],
  knowsAbout: ["React Native", "Next.js", "Node.js", "PostgreSQL", "Python", "FastAPI", "LLMs"],
};

export function blogPostingLd(post) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description || undefined,
    datePublished: post.date,
    dateModified: post.updatedAt ? new Date(post.updatedAt).toISOString() : post.date,
    url,
    mainEntityOfPage: url,
    keywords: post.tags?.length ? post.tags.join(", ") : undefined,
    author: { "@id": PERSON["@id"], "@type": "Person", name: PERSON.name, url: SITE_URL },
  };
}
