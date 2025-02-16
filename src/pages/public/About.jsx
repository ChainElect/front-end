import React from "react";
import { useThemeColors } from "@hooks/useThemeColors";
import { FaShieldAlt, FaUserSecret, FaEye, FaRocket } from "react-icons/fa";

export const About = () => {
  const { primary, secondary, text, background, border } = useThemeColors();

  return (
    <div className="min-h-screen py-10" style={{ backgroundColor: background }}>
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
            За нас
          </h1>
          <p
            className="text-lg mt-4 max-w-2xl mx-auto opacity-90"
            style={{ color: text }}
          >
            Разберете повече за ChainElect и нашата мисия
          </p>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mission Section */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <FaRocket className="w-8 h-8" style={{ color: secondary }} />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                Нашата мисия
              </h2>
            </div>
            <p
              className="text-lg p-6 rounded-xl border hover:border-primary/40 transition-colors"
              style={{
                color: text,
                borderColor: `color-mix(in srgb, ${border} 30%, transparent)`,
                backgroundColor: `color-mix(in srgb, ${background} 95%, transparent)`,
              }}
            >
              В ChainElect вярваме, че честните и прозрачни избори са основата
              на всяка демокрация. Нашата платформа използва блокчейн технология
              за гарантиране на сигурност, анонимност и прозрачност на изборния
              процес.
            </p>
          </section>

          {/* Features Section */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-full bg-gradient-to-r from-primary to-secondary">
                <FaShieldAlt className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Какво предлагаме?
              </h2>
            </div>

            <ul className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: <FaEye className="w-6 h-6" />,
                  title: "Прозрачност",
                  content:
                    "Всеки глас е записан на блокчейн и е достъпен за проверка, без да се нарушава анонимността.",
                },
                {
                  icon: <FaShieldAlt className="w-6 h-6" />,
                  title: "Сигурност",
                  content:
                    "Гласовете не могат да бъдат подправени или манипулирани.",
                },
                {
                  icon: <FaUserSecret className="w-6 h-6" />,
                  title: "Анонимност",
                  content:
                    "Ние защитаваме личните данни на всички гласоподаватели.",
                },
              ].map((feature, index) => (
                <li
                  key={index}
                  className="p-6 rounded-xl border hover:border-primary/40 transition-all group"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${background} 95%, transparent)`,
                    borderColor: `color-mix(in srgb, ${border} 30%, transparent)`,
                  }}
                >
                  <div className="mb-4 text-primary">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {feature.title}
                  </h3>
                  <p className="opacity-90" style={{ color: text }}>
                    {feature.content}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          {/* Team Section */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-8 rounded-full bg-gradient-to-b from-primary to-secondary" />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Нашият екип
              </h2>
            </div>
            <p
              className="text-lg p-6 rounded-xl border hover:border-primary/40 transition-colors"
              style={{
                color: text,
                borderColor: `color-mix(in srgb, ${border} 30%, transparent)`,
                backgroundColor: `color-mix(in srgb, ${background} 95%, transparent)`,
              }}
            >
              ChainElect е създаден от екип от иноватори, инженери и защитници
              на демократичните процеси. Ние сме отдадени на създаването на
              платформа, която прави гласуването по-достъпно и сигурно за
              всички.
            </p>
          </section>

          {/* Call-to-Action Section */}
          <section>
            <div
              className="text-center p-8 rounded-2xl border hover:border-primary/40 transition-colors"
              style={{
                borderColor: `color-mix(in srgb, ${border} 30%, transparent)`,
                background: `linear-gradient(45deg, ${primary}10, ${secondary}10)`,
              }}
            >
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Присъединете се към нас
              </h2>
              <p
                className="mb-6 max-w-xl mx-auto opacity-90"
                style={{ color: text }}
              >
                Бъдете част от промяната! Подкрепете ни в създаването на
                прозрачна и честна изборна система.
              </p>
              <button
                className="px-8 py-3 rounded-full font-medium transition-all bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary"
                style={{ color: "var(--color-text-dark)" }}
              >
                Свържете се с нас
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
