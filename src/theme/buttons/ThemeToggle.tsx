import React from "react";
import { FaRocket, FaCoins } from "react-icons/fa";
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
  const { primary, secondary, text, border } = useThemeColors();

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full transition-all duration-500 group relative overflow-hidden ${className}`}
      style={{
        backgroundColor: `color-mix(in srgb, ${text} 15%, transparent)`,
        border: `1px solid ${theme.mode === "dark" ? secondary : border}`,
        boxShadow: theme.mode === "dark" ? `0 0 15px ${secondary}` : "none",
      }}
    >
      <div className="relative z-10">
        {theme.mode === "dark" ? (
          <FaRocket
            className={`transition-transform duration-500 group-hover:rotate-45 ${iconClassName}`}
            style={{
              color: secondary,
              filter: `drop-shadow(0 0 2px ${primary})`,
            }}
            size={20}
          />
        ) : (
          <FaCoins
            className={`transition-transform duration-300 group-hover:scale-110 ${iconClassName}`}
            style={{ color: primary }}
            size={20}
          />
        )}
      </div>

      {theme.mode === "dark" && (
        <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-0.5 h-0.5 rounded-full animate-pulse"
              style={{
                backgroundColor: secondary,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      )}

      <span className="sr-only">Toggle theme</span>
    </button>
  );
};
