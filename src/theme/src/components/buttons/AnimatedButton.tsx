import React, { FC } from "react";
import { useThemeColors } from "@hooks/useThemeColors";

export const AnimatedButton: FC<{ text?: string; onClick?: () => void }> = ({
  text = "Login",
  onClick,
}) => {
  const { primary, background, border } = useThemeColors();

  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center justify-center
        px-8 py-3 rounded-full
        transition-all duration-300
        hover:scale-[1.03] active:scale-95
        border-2
        font-medium
        relative overflow-hidden
      `}
      style={{
        backgroundColor: background,
        borderColor: border,
        color: primary,
      }}
    >
      {text}
      <div className="absolute inset-0 -z-10 opacity-0 hover:opacity-10 transition-opacity bg-current" />
    </button>
  );
};
