// src/pages/Home/HeroSection.tsx
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { ActionButton } from "@theme/src/components/buttons/ActionButton";
import { Title, Paragraph, Badge } from "@theme/src/foundation/typography";
import { useNavigate } from "react-router-dom";
import { Button } from "@theme/src/components";
/**
 * @component HeroSection
 * @description Renders the hero section with a gradient background overlay, a badge,
 * a title, a subtitle (paragraph), and call-to-action buttons.
 *
 * @returns {JSX.Element} The rendered hero section.
 */
export const HeroSection: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <section className="relative py-24 overflow-hidden bg-background">
      {/* Grid pattern using Tailwind */}
      <div className="absolute inset-0 opacity-10 bg-grid-pattern" />

      <div className="container mx-auto px-4 text-center relative z-10">
        <Badge size="md" className="mb-4">
          {t("home.badge", "Decentralized Voting v1.0")}
        </Badge>

        <Title
          as="h1"
          size="6xl"
          variant="gradient"
          className="mb-6 mx-auto max-w-4xl"
        >
          {t("home.heroTitle")}
        </Title>

        <Paragraph size="lg" className="mb-12 opacity-90 mx-auto max-w-2xl">
          {t("home.heroSubtitle")}
        </Paragraph>

        <div className="flex justify-center gap-4">
          <ActionButton
            onClick={() => navigate("/voting")}
            text={t("home.ctaVote")}
          />
          <Button variant="outline">{t("home.ctaLearnMore")}</Button>
        </div>
      </div>
    </section>
  );
};
