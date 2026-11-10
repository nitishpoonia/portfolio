// Served at /manifest.webmanifest and linked from every page automatically.
export default function manifest() {
  return {
    name: "Nitish Poonia",
    short_name: "Nitish",
    description: "Software developer building mobile, web and AI products.",
    start_url: "/",
    display: "standalone",
    background_color: "#F2F2F2",
    theme_color: "#F2F2F2",
    icons: [
      { src: "/web-app-manifest-192x192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/web-app-manifest-512x512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
