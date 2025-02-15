import React, { FC } from "react";
import { useTranslation } from "react-i18next";

export const LanguageSelector: FC = () => {
  const { i18n } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="relative inline-block">
      <select
        value={i18n.language}
        onChange={handleChange}
        className="
          appearance-none 
          bg-transparent 
          border-b-2 border-primary
          text-black
          px-2
          py-1
          focus:outline-none
          font-medium
          w-32
        "
      >
        <option value="en">English</option>
        <option value="bg">Български</option>
      </select>

      {/* Custom arrow (▼). Absolutely positioned on the right */}
      <span
        className="
          pointer-events-none
          absolute
          right-2
          top-1/2
          -translate-y-1/2
          text-black
        "
      >
        ▼
      </span>
    </div>
  );
};
