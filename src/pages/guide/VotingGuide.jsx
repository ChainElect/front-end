// src/components/Guides/VotingGuide.jsx
import React from "react";

export const VotingGuide = () => {
  return (
    <div className="bg-white min-h-screen">
      <header className="bg-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center">Как да гласувате</h1>
        </div>
      </header>
      <main className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-gray-700 mb-4">
            Следвайте стъпките, за да гласувате успешно през платформата
            ChainElect:
          </p>
          <ol className="list-decimal ml-6 space-y-4 text-gray-700">
            <li>Регистрирайте се в платформата с валиден имейл и парола.</li>
            <li>Влезте в профила си чрез бутона за логин.</li>
            <li>Изберете секция "Гласуване" от навигационното меню.</li>
            <li>Разгледайте наличните кандидати и техните програми.</li>
            <li>
              Натиснете бутона "Гласувай" до кандидата, за когото искате да
              гласувате.
            </li>
            <li>
              Потвърдете своя избор. Гласът ви ще бъде записан в блокчейн.
            </li>
            <li>
              Можете да проверите статуса на гласа си в секция "Резултати".
            </li>
          </ol>
        </div>
      </main>
    </div>
  );
};
