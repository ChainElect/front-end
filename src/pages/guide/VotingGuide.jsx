import React from "react";
import { useThemeColors } from "@hooks/useThemeColors";
import {
  FaVoteYea,
  FaUserCheck,
  FaListAlt,
  FaCheckCircle,
  FaChartBar,
} from "react-icons/fa";

export const VotingGuide = () => {
  const { primary, secondary, text, background, border } = useThemeColors();

  return (
    <div className="min-h-screen" style={{ backgroundColor: background }}>
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
            Как да гласувате
          </h1>
          <p
            className="text-lg mt-4 max-w-2xl mx-auto opacity-90"
            style={{ color: text }}
          >
            Следвайте стъпките за успешно гласуване през платформата ChainElect
          </p>
        </div>
      </header>

      <main className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <p
              className="text-lg mb-8 opacity-90 text-center"
              style={{ color: text }}
            >
              Научете се да използвате нашата платформа за безопасно и прозрачно
              гласуване
            </p>
          </div>

          <ol className="space-y-8">
            {[
              {
                icon: <FaUserCheck className="w-6 h-6" />,
                title: "Регистрация",
                content:
                  "Регистрирайте се в платформата с валиден имейл и парола.",
              },
              {
                icon: <FaListAlt className="w-6 h-6" />,
                title: "Вход в системата",
                content: "Влезте в профила си чрез бутона за логин.",
              },
              {
                icon: <FaVoteYea className="w-6 h-6" />,
                title: "Навигация",
                content: "Изберете секция 'Гласуване' от навигационното меню.",
              },
              {
                icon: <FaCheckCircle className="w-6 h-6" />,
                title: "Преглед на кандидати",
                content: "Разгледайте наличните кандидати и техните програми.",
              },
              {
                icon: <FaVoteYea className="w-6 h-6" />,
                title: "Гласуване",
                content: "Натиснете бутона 'Гласувай' до избрания кандидат.",
              },
              {
                icon: <FaCheckCircle className="w-6 h-6" />,
                title: "Потвърждение",
                content:
                  "Потвърдете своя избор. Гласът ви ще бъде записан в блокчейн.",
              },
              {
                icon: <FaChartBar className="w-6 h-6" />,
                title: "Проверка",
                content: "Проверете статуса на гласа си в секция 'Резултати'.",
              },
            ].map((step, index) => (
              <li
                key={index}
                className="p-6 rounded-xl border hover:border-primary/40 transition-all group flex items-start gap-4"
                style={{
                  backgroundColor: `color-mix(in srgb, ${background} 95%, transparent)`,
                  borderColor: `color-mix(in srgb, ${border} 30%, transparent)`,
                }}
              >
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {step.title}
                  </h3>
                  <p className="opacity-90" style={{ color: text }}>
                    {step.content}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div
            className="mt-12 p-8 rounded-2xl border text-center"
            style={{
              borderColor: `color-mix(in srgb, ${border} 30%, transparent)`,
              background: `linear-gradient(45deg, ${primary}10, ${secondary}10)`,
            }}
          >
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Готови ли сте да гласувате?
            </h2>
            <p
              className="mb-6 max-w-xl mx-auto opacity-90"
              style={{ color: text }}
            >
              Влезте в профила си и участвайте в демократичния процес!
            </p>
            <button
              className="px-8 py-3 rounded-full font-medium transition-all bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary"
              style={{ color: "var(--color-text-dark)" }}
            >
              Започнете сега
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
