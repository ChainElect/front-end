import React, { FC, HTMLAttributes } from "react";
import { useThemeColors } from "@hooks/useThemeColors";
import clsx from "clsx";

export interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement> {
  size?: "sm" | "md" | "lg";
  weight?: "normal" | "medium" | "semibold";
  opacity?: "low" | "medium" | "high";
}

export const Paragraph: FC<ParagraphProps> = ({
  size = "md",
  weight = "normal",
  opacity = "medium",
  className = "",
  children,
  ...rest
}) => {
  const opacityMap = {
    low: "opacity-70",
    medium: "opacity-80",
    high: "opacity-90",
  };
  const { text } = useThemeColors();

  return (
    <p
      className={clsx(
        `text-${size}`,
        `font-${weight}`,
        opacityMap[opacity],
        "leading-relaxed",
        className
      )}
      style={{
        color: text,
        ...(rest.style || {}),
      }}
      {...rest}
    >
      {children}
    </p>
  );
};
