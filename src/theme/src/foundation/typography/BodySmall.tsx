// src/theme/typography/BodySmall.tsx
import React, { FC, HTMLAttributes } from "react";
import { useThemeColors } from "@hooks/useThemeColors";

/**
 * @interface BodySmallProps
 * @description Props for a smaller body text component.
 */
export interface BodySmallProps extends HTMLAttributes<HTMLParagraphElement> {
  /** The text content to display */
  children: React.ReactNode;
}

/**
 * @component BodySmall
 * @description A reusable component for smaller body text. By default, it renders with `text-sm`.
 */
export const BodySmall: FC<BodySmallProps> = ({
  children,
  className = "",
  ...rest
}) => {
  const { text } = useThemeColors();

  return (
    <p
      className={`text-sm leading-relaxed ${className}`}
      style={{ color: text, ...(rest.style as object) }}
      {...rest}
    >
      {children}
    </p>
  );
};
