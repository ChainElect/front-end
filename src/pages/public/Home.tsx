import React from "react";
import { useTranslation } from "react-i18next";
import { useThemeColors } from "@hooks/useThemeColors";
import { ActionButton } from "@theme/buttons/ActionButton";

export const Home = () => {
  const { t } = useTranslation();
  const { primary, text, background, accent, border } = useThemeColors();

  const features = [
    {
      key: "transparency",
      icon: "M12 8c-3.866 0-7 3.134-7 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7z",
    },
    {
      key: "security",
      icon: "M9 12l2 2 4-4m1 4v6a2 2 0 01-2 2H8a2 2 0 01-2-2v-6a2 2 0 012-2h8a2 2 0 012 2z",
    },
    {
      key: "privacy",
      icon: "M12 4a4 4 0 110 8 4 4 0 010-8z M6.343 14.343a8 8 0 0111.314 0M6.343 14.343A8 8 0 0112 18.657a8 8 0 015.657-4.314",
    },
  ];

  return (
    <div
      className="min-h-screen overflow-hidden"
      style={{ backgroundColor: background }}
    >
      {/* Hero Section with Grid Pattern */}
      <section className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(to right, ${border} 1px, transparent 1px),
                            linear-gradient(to bottom, ${border} 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-block mb-8">
            <span
              className="text-sm font-mono px-4 py-2 rounded-full border"
              style={{
                color: primary,
                borderColor: `color-mix(in srgb, ${primary} 50%, transparent)`,
                backgroundColor: `color-mix(in srgb, ${primary} 10%, transparent)`,
              }}
            >
              {t("home.badge", "Decentralized Voting v1.0")}
            </span>
          </div>

          <h1
            className="text-6xl font-bold mb-6 bg-gradient-to-r"
            style={{
              backgroundImage: `linear-gradient(45deg, ${primary}, ${accent})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {t("home.heroTitle")}
          </h1>

          <p
            className="text-xl max-w-2xl mx-auto mb-12 opacity-90"
            style={{ color: text }}
          >
            {t("home.heroSubtitle")}
          </p>

          <div className="flex justify-center gap-4">
            <ActionButton
              text={t("home.ctaVote")}
              onClick={() => (window.location.href = "/voting")}
            />
            <button
              className="px-8 py-4 rounded-full font-semibold transition-all border hover:scale-105"
              style={{
                color: text,
                borderColor: border,
                backgroundColor: `color-mix(in srgb, ${text} 5%, transparent)`,
              }}
            >
              {t("home.ctaDemo")}
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature) => (
              <div
                key={feature.key}
                className="group relative p-8 rounded-3xl backdrop-blur-lg transition-all hover:transform hover:-translate-y-2"
                style={{
                  backgroundColor: `color-mix(in srgb, ${background} 95%, transparent)`,
                  border: `1px solid ${border}`,
                }}
              >
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: `radial-gradient(400px at 50% 50%, color-mix(in srgb, ${primary} 10%, transparent), transparent)`,
                  }}
                />

                <div className="relative z-10">
                  <div
                    className="w-20 h-20 mb-6 flex items-center justify-center rounded-2xl"
                    style={{
                      backgroundColor: `color-mix(in srgb, ${primary} 20%, transparent)`,
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke={primary}
                      className="w-10 h-10"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={feature.icon}
                      />
                    </svg>
                  </div>
                  <h3
                    className="text-2xl font-bold mb-4"
                    style={{ color: text }}
                  >
                    {t(`home.features.${feature.key}.title`)}
                  </h3>
                  <p
                    className="text-lg opacity-80 leading-relaxed"
                    style={{ color: text }}
                  >
                    {t(`home.features.${feature.key}.description`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Diagonal Separator */}
      <section className="relative py-32">
        <div
          className="absolute inset-0 -skew-y-3 origin-top-left bg-gradient-to-r"
          style={{
            backgroundImage: `linear-gradient(45deg, ${primary}, ${accent})`,
            opacity: 0.1,
          }}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-5xl font-bold mb-8" style={{ color: text }}>
            {t("home.ctaTitle")}
          </h2>
          <p
            className="text-xl mb-12 opacity-90 max-w-2xl mx-auto"
            style={{ color: text }}
          >
            {t("home.ctaSubtitle")}
          </p>
          <div className="flex justify-center gap-6">
            <ActionButton
              text={t("home.ctaLearnMore")}
              onClick={() => (window.location.href = "/about")}
            />
            <button
              className="px-8 py-4 rounded-full font-semibold border hover:scale-105 transition-transform"
              style={{
                color: text,
                borderColor: border,
                backgroundColor: `color-mix(in srgb, ${text} 5%, transparent)`,
              }}
            >
              {t("home.ctaDocs")}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
