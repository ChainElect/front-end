import React from "react";
import { useThemeColors } from "@hooks/useThemeColors";
import { Title, Paragraph } from "@theme/src/foundation/typography";
import { t } from "i18next";

export const PrivacyPolicy = () => {
  const { background, text, primary } = useThemeColors();

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: background }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <Title variant="gradient" as="h1" className="mb-4">
            {t("privacyPolicy.title")}
          </Title>
          <Paragraph size="lg" className="mt-4">
            {t("privacyPolicy.subtitle")}
          </Paragraph>
        </div>

        {/* Main Content */}
        <div className="mt-12 space-y-8">
          {Object.entries(
            t("privacyPolicy.sections", { returnObjects: true })
          ).map(([key, section]) => (
            <section key={key}>
              <Title as="h2" size="2xl" variant="gradient" className="mb-4">
                {section.title}
              </Title>
              <Paragraph className="mt-4">{section.description}</Paragraph>
              {section.items && (
                <ul className="list-disc list-inside mt-4 space-y-2">
                  {section.items.map((item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-2" style={{ color: primary }}>
                        •
                      </span>
                      <Paragraph className="inline-block">{item}</Paragraph>
                    </li>
                  ))}
                </ul>
              )}
              {key === "contact" && (
                <div className="mt-4 space-y-2">
                  <Paragraph>
                    {t("contact.info.email")}:{" "}
                    <a
                      href={`mailto:${t("contact.info.email")}`}
                      className="hover:underline"
                      style={{ color: primary }}
                    >
                      {t("contact.info.email")}
                    </a>
                  </Paragraph>
                  <Paragraph>
                    {t("contact.info.phone")}:{" "}
                    <a
                      href={`tel:${t("contact.info.phone")}`}
                      className="hover:underline"
                      style={{ color: primary }}
                    >
                      {t("contact.info.phone")}
                    </a>
                  </Paragraph>
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};
