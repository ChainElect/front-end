import React from "react";
import { useThemeColors } from "@hooks/useThemeColors";
import { FaChartBar, FaInfoCircle } from "react-icons/fa";

export const ResultsGuide = () => {
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
            Как да проверите резултатите
          </h1>
        </div>
      </header>

      <main className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p
            className="text-lg mb-8 opacity-90 text-center"
            style={{ color: text }}
          >
            Следвайте тези стъпки, за да проверите резултатите от гласуването.
          </p>

          <ol className="space-y-8">
            {[
              {
                icon: <FaChartBar className="w-6 h-6" />,
                title: "Вход в профила",
                content: "Влезте в профила си чрез логин формата.",
              },
              {
                icon: <FaChartBar className="w-6 h-6" />,
                title: "Отворете секция 'Резултати'",
                content: "Изберете 'Резултати' от навигационното меню.",
              },
              {
                icon: <FaChartBar className="w-6 h-6" />,
                title: "Преглед на резултатите",
                content:
                  "Вижте текущите резултати, които се актуализират в реално време.",
              },
              {
                icon: <FaInfoCircle className="w-6 h-6" />,
                title: "Детайлна статистика",
                content:
                  "Анализирайте статистиката за всеки кандидат и детайлите на гласуването.",
              },
            ].map((step, index) => (
              <li
                key={index}
                className="p-6 rounded-xl border hover:border-primary/40 transition-all flex items-start gap-4"
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
        </div>
      </main>
    </div>
  );
};
