// src/theme/buttons/ActionButton.tsx
import { useThemeColors } from "@hooks/useThemeColors";
import clsx from "clsx";
import React, { FC } from "react";

export interface ActionButtonProps {
  text?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export const ActionButton: FC<ActionButtonProps> = ({
  text,
  onClick,
  style,
}) => {
  const { primary } = useThemeColors();

  return (
    <button
      onClick={onClick}
      className={clsx(
        "relative overflow-hidden",
        "inline-flex items-center",
        "rounded-full px-6 py-3",
        "font-semibold transition-all duration-300",
        "border border-transparent",
        "hover:pr-12 focus:ring-2 focus:ring-offset-2",
        "group shadow-lg hover:shadow-xl",
        "text-white"
      )}
      style={{
        backgroundColor: primary,
        ...style,
      }}
    >
      <span className="z-10 transition-all">{text}</span>
      <span className="absolute right-3 opacity-0 group-hover:opacity-100 group-hover:right-4 transition-all">
        →
      </span>

      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-white" />
    </button>
  );
};
