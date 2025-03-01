import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useWallets } from "@web3-onboard/react";
import { ERC20_ABI, ERC20_ADDRESS } from "@utils/wallet/walletConstants";

export interface Party {
  id: string;
  name: string;
  description: string;
  photo: string;
}

// Fallback default parties
export const defaultParties: Party[] = [
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

export const useVotingData = () => {
  const [parties, setParties] = useState<Party[]>(defaultParties);
  const [selectedParty, setSelectedParty] = useState<Party | null>(null);
  const [voteSubmitted, setVoteSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState("Зареждане...");
  const connectedWallets = useWallets();

  // Start a countdown timer based on the voting end time.
  const startCountdown = (votingEndTime: number) => {
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

  // Fetch parties and election details from the smart contract.
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

      // For now we use defaultParties; in a real app, you could fetch party details.
      setParties(defaultParties);
      startCountdown(endTime);
    } catch (error) {
      console.error("Error fetching parties:", error);
      setParties(defaultParties);
    }
  };

  useEffect(() => {
    fetchParties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectedWallets]);

  // Handle vote submission.
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
    } catch (error) {
      console.error("Error submitting vote:", error);
      alert("Възникна грешка при подаването на гласа.");
    }
  };

  return {
    parties,
    selectedParty,
    setSelectedParty,
    voteSubmitted,
    timeLeft,
    handleVote,
  };
};