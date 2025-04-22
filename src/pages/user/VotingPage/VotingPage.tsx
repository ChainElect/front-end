import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useThemeColors } from "@hooks/useThemeColors";
import { VotingService } from "../../../services/votingService";
import ZkpCredentialsService from "../../../services/zkpCredentialsService";
import { ethers } from "ethers";
import { useWallets } from "@web3-onboard/react";
import { ERC20_ABI, ERC20_ADDRESS } from "../../../utils/wallet/walletConstants";

export const VotingPage = () => {
  const { id } = useParams();
  const { primary, text, background, border } = useThemeColors();
  const [parties, setParties] = useState([]);
  const [selectedParty, setSelectedParty] = useState(null);
  const [voteSubmitted, setVoteSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [timeLeft, setTimeLeft] = useState("Loading...");
  const connectedWallets = useWallets();
  // Check if user has ZKP credentials
  useEffect(() => {
    const credentials = ZkpCredentialsService.getCredentials();
    if (!credentials) {
      setError("You need to register before voting. Please complete the registration process.");
    }
  }, []);
  // Start a countdown timer
  const startCountdown = (endTime) => {
    const timer = setInterval(() => {
      const now = Date.now();
      const remaining = endTime - now;

      if (remaining <= 0) {
        clearInterval(timer);
        setTimeLeft("Voting has ended");
      } else {
        const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((remaining / (1000 * 60)) % 60);
        const seconds = Math.floor((remaining / 1000) % 60);
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(timer);
  };

  // Fetch parties from blockchain
  useEffect(() => {
    const fetchParties = async () => {
      try {
        const injectedProvider = connectedWallets[0]?.provider;
        if (!injectedProvider) {
          console.error("No provider connected.");
          return;
        }

        const provider = new ethers.providers.Web3Provider(injectedProvider);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(ERC20_ADDRESS, ERC20_ABI, signer);

        // Get election details
        const electionDetails = await contract.getElectionDetails(id);

        // Set parties
        setParties(electionDetails.parties.map(party => ({
          id: party.id.toString(),
          name: party.name,
          description: party.description
        })));

        // Start countdown timer
        startCountdown(electionDetails.endTime.toNumber() * 1000);
      } catch (error) {
        console.error("Error fetching election details:", error);
        setError("Failed to load election details");
      }
    };

    if (id) {
      fetchParties();
    }
  }, [id]);

  const openConfirmation = () => {
    if (!selectedParty) {
      alert("Please select a party before voting!");
      return;
    }
    setShowConfirmation(true);
  };

  const handleVote = async () => {
    if (!selectedParty) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Step 1: Prepare vote data with ZKP
      const voteData = await VotingService.prepareVote(id, selectedParty.id);

      // Step 2: Cast vote
      await VotingService.castVote(voteData);

      // Step 3: Update UI
      setVoteSubmitted(true);
      setShowConfirmation(false);
    } catch (error) {
      console.error("Error casting vote:", error);
      setError(error.message || "Failed to cast vote");
      setShowConfirmation(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen py-10"
      style={{ backgroundColor: background }}
    >
      <header
        className="py-16 backdrop-blur-lg border-b"
        style={{
          backgroundColor: `color-mix(in srgb, ${background} 85%, transparent)`,
          borderColor: `color-mix(in srgb, ${primary} 30%, transparent)`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1
            className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          >
            Voting
          </h1>
          <p className="mt-4 text-lg" style={{ color: text }}>
            Select your party and cast your vote securely.
          </p>
          <div className="mt-4">
            <span className="text-xl font-bold" style={{ color: primary }}>Time remaining:</span>{" "}
            <span className="text-xl" style={{ color: text }}>{timeLeft}</span>
          </div>
        </div>
      </header>

      <main className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {error && (
            <div className="mb-8 p-4 bg-red-100 border border-red-300 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {!voteSubmitted ? (
            <>
              <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: primary }}>
                Select a Party
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {parties.length > 0 ? (
                  parties.map((party) => (
                    <div
                      key={party.id}
                      className={`p-6 rounded-xl border transition-all hover:scale-105 cursor-pointer ${selectedParty?.id === party.id ? "border-4" : "border"
                        }`}
                      style={{
                        backgroundColor: `color-mix(in srgb, ${background} 95%, transparent)`,
                        borderColor: selectedParty?.id === party.id ? primary : border,
                      }}
                      onClick={() => setSelectedParty(party)}
                    >
                      <h3 className="text-xl font-bold mb-3" style={{ color: primary }}>
                        {party.name}
                      </h3>
                      <p className="opacity-90" style={{ color: text }}>
                        {party.description || "No description available."}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="col-span-3 text-center opacity-90" style={{ color: text }}>
                    No parties available.
                  </p>
                )}
              </div>

              <div className="mt-12 text-center">
                <button
                  onClick={openConfirmation}
                  disabled={isLoading || !selectedParty}
                  className="px-8 py-3 rounded-full font-medium transition-all bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ color: "white" }}
                >
                  {isLoading ? "Processing..." : "Cast Your Vote"}
                </button>
              </div>
            </>
          ) : (
            <div className="text-center p-8 rounded-xl border" style={{ borderColor: border }}>
              <h2 className="text-3xl font-bold mb-4" style={{ color: primary }}>
                Thank you for voting!
              </h2>
              <p className="mb-8 opacity-90" style={{ color: text }}>
                Your vote has been securely recorded on the blockchain.
              </p>
              <button
                onClick={() => window.location.href = "/results"}
                className="px-8 py-3 rounded-full font-medium transition-all bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary"
                style={{ color: "white" }}
              >
                View Results
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={() => setShowConfirmation(false)}
        >
          <div
            className="p-6 rounded-xl max-w-md w-full"
            style={{ backgroundColor: background }}
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold mb-4" style={{ color: primary }}>
              Confirm Your Vote
            </h3>
            <p className="mb-6 opacity-90" style={{ color: text }}>
              You are about to vote for <span className="font-semibold">{selectedParty.name}</span>.
              This action cannot be undone, and your vote will be anonymously recorded on the blockchain.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 rounded-lg border"
                style={{ borderColor: border, color: text }}
              >
                Cancel
              </button>
              <button
                onClick={handleVote}
                className="px-4 py-2 rounded-lg"
                style={{ backgroundColor: primary, color: "white" }}
              >
                Confirm Vote
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};