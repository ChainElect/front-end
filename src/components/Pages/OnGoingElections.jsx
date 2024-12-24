import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useWallets } from "@web3-onboard/react";
import { useNavigate } from "react-router-dom"; // Corrected import
import { ERC20_ABI, ERC20_ADDRESS } from "../../constants/index.js";

const OnGoingElection = () => {
  const navigate = useNavigate(); // Correctly use useNavigate
  const [elections, setElections] = useState([]);
  const [voteSubmitted, setVoteSubmitted] = useState(false);
  const connectedWallets = useWallets();

  const handleButtonClick = (id) => {
    navigate(`/voting/${id}`); // Redirect to the details page with the ID
  };

  const handleButtonClick2 = (id) => {
    navigate(`/results/${id}`)
  };

  // Fetch elections and parties from the backend
  const fetchElections = async () => {
    try {
      if (!connectedWallets || connectedWallets.length === 0) {
        console.error("No wallet connected.");
        return;
      }

      const injectedProvider = connectedWallets[0].provider;
      if (!injectedProvider) {
        console.error("No provider found in connected wallet.");
        return;
      }

      const provider = new ethers.providers.Web3Provider(injectedProvider);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(ERC20_ADDRESS, ERC20_ABI, signer);

      const ongoingElections = await contract.getAllOngoingElections();
      const electionsWithParties = await Promise.all(
        ongoingElections.map(async (election) => {
          const parties = await contract.getElectionParties(election.id);
          return {
            ...election,
            parties,
          };
        })
      );
      setElections(electionsWithParties);
    } catch (error) {
      console.error("Error fetching elections:", error);
    }
  };

  useEffect(() => {
    fetchElections();
  }, [connectedWallets]); // Add connectedWallets as a dependency to refetch when it changes

  return (
    <div className="min-h-screen bg-gray-100 mt-10 mb-10">
      <main className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-purple-600 text-center">Текущи избори</h2>
          <p className="text-center text-gray-700 mt-4">
            Изберете избори, за които искате да гласувате.
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {elections.length > 0 ? (
              elections.map((election) => (
                <div
                  key={election.id}
                  className="p-6 bg-white rounded-lg shadow-md cursor-pointer hover:scale-105 transition-transform"
                >
                  <h3 className="text-xl font-semibold text-purple-600">{election.name}</h3>
                  <p className="mt-4 text-sm text-gray-600">
                    Описание: {election.description || "Описание липсва."}
                  </p>
                  <div className="mt-6 text-center">
                    <button
                      onClick={() => handleButtonClick(election.id)}
                      className="px-6 py-3 bg-purple-600 text-white font-medium rounded-md shadow-md hover:bg-purple-700 transition"
                    >
                      Гласувай
                    </button>
                    <button
                      onClick={() => handleButtonClick2(election.id)}
                      className="px-6 py-3 bg-purple-600 text-white font-medium rounded-md shadow-md hover:bg-purple-700 transition"
                    >
                      Резултати
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">Няма текущи избори.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default OnGoingElection;