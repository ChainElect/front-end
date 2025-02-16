import React, { FC, useCallback, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AuthContext } from "@context/AuthContext";
import { ConnectButton } from "@components/button/ConnectButton";
import { ThemeToggle } from "@theme/buttons/ThemeToggle";
import { useThemeColors } from "@hooks/useThemeColors";

export const Navbar: FC = () => {
  const { t } = useTranslation();
  const { isLoggedIn, isAdmin, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { primary, text, background, border } = useThemeColors();

  const handleLogout = useCallback(() => {
    logout();
    navigate("/login");
  }, [logout, navigate]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

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
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center group">
              <span
                className="text-2xl font-bold transition-all"
                style={{
                  color: primary,
                  textShadow: `0 2px 8px color-mix(in srgb, ${primary} 30%, transparent)`,
                }}
              >
                {t("navbar.brand", "ChainElect")}
              </span>
            </Link>
          </div>

          {/* Hamburger Button (Mobile) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg focus:outline-none transition-all"
              style={{
                color: text,
                backgroundColor: `color-mix(in srgb, ${text} 10%, transparent)`,
              }}
            >
              {isMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            {["home", "voting", "results", "resources", "about"].map((key) => (
              <Link
                key={key}
                to={`/${key}`}
                className="px-3 py-2 rounded-md font-medium transition-all relative group"
                style={{ color: text }}
              >
                {t(`navbar.${key}`, key.charAt(0).toUpperCase() + key.slice(1))}
                <span
                  className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary transition-all group-hover:w-full"
                  style={{ backgroundColor: primary }}
                />
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/admin"
                className="px-3 py-2 rounded-md font-medium bg-opacity-10 hover:bg-opacity-20 transition-all"
                style={{
                  color: primary,
                  backgroundColor: `color-mix(in srgb, ${primary} 10%, transparent)`,
                }}
              >
                {t("navbar.admin", "Админ")}
              </Link>
            )}
            <div
              className="h-6 w-px mx-4"
              style={{ backgroundColor: border }}
            />
            {isLoggedIn ? (
              <>
                <ConnectButton />
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-full font-medium hover:bg-opacity-10 transition-all"
                  style={{
                    color: text,
                    border: `1px solid ${border}`,
                  }}
                >
                  {t("navbar.logout", "Изход")}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-full font-medium hover:bg-opacity-10 transition-all"
                  style={{
                    color: text,
                    border: `1px solid ${border}`,
                  }}
                >
                  {t("navbar.login", "Вход")}
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-full font-medium transition-all"
                  style={{
                    backgroundColor: primary,
                    color: "var(--color-text-dark)",
                  }}
                >
                  {t("navbar.register", "Регистрация")}
                </Link>
              </>
            )}
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className="md:hidden py-4 space-y-4"
            style={{ borderTop: `1px solid ${border}` }}
          >
            {["home", "voting", "results", "resources", "about"].map((key) => (
              <Link
                key={key}
                to={`/${key}`}
                className="block px-4 py-3 rounded-lg transition-colors"
                style={{
                  color: text,
                  backgroundColor: `color-mix(in srgb, ${text} 5%, transparent)`,
                }}
              >
                {t(`navbar.${key}`, key.charAt(0).toUpperCase() + key.slice(1))}
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/admin"
                className="block px-4 py-3 rounded-lg font-medium"
                style={{
                  color: primary,
                  backgroundColor: `color-mix(in srgb, ${primary} 10%, transparent)`,
                }}
              >
                {t("navbar.admin", "Админ")}
              </Link>
            )}
            <div className="pt-4 space-y-4">
              {isLoggedIn ? (
                <>
                  <ConnectButton />
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 rounded-full font-medium"
                    style={{
                      color: text,
                      border: `1px solid ${border}`,
                    }}
                  >
                    {t("navbar.logout", "Изход")}
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
                    {t("navbar.login", "Вход")}
                  </Link>
                  <Link
                    to="/register"
                    className="block w-full px-4 py-3 text-center rounded-full font-medium"
                    style={{
                      backgroundColor: primary,
                      color: "var(--color-text-dark)",
                    }}
                  >
                    {t("navbar.register", "Регистрация")}
                  </Link>
                </>
              )}
              <div className="flex justify-center">
                <ThemeToggle />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
