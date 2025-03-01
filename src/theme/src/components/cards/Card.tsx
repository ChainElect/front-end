import React, { FC, HTMLAttributes } from "react";
import { useThemeColors } from "@hooks/useThemeColors";
import clsx from "clsx";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated";
  backgroundVariant?: "default" | "light" | "dark" | "grey" | "transparent";
}

export const Card: FC<CardProps> = ({
  variant = "default",
  backgroundVariant = "default",
  className = "",
  children,
  ...rest
}) => {
  const { background, border } = useThemeColors();

  // Define styling based on variant
  const variantStyles = {
    default: "p-8 rounded-2xl shadow-md",
    elevated:
      "p-8 rounded-3xl shadow-xl hover:-translate-y-2 transition-transform",
  };

  // Map background variants to styling expressions using our theme's background color.
  const backgroundMapping: Record<CardProps["backgroundVariant"], string> = {
    default: `color-mix(in srgb, ${background} 95%, transparent)`,
    light: `color-mix(in srgb, ${background} 98%, transparent)`,
    dark: `color-mix(in srgb, ${background} 85%, transparent)`,
    grey: "rgba(255, 255, 255, 0.1)",
    transparent: "transparent",
  };

  const backgroundColor = backgroundMapping[backgroundVariant];

  return (
    <div
      className={clsx(variantStyles[variant], "backdrop-blur-lg", className)}
      style={{
        backgroundColor,
        border: `1px solid ${border}`,
        ...rest.style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
};
