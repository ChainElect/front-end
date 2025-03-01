import React, { useState, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@context/AuthContext";
import { AuthService } from "services/authService";
import { ERROR_MESSAGES } from "@utils/messages/errorMessages";
import { ConnectButton } from "@components/button/ConnectButton";
import { FaEthereum, FaFingerprint, FaLock } from "react-icons/fa";
import { useThemeColors } from "@hooks/useThemeColors";
import { useTranslation } from "react-i18next";

export const LoginForm = () => {
  const { t } = useTranslation();
  const [idNumber, setIdNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { primary, secondary, text, background, border, accent } =
    useThemeColors();

  const handleLogin = useCallback(async () => {
    if (idNumber && password) {
      try {
        const response = await AuthService.loginUser({ idNumber, password });
        const token = response.data.token;
        login(token);
        navigate("/");
      } catch (error) {
        setError(ERROR_MESSAGES.LOGIN_FAILED.message);
      }
    } else {
      setError(ERROR_MESSAGES.MISSING_FIELDS.message);
    }
  }, [idNumber, password, login, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        className="w-full max-w-md p-8 space-y-6 backdrop-blur-xl shadow-xl border rounded-2xl"
        style={{
          background: `color-mix(in srgb, ${background} 85%, transparent)`,
          borderColor: `color-mix(in srgb, ${border} 40%, transparent)`,
        }}
      >
        {/* Title */}
        <h2
          className="text-2xl font-bold text-center"
          style={{ color: primary }}
        >
          {t("auth.loginTitle")}
        </h2>
        <p className="text-sm text-center opacity-80" style={{ color: text }}>
          {t("auth.loginSubtitle")}
        </p>

        {/* Form Inputs */}
        <div className="space-y-4">
          {/* ID Input */}
          <div className="relative">
            <input
              type="text"
              id="idNumber"
              placeholder={t("auth.idPlaceholder")}
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
              style={{
                background: background,
                borderColor: `color-mix(in srgb, ${border} 30%, transparent)`,
                color: text,
              }}
            />
            <FaFingerprint
              className="absolute right-4 top-3"
              style={{ color: accent }}
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type="password"
              id="password"
              placeholder={t("auth.passwordPlaceholder")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
              style={{
                background: background,
                borderColor: `color-mix(in srgb, ${border} 30%, transparent)`,
                color: text,
              }}
            />
            <FaLock
              className="absolute right-4 top-3"
              style={{ color: accent }}
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-sm text-center" style={{ color: "red" }}>
              {error}
            </p>
          )}

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full px-4 py-3 font-semibold rounded-lg transition-all"
            style={{
              background: `linear-gradient(to right, ${primary}, ${secondary})`,
              color: "white",
            }}
          >
            {t("auth.loginButton")}
          </button>
        </div>

        {/* OR Divider */}
        {/* <div className="relative flex justify-center">
          <span className="px-4 text-sm opacity-70" style={{ color: text }}>
            {t("auth.orDivider")}
          </span>
          <div className="absolute top-3 w-full border-t opacity-30" />
        </div> */}

        {/* Web3 Wallet Login */}
        {/* <ConnectButton
          className={`w-full py-3 rounded-lg hover:opacity-90 bg-gradient-to-r from-[${primary}] to-[${secondary}] text-white`}
          label={<>{t("auth.web3LoginButton")}</>}
        /> */}

        {/* Footer Links */}
        <div className="flex items-center justify-between text-xs opacity-80">
          <a
            href="/register"
            className="hover:underline"
            style={{ color: text }}
          >
            {t("auth.registerPrompt")}
          </a>
          <a href="/faq" className="hover:underline" style={{ color: text }}>
            {t("auth.faqLink")}
          </a>
        </div>
      </div>
    </div>
  );
};
