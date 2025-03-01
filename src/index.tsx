/**
 * @file index.tsx
 * @module index
 * @description The main entry point for the React application. Imports Sentry initialization,
 * and sets up providers (AuthProvider, I18nextProvider) before rendering the root <App /> component.
 */

import React from "react";
import ReactDOM from "react-dom/client";

import { Sentry } from "@config/sentry";

import "@assets/styles/index.css";
import { I18nextProvider } from "react-i18next";

import { App } from "./App";
import { AuthProvider } from "@context/AuthContext";
import { i18n } from "@config/i18n";

const rootElement = document.getElementById("root") as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

/**
 * @summary Renders the main React application to the DOM.
 * @description The application is wrapped with Sentry.ErrorBoundary, AuthProvider, and I18nextProvider.
 */
root.render(
  <Sentry.ErrorBoundary fallback={<p>Something went wrong!</p>}>
    <AuthProvider>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </AuthProvider>
  </Sentry.ErrorBoundary>
);
