import React, { useState, useEffect } from "react";
import { useWallets } from "@web3-onboard/react";
import { ethers } from "ethers";

import {
  ERC20_ABI,
  ERC20_ADDRESS,
} from "../utilities/wallet/walletConstants.js";

export const ElectionResults = () => {
  const [parties, setParties] = useState([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [voterTurnout, setVoterTurnout] = useState(0); // Percentage
  const connectedWallets = useWallets();
  const totalEligibleVoters = 150000; // Hardcoded total eligible voters

  const fetchResults = async () => {
    try {
      const injectedProvider = connectedWallets[0].provider;
      const provider = new ethers.providers.Web3Provider(injectedProvider);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(ERC20_ADDRESS, ERC20_ABI, signer);

      const electionCount = await contract.electionCount();

      // Fetch election results using the getResults function
      const electionResults = await contract.getResults(electionCount);

      // Map the results and calculate total votes
      let calculatedTotalVotes = 0;
      const formattedParties = electionResults.map((party) => {
        const votes = parseInt(party.voteCount.toString(), 10);
        calculatedTotalVotes += votes;

        return {
          name: party.name,
          votes: votes,
          color: getPartyColor(party.name), // Assign hardcoded color based on name
        };
      });

      // Calculate voter turnout
      const calculatedVoterTurnout = (
        (calculatedTotalVotes / totalEligibleVoters) *
        100
      ).toFixed(1);

      // Update state
      setParties(formattedParties);
      setTotalVotes(calculatedTotalVotes);
      setVoterTurnout(calculatedVoterTurnout);
    } catch (error) {
      console.error("Error fetching election results:", error);
    }
  };

  // Assign hardcoded colors based on party name (fallback to gray)
  const getPartyColor = (name) => {
    const colorMapping = {
      "Партия А": "bg-blue-500",
      "Партия Б": "bg-red-500",
      "Партия В": "bg-green-500",
      "Партия Г": "bg-yellow-500",
    };
    return colorMapping[name] || "bg-gray-500";
  };

  useEffect(() => {
    fetchResults(); // Load results when the component mounts
  }, []);

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

        {/* Summary for voter turnout */}
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

        {/* Votes for parties */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Гласове за партии
          </h2>
          {parties.length > 0 ? (
            parties.map((party) => renderVoteBar(party))
          ) : (
            <p className="text-center text-gray-500">Няма налични партии.</p>
          )}
        </div>
      </div>
    </div>
  );
};
