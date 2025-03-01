import React, { FC } from "react";
import { useThemeColors } from "@hooks/useThemeColors";

export interface SecondaryButtonProps {
  text?: string;
  onClick?: () => void;
}

/**
 * @component SecondaryButton
 * @description A reusable secondary button that uses the custom theme colors.
 *
 * @param {SecondaryButtonProps} props - The properties for the button.
 * @returns {JSX.Element} A styled button element.
 */
export const SecondaryButton: FC<SecondaryButtonProps> = ({
  text = "Secondary",
  onClick,
}) => {
  const { text: themeText, border } = useThemeColors();

  return (
    <button
      onClick={onClick}
      className="px-8 py-4 rounded-full font-semibold border hover:scale-105 transition-transform"
      style={{
        color: themeText,
        borderColor: border,
        backgroundColor: `color-mix(in srgb, ${themeText} 5%, transparent)`,
      }}
    >
      {text}
    </button>
  );
};
