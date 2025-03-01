// src/layouts/shared/Footer.tsx (example path)
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { useThemeColors } from "@hooks/useThemeColors";
import { ConnectButton } from "@components/button/ConnectButton";
import { ThemeToggle } from "@theme/src/components/buttons/ThemeToggle";
import { FaDiscord, FaTwitter, FaGithub, FaMedium } from "react-icons/fa";
import { FooterHeading } from "@theme/src/foundation/typography/FooterHeading"; // <-- Our new heading component
import { useFooterData } from "./useFooterData";

/**
 * @component Footer
 * @description Renders the application footer, featuring links, social icons, a theme toggle,
 * and a connect wallet button, all styled with the custom theme.
 *
 * @returns {JSX.Element} The rendered footer element.
 */
export const Footer: FC = () => {
  const { t } = useTranslation();
  const { primary, accent, text, background, border } = useThemeColors();

  // Optional: If you want to create a gradient style for links or other elements, you can do so here:
  // const gradientTextStyle: React.CSSProperties = {
  //   backgroundImage: `linear-gradient(to right, ${primary}, ${accent})`,
  //   WebkitBackgroundClip: "text",
  //   WebkitTextFillColor: "transparent",
  // };

  const { protocolLinks, communityLinks, resourceLinks, bottomLinks } =
    useFooterData();

  return (
    <footer
      className="border-t backdrop-blur-lg"
      style={{
        backgroundColor: background,
        borderColor: border,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Protocol Section */}
          <div className="space-y-4">
            <FooterHeading>{t("footer.protocol")}</FooterHeading>
            <div className="space-y-2">
              {protocolLinks.map((item) => (
                <a
                  key={item.path}
                  href={item.path}
                  className="block text-sm transition-colors"
                  style={{ color: text }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Community Section */}
          <div className="space-y-4">
            <FooterHeading>{t("footer.community")}</FooterHeading>
            <div className="flex space-x-4">
              {communityLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  className="p-2 rounded-lg transition-all hover:scale-110"
                  style={{ color: text }}
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Resources Section */}
          <div className="space-y-4">
            <FooterHeading>{t("footer.resources")}</FooterHeading>
            <div className="space-y-2">
              {resourceLinks.map((item) => (
                <a
                  key={item.path}
                  href={item.path}
                  className="block text-sm transition-colors"
                  style={{ color: text }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Web3 Actions */}
          <div className="space-y-6">
            <ConnectButton
              className="w-full py-2 rounded-lg transition-all bg-transparent text-white hover:opacity-80 shadow-none"
              label={t("footer.connect")}
              fullWidth
            />
            <ThemeToggle
              className="w-full justify-center border border-accent rounded-lg hover:border-accent/60 transition-all"
              iconClassName="text-xl"
            />
          </div>
        </div>

        {/* Bottom Section */}
        <div
          className="border-t pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
          style={{ borderColor: border }}
        >
          <p className="text-sm opacity-80" style={{ color: text }}>
            © {new Date().getFullYear()} ChainElect. {t("footer.rights")}
          </p>
          <div className="flex space-x-6">
            {bottomLinks.map((item) => (
              <a
                key={item.path}
                href={item.path}
                className="text-sm transition-all"
                style={{ color: text }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
