import React from "react";
import { FaEthereum, FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "@context/CustomThemeContext";
import { useThemeColors } from "@hooks/useThemeColors";
import clsx from "clsx";

interface ThemeToggleProps {
  className?: string;
  iconClassName?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  className = "",
  iconClassName = "",
}) => {
  const { theme, toggleTheme } = useTheme();
  const colors = useThemeColors();

  return (
    <button
      onClick={toggleTheme}
      className={clsx(
        "relative w-12 h-12 rounded-full flex items-center justify-center",
        "transition-all duration-300 hover:scale-[1.05] group",
        "backdrop-blur-lg border-2",
        "hover:bg-opacity-20 focus:outline-none focus:ring-2",
        className
      )}
      style={{
        borderColor: `color-mix(in srgb, ${colors.border} 20%, transparent)`,
        backgroundColor: `color-mix(in srgb, ${colors.background} 90%, transparent)`,
        boxShadow: `0 4px 12px ${colors.border}20`,
      }}
    >
      {/* Animated Icons */}
      <div className="relative z-10">
        {theme.mode === "dark" ? (
          <FaMoon
            className={clsx(
              "transition-all duration-500",
              "group-hover:scale-110 group-active:scale-95",
              iconClassName
            )}
            style={{
              color: colors.primary,
              filter: `drop-shadow(0 2px 4px ${colors.primary}30)`,
            }}
            size={22}
          />
        ) : (
          <FaSun
            className={clsx(
              "transition-transform duration-300",
              "group-hover:rotate-45 group-active:rotate-90",
              iconClassName
            )}
            style={{
              color: colors.accent,
              filter: `drop-shadow(0 2px 4px ${colors.accent}30)`,
            }}
            size={22}
          />
        )}
      </div>

      {/* Subtle hover effect */}
      <div
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-10 transition-opacity"
        style={{
          backgroundColor: colors.primary,
        }}
      />

      <span className="sr-only">Toggle theme</span>
    </button>
  );
};
