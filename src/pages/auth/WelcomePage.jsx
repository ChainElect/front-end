// src/pages/auth/WelcomePage.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "@components/LanguageSelector/LanguageSelector";
import { ReactComponent as Logo } from "@assets/svgs/otaku-bro.svg";
import { ActionButton } from "@components/button/ActionButton";
import { AnimatedButton } from "@components/button/AnimatedButton";

export const WelcomePage = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6 min-w-full">
      {/* Illustration */}
      <Logo className="w-40 h-auto mb-6" />

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        {t("welcome")} <span className="text-primary">ChainElect</span>
      </h1>

      {/* Subtitle */}
      <p className="text-center text-gray-600 mb-6">{t("selectLanguage")}</p>

      {/* Language Selector */}
      <div className="mb-8">
        <LanguageSelector />
      </div>

      {/* Auth Buttons */}
      <div className="flex flex-col items-center w-full max-w-xs">
        <AnimatedButton />

        <span className="text-gray-500 mb-3">Or</span>

        <ActionButton />
      </div>
    </div>
  );
};
