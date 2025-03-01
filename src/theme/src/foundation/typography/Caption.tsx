import React, { FC } from "react";
import { useThemeColors } from "@hooks/useThemeColors";

export interface CaptionProps {
  /** The caption content to display */
  children: React.ReactNode;
  /** Additional CSS classes to apply */
  className?: string;
}

/**
 * @component Caption
 * @description A reusable Caption component for small, secondary text.
 *
 * @param {CaptionProps} props - The properties for the Caption component.
 * @returns {JSX.Element} The rendered caption element.
 */
export const Caption: FC<CaptionProps> = ({ children, className = "" }) => {
  const { text } = useThemeColors();

  return (
    <span className={`text-sm ${className}`} style={{ color: text }}>
      {children}
    </span>
  );
};
