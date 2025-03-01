import React, { useState } from "react";
import { ethers } from "ethers";
import { useWallets } from "@web3-onboard/react";
import { ERC20_ABI, ERC20_ADDRESS } from "../../constants/index.js";

export const AdminDashboard = () => {
  const [partyName, setPartyName] = useState("");
  const [partyDescription, setPartyDescription] = useState("");
  const [electionName, setElectionName] = useState("");
  const [electionStart, setElectionStart] = useState("");
  const [electionEnd, setElectionEnd] = useState("");
  const [parties, setParties] = useState([]);
  const [elections] = useState([]);
  const connectedWallets = useWallets();

  // Function to add a new party (blockchain logic from first version)
  const handleAddParty = async (e) => {
    e.preventDefault();

    if (!partyDescription || !partyName) {
      alert("Моля, попълнете всички полета!");
      return;
    }

    const injectedProvider = connectedWallets[0]?.provider;
    if (!injectedProvider) {
      alert("Моля, свържете портфейла си!");
      return;
    }

    const provider = new ethers.providers.Web3Provider(injectedProvider);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(ERC20_ADDRESS, ERC20_ABI, signer);

    try {
      const electionId = await contract.electionCount();
      const tx = await contract.addParty(electionId, partyName, partyDescription);
      await tx.wait();

      alert("Партията беше успешно добавена!");
    } catch (err) {
      console.error("Error adding party:", err);
      alert("Възникна грешка при добавянето на партията.");
    }
  };

  // Function to create a new election (maintained from first version)
  const handleCreateElection = async (e) => {
    e.preventDefault();

    if (!electionName || !electionStart || !electionEnd) {
      alert("Моля, попълнете всички полета!");
      return;
    }

    const injectedProvider = connectedWallets[0]?.provider;
    if (!injectedProvider) {
      alert("Моля, свържете портфейла си!");
      return;
    }

    const provider = new ethers.providers.Web3Provider(injectedProvider);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(ERC20_ADDRESS, ERC20_ABI, signer);
    const startTime = Math.floor(new Date(electionStart).getTime() / 1000);
    const endTime = Math.floor(new Date(electionEnd).getTime() / 1000);

    try {
      const tx = await contract.createElection(
        electionName,
        startTime,
        endTime
      );
      await tx.wait();

      alert("Изборите бяха успешно създадени на блокчейна!");
    } catch (err) {
      console.error("Error creating election:", err);
      alert("Възникна грешка при създаването на изборите.");
    }
  };

  return (
    <div className="min-h-screen min-w-80 bg-gray-100 p-10 w-full flex justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full">
        <h1 className="text-2xl font-bold text-center text-purple-900 mb-6">
          Администраторски портал
        </h1>

        {/* Create Party Form */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800">Създай партия</h2>
          <form
            onSubmit={handleAddParty}
            className="flex flex-col space-y-4 mt-4"
          >
            <input
              type="text"
              value={partyName}
              onChange={(e) => setPartyName(e.target.value)}
              placeholder="Име на партия"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-900"
              required
            />
            <input
              type="text"
              value={partyDescription}
              onChange={(e) => setPartyDescription(e.target.value)}
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
                {`ID: ${party.id}, Election ID: ${party.election_id}, Name: ${party.name}`}
              </li>
            ))}
          </ul>
        </div>

        {/* Create Election Form */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800">
            Създай нови избори
          </h2>
          <form
            onSubmit={handleCreateElection}
            className="flex flex-col space-y-4 mt-4"
          >
            <input
              type="text"
              value={electionName}
              onChange={(e) => setElectionName(e.target.value)}
              placeholder="Име на изборите"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-900"
              required
            />
            <div className="flex space-x-4">
              <input
                type="datetime-local"
                value={electionStart}
                onChange={(e) => setElectionStart(e.target.value)}
                placeholder="Начална дата и час"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-900"
                required
              />
              <input
                type="datetime-local"
                value={electionEnd}
                onChange={(e) => setElectionEnd(e.target.value)}
                placeholder="Крайна дата и час"
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
            {elections.map((election, index) => (
              <li key={index} className="text-gray-700">
                {`Name: ${election.name}, Start: ${election.start}, End: ${election.end}`}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
