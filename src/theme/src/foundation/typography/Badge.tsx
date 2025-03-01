// src/theme/typography/Badge.tsx
import React, { FC, HTMLAttributes } from "react";
import { useThemeColors } from "@hooks/useThemeColors";
import clsx from "clsx";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const sizeMap = {
  sm: {
    text: "text-xs",
    padding: "px-3 py-1",
    rounded: "rounded-full",
  },
  md: {
    text: "text-sm",
    padding: "px-4 py-2",
    rounded: "rounded-full",
  },
  lg: {
    text: "text-base",
    padding: "px-5 py-2.5",
    rounded: "rounded-full",
  },
};

/**
 * @component Badge
 * @description A monospace-styled badge component with consistent font and theme integration.
 */
export const Badge: FC<BadgeProps> = ({
  children,
  size = "md",
  className = "",
  ...rest
}) => {
  const { primary } = useThemeColors();

  return (
    <span
      className={clsx(
        "inline-block font-mono", // Monospace font for all badges
        sizeMap[size].text,
        sizeMap[size].padding,
        sizeMap[size].rounded,
        "border tracking-wide", // Added letter spacing for better mono readability
        className
      )}
      style={{
        color: primary,
        borderColor: `color-mix(in srgb, ${primary} 50%, transparent)`,
        backgroundColor: `color-mix(in srgb, ${primary} 10%, transparent)`,
        ...rest.style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
};
