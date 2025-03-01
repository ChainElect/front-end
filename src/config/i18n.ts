// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import translation files (they load as the default export from JSON files)
import en from "../locales/en.json";
import bg from "../locales/bg.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    bg: { translation: bg },
  },
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // React already safeguards from XSS
  },
});

// Export i18n as a named export
export { i18n };
