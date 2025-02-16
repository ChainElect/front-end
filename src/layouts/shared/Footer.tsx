import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { FaTwitter, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";
import { useThemeColors } from "@hooks/useThemeColors";
import { ReactComponent as Logo } from "@assets/svgs/otaku-bro.svg";

export const Footer: FC = () => {
  const { t } = useTranslation();
  const { primary, text, background, border } = useThemeColors();

  return (
    <footer
      className="py-12 transition-colors duration-300"
      style={{
        backgroundColor: background,
        borderTop: `1px solid ${border}`,
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
          {/* Left Section */}
          <div className="flex flex-col space-y-6 max-w-sm">
            <Logo className="w-32 h-auto text-primary" />
            <p className="text-lg opacity-80" style={{ color: text }}>
              {t(
                "footer.description",
                "Вашето решение за прозрачни и сигурни онлайн избори."
              )}
            </p>
            <div className="flex space-x-5">
              {[FaTwitter, FaInstagram, FaYoutube, FaLinkedin].map(
                (Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full transition-all hover:scale-110"
                    style={{
                      color: text,
                      backgroundColor: `color-mix(in srgb, ${text} 10%, transparent)`,
                    }}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              )}
            </div>
          </div>

          {/* Right Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full max-w-3xl">
            {/* Navigation Column */}
            <div>
              <h3
                className="text-lg font-semibold mb-4"
                style={{ color: primary }}
              >
                {t("footer.linksTitle", "Връзки")}
              </h3>
              <ul className="space-y-3">
                {["about", "resources", "voting", "results"].map((key) => (
                  <li key={key}>
                    <a
                      href={`/${key}`}
                      className="text-base opacity-80 hover:opacity-100 transition-opacity"
                      style={{ color: text }}
                    >
                      {t(
                        `footer.${key}`,
                        key.charAt(0).toUpperCase() + key.slice(1)
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help Column */}
            <div>
              <h3
                className="text-lg font-semibold mb-4"
                style={{ color: primary }}
              >
                {t("footer.helpTitle", "Помощ")}
              </h3>
              <ul className="space-y-3">
                {["faq", "contact", "privacy", "terms"].map((key) => (
                  <li key={key}>
                    <a
                      href={`/${key}`}
                      className="text-base opacity-80 hover:opacity-100 transition-opacity"
                      style={{ color: text }}
                    >
                      {t(
                        `footer.${key}`,
                        key.charAt(0).toUpperCase() + key.slice(1)
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h3
                className="text-lg font-semibold mb-4"
                style={{ color: primary }}
              >
                {t("footer.contactTitle", "Контакти")}
              </h3>
              <div className="space-y-3">
                <p className="text-base opacity-80" style={{ color: text }}>
                  {t("footer.address", "София, бул. Цариградско шосе 125")}
                </p>
                <a
                  href="mailto:support@chainelect.com"
                  className="text-base opacity-80 hover:opacity-100 transition-opacity block"
                  style={{ color: text }}
                >
                  support@chainelect.com
                </a>
                <p className="text-base opacity-80" style={{ color: text }}>
                  {t("footer.phone", "+359 888 123 456")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          className="border-t mt-8 pt-6 text-center opacity-80"
          style={{
            borderColor: border,
            color: text,
          }}
        >
          <p className="text-sm">
            {t("footer.copyRight", "© 2024 ChainElect. Всички права запазени.")}
          </p>
        </div>
      </div>
    </footer>
  );
};
