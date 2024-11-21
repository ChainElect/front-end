import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useWallets } from "@web3-onboard/react";
import { ERC20_ABI, ERC20_ADDRESS } from "../../constants/index.js";

const ResultsPage = () => {
  const [parties, setParties] = useState([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [voterTurnout, setVoterTurnout] = useState(0); // Percentage
  const electionId = 1; // Hardcoded election ID
  const totalEligibleVoters = 150000; // Hardcoded total eligible voters
  const connectedWallets = useWallets();

  const fetchResults = async () => {
    if (!connectedWallets[0]) {
      alert("Please connect your wallet.");
      return;
    }

    try {
      // Initialize ethers provider and contract
      const injectedProvider = connectedWallets[0].provider;
      const provider = new ethers.providers.Web3Provider(injectedProvider);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(ERC20_ADDRESS, ERC20_ABI, signer);

      // Fetch election results
      const electionResults = await contract.getResults(electionId);
      const electionDetails = await contract.elections(electionId);

      let calculatedTotalVotes = 0;

      // Assign colors based on index
      const predefinedColors = [
        "bg-blue-500",
        "bg-red-500",
        "bg-green-500",
        "bg-yellow-500",
        "bg-purple-500",
      ];

      const formattedParties = electionResults.map((party, index) => {
        const votes = parseInt(
          ethers.utils.formatUnits(party.voteCount, 0),
          10
        );
        calculatedTotalVotes += votes;
        debugger;

        return {
          name: party.name,
          votes: votes,
          color: predefinedColors[index] || "bg-gray-500", // Use predefined colors for the first 5, else default
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
    } catch (err) {
      console.error("Error fetching election results:", err);
    }
  };

  useEffect(() => {
    fetchResults(); // Fetch results when the component mounts
  }, [connectedWallets]);

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

export default ResultsPage;
