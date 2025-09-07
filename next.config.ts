import type { NextConfig } from "next";
import { webpack } from "next/dist/compiled/webpack/webpack";

const nextConfig: NextConfig = {
  // output: "export", // enables static exports - REMOVED to support API routes
  serverExternalPackages: [ "@prisma/client", ".prisma/client", "postgres", "jose" ],
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  telemetry: false,
};

const path = require('path');
module.exports = {
  webpack: (config: webpack.Configuration) => {
    config.resolve.alias = {
      '@': path.resolve(__dirname, 'src'),
    };
    return config;
  },
};

// if (process.env.NODE_ENV === 'development') {
//   try {
//     // Dynamic import to avoid ESM issues
//     import("@opennextjs/cloudflare").then(({ initOpenNextCloudflareForDev }) => {
//       initOpenNextCloudflareForDev();
//     }).catch(console.warn);
//   } catch (error) {
//     console.warn('OpenNext dev initialization failed:', error);
//   }
// }


export default nextConfig;