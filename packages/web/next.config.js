/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@ai-pe-fund/shared'],
  experimental: {
    typedRoutes: true,
  },
};

module.exports = nextConfig;