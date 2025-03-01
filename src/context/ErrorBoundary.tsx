import React, { Component, ReactNode } from "react";
import { useThemeColors } from "@hooks/useThemeColors";
import { FaExclamationTriangle } from "react-icons/fa";

/**
 * @interface ErrorBoundaryProps
 * @description The props for the ErrorBoundary component.
 */
interface ErrorBoundaryProps {
  children: ReactNode;
}

/**
 * @interface ErrorBoundaryState
 * @description The state for the ErrorBoundary component.
 */
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

/**
 * @class ErrorBoundary
 * @description A React component that catches JavaScript errors anywhere in its child component tree,
 * logs those errors, and displays a fallback UI.
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  /**
   * @constructor
   * @param {ErrorBoundaryProps} props - The component props.
   */
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  /**
   * @static
   * @function getDerivedStateFromError
   * @description Updates state so the next render shows the fallback UI.
   * @param {Error} error - The error thrown.
   * @returns {ErrorBoundaryState} The updated state with error information.
   */
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  /**
   * @function componentDidCatch
   * @description Logs error information.
   * @param {Error} error - The error thrown.
   * @param {React.ErrorInfo} errorInfo - Additional error details.
   */
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    // You can also log error details to an external service here.
  }

  /**
   * @function handleReload
   * @description Reloads the current page.
   */
  handleReload = () => {
    window.location.reload();
  };

  /**
   * @function handleGoHome
   * @description Navigates the user to the home page.
   */
  handleGoHome = () => {
    window.location.href = "/";
  };

  /**
   * @function render
   * @description Renders the fallback UI if an error is caught, otherwise renders child components.
   * @returns {ReactNode} The rendered component tree.
   */
  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <ErrorFallback
          onReload={this.handleReload}
          onGoHome={this.handleGoHome}
        />
      );
    }
    return this.props.children;
  }
}

/**
 * @component ErrorFallback
 * @description The fallback UI displayed when an error is caught.
 *
 * @param {Object} props - The component props.
 * @param {() => void} props.onReload - Function to reload the page.
 * @param {() => void} props.onGoHome - Function to navigate to the home page.
 * @returns {JSX.Element} The fallback UI.
 */
const ErrorFallback: React.FC<{
  onReload: () => void;
  onGoHome: () => void;
}> = ({ onReload, onGoHome }) => {
  const { primary, secondary, text, background } = useThemeColors();

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen space-y-6"
      style={{ backgroundColor: background, color: text }}
    >
      <FaExclamationTriangle className="text-6xl text-red-500" />
      <h2 className="text-2xl font-bold">Oops! Нещо се обърка.</h2>
      <p className="text-center max-w-md opacity-80">
        Възникна неочаквана грешка. Моля, опитайте отново или се свържете с
        екипа ни.
      </p>

      <div className="flex space-x-4">
        <button
          onClick={onReload}
          className="px-6 py-3 rounded-lg font-semibold transition-all bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary"
          style={{
            background: `linear-gradient(to right, ${primary}, ${secondary})`,
            color: "white",
          }}
        >
          Презареди страницата
        </button>
        <button
          onClick={onGoHome}
          className="px-6 py-3 rounded-lg font-semibold bg-gray-700 hover:bg-gray-600"
        >
          Обратно към началната страница
        </button>
      </div>
    </div>
  );
};

export default ErrorBoundary;
