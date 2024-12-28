import React, { useEffect, useCallback } from "react";
import { useWallets } from "@web3-onboard/react";

import { useParties } from "../hooks/useParties";
import { useElections } from "../hooks/useElections";

export const AdminDashboard = () => {
  // Custom hooks for managing parties and elections
  const {
    parties,
    partyName,
    partyDescription,
    setPartyName,
    setPartyDescription,
    fetchParties,
    addParty,
  } = useParties();

  const {
    elections,
    electionName,
    electionStart,
    electionEnd,
    setElectionName,
    setElectionStart,
    setElectionEnd,
    addElection,
  } = useElections();

  const connectedWallets = useWallets();

  useEffect(() => {
    fetchParties();
  }, [fetchParties]);

  const handleAddParty = useCallback(
    (e) => {
      addParty(e, connectedWallets);
    },
    [addParty, connectedWallets]
  );

  const handlePartyNameChange = useCallback(
    (e) => setPartyName(e.target.value),
    [setPartyName]
  );

  const handlePartyDescriptionChange = useCallback(
    (e) => setPartyDescription(e.target.value),
    [setPartyDescription]
  );

  const handleAddElection = useCallback(
    (e) => {
      addElection(e, connectedWallets);
    },
    [addElection, connectedWallets]
  );

  const handleElectionNameChange = useCallback(
    (e) => setElectionName(e.target.value),
    [setElectionName]
  );

  const handleElectionStartChange = useCallback(
    (e) => setElectionStart(e.target.value),
    [setElectionStart]
  );

  const handleElectionEndChange = useCallback(
    (e) => setElectionEnd(e.target.value),
    [setElectionEnd]
  );

  return (
    <div className="min-h-screen min-w-80 bg-gray-100 p-10 w-full flex justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full">
        <h1 className="text-2xl font-bold text-center text-purple-900 mb-6">
          Администраторски портал
        </h1>

        {/* Party Creation Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800">Създай партия</h2>
          <form
            onSubmit={handleAddParty}
            className="flex flex-col space-y-4 mt-4"
          >
            <input
              type="text"
              value={partyName}
              onChange={handlePartyNameChange}
              placeholder="Име на партия"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-900"
              required
            />
            <input
              type="text"
              value={partyDescription}
              onChange={handlePartyDescriptionChange}
              placeholder="Информация за партията"
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
            {parties.map((party) => (
              <li key={party.id} className="text-gray-700">
                {`ID: ${party.id}, Name: ${party.name}`}
              </li>
            ))}
          </ul>
        </div>

        {/* Election Creation Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800">
            Създай нови избори
          </h2>
          <form
            onSubmit={handleAddElection}
            className="flex flex-col space-y-4 mt-4"
          >
            <input
              type="text"
              value={electionName}
              onChange={handleElectionNameChange}
              placeholder="Име на изборите"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-900"
              required
            />
            <div className="flex space-x-4">
              <input
                type="datetime-local"
                value={electionStart}
                onChange={handleElectionStartChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-900"
                required
              />
              <input
                type="datetime-local"
                value={electionEnd}
                onChange={handleElectionEndChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-900"
                required
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-900 text-white rounded-md hover:bg-purple-800"
            >
              Добави нови избори
            </button>
          </form>
          <ul className="mt-4 space-y-2">
            {elections.map((election) => (
              <li key={election.id} className="text-gray-700">
                {`Name: ${election.name}, Start: ${election.start}, End: ${election.end}`}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
