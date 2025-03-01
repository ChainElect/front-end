// Navbar.tsx
import React, { FC, useContext } from "react";
import { useTranslation } from "react-i18next";
import { AuthContext } from "@context/AuthContext";
import { useThemeColors } from "@hooks/useThemeColors";
import { DesktopNavbar } from "./DesktopNavbar";
import { MobileNavbar } from "./MobileNavbar";
import { Title } from "@theme/src/foundation/typography";
import { useNavigate } from "react-router-dom";

export const Navbar: FC = () => {
  const { t } = useTranslation();
  const { isLoggedIn, isAdmin } = useContext(AuthContext);
  const { primary, background, border } = useThemeColors();
  const navigate = useNavigate();

  return (
    <nav
      className="sticky top-0 z-50 shadow-sm backdrop-blur-sm transition-all duration-300"
      style={{
        backgroundColor: `color-mix(in srgb, ${background} 95%, transparent)`,
        borderBottom: `1px solid ${border}`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <button
            onClick={() => navigate("/")}
            className="flex items-center group"
          >
            <Title variant="gradient" size="2xl">
              {t("navbar.brand", "ChainElect")}
            </Title>
          </button>

          <DesktopNavbar isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
          <MobileNavbar isLoggedIn={isLoggedIn} isAdmin={isAdmin} />
        </div>
      </div>
    </nav>
  );
};
