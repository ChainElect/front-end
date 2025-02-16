import React from "react";
import { FaEthereum, FaSun } from "react-icons/fa"; // ✅ Crypto icon & normal light mode icon
import { useTheme } from "@context/CustomThemeContext";
import { useThemeColors } from "@hooks/useThemeColors";

interface ThemeToggleProps {
  className?: string;
  iconClassName?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = "",
  iconClassName = "",
}) => {
  const { theme, toggleTheme } = useTheme();
  const { primary, accent, text } = useThemeColors();

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(45deg, var(--color-primary), var(--color-accent))`,
        boxShadow:
          theme.mode === "dark"
            ? `0 0 12px rgba(0, 0, 0, 0.8)`
            : `0 0 10px rgba(255, 215, 0, 0.6)`, // Golden glow for light mode
        border: `1px solid ${theme.mode === "dark" ? primary : accent}`,
      }}
    >
      {/* Smooth Fade Effect */}
      <div className="relative z-10 transition-opacity duration-300">
        {theme.mode === "dark" ? (
          <FaEthereum
            className={`transition-transform duration-500 transform group-hover:scale-110 ${iconClassName}`}
            style={{
              color: "#fff",
              filter: `drop-shadow(0 0 8px ${accent})`, // More subtle glow
            }}
            size={22}
          />
        ) : (
          <FaSun
            className={`transition-transform duration-300 transform group-hover:rotate-12 ${iconClassName}`}
            style={{
              color: "#FFD700",
              filter: "drop-shadow(0 0 5px rgba(255, 215, 0, 0.8))",
            }}
            size={22}
          />
        )}
      </div>

      {/* Subtle Background Glow for Dark Mode */}
      {theme.mode === "dark" && (
        <div
          className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity"
          style={{
            background: `radial-gradient(circle, rgba(0, 0, 0, 0.6) 10%, transparent 90%)`,
          }}
        />
      )}

      <span className="sr-only">Toggle theme</span>
    </button>
  );
};
