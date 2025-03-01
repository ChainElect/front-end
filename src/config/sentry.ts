/**
 * @file sentry.ts
 * @module config/sentry
 * @description This file is used to initialize and configure Sentry for error tracking and performance monitoring.
 */

import * as Sentry from "@sentry/react";

/**
 * @summary Initializes Sentry with the desired configuration.
 * @description Sets up the DSN, integrations, tracing, session replay, etc. 
 * This allows us to track errors and performance across the application.
 */
Sentry.init({
  dsn: "https://04a5582ea1c08a914365904eef6cf865@o4508542122459136.ingest.de.sentry.io/4508542124556368",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Tracing
  tracesSampleRate: 1.0,
  tracePropagationTargets: ["localhost", "http://5001"],
  // Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

// Export Sentry if you need to use Sentry methods (e.g., Sentry.captureException) elsewhere
export { Sentry };