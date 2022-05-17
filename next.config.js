/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  nextConfig,
  images: {
    domains: [
      'firebasestorage.googleapis.com',
      'bc-portfolio.s3.amazonaws.com',
      'lh3.googleusercontent.com',
    ],
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  experimental: {
    scrollRestoration: true,
  },
};
