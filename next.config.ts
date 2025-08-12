import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [ "@prisma/client", ".prisma/client", "postgres", "jose" ],
  // output: "export", // enables static exports
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

// Only initialize in development and handle the import properly
if (process.env.NODE_ENV === 'development') {
  try {
    // Dynamic import to avoid ESM issues
    import("@opennextjs/cloudflare").then(({ initOpenNextCloudflareForDev }) => {
      initOpenNextCloudflareForDev();
    }).catch(console.warn);
  } catch (error) {
    console.warn('OpenNext dev initialization failed:', error);
  }
}


export default nextConfig;
