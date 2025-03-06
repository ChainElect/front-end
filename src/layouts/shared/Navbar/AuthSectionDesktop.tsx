// AuthSectionDesktop.tsx
import React, { useContext } from "react";
import { ConnectButton } from "@components/button/ConnectButton";
import { Paragraph } from "@theme/src/foundation/typography";
import { useThemeColors } from "@hooks/useThemeColors";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ActionButton, Button } from "@theme/src/components";
import { SecondaryButton } from "@theme/src/components/buttons/SecondaryButton";
import { AuthContext } from "@context/AuthContext";

interface AuthSectionProps {
  isLoggedIn: boolean;
}

export const AuthSectionDesktop: React.FC<AuthSectionProps> = ({
  isLoggedIn,
}) => {
  const { t } = useTranslation();
  const { text, border, primary } = useThemeColors();
  const { logout } = useContext(AuthContext);

  return (
    <div className="flex items-center gap-4">
      {isLoggedIn ? (
        <>
          <ConnectButton />
          <SecondaryButton
            size="sm"
            onClick={logout}
            text={t("navbar.logout")}
          />
        </>
      ) : (
        <>
          <Link to="/login">
            <SecondaryButton size="sm" text={t("navbar.login")} />
          </Link>
          <Link to="/register">
            <ActionButton size="sm" text={t("navbar.register")} />
            {/* <Paragraph size="md" weight="medium" color="white">
            </Paragraph> */}
          </Link>
        </>
      )}
    </div>
  );
};
