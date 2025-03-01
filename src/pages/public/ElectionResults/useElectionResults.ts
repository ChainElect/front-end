// src/hooks/useElectionResultsData.ts
import { useState, useEffect } from "react";
import { useWallets } from "@web3-onboard/react";
import { ethers } from "ethers";
import { ERC20_ABI, ERC20_ADDRESS } from "@utils/wallet/walletConstants";

export interface PartyResult {
  name: string;
  votes: number;
  color: string;
  icon: JSX.Element;
}

export interface ElectionResultsData {
  parties: PartyResult[];
  totalVotes: number;
  voterTurnout: string;
  loading: boolean;
  error: any;
}

const totalEligibleVoters = 150000;

export const useElectionResultsData = (
  getPartyColor: (name: string) => string,
  getPartyIcon: (name: string) => JSX.Element
): ElectionResultsData => {
  const [parties, setParties] = useState<PartyResult[]>([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [voterTurnout, setVoterTurnout] = useState("0");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);
  const connectedWallets = useWallets();

  const fetchResults = async () => {
    setLoading(true);
    try {
      const injectedProvider = connectedWallets[0]?.provider;
      if (!injectedProvider) {
        setLoading(false);
        return;
      }

      const provider = new ethers.providers.Web3Provider(injectedProvider);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(ERC20_ADDRESS, ERC20_ABI, signer);

      const electionCount = await contract.electionCount();
      const electionResults = await contract.getResults(electionCount);

      let calculatedTotalVotes = 0;
      const formattedParties = electionResults.map((party) => {
        const votes = parseInt(party.voteCount.toString(), 10);
        calculatedTotalVotes += votes;

        return {
          name: party.name,
          votes,
          color: getPartyColor(party.name),
          icon: getPartyIcon(party.name),
        };
      });

      const calculatedVoterTurnout = (
        (calculatedTotalVotes / totalEligibleVoters) *
        100
      ).toFixed(1);

      setParties(formattedParties);
      setTotalVotes(calculatedTotalVotes);
      setVoterTurnout(calculatedVoterTurnout);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, [connectedWallets]);

  return { parties, totalVotes, voterTurnout, loading, error };
};