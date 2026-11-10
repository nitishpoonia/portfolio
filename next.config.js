/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/portfolio", destination: "/", permanent: true },
      // Typo in old sitemap — /hote-booking → /hotel-booking
      {
        source: "/projects/hote-booking",
        destination: "/projects/hotel-booking",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
