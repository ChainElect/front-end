import React, { createContext, useContext, useEffect, useState } from "react";

/**
 * @interface Theme
 * @description Represents the available theme modes.
 */
export interface Theme {
  mode: "light" | "dark";
}

/**
 * @interface CustomThemeContextType
 * @description Represents the structure of the custom theme context.
 */
export interface CustomThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

/**
 * @constant CustomThemeContext
 * @description React context for managing theme state.
 */
const CustomThemeContext = createContext<CustomThemeContextType | undefined>(
  undefined
);

/**
 * @function getInitialTheme
 * @description Retrieves the initial theme from localStorage if available; otherwise returns the default theme.
 * @returns {Theme} The initial theme object.
 */
const getInitialTheme = (): Theme => {
  const storedTheme = localStorage.getItem("theme");
  return storedTheme === "dark" ? { mode: "dark" } : { mode: "light" };
};

/**
 * @component CustomThemeProvider
 * @description Provides theme context to its child components and handles toggling between light and dark themes.
 *
 * @param {React.ReactNode} children - The child components that require access to theme state.
 * @returns {JSX.Element} A provider component with the theme context.
 */
export const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme());

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme.mode === "dark");
    localStorage.setItem("theme", theme.mode);
  }, [theme]);

  /**
   * @function toggleTheme
   * @description Toggles the theme mode between "light" and "dark".
   */
  const toggleTheme = () => {
    setTheme((prev) => ({ mode: prev.mode === "light" ? "dark" : "light" }));
  };

  return (
    <CustomThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </CustomThemeContext.Provider>
  );
};

/**
 * @function useTheme
 * @description Custom hook to access the theme context. Throws an error if used outside of a CustomThemeProvider.
 * @returns {CustomThemeContextType} The current theme context.
 */
export const useTheme = (): CustomThemeContextType => {
  const context = useContext(CustomThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a CustomThemeProvider");
  }
  return context;
};
