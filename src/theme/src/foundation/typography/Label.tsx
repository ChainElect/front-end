import React, { FC, HTMLAttributes } from "react";
import { useThemeColors } from "@hooks/useThemeColors";
import clsx from "clsx";

export interface LabelProps extends HTMLAttributes<HTMLSpanElement> {
  size?: "sm" | "md" | "lg";
  weight?: "normal" | "medium" | "semibold";
}

export const Label: FC<LabelProps> = ({
  size = "md",
  weight = "normal",
  className = "",
  children,
  ...rest
}) => {
  const { text } = useThemeColors();

  const sizeClassMap = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const weightClassMap = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
  };

  return (
    <span
      className={clsx(sizeClassMap[size], weightClassMap[weight], className)}
      style={{
        color: text,
        ...rest.style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
};
