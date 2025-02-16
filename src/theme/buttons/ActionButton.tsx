import { useThemeColors } from "@hooks/useThemeColors";
import React, { FC } from "react";

export interface ActionButtonProps {
  text?: string;
  onClick?: () => void;
}

export const ActionButton: FC<ActionButtonProps> = ({
  text = "Register your identity",
  onClick,
}) => {
  const { primary } = useThemeColors();

  return (
    <button
      onClick={onClick}
      className={`
        relative overflow-hidden
        inline-flex items-center
        rounded-full px-8 py-4
        font-semibold
        transition-all
        duration-300
        hover:pr-14
        focus:outline-none focus:ring-2 focus:ring-offset-2
        border border-transparent
        shadow-sm
        group
      `}
      style={{
        backgroundColor: primary,
        color: "white", // Force white text
        borderColor: `color-mix(in srgb, ${primary} 80%, transparent)`,
        boxShadow: `0 4px 14px color-mix(in srgb, ${primary} 30%, transparent)`,
      }}
    >
      <span className="z-10 transition-all">{text}</span>
      <span
        className="absolute right-4 opacity-0 transition-all group-hover:opacity-100 group-hover:right-6"
        style={{ color: "white" }} // Explicit white color
      >
        →
      </span>
      {/* Animated background */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-white" />
    </button>
  );
};
