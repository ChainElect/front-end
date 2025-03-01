import React, { FC, HTMLAttributes } from "react";
import { useThemeColors } from "@hooks/useThemeColors";
import clsx from "clsx";

export interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  size?: "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
  variant?: "gradient" | "solid";
}

export const Title: FC<TitleProps> = ({
  as: Tag = "h1",
  size = "6xl",
  variant = "solid", // Default to solid color
  className = "",
  children,
  ...rest
}) => {
  const { text, primary, accent } = useThemeColors();

  return (
    <Tag
      className={clsx(
        `font-bold`,
        `text-${size}`,
        variant === "gradient" && "bg-clip-text text-transparent",
        className
      )}
      style={{
        ...(variant === "gradient"
          ? { backgroundImage: `linear-gradient(45deg, ${primary}, ${accent})` }
          : { color: text }),
        ...rest.style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
};
