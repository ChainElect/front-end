import React, { Component, ReactNode } from "react";
import { useThemeColors } from "@hooks/useThemeColors";
import { FaExclamationTriangle } from "react-icons/fa";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = "/";
  };

  render() {
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

// Separate Error Fallback UI for Reusability
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
