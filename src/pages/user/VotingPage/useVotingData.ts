import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useWallets } from "@web3-onboard/react";
import { ERC20_ABI, ERC20_ADDRESS } from "@utils/wallet/walletConstants";
import { t } from "i18next";
import { Party } from "pages/public/ElectionResults/VoteBar";
import { defaultParties } from "./voting";

export const useVotingData = (electionId) => {
  const [parties, setParties] = useState<Party[]>(defaultParties);
  const [selectedParty, setSelectedParty] = useState<Party | null>(null);
  const [voteSubmitted, setVoteSubmitted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [timeLeft, setTimeLeft] = useState(t("voting.loadingTime"));
  const [votingEndTime, setVotingEndTime] = useState<number | null>(null);
  const connectedWallets = useWallets();

  const fetchParties = async () => {
    try {
      const injectedProvider = connectedWallets[0]?.provider;
      if (!injectedProvider) return;

      const provider = new ethers.providers.Web3Provider(injectedProvider);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(ERC20_ADDRESS, ERC20_ABI, signer);

      const electionDetails = await contract.getElectionDetails(electionId);
      const endTime = electionDetails.endTime.toNumber() * 1000;
      setVotingEndTime(endTime);

      const fetchedParties = await contract.getElectionParties(electionId);
      setParties(
        fetchedParties.map(party => ({
          id: party.id.toString(),
          name: party.name,
          description: party.description,
          photo: party.photo || "https://via.placeholder.com/150"
        }))
      );
    } catch (error) {
      console.error("Error fetching parties:", error);
      setParties(defaultParties);
    }
  };

  useEffect(() => {
    if (electionId) fetchParties();
  }, [electionId, connectedWallets]);

  useEffect(() => {
    if (!votingEndTime) return;

    const timer = setInterval(() => {
      const now = Date.now();
      const remaining = votingEndTime - now;

      if (remaining <= 0) {
        clearInterval(timer);
        setTimeLeft(t("voting.votingEnded"));
      } else {
        const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((remaining / (1000 * 60)) % 60);
        const seconds = Math.floor((remaining / 1000) % 60);
        setTimeLeft(`${hours}${t("time.h")} ${minutes}${t("time.m")} ${seconds}${t("time.s")}`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [votingEndTime]);

  const handleVote = async () => {
    if (!selectedParty || !electionId) return;

    try {
      const injectedProvider = connectedWallets[0]?.provider;
      if (!injectedProvider) {
        alert(t("voting.connectWalletAlert"));
        return;
      }

      const provider = new ethers.providers.Web3Provider(injectedProvider);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(ERC20_ADDRESS, ERC20_ABI, signer);

      const tx = await contract.vote(electionId, selectedParty.id);
      await tx.wait();
      setVoteSubmitted(true);
      setShowConfirmation(false);
    } catch (error) {
      console.error("Error submitting vote:", error);
      alert(t("voting.voteError"));
    }
  };

  return {
    parties,
    selectedParty,
    setSelectedParty,
    voteSubmitted,
    timeLeft,
    handleVote,
    showConfirmation,
    setShowConfirmation
  };
};