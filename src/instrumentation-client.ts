// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  integrations: [
      Sentry.feedbackIntegration({
        // Additional SDK configuration goes in here, for example:
        colorScheme: "system",
        autoInject: true,

        buttonProps: {
        size: "small", // "small", "medium", or "large"  
      },
      }),
    ],
  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
});

console.log("Sentry edge config loaded");

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;