import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { FaTwitter, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";

export const Footer: FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          {/* Logo and Social Icons */}
          <div className="flex flex-col space-y-4 mb-8 md:mb-0">
            {/* Replace with your actual logo path */}
            <img
              src="/path/to/logo.png"
              alt="ChainElect Logo"
              className="h-10 w-auto"
            />
            <p className="text-gray-400">
              {t(
                "footer.description",
                "Вашето решение за прозрачни и сигурни онлайн избори."
              )}
            </p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="h-6 w-6 text-gray-400 hover:text-teal-400 transition-transform transform hover:scale-110" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="h-6 w-6 text-gray-400 hover:text-pink-500 transition-transform transform hover:scale-110" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube className="h-6 w-6 text-gray-400 hover:text-red-500 transition-transform transform hover:scale-110" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="h-6 w-6 text-gray-400 hover:text-blue-500 transition-transform transform hover:scale-110" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full">
            {/* Column 1 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                {t("footer.linksTitle", "Връзки")}
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="/about"
                    className="hover:text-white transition-colors"
                  >
                    {t("footer.about", "За нас")}
                  </a>
                </li>
                <li>
                  <a
                    href="/resources"
                    className="hover:text-white transition-colors"
                  >
                    {t("footer.resources", "Ресурси")}
                  </a>
                </li>
                <li>
                  <a
                    href="/voting"
                    className="hover:text-white transition-colors"
                  >
                    {t("footer.voting", "Гласуване")}
                  </a>
                </li>
                <li>
                  <a
                    href="/results"
                    className="hover:text-white transition-colors"
                  >
                    {t("footer.results", "Резултати")}
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                {t("footer.helpTitle", "Помощ")}
              </h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="/faq" className="hover:text-white transition-colors">
                    {t("footer.faq", "Често задавани въпроси")}
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="hover:text-white transition-colors"
                  >
                    {t("footer.contact", "Свържете се с нас")}
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy"
                    className="hover:text-white transition-colors"
                  >
                    {t("footer.privacy", "Политика за поверителност")}
                  </a>
                </li>
                <li>
                  <a
                    href="/terms"
                    className="hover:text-white transition-colors"
                  >
                    {t("footer.terms", "Условия за ползване")}
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">
                {t("footer.followUsTitle", "Последвайте ни")}
              </h3>
              <p className="text-gray-400 mb-4">
                {t(
                  "footer.followDescription",
                  "Бъдете в течение с последните новини и актуализации."
                )}
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter className="h-6 w-6 text-gray-400 hover:text-teal-400 transition-transform transform hover:scale-110" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="h-6 w-6 text-gray-400 hover:text-pink-500 transition-transform transform hover:scale-110" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaYoutube className="h-6 w-6 text-gray-400 hover:text-red-500 transition-transform transform hover:scale-110" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="h-6 w-6 text-gray-400 hover:text-blue-500 transition-transform transform hover:scale-110" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-4 text-center text-gray-500">
          <p>
            {t("footer.copyRight", "© 2024 ChainElect. Всички права запазени.")}
          </p>
        </div>
      </div>
    </footer>
  );
};
