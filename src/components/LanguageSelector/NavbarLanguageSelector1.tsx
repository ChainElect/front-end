import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useThemeColors } from "@hooks/useThemeColors";
import { FaGlobe } from "react-icons/fa";

export const NavbarLanguageSelector1: FC = () => {
  const { i18n } = useTranslation();
  const { primary, secondary, text, background, border } = useThemeColors();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block">
      {/* Language Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 rounded-md transition-all border border-transparent hover:border-primary"
        style={{
          color: text,
          backgroundColor: `color-mix(in srgb, ${background} 90%, transparent)`,
        }}
      >
        <FaGlobe className="text-lg" />
        <span className="text-sm font-medium uppercase">{i18n.language}</span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-32 rounded-md shadow-lg overflow-hidden transition-all"
          style={{
            backgroundColor: `color-mix(in srgb, ${background} 95%, transparent)`,
            border: `1px solid ${border}`,
          }}
        >
          <button
            onClick={() => changeLanguage("en")}
            className="block w-full px-4 py-2 text-left text-sm transition-colors hover:bg-primary/20"
            style={{ color: text }}
          >
            English
          </button>
          <button
            onClick={() => changeLanguage("bg")}
            className="block w-full px-4 py-2 text-left text-sm transition-colors hover:bg-primary/20"
            style={{ color: text }}
          >
            Български
          </button>
        </div>
      )}
    </div>
  );
};
