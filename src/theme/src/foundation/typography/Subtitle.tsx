import React, { FC, HTMLAttributes } from "react";
import { useThemeColors } from "@hooks/useThemeColors";

export interface SubtitleProps extends HTMLAttributes<HTMLHeadingElement> {
  /** The content to display as a subtitle */
  children: React.ReactNode;
}

/**
 * @component Subtitle
 * @description A reusable Subtitle component that applies consistent typography styling.
 *
 * @param {SubtitleProps} props - The properties for the Subtitle component.
 * @returns {JSX.Element} The rendered subtitle element.
 */
export const Subtitle: FC<SubtitleProps> = ({
  children,
  className = "",
  ...rest
}) => {
  const { text } = useThemeColors();

  return (
    <h2
      className={`text-3xl font-semibold ${className}`}
      style={{ color: text, ...(rest.style as object) }}
      {...rest}
    >
      {children}
    </h2>
  );
};
