// src/components/Guides/ConnectWalletGuide.jsx
import React from "react";

const ConnectWalletGuide = () => {
  return (
    <div className="bg-white min-h-screen">
      <header className="bg-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center">
            Как да свържете вашия крипто портфейл
          </h1>
        </div>
      </header>
      <main className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-gray-700 mb-4">
            За да свържете вашия крипто портфейл към платформата, изпълнете
            следните стъпки:
          </p>
          <ol className="list-decimal ml-6 space-y-4 text-gray-700">
            <li>
              Уверете се, че имате инсталиран крипто портфейл, като например
              MetaMask.
            </li>
            <li>Влезте в профила си в платформата.</li>
            <li>
              Кликнете върху бутона "Свържете портфейл" в горната част на
              страницата.
            </li>
            <li>
              Изберете вашия крипто портфейл от списъка с налични портфейли.
            </li>
            <li>Одобрете връзката в интерфейса на портфейла си.</li>
            <li>След успешна връзка ще видите съобщение за потвърждение.</li>
          </ol>
          <p className="text-lg text-gray-700 mt-6">
            Ако имате проблеми, проверете дали вашият портфейл е актуализиран и
            дали сте избрали правилната мрежа (Ethereum Sepolia).
          </p>
        </div>
      </main>
    </div>
  );
};

export default ConnectWalletGuide;
