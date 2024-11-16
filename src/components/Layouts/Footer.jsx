import React from "react";
import { FaTwitter, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-purple-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Social Media Icons */}
          <div className="flex flex-col space-y-4">
            <img src="/path/to/logo.png" alt="Logo" className="h-8 w-auto" />
            <p className="text-gray-300">
              Вашето решение за прозрачни и сигурни онлайн избори.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="h-5 w-5 hover:text-gray-300 cursor-pointer" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="h-5 w-5 hover:text-gray-300 cursor-pointer" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube className="h-5 w-5 hover:text-gray-300 cursor-pointer" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="h-5 w-5 hover:text-gray-300 cursor-pointer" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Column 1 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Връзки</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="/about" className="hover:text-white">
                    За нас
                  </a>
                </li>
                <li>
                  <a href="/resources" className="hover:text-white">
                    Ресурси
                  </a>
                </li>
                <li>
                  <a href="/voting" className="hover:text-white">
                    Гласуване
                  </a>
                </li>
                <li>
                  <a href="/results" className="hover:text-white">
                    Резултати
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Помощ</h3>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="/faq" className="hover:text-white">
                    Често задавани въпроси
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-white">
                    Свържете се с нас
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="hover:text-white">
                    Политика за поверителност
                  </a>
                </li>
                <li>
                  <a href="/terms" className="hover:text-white">
                    Условия за ползване
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3 */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Последвайте ни</h3>
              <p className="text-gray-300 mb-4">
                Бъдете в течение с последните новини и актуализации.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTwitter className="h-5 w-5 hover:text-gray-300 cursor-pointer" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="h-5 w-5 hover:text-gray-300 cursor-pointer" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaYoutube className="h-5 w-5 hover:text-gray-300 cursor-pointer" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="h-5 w-5 hover:text-gray-300 cursor-pointer" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400">
          <p>© 2024 ChainElect. Всички права запазени.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
