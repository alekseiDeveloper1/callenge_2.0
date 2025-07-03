/** @type {import('next').NextConfig} */
const path = require('path');
module.exports = {
  output: 'standalone',
  transpilePackages: ['@repo/ui'],
  outputFileTracingRoot: path.join(__dirname, "../../"),
  eslint: {
    dirs: ['src']
  },
  env: {
    API_URL: process.env.API_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    PORT: "3001"
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/auth/login',
        permanent: true,
      },
    ];
  },
};
