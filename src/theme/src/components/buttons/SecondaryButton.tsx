import React, { FC } from "react";
import { useThemeColors } from "@hooks/useThemeColors";
import clsx from "clsx";

export interface SecondaryButtonProps {
  text?: string;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * @component SecondaryButton
 * @description A reusable secondary button with size variants and theme integration.
 *
 * @param {SecondaryButtonProps} props - The properties for the button.
 * @returns {JSX.Element} A styled button element.
 */
export const SecondaryButton: FC<SecondaryButtonProps> = ({
  text = "Secondary",
  onClick,
  size = "md",
  className = "",
}) => {
  const { text: themeText, border } = useThemeColors();

  const sizeClasses = {
    sm: "px-4 py-2 text-sm rounded-full",
    md: "px-8 py-4 text-base rounded-full",
    lg: "px-12 py-6 text-lg rounded-full",
  };

  return (
    <button
      onClick={onClick}
      className={clsx(
        "font-semibold border hover:scale-105 transition-transform",
        sizeClasses[size],
        className
      )}
      style={{
        color: themeText,
        borderColor: border,
        backgroundColor: `color-mix(in srgb, ${themeText} 5%, transparent)`,
      }}
    >
      {text}
    </button>
  );
};
