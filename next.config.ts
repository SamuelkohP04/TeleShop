import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "export", // enables static exports - REMOVED to support API routes
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
