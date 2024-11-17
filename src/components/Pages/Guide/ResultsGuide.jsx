// src/components/Guides/ResultsGuide.jsx
import React from "react";

const ResultsGuide = () => {
  return (
    <div className="bg-white min-h-screen">
      <header className="bg-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center">
            Как да проверите резултатите
          </h1>
        </div>
      </header>
      <main className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-gray-700 mb-4">
            Ето как можете да проверите резултатите от гласуването:
          </p>
          <ol className="list-decimal ml-6 space-y-4 text-gray-700">
            <li>Влезте в профила си чрез логин формата.</li>
            <li>Кликнете на секция "Резултати" в навигационното меню.</li>
            <li>
              Прегледайте текущите резултати, които са актуализирани в реално
              време.
            </li>
            <li>Можете да проверите статистиките за всеки кандидат.</li>
            <li>
              Ако желаете повече информация, кликнете на бутона "Детайли".
            </li>
          </ol>
        </div>
      </main>
    </div>
  );
};

export default ResultsGuide;
