// src/components/LanguageSelector.jsx
import React from "react";
import { useTranslation } from "react-i18next";

export const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const handleChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <select
      value={i18n.language}
      onChange={handleChange}
      className="p-2 border rounded-md"
    >
      <option value="en">English</option>
      <option value="bg">Български</option>
    </select>
  );
};
