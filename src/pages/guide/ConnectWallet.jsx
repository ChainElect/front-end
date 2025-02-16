import React from "react";
import { useThemeColors } from "@hooks/useThemeColors";
import { FaWallet, FaPlug, FaCheckCircle, FaInfoCircle } from "react-icons/fa";

export const ConnectWalletGuide = () => {
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
            Как да свържете портфейла си
          </h1>
          <p
            className="text-lg mt-4 max-w-2xl mx-auto opacity-90"
            style={{ color: text }}
          >
            Следвайте стъпките за безопасно свързване на вашия крипто портфейл
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
              Безопасна интеграция с водещи крипто портфейли
            </p>
          </div>

          <ol className="space-y-8">
            {[
              {
                icon: <FaWallet className="w-6 h-6" />,
                title: "Инсталиране на портфейл",
                content:
                  "Уверете се, че имате инсталиран крипто портфейл като MetaMask.",
              },
              {
                icon: <FaPlug className="w-6 h-6" />,
                title: "Вход в профила",
                content: "Влезте в профила си в платформата ChainElect.",
              },
              {
                icon: <FaCheckCircle className="w-6 h-6" />,
                title: "Иницииране на връзка",
                content:
                  "Кликнете върху бутона 'Свържете портфейл' в горният десен ъгъл.",
              },
              {
                icon: <FaWallet className="w-6 h-6" />,
                title: "Избор на портфейл",
                content:
                  "Изберете вашия портфейл от списъка с поддържани опции.",
              },
              {
                icon: <FaCheckCircle className="w-6 h-6" />,
                title: "Одобрение на връзка",
                content:
                  "Потвърдете връзката през интерфейса на вашия портфейл.",
              },
              {
                icon: <FaPlug className="w-6 h-6" />,
                title: "Потвърждение",
                content:
                  "След успешна връзка ще получите визуално потвърждение.",
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
            className="mt-12 p-8 rounded-2xl border"
            style={{
              borderColor: `color-mix(in srgb, ${border} 30%, transparent)`,
              background: `linear-gradient(45deg, ${primary}10, ${secondary}10)`,
            }}
          >
            <div className="flex items-start gap-4">
              <FaInfoCircle className="w-6 h-6 mt-1 text-primary" />
              <div>
                <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Важна информация
                </h3>
                <p className="opacity-90" style={{ color: text }}>
                  Ако имате проблеми, проверете дали портфейлът ви е
                  актуализиран и дали сте избрали правилната мрежа (Ethereum
                  Sepolia). Връзката е напълно безопасна и не предоставя достъп
                  до вашите средства.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button
              className="px-8 py-3 rounded-full font-medium transition-all bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary"
              style={{ color: "var(--color-text-dark)" }}
            >
              Свържи портфейл сега
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
