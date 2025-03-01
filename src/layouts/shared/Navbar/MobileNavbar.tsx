// MobileNavbar.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Paragraph } from "@theme/src/foundation/typography";
import { useThemeColors } from "@hooks/useThemeColors";
import { AuthSectionMobile } from "./AuthSectionMobile";
import { ThemeToggle } from "@theme/src/components/buttons/ThemeToggle";
import { useTranslation } from "react-i18next";

interface MobileNavbarProps {
  isLoggedIn: boolean;
  isAdmin: boolean;
}

export const MobileNavbar: React.FC<MobileNavbarProps> = ({
  isLoggedIn,
  isAdmin,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();
  const { text, border, background, primary } = useThemeColors();
  const navigate = useNavigate();

  return (
    <div className="md:hidden flex items-center">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="p-2 rounded-lg focus:outline-none transition-all"
        style={{
          color: text,
          backgroundColor: `color-mix(in srgb, ${text} 10%, transparent)`,
        }}
      >
        {isMenuOpen ? (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke={text}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke={text}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        )}
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-black/30 backdrop-blur-sm">
          <div
            className="absolute top-16 left-0 right-0 pt-4 px-4 space-y-4 pb-8"
            style={{
              backgroundColor: `color-mix(in srgb, ${background} 98%, transparent)`,
              borderTop: `1px solid ${border}`,
              boxShadow: `0 8px 32px ${primary}10`,
            }}
          >
            {/* Navigation Links */}
            {["home", "onGoingElections", "finishedElections", "resources", "about"].map((key) => (
              <button
                key={key}
                onClick={() => {
                  navigate(`/${key}`);
                  setIsMenuOpen(false);
                }}
                className="w-full px-4 py-3 text-left rounded-lg transition-theme"
                style={{
                  color: text,
                  backgroundColor: `color-mix(in srgb, ${text} 10%, transparent)`,
                }}
              >
                <Paragraph size="md" weight="medium">
                  {t(
                    `navbar.${key}`,
                    key.charAt(0).toUpperCase() + key.slice(1)
                  )}
                </Paragraph>
              </button>
            ))}

            {/* Admin Link */}
            {isAdmin && (
              <button
                onClick={() => {
                  navigate("/admin");
                  setIsMenuOpen(false);
                }}
                className="w-full px-4 py-3 text-left rounded-lg font-medium"
                style={{
                  color: primary,
                  backgroundColor: `color-mix(in srgb, ${primary} 10%, transparent)`,
                }}
              >
                <Paragraph size="md" weight="medium">
                  {t("navbar.admin", "Админ")}
                </Paragraph>
              </button>
            )}

            {/* Auth Section */}
            <AuthSectionMobile isLoggedIn={isLoggedIn} />

            {/* Theme Toggle */}
            <div
              className="pt-4 flex justify-center border-t"
              style={{ borderColor: border }}
            >
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
