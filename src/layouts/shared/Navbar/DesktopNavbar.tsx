// DesktopNavbar.tsx
import React from "react";
import { Link } from "react-router-dom";
import { ConnectButton } from "@components/button/ConnectButton";
import { ThemeToggle } from "@theme/src/components/buttons/ThemeToggle";
import { NavbarLanguageSelector1 } from "@components/LanguageSelector/NavbarLanguageSelector1";
import { Paragraph } from "@theme/src/foundation/typography";
import { useThemeColors } from "@hooks/useThemeColors";
import { AuthSectionDesktop } from "./AuthSectionDesktop";
import { useTranslation } from "react-i18next";

interface DesktopNavbarProps {
  isLoggedIn: boolean;
  isAdmin: boolean;
}

export const DesktopNavbar: React.FC<DesktopNavbarProps> = ({
  isLoggedIn,
  isAdmin,
}) => {
  const { t } = useTranslation();
  const { primary, text, border } = useThemeColors();

  return (
    <div className="hidden md:flex space-x-6 items-center">
      {["home", "onGoingElections", "finishedElections", "resources", "about"].map((key) => (
        <Link
          key={key}
          to={`/${key}`}
          className="px-3 py-2 rounded-md font-medium transition-all relative group"
          style={{ color: text }}
        >
          <Paragraph size="md" weight="medium">
            {t(`navbar.${key}`, key.charAt(0).toUpperCase() + key.slice(1))}
          </Paragraph>
          <span className="absolute bottom-0 left-0 w-0 h-[2px] transition-all group-hover:w-full bg-primary" />
        </Link>
      ))}

      {isAdmin && (
        <Link
          to="/admin"
          className="px-3 py-2 rounded-md bg-opacity-10 hover:bg-opacity-20"
          style={{
            color: primary,
            backgroundColor: `color-mix(in srgb, ${primary} 10%, transparent)`,
          }}
        >
          <Paragraph size="md" weight="medium">
            {t("navbar.admin", "Админ")}
          </Paragraph>
        </Link>
      )}

      <div className="h-6 w-px mx-4" style={{ backgroundColor: border }} />
      <AuthSectionDesktop isLoggedIn={isLoggedIn} />
      <ThemeToggle />
      <NavbarLanguageSelector1 />
    </div>
  );
};
