import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { useThemeColors } from "@hooks/useThemeColors";
import { ConnectButton } from "@components/button/ConnectButton";
import { ThemeToggle } from "@theme/buttons/ThemeToggle";
import { FaDiscord, FaTwitter, FaGithub, FaMedium } from "react-icons/fa";

export const Footer: FC = () => {
  const { t } = useTranslation();
  const { primary, accent, text, background, border } = useThemeColors();

  return (
    <footer
      className="border-t backdrop-blur-lg"
      style={{
        backgroundColor: background,
        borderColor: `rgba(${primary}, 0.2)`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Protocol Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t("footer.protocol")}
            </h3>
            <div className="space-y-2">
              {["about", "docs", "whitepaper", "audits"].map((item) => (
                <a
                  key={item}
                  href={`/${item}`}
                  className="block text-sm transition-colors hover:text-accent"
                  style={{ color: text }}
                >
                  {t(`footer.${item}`)}
                </a>
              ))}
            </div>
          </div>

          {/* Community Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              {t("footer.community")}
            </h3>
            <div className="flex space-x-4">
              {[
                { icon: FaDiscord, link: "https://discord.gg/chainelect" },
                { icon: FaTwitter, link: "https://twitter.com/chainelect" },
                { icon: FaGithub, link: "https://github.com/chainelect" },
                { icon: FaMedium, link: "https://medium.com/chainelect" },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  className="p-2 rounded-lg transition-all hover:text-accent hover:scale-110"
                  style={{ color: text }}
                >
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Resources Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {t("footer.resources")}
            </h3>
            <div className="space-y-2">
              {["blog", "developers", "governance", "faq"].map((item) => (
                <a
                  key={item}
                  href={`/${item}`}
                  className="block text-sm transition-colors hover:text-accent"
                  style={{ color: text }}
                >
                  {t(`footer.${item}`)}
                </a>
              ))}
            </div>
          </div>

          {/* Web3 Actions */}
          <div className="space-y-6">
            {/* Fixing Connect Wallet Button */}
            <ConnectButton
              className="w-full py-2  rounded-lg transition-all bg-transparent text-white hover:opacity-80 shadow-none"
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
            {["terms", "privacy", "docs"].map((item) => (
              <a
                key={item}
                href={`/${item}`}
                className="text-sm transition-all hover:text-accent"
                style={{ color: text }}
              >
                {t(`footer.${item}`)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
