import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* 1. Keep your Sanity Image configuration */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },

  /* 2. Ignore TypeScript errors during builds */
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;