import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "@components/LanguageSelector/LanguageSelector";
import { ReactComponent as Logo } from "@assets/svgs/otaku-bro.svg";
import { ActionButton } from "@theme/buttons/ActionButton";
import { AnimatedButton } from "@theme/buttons/AnimatedButton";
import { useThemeColors } from "@hooks/useThemeColors";

export const WelcomePage: FC = () => {
  const { t } = useTranslation();
  const { background, text } = useThemeColors();

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-6 min-w-full"
      style={{ backgroundColor: background }}
    >
      <Logo className="w-48 h-auto mb-8 text-primary" />

      <h1 className="text-4xl font-bold mb-4" style={{ color: text }}>
        {t("welcome")} <span className="text-primary">ChainElect</span>
      </h1>

      <p
        className="text-center text-lg mb-8 opacity-80"
        style={{ color: text }}
      >
        {t("selectLanguage")}
      </p>

      <div className="mb-12">
        <LanguageSelector />
      </div>

      <div className="flex flex-col items-center w-full max-w-xs gap-6">
        <AnimatedButton />
        <div className="h-px w-full bg-border-light dark:bg-border-dark" />
        <ActionButton />
      </div>
    </div>
  );
};
