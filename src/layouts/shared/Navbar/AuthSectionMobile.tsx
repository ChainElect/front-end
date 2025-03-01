// AuthSectionMobile.tsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ConnectButton } from "@components/button/ConnectButton";
import { Paragraph } from "@theme/src/foundation/typography";
import { useThemeColors } from "@hooks/useThemeColors";
import { useTranslation } from "react-i18next";
import { AuthContext } from "@context/AuthContext";

interface AuthSectionProps {
  isLoggedIn: boolean;
}

export const AuthSectionMobile: React.FC<AuthSectionProps> = ({
  isLoggedIn,
}) => {
  const { t } = useTranslation();
  const { text, border, primary } = useThemeColors();
  const { logout } = useContext(AuthContext);

  return (
    <div className="space-y-4 mt-4">
      {isLoggedIn ? (
        <>
          <ConnectButton />
          <button
            className="w-full px-4 py-3 rounded-full font-medium"
            style={{
              color: text,
              border: `1px solid ${border}`,
            }}
            onClick={logout}
          >
            <Paragraph size="md">{t("navbar.logout", "Изход")}</Paragraph>
          </button>
        </>
      ) : (
        <>
          <Link
            to="/login"
            className="block w-full px-4 py-3 text-center rounded-full"
            style={{
              color: text,
              border: `1px solid ${border}`,
            }}
          >
            <Paragraph size="md">{t("navbar.login", "Вход")}</Paragraph>
          </Link>
          <Link
            to="/register"
            className="block w-full px-4 py-3 text-center rounded-full font-medium"
            style={{
              backgroundColor: primary,
              color: "var(--color-text-dark)",
            }}
          >
            <Paragraph size="md" weight="medium">
              {t("navbar.register", "Регистрация")}
            </Paragraph>
          </Link>
        </>
      )}
    </div>
  );
};
