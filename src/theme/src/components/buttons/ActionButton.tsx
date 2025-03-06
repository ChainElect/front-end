import { useThemeColors } from "@hooks/useThemeColors";
import clsx from "clsx";
import React, { FC } from "react";

export interface ActionButtonProps {
  text?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  size?: "sm" | "md" | "lg";
  className?: string;
  children?: React.ReactNode;
}

export const ActionButton: FC<ActionButtonProps> = ({
  text,
  onClick,
  style,
  size = "md",
  className = "",
  children,
}) => {
  const { primary } = useThemeColors();

  const sizeClasses = {
    sm: "px-4 py-2 text-sm rounded-full",
    md: "px-6 py-3 text-base rounded-full",
    lg: "px-8 py-4 text-lg rounded-full",
  };

  return (
    <button
      onClick={onClick}
      className={clsx(
        "relative overflow-hidden inline-flex items-center",
        "font-semibold transition-all duration-300 border border-transparent",
        "hover:pr-12 focus:ring-2 focus:ring-offset-2",
        "group shadow-lg hover:shadow-xl text-white",
        sizeClasses[size],
        className
      )}
      style={{
        backgroundColor: primary,
        ...style,
      }}
    >
      {children && <span className="mr-2">{children}</span>}
      <span className="z-10 transition-all">{text}</span>
      <span className="absolute right-3 opacity-0 group-hover:opacity-100 group-hover:right-4 transition-all">
        →
      </span>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-white" />
    </button>
  );
};
