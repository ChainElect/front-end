// src/theme/typography/SectionTitle.tsx
import React, { FC, HTMLAttributes } from "react";
import { useThemeColors } from "@hooks/useThemeColors";
import clsx from "clsx";

export interface SectionTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  /** The content to display inside the section title */
  children: React.ReactNode;
  /** Visual variant of the title */
  variant?: "gradient" | "solid";
}

export const SectionTitle: FC<SectionTitleProps> = ({
  children,
  variant = "solid",
  className = "",
  ...rest
}) => {
  const { text, primary, accent } = useThemeColors();

  return (
    <h2
      className={clsx(
        "text-2xl font-semibold",
        variant === "gradient" && "bg-clip-text text-transparent",
        className
      )}
      style={{
        ...(variant === "gradient"
          ? {
              backgroundImage: `linear-gradient(45deg, ${primary}, ${accent})`,
            }
          : { color: text }),
        ...rest.style,
      }}
      {...rest}
    >
      {children}
    </h2>
  );
};
