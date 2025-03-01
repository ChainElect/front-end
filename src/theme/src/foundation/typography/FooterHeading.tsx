import React, { FC, HTMLAttributes } from "react";
import { useThemeColors } from "@hooks/useThemeColors";

export interface FooterHeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** The heading text content */
  children: React.ReactNode;
  /** Additional classes to style or override defaults */
  className?: string;
}

/**
 * @component FooterHeading
 * @description A reusable heading component with a gradient text effect, ideal for footer headings.
 */
export const FooterHeading: FC<FooterHeadingProps> = ({
  children,
  className = "",
  ...rest
}) => {
  const { primary, accent } = useThemeColors();

  return (
    <h3
      className={`text-lg font-bold ${className}`}
      style={{
        backgroundImage: `linear-gradient(to right, ${primary}, ${accent})`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        ...(rest.style as object),
      }}
      {...rest}
    >
      {children}
    </h3>
  );
};
