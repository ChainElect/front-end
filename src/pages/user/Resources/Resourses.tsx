import React from "react";
import { useThemeColors } from "@hooks/useThemeColors";
import { FaBook, FaLink, FaQuestionCircle } from "react-icons/fa";
import {
  Title,
  BodySmall,
  SectionTitle,
} from "@theme/src/foundation/typography";
import { ResourceCard } from "@theme/src/components/cards/ResourceCard";
import { FAQItem } from "@theme/src/components/cards/FAQItem";
import { useResourcesData } from "./useResourcesData";
import { useTranslation } from "react-i18next";

export const Resources = () => {
  const { t } = useTranslation();
  const { primary, secondary, background } = useThemeColors();
  const { tutorials, faqs, additionalResources } = useResourcesData();

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
            className="text-4xl font-bold mb-4"
            style={{
              backgroundImage: `linear-gradient(to right, ${primary}, ${secondary})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {t("resources.headerTitle")}
          </Title>
          <BodySmall className="max-w-2xl mx-auto opacity-90">
            {t("resources.headerSubtitle")}
          </BodySmall>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tutorials Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <FaBook className="w-6 h-6" style={{ color: primary }} />
              <SectionTitle className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t("resources.tutorialsTitle")}
              </SectionTitle>
            </div>
            <ul className="space-y-3">
              {tutorials.map((item, index) => (
                <li key={index}>
                  <ResourceCard
                    icon={item.icon}
                    title={item.title}
                    link={item.link}
                  />
                </li>
              ))}
            </ul>
          </section>

          {/* FAQ Section */}
          <section className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <FaQuestionCircle
                className="w-5 h-5"
                style={{ color: secondary }}
              />
              <SectionTitle className="text-xl font-semibold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                {t("resources.faqTitle")}
              </SectionTitle>
            </div>
            <div className="space-y-3">
              {faqs.map((item, index) => (
                <FAQItem
                  key={index}
                  question={item.question}
                  answer={item.answer}
                />
              ))}
            </div>
          </section>

          {/* Additional Resources Section */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <FaLink className="w-6 h-6" style={{ color: primary }} />
              <SectionTitle className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {t("resources.additionalResourcesTitle")}
              </SectionTitle>
            </div>
            <ul className="space-y-3">
              {additionalResources.map((item, index) => (
                <li key={index}>
                  <ResourceCard
                    icon={item.icon}
                    title={item.title}
                    link={item.link}
                  />
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
};
