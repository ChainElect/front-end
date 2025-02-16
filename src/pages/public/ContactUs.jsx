import React from "react";
import { useThemeColors } from "@hooks/useThemeColors";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

export const ContactUs = () => {
  const { primary, secondary, text, background, border } = useThemeColors();

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: background }}>
      {/* Header Section */}
      <header
        className="py-20 backdrop-blur-lg border-b"
        style={{
          backgroundColor: `color-mix(in srgb, ${background} 85%, transparent)`,
          borderColor: `color-mix(in srgb, ${primary} 30%, transparent)`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1
            className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            style={{
              textShadow: `0 0 15px color-mix(in srgb, ${primary} 40%, transparent)`,
            }}
          >
            Свържете се с нас
          </h1>
          <p
            className="text-lg mt-4 max-w-2xl mx-auto opacity-90"
            style={{ color: text }}
          >
            Имате въпроси или нужда от помощ? Свържете се с нас чрез формата
            по-долу.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div
            className="p-6 rounded-xl border shadow-md"
            style={{
              backgroundColor: `color-mix(in srgb, ${background} 95%, transparent)`,
              borderColor: `color-mix(in srgb, ${border} 30%, transparent)`,
            }}
          >
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Изпратете съобщение
            </h2>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block font-medium mb-2"
                  style={{ color: text }}
                >
                  Вашето име
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
                  style={{
                    borderColor: `color-mix(in srgb, ${border} 30%, transparent)`,
                    backgroundColor: `color-mix(in srgb, ${background} 98%, transparent)`,
                    color: text,
                  }}
                  placeholder="Име"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block font-medium mb-2"
                  style={{ color: text }}
                >
                  Имейл адрес
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
                  style={{
                    borderColor: `color-mix(in srgb, ${border} 30%, transparent)`,
                    backgroundColor: `color-mix(in srgb, ${background} 98%, transparent)`,
                    color: text,
                  }}
                  placeholder="example@example.com"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block font-medium mb-2"
                  style={{ color: text }}
                >
                  Съобщение
                </label>
                <textarea
                  id="message"
                  rows="5"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
                  style={{
                    borderColor: `color-mix(in srgb, ${border} 30%, transparent)`,
                    backgroundColor: `color-mix(in srgb, ${background} 98%, transparent)`,
                    color: text,
                  }}
                  placeholder="Вашето съобщение"
                ></textarea>
              </div>
              <button
                type="submit"
                className="px-6 py-2 font-medium rounded-md transition-all bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary"
                style={{ color: "var(--color-text-dark)" }}
              >
                Изпратете
              </button>
            </form>
          </div>

          {/* Contact Details */}
          <div
            className="p-6 rounded-xl border shadow-md"
            style={{
              backgroundColor: `color-mix(in srgb, ${background} 95%, transparent)`,
              borderColor: `color-mix(in srgb, ${border} 30%, transparent)`,
            }}
          >
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Информация за контакт
            </h2>
            <p className="opacity-90" style={{ color: text }}>
              Можете да се свържете с нас директно чрез следните канали:
            </p>
            <ul className="mt-4 space-y-4">
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="w-5 h-5 text-primary" />
                <a
                  href="tel:+359123456789"
                  className="hover:underline"
                  style={{ color: primary }}
                >
                  +359 123 456 789
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="w-5 h-5 text-primary" />
                <a
                  href="mailto:info@chainelect.com"
                  className="hover:underline"
                  style={{ color: primary }}
                >
                  info@chainelect.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaMapMarkerAlt className="w-5 h-5 text-primary" />
                <span style={{ color: text }}>
                  ул. "Демокрация" №12, София, България
                </span>
              </li>
            </ul>

            {/* Social Media */}
            <h3 className="text-lg font-medium mt-6" style={{ color: text }}>
              Социални мрежи
            </h3>
            <div className="flex space-x-6 mt-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter
                  className="w-6 h-6 transition-transform hover:scale-110"
                  style={{ color: primary }}
                />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram
                  className="w-6 h-6 transition-transform hover:scale-110"
                  style={{ color: primary }}
                />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin
                  className="w-6 h-6 transition-transform hover:scale-110"
                  style={{ color: primary }}
                />
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
