// src/theme/src/components/buttons/Button.tsx
import React from "react";
import { FC, HTMLAttributes } from "react";
import clsx from "clsx";
import { useThemeColors } from "@hooks/useThemeColors";

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline";
}

export const Button: FC<ButtonProps> = ({
  variant = "solid",
  className = "",
  children,
  ...rest
}) => {
  const { primary, text, border } = useThemeColors();

  return (
    <button
      className={clsx(
        "px-8 py-4 rounded-full font-semibold",
        "border hover:scale-105 transition-transform",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        className
      )}
      style={{
        ...(variant === "solid" && {
          backgroundColor: primary,
          color: "white",
          borderColor: primary,
        }),
        ...(variant === "outline" && {
          color: text,
          borderColor: border,
          backgroundColor: `color-mix(in srgb, ${text} 5%, transparent)`,
        }),
        ...(rest.style || {}), // Safely merge styles
      }}
      {...rest}
    >
      {children}
    </button>
  );
};
