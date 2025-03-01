// src/theme/components/icons/IconContainer.tsx
import React from "react";
import { useThemeColors } from "@hooks/useThemeColors";
import clsx from "clsx";

export interface IconContainerProps {
  icon: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const IconContainer: React.FC<IconContainerProps> = ({
  icon,
  size = "md",
  className = "",
}) => {
  const { primary } = useThemeColors();
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-20 h-20",
    lg: "w-24 h-24",
  };

  const iconSize = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  return (
    <div
      className={clsx(
        "flex items-center justify-center rounded-2xl mb-6",
        sizeClasses[size],
        className
      )}
      style={{
        backgroundColor: `color-mix(in srgb, ${primary} 20%, transparent)`,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke={primary}
        className={iconSize[size]}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
      </svg>
    </div>
  );
};
