export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio", "/preview", "/api"],
      },
    ],
    sitemap: "https://nitishpoonia.in/sitemap.xml",
  };
}
