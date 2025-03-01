// src/theme/typography/SectionTitle.tsx
import React, { FC, HTMLAttributes } from "react";
import { useThemeColors } from "@hooks/useThemeColors";

/**
 * @interface SectionTitleProps
 * @description Props for the SectionTitle component.
 */
export interface SectionTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  /** The content to display inside the section title */
  children: React.ReactNode;
}

/**
 * @component SectionTitle
 * @description A reusable component for section headings, smaller than a main title.
 * By default, it renders with `text-2xl`.
 */
export const SectionTitle: FC<SectionTitleProps> = ({
  children,
  className = "",
  ...rest
}) => {
  const { text } = useThemeColors();

  return (
    <h2
      className={`text-2xl font-semibold ${className}`}
      style={{ color: text, ...(rest.style as object) }}
      {...rest}
    >
      {children}
    </h2>
  );
};
