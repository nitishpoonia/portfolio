/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // /hire → homepage (permanent 308)
      {
        source: "/hire",
        destination: "/",
        permanent: true,
      },
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
