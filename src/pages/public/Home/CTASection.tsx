// src/pages/Home/CTASection.tsx
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { ActionButton } from "@theme/src/components/buttons/ActionButton";
import { SecondaryButton } from "@theme/src/components/buttons/SecondaryButton";
import { useThemeColors } from "@hooks/useThemeColors";
import { Title, Paragraph } from "@theme/src/foundation/typography";

/**
 * @component CTASection
 * @description Renders a call-to-action section featuring a gradient background overlay,
 * a themed title, a descriptive paragraph, and two themed buttons.
 *
 * @returns {JSX.Element} The rendered CTA section.
 */
export const CTASection: FC = () => {
  const { t } = useTranslation();
  const { primary, accent } = useThemeColors();

  const backgroundOverlayStyle: React.CSSProperties = {
    backgroundImage: `linear-gradient(45deg, ${primary}, ${accent})`,
    opacity: 0.1,
  };

  return (
    <section className="relative py-32">
      <div
        className="absolute inset-0 -skew-y-3 origin-top-left bg-gradient-to-r"
        style={backgroundOverlayStyle}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <Title variant="gradient" className="mb-8">
          {t("home.ctaTitle")}
        </Title>
        <Paragraph className="mb-12 opacity-90 max-w-2xl mx-auto">
          {t("home.ctaSubtitle")}
        </Paragraph>
        <div className="flex justify-center gap-6">
          <ActionButton
            onClick={() => (window.location.href = "/about")}
            text={t("home.ctaAboutUs")}
          />
          <SecondaryButton
            onClick={() => (window.location.href = "/docs")}
            text={t("home.ctaDocs")}
          />
        </div>
      </div>
    </section>
  );
};
