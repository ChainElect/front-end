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
import { Paragraph, Title } from "@theme/src/foundation/typography";
import { t } from "i18next";
import { ActionButton } from "@theme/src/components";
import { Input } from "@theme/src/components/Form/Input";
import { Textarea } from "@theme/src/components/Form/TextArea";

export const ContactUs = () => {
  const { primary, background, border } = useThemeColors();

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
          <Title as="h1" variant="gradient" className="mb-4">
            {t("contact.title")}
          </Title>
          <Paragraph>{t("contact.subtitle")}</Paragraph>
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
            <Title as="h2" size="2xl" variant="gradient" className="mb-4">
              {t("contact.form.title")}
            </Title>
            <form>
              <div className="mb-4">
                <Input
                  label={t("auth.register.fullName")}
                  id="name"
                  type="text"
                  placeholder={t("auth.register.fullName")}
                />
              </div>
              <div className="mb-4">
                <Input
                  label={t("auth.register.email")}
                  id="email"
                  type="email"
                  placeholder={t("auth.register.email")}
                />
              </div>
              <div className="mb-4">
                <Textarea
                  label={t("contact.form.message")}
                  id="message"
                  rows={5}
                  placeholder={t("contact.form.messagePlaceholder")}
                />
              </div>
              <ActionButton text={t("contact.form.submit")} />
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
            <Title as="h2" size="2xl" className="mb-4" variant="gradient">
              {t("contact.info.title")}
            </Title>
            <Paragraph className="opacity-90">
              {t("contact.info.description")}
            </Paragraph>
            <ul className="mt-4 space-y-4">
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="w-5 h-5 text-primary" />
                <a
                  href="tel:+359123456789"
                  className="hover:underline"
                  style={{ color: primary }}
                >
                  {t("contact.info.phone")}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="w-5 h-5 text-primary" />
                <a
                  href="mailto:info@chainelect.com"
                  className="hover:underline"
                  style={{ color: primary }}
                >
                  {t("contact.info.email")}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaMapMarkerAlt className="w-5 h-5 text-primary" />
                <Paragraph>{t("contact.info.address")}</Paragraph>
              </li>
            </ul>

            {/* Social Media */}
            <Title as="h3" size="2xl" className="mt-6">
              {t("contact.social.title")}
            </Title>
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
