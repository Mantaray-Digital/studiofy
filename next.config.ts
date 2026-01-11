import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Set Turbopack root to silence the multiple lockfiles warning
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
