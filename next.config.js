/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  nextConfig,
  images: {
    domains: ['firebasestorage.googleapis.com', 'bc-portfolio.s3.amazonaws.com'],
  },
};
