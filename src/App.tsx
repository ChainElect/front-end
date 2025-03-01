/**
 * @file App.tsx
 * @description The root component for the application. Sets up the main providers,
 * the router, and the shared layout components (Navbar, Footer, etc.).
 */

import React, { FC } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Navbar } from "@layouts/shared/Navbar/Navbar";
import { Footer } from "@layouts/shared/Footer/Footer";
import { AnimatedRoutes } from "@routes/AnimatedRoutes";
import { CustomThemeProvider } from "@context/CustomThemeContext";
import { ErrorBoundary } from "@context/ErrorBoundary";
import { Web3Provider } from "@context/Web3Context";

/**
 * The main application component that includes global providers and layout elements.
 *
 * @returns {JSX.Element} The rendered App component.
 */
export const App: FC = (): JSX.Element => {
  return (
    <CustomThemeProvider>
      <ErrorBoundary>
        <Web3Provider>
          <Router>
            <Navbar />
            <AnimatedRoutes />
            <Footer />
          </Router>
        </Web3Provider>
      </ErrorBoundary>
    </CustomThemeProvider>
  );
};
