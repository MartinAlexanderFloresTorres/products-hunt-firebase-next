/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["es"],
    defaultLocale: "es",
  },
  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "graph.facebook.com",
      "avatars.githubusercontent.com",
      "lh6.googleusercontent.com",
      "lh5.googleusercontent.com",
      "lh4.googleusercontent.com",
      "lh3.googleusercontent.com",
      "lh2.googleusercontent.com",
      "lh1.googleusercontent.com",
      "lh0.googleusercontent.com",
    ],
  },
};

module.exports = nextConfig;
