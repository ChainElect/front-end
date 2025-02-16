import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "@context/CustomThemeContext";
import { useThemeColors } from "@hooks/useThemeColors";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const { primary, text, border } = useThemeColors();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full transition-all duration-300 group relative"
      style={{
        backgroundColor: `color-mix(in srgb, ${text} 10%, transparent)`,
        border: `1px solid ${border}`,
      }}
    >
      {theme.mode === "dark" ? (
        <FaSun
          className="transition-transform duration-300 group-hover:scale-110"
          style={{ color: primary }}
          size={20}
        />
      ) : (
        <FaMoon
          className="transition-transform duration-300 group-hover:scale-110"
          style={{ color: primary }}
          size={20}
        />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
};
