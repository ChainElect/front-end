import React, { useState } from "react";

const AdminDashboard = () => {
  const [partyName, setPartyName] = useState("");
  const [electionName, setElectionName] = useState("");
  const [parties, setParties] = useState([]);
  const [elections, setElections] = useState([]);

  // Функция за добавяне на нова партия
  const handleAddParty = (e) => {
    e.preventDefault();
    if (partyName) {
      setParties([...parties, partyName]);
      setPartyName("");
    }
  };

  // Функция за създаване на нови избори
  const handleCreateElection = (e) => {
    e.preventDefault();
    if (electionName) {
      setElections([...elections, electionName]);
      setElectionName("");
    }
  };

  return (
    <div className="min-h-screen min-w-80 bg-gray-100 p-10 w-full flex justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full">
        <h1 className="text-2xl font-bold text-center text-purple-900 mb-6">
          Admin Dashboard
        </h1>

        {/* Създаване на партии */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800">
            Създаване на партия
          </h2>
          <form
            onSubmit={handleAddParty}
            className="flex items-center space-x-4 mt-4"
          >
            <input
              type="text"
              value={partyName}
              onChange={(e) => setPartyName(e.target.value)}
              placeholder="Име на партията"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-900"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-purple-900 text-white rounded-md hover:bg-purple-800"
            >
              Добави партия
            </button>
          </form>
          <ul className="mt-4 space-y-2">
            {parties.map((party, index) => (
              <li key={index} className="text-gray-700">
                {party}
              </li>
            ))}
          </ul>
        </div>

        {/* Създаване на избори */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800">
            Създаване на нови избори
          </h2>
          <form
            onSubmit={handleCreateElection}
            className="flex items-center space-x-4 mt-4"
          >
            <input
              type="text"
              value={electionName}
              onChange={(e) => setElectionName(e.target.value)}
              placeholder="Име на изборите"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-900"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-purple-900 text-white rounded-md hover:bg-purple-800"
            >
              Създай избори
            </button>
          </form>
          <ul className="mt-4 space-y-2">
            {elections.map((election, index) => (
              <li key={index} className="text-gray-700">
                {election}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
