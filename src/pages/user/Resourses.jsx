import React from "react";
import { useThemeColors } from "@hooks/useThemeColors";
import { FaBook, FaLink, FaQuestionCircle } from "react-icons/fa";

export const Resources = () => {
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
            Ресурси
          </h1>
          <p
            className="text-lg mt-4 max-w-2xl mx-auto opacity-90"
            style={{ color: text }}
          >
            Полезна информация и ръководства за използване на ChainElect
          </p>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tutorials Section */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <FaBook className="w-6 h-6" style={{ color: primary }} />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Ръководства за потребители
              </h2>
            </div>

            <ul className="space-y-4">
              {[
                {
                  title: "Как да гласувате с ChainElect",
                  link: "/guide/voting",
                },
                {
                  title: "Как да свържете вашия крипто портфейл",
                  link: "/guide/connect-wallet",
                },
                {
                  title: "Как да проверите резултатите от изборите",
                  link: "/guide/results",
                },
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href={item.link}
                    className="group flex items-center gap-3 p-4 rounded-xl transition-all hover:bg-primary/5 hover:border-primary/20 border"
                    style={{
                      color: text,
                      borderColor: `color-mix(in srgb, ${border} 50%, transparent)`,
                    }}
                  >
                    <span className="text-xl">📘</span>
                    <span className="flex-1 group-hover:text-primary transition-colors">
                      {item.title}
                    </span>
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {/* FAQ Section */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <FaQuestionCircle
                className="w-6 h-6"
                style={{ color: secondary }}
              />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                Често задавани въпроси
              </h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  question: "Как да се регистрирам в платформата?",
                  answer:
                    "Можете да се регистрирате чрез предоставяне на вашата електронна поща и създаване на парола. След това следвайте стъпките за верификация.",
                },
                {
                  question: "Сигурно ли е гласуването през ChainElect?",
                  answer:
                    "Да! Платформата използва блокчейн технология, която гарантира, че гласовете не могат да бъдат манипулирани.",
                },
                {
                  question: "Как да проверя моя глас?",
                  answer:
                    "След като гласувате, ще получите уникален хеш, който можете да използвате за проверка в системата.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl border transition-all hover:border-primary/40"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${background} 95%, transparent)`,
                    borderColor: `color-mix(in srgb, ${border} 30%, transparent)`,
                  }}
                >
                  <h3
                    className="font-semibold flex items-center gap-2 mb-3"
                    style={{ color: primary }}
                  >
                    <span>❔</span>
                    {item.question}
                  </h3>
                  <p className="opacity-90 pl-6" style={{ color: text }}>
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Additional Resources Section */}
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <FaLink className="w-6 h-6" style={{ color: primary }} />
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Допълнителни ресурси
              </h2>
            </div>

            <ul className="space-y-4">
              {[
                {
                  title: "Научете повече за блокчейн технологията",
                  link: "https://ethereum.org",
                },
                {
                  title: "Инсталирайте MetaMask",
                  link: "https://metamask.io",
                },
                {
                  title: "Свържете се с нас за повече информация",
                  link: "/contact",
                },
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 p-4 rounded-xl border transition-all hover:border-primary/40"
                    style={{
                      color: text,
                      borderColor: `color-mix(in srgb, ${border} 30%, transparent)`,
                    }}
                  >
                    <span className="text-xl">🔗</span>
                    <span className="flex-1 group-hover:text-primary transition-colors">
                      {item.title}
                    </span>
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
};
