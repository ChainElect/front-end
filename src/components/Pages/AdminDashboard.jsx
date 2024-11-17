import React, { useState } from "react";
import { ethers } from "ethers";
import { useWallets } from "@web3-onboard/react";
import {ERC20_ABI, ERC20_ADDRESS} from '../../constants/index.js'

const AdminDashboard = () => {
  const [partyName, setPartyName] = useState("");
  const [electionId, setPartyId] = useState("");
  const [electionName, setElectionName] = useState("");
  const [electionStart, setElectionStart] = useState("");
  const [electionEnd, setElectionEnd] = useState("");
  const [parties] = useState([]);
  const [elections] = useState([]);
  const connectedWallets = useWallets();

  // Function to add a new party
  const handleAddParty = (e) => {
    e.preventDefault();
    const injectedProvider = connectedWallets[0].provider;
    console.log(injectedProvider);
    const provider = new ethers.providers.Web3Provider(injectedProvider);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(ERC20_ADDRESS, ERC20_ABI, signer);

    contract
      .addParty(electionId, partyName)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Function to create new election
  const handleCreateElection = (e) => {
    e.preventDefault();

    const injectedProvider = connectedWallets[0].provider;
    const provider = new ethers.providers.Web3Provider(injectedProvider);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(ERC20_ADDRESS, ERC20_ABI, signer);
    const startTime = Math.floor(new Date(electionStart).getTime() / 1000);
    const endTime = Math.floor(new Date(electionEnd).getTime() / 1000);

    contract
      .createElection(electionName, startTime, endTime)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="min-h-screen min-w-80 bg-gray-100 p-10 w-full flex justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full">
        <h1 className="text-2xl font-bold text-center text-purple-900 mb-6">
          Admin Dashboard
        </h1>

        {/* Create Party Form */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800">
            Create Party
          </h2>
          <form
            onSubmit={handleAddParty}
            className="flex flex-col space-y-4 mt-4"
          >
            <input
              type="text"
              value={electionId}
              onChange={(e) => setPartyId(e.target.value)}
              placeholder="Electionid ID"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-900"
              required
            />
            <input
              type="text"
              value={partyName}
              onChange={(e) => setPartyName(e.target.value)}
              placeholder="Party Name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-900"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-purple-900 text-white rounded-md hover:bg-purple-800"
            >
              Add Party
            </button>
          </form>
          <ul className="mt-4 space-y-2">
            {parties.map((party, index) => (
              <li key={index} className="text-gray-700">
                {`ID: ${party.id}, Name: ${party.name}`}
              </li>
            ))}
          </ul>
        </div>

        {/* Create Election Form */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800">
            Create Election
          </h2>
          <form
            onSubmit={handleCreateElection}
            className="flex flex-col space-y-4 mt-4"
          >
            <input
              type="text"
              value={electionName}
              onChange={(e) => setElectionName(e.target.value)}
              placeholder="Election Name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-900"
              required
            />
            <div className="flex space-x-4">
              <input
                type="datetime-local"
                value={electionStart}
                onChange={(e) => setElectionStart(e.target.value)}
                placeholder="Start Time"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-900"
                required
              />
              <input
                type="datetime-local"
                value={electionEnd}
                onChange={(e) => setElectionEnd(e.target.value)}
                placeholder="End Time"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-900"
                required
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-900 text-white rounded-md hover:bg-purple-800"
            >
              Create Election
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
      {/*Get Admin*/}
    </div>
  );
};

export default AdminDashboard;
