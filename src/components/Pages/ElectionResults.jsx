import React from "react";

const ResultsPage = () => {
  // Примерни данни за демонстрация
  const totalVotes = 50000;
  const voterTurnout = 34; // в проценти
  const parties = [
    { name: "Партия А", votes: 20000, color: "bg-blue-500" },
    { name: "Партия Б", votes: 15000, color: "bg-red-500" },
    { name: "Партия В", votes: 10000, color: "bg-green-500" },
    { name: "Партия Г", votes: 5000, color: "bg-yellow-500" },
  ];

  const renderVoteBar = (party) => {
    const votePercentage = ((party.votes / totalVotes) * 100).toFixed(1);
    return (
      <div key={party.name} className="flex items-center space-x-2">
        <div className="text-gray-700 font-semibold w-24">{party.name}</div>
        <div className="flex-1 bg-gray-200 h-5 rounded-md">
          <div
            className={`${party.color} h-5 rounded-md`}
            style={{ width: `${votePercentage}%` }}
          ></div>
        </div>
        <div className="w-16 text-right text-gray-700 font-semibold">
          {votePercentage}%
        </div>
      </div>
    );
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Резултати от изборите: Гласове в реално време
        </h1>
        <p className="text-center text-gray-500">
          Последно обновяване: {new Date().toLocaleString()}
        </p>

        {/* Обобщение за избирателната активност */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-800">
            Общо гласове: {totalVotes}
          </h2>
          <div className="flex items-center space-x-2">
            <span className="text-gray-700">Избирателна активност:</span>
            <div className="flex-1 bg-gray-200 h-5 rounded-md">
              <div
                className="bg-purple-500 h-5 rounded-md"
                style={{ width: `${voterTurnout}%` }}
              ></div>
            </div>
            <span className="text-gray-700">{voterTurnout}%</span>
          </div>
        </div>

        {/* Гласове за партии */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Гласове за партии
          </h2>
          {parties.map((party) => renderVoteBar(party))}
        </div>

        {/* Разпределение по региони (примерни данни) */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-800">
            Регионално разпределение
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-700">Регион 1</h3>
              <p className="text-gray-600">Води: Партия А (45%)</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-700">Регион 2</h3>
              <p className="text-gray-600">Води: Партия Б (40%)</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-700">Регион 3</h3>
              <p className="text-gray-600">Води: Партия В (35%)</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-700">Регион 4</h3>
              <p className="text-gray-600">Води: Партия Г (20%)</p>
            </div>
          </div>
        </div>

        {/* Секция за проверка */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-gray-800">
            Блокчейн проверка
          </h2>
          <p className="text-gray-600">
            Въведете уникалния си код за гласуване, за да проверите своя глас в
            блокчейна.
          </p>
          <input
            type="text"
            placeholder="Въведете хеш на разписка"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button className="w-full bg-purple-500 text-white font-semibold py-2 rounded-md mt-2 hover:bg-purple-600 transition">
            Проверете глас
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
