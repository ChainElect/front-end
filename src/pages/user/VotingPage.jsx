import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useWallets } from "@web3-onboard/react";
import { useThemeColors } from "@hooks/useThemeColors";
import { FaCheckCircle, FaClock, FaVoteYea } from "react-icons/fa";

import {
  ERC20_ABI,
  ERC20_ADDRESS,
} from "../../utils/wallet/walletConstants.js";

export const VotingPage = () => {
  const { primary, secondary, text, background, border, accent } =
    useThemeColors();
  const [parties, setParties] = useState([]);
  const [selectedParty, setSelectedParty] = useState(null);
  const [voteSubmitted, setVoteSubmitted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [timeLeft, setTimeLeft] = useState("Зареждане...");
  const connectedWallets = useWallets();

  // Default parties in case no data is available
  const defaultParties = [
    {
      id: "1",
      name: "Партия А",
      description: "За модерна и дигитална демокрация.",
      photo: "https://via.placeholder.com/150/1E40AF/FFFFFF?text=Партия+А",
    },
    {
      id: "2",
      name: "Партия Б",
      description: "Традиционни ценности за новото време.",
      photo: "https://via.placeholder.com/150/9B2226/FFFFFF?text=Партия+Б",
    },
    {
      id: "3",
      name: "Партия В",
      description: "Реформи и прозрачност в управлението.",
      photo: "https://via.placeholder.com/150/047857/FFFFFF?text=Партия+В",
    },
  ];

  // Fetch parties from smart contract
  const fetchParties = async () => {
    try {
      const injectedProvider = connectedWallets[0]?.provider;
      if (!injectedProvider) return;

      const provider = new ethers.providers.Web3Provider(injectedProvider);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(ERC20_ADDRESS, ERC20_ABI, signer);

      const electionId = await contract.electionCount();
      const electionDetails = await contract.elections(electionId);
      const endTime = electionDetails.endTime * 1000;

      setParties(defaultParties); // If no data, use default
      startCountdown(endTime);
    } catch (error) {
      console.error("Error fetching parties:", error);
      setParties(defaultParties);
    }
  };

  useEffect(() => {
    fetchParties();
  }, []);

  // Voting countdown timer
  const startCountdown = (votingEndTime) => {
    const timer = setInterval(() => {
      const now = Date.now();
      const remaining = votingEndTime - now;

      if (remaining <= 0) {
        clearInterval(timer);
        setTimeLeft("Гласуването е приключило!");
      } else {
        const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((remaining / (1000 * 60)) % 60);
        const seconds = Math.floor((remaining / 1000) % 60);
        setTimeLeft(`${hours}ч ${minutes}м ${seconds}с`);
      }
    }, 1000);
  };

  const handleVote = async () => {
    if (!selectedParty) {
      alert("Моля, изберете партия преди да гласувате!");
      return;
    }

    try {
      const injectedProvider = connectedWallets[0]?.provider;
      if (!injectedProvider) {
        alert("Моля, свържете портфейла си преди да гласувате!");
        return;
      }

      const provider = new ethers.providers.Web3Provider(injectedProvider);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(ERC20_ADDRESS, ERC20_ABI, signer);

      const tx = await contract.vote(selectedParty.id);
      await tx.wait();
      setVoteSubmitted(true);
    } catch (err) {
      console.error("Error submitting vote:", err);
      alert("Възникна грешка при подаването на гласа.");
    }
  };

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: background }}>
      <header
        className="py-20 backdrop-blur-lg border-b text-center"
        style={{
          backgroundColor: `color-mix(in srgb, ${background} 85%, transparent)`,
          borderColor: `color-mix(in srgb, ${primary} 30%, transparent)`,
        }}
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Гласуване
        </h1>
        <p className="mt-4 text-lg opacity-90" style={{ color: text }}>
          Изберете вашата партия и подайте своя глас в блокчейна.
        </p>
        <div className="mt-6 flex items-center justify-center space-x-3">
          <FaClock className="text-xl" style={{ color: primary }} />
          <span className="text-2xl font-bold" style={{ color: text }}>
            {timeLeft}
          </span>
        </div>
      </header>

      <main className="py-12">
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          {!voteSubmitted ? (
            <>
              <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Изберете партия
              </h2>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                {parties.map((party) => (
                  <div
                    key={party.id}
                    className={`p-6 rounded-xl shadow-lg text-center cursor-pointer transition-transform transform ${
                      selectedParty?.id === party.id
                        ? "border-4 scale-105"
                        : "border border-opacity-50 hover:scale-105"
                    }`}
                    style={{
                      borderColor:
                        selectedParty?.id === party.id ? primary : border,
                      backgroundColor: `color-mix(in srgb, ${background} 95%, transparent)`,
                    }}
                    onClick={() => setSelectedParty(party)}
                  >
                    <img
                      src={party.photo}
                      alt={party.name}
                      className="w-24 h-24 rounded-full mx-auto"
                    />
                    <h3
                      className="text-xl font-semibold mt-4"
                      style={{ color: primary }}
                    >
                      {party.name}
                    </h3>
                    <p
                      className="mt-2 text-sm opacity-80"
                      style={{ color: text }}
                    >
                      {party.description}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-12 text-center">
                <button
                  onClick={handleVote}
                  className="px-6 py-3 rounded-md shadow-md bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary transition text-white"
                >
                  <FaVoteYea className="inline-block mr-2" />
                  Подайте своя глас
                </button>
              </div>
            </>
          ) : (
            <div className="text-center">
              <FaCheckCircle
                className="text-5xl mx-auto"
                style={{ color: primary }}
              />
              <h2
                className="text-3xl font-bold mt-4"
                style={{ color: primary }}
              >
                Вашият глас е записан!
              </h2>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
