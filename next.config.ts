import {withSentryConfig} from "@sentry/nextjs";
import type { NextConfig } from "next";
// import { webpack } from "next/dist/compiled/webpack/webpack";

const nextConfig: NextConfig = {
  // output: "export", // enables static exports - REMOVED to support API routes
  serverExternalPackages: [ "@prisma/client", ".prisma/client", "postgres", "jose" ],
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Skip type checking during builds
    ignoreBuildErrors: true,
  },
  // telemetry: false,
};

// const path = require('path');
// module.exports = {
//   webpack: (config: webpack.Configuration) => {
//     config.resolve.alias = {
//       '@': path.resolve(__dirname, 'src'),
//     };
//     return config;
//   },
// };

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


export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: "awareness-living",

  project: "javascript-nextjs",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  // tunnelRoute: "/monitoring",

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
});