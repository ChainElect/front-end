import React, { useState, useEffect } from "react";

export const UserDashboard = () => {
  const [elections, setElections] = useState([]);
  const [results, setResults] = useState([]);

  // Примерни данни (заместители на данни от база данни или API)
  useEffect(() => {
    // Примерен списък с избори
    const sampleElections = [
      { id: 1, name: "Президентски избори 2024" },
      { id: 2, name: "Парламентарни избори 2025" },
      { id: 3, name: "Местни избори 2026" },
    ];

    // Примерни резултати
    const sampleResults = [
      {
        id: 1,
        electionName: "Президентски избори 2024",
        party: "Партия А",
        votes: 120000,
      },
      {
        id: 2,
        electionName: "Парламентарни избори 2025",
        party: "Партия Б",
        votes: 90000,
      },
      {
        id: 3,
        electionName: "Местни избори 2026",
        party: "Партия В",
        votes: 45000,
      },
    ];

    setElections(sampleElections);
    setResults(sampleResults);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-purple-900 mb-6">
          Потребителски Дашборд
        </h1>

        {/* Секция за избори */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800">
            Налични избори
          </h2>
          <ul className="mt-4 space-y-2">
            {elections.map((election) => (
              <li
                key={election.id}
                className="p-4 bg-gray-50 rounded-md shadow-md"
              >
                <p className="text-lg font-medium text-gray-700">
                  {election.name}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Секция за резултати */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800">Резултати</h2>
          <ul className="mt-4 space-y-2">
            {results.map((result) => (
              <li
                key={result.id}
                className="p-4 bg-gray-50 rounded-md shadow-md"
              >
                <p className="text-lg font-medium text-gray-700">
                  {result.electionName}
                </p>
                <p className="text-sm text-gray-500">
                  Партия: {result.party} - Гласове: {result.votes}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
