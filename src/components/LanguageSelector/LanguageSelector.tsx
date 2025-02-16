import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { useThemeColors } from "@hooks/useThemeColors";

export const LanguageSelector: FC = () => {
  const { i18n } = useTranslation();
  const { primary, text, border } = useThemeColors();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="relative inline-block group">
      <select
        value={i18n.language}
        onChange={handleChange}
        className="appearance-none bg-transparent pr-8 pl-3 py-2.5 text-sm font-medium transition-all duration-300 focus:outline-none rounded-lg"
        style={{
          color: text,
          border: `1px solid ${border}`,
          backgroundColor: `color-mix(in srgb, ${text} 5%, transparent)`,
        }}
      >
        <option value="en">English</option>
        <option value="bg">Български</option>
      </select>

      {/* Custom arrow */}
      <svg
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 transition-transform duration-300 group-hover:translate-y-[-40%]"
        style={{ color: text }}
        width="12"
        height="8"
        viewBox="0 0 12 8"
        fill="none"
      >
        <path
          d="M1 1.5L6 6.5L11 1.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
