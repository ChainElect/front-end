import React, { createContext, useContext, useEffect, useState } from "react";

interface Theme {
  mode: "light" | "dark";
}

interface CustomThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

// Create the context
const CustomThemeContext = createContext<CustomThemeContextType | undefined>(
  undefined
);

export const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>({
    mode: (localStorage.getItem("theme") as "light" | "dark") || "light",
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme.mode === "dark");
    localStorage.setItem("theme", theme.mode);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => ({ mode: prev.mode === "light" ? "dark" : "light" }));
  };

  return (
    <CustomThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </CustomThemeContext.Provider>
  );
};

// Custom Hook for Theme
export const useTheme = () => {
  const context = useContext(CustomThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a CustomThemeProvider");
  }
  return context;
};
