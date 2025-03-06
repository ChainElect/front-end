// src/pages/public/About/About.tsx
import React from "react";
import { useTranslation } from "react-i18next";
import { useThemeColors } from "@hooks/useThemeColors";
import { FaRocket, FaShieldAlt } from "react-icons/fa";
import {
  SectionTitle,
  Paragraph,
  Title,
} from "@theme/src/foundation/typography";
import { ActionButton } from "@theme/src/components/buttons/ActionButton";
import { useAboutData } from "./useAboutData";

export const About = () => {
  const { primary, secondary, background, border } = useThemeColors();
  const { features } = useAboutData();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen py-10" style={{ backgroundColor: background }}>
      {/* Header Section */}

      <header
        className="py-16 backdrop-blur-lg border-b"
        style={{
          backgroundColor: `color-mix(in srgb, ${background} 85%, transparent)`,
          borderColor: `color-mix(in srgb, ${primary} 30%, transparent)`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Title
            as="h1"
            size="6xl"
            variant="gradient"
            className="mb-6 mx-auto max-w-4xl"
          >
            {t("about.title")}
          </Title>
          <Paragraph className="max-w-2xl mx-auto opacity-90">
            {t("about.subtitle")}
          </Paragraph>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mission Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <FaRocket className="w-6 h-6" style={{ color: secondary }} />
              <SectionTitle className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                {t("about.missionTitle")}
              </SectionTitle>
            </div>
            <Paragraph className="text-lg p-6 rounded-xl border transition-colors">
              {t("about.missionDescription")}
            </Paragraph>
          </section>

          {/* Features Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-full bg-gradient-to-r from-primary to-secondary">
                <FaShieldAlt className="w-5 h-5 text-white" />
              </div>
              <SectionTitle className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t("about.whatWeOffer")}
              </SectionTitle>
            </div>
            <ul className="grid md:grid-cols-3 gap-6">
              {features.map((feature) => (
                <li key={feature.key}>
                  {/* <FeatureCard
                    icon={feature.icon}
                    title={t(`home.features.${feature.key}.title`)}
                    content={t(`home.features.${feature.key}.description`)}
                  /> */}
                </li>
              ))}
            </ul>
          </section>

          {/* Team Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-6 rounded-full bg-gradient-to-b from-primary to-secondary" />
              <SectionTitle className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t("about.teamTitle")}
              </SectionTitle>
            </div>
            <Paragraph className="text-lg p-6 rounded-xl border transition-colors">
              {t("about.teamDescription")}
            </Paragraph>
          </section>

          {/* Call-to-Action Section */}
          <section>
            <div
              className="text-center p-8 rounded-2xl border transition-colors"
              // style={{
              //   borderColor: `color-mix(in srgb, ${border} 30%, transparent)`,
              //   background: `linear-gradient(45deg, ${primary}10, ${secondary}10)`,
              // }}
            >
              <SectionTitle className="mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t("about.callToActionTitle")}
              </SectionTitle>
              <Paragraph className="mb-6 max-w-xl mx-auto opacity-90">
                {t("about.callToActionDescription")}
              </Paragraph>
              <ActionButton
                onClick={() => (window.location.href = "/contact")}
                text={t("footer.contact")}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
