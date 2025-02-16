import React, { useState, useEffect } from "react";
import { useWallets } from "@web3-onboard/react";
import { ethers } from "ethers";
import { useThemeColors } from "@hooks/useThemeColors";
import {
  ERC20_ABI,
  ERC20_ADDRESS,
} from "../../utils/wallet/walletConstants.js";
import { FaVoteYea, FaChartPie, FaUsers } from "react-icons/fa";

export const ElectionResults = () => {
  const { primary, secondary, text, background, border } = useThemeColors();
  const [parties, setParties] = useState([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [voterTurnout, setVoterTurnout] = useState(0);
  const connectedWallets = useWallets();
  const totalEligibleVoters = 150000;

  const fetchResults = async () => {
    try {
      const injectedProvider = connectedWallets[0]?.provider;
      if (!injectedProvider) return;

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
    } catch (error) {
      console.error("Error fetching election results:", error);
    }
  };

  const getPartyColor = (name) => {
    const colorMapping = {
      "Партия А": primary,
      "Партия Б": secondary,
      "Партия В": "var(--color-accent)",
      "Партия Г": "var(--color-warning)",
    };
    return colorMapping[name] || "var(--color-border-light)";
  };

  const getPartyIcon = (name) => {
    const iconMapping = {
      "Партия А": <FaVoteYea />,
      "Партия Б": <FaChartPie />,
      "Партия В": <FaUsers />,
      "Партия Г": <FaVoteYea />,
    };
    return iconMapping[name] || <FaUsers />;
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const renderVoteBar = (party) => {
    const votePercentage = totalVotes
      ? ((party.votes / totalVotes) * 100).toFixed(1)
      : 0;
    return (
      <div
        key={party.name}
        className="flex items-center space-x-3 py-3 px-4 rounded-xl transition-transform hover:scale-105 shadow-md"
        style={{
          backgroundColor: `color-mix(in srgb, ${background} 85%, transparent)`,
          border: `1px solid ${border}`,
        }}
      >
        <div
          className="p-2 rounded-full shadow-lg text-xl"
          style={{ color: party.color }}
        >
          {party.icon}
        </div>
        <div className="w-24 font-semibold" style={{ color: text }}>
          {party.name}
        </div>
        <div className="flex-1 bg-border-light dark:bg-border-dark h-6 rounded-lg">
          <div
            className="h-6 rounded-lg transition-all"
            style={{
              width: `${votePercentage}%`,
              backgroundColor: party.color,
            }}
          ></div>
        </div>
        <div className="w-16 text-right font-semibold" style={{ color: text }}>
          {votePercentage}%
        </div>
      </div>
    );
  };

  return (
    <div
      className="py-12 min-h-screen flex items-center justify-center"
      style={{ backgroundColor: background }}
    >
      <div
        className="max-w-4xl w-full p-8 rounded-2xl shadow-xl backdrop-blur-lg text-center"
        style={{
          backgroundColor: `rgba(255, 255, 255, 0.1)`,
          border: `1px solid ${border}`,
        }}
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Резултати от изборите
        </h1>
        <p className="opacity-80 mt-2" style={{ color: text }}>
          Последно обновяване: {new Date().toLocaleString()}
        </p>

        {/* Voter Turnout Section */}
        <div
          className="mt-6 p-6 rounded-xl shadow-lg"
          style={{
            backgroundColor: `color-mix(in srgb, ${background} 90%, transparent)`,
            border: `1px solid ${border}`,
          }}
        >
          <h2 className="text-2xl font-semibold" style={{ color: text }}>
            Общо гласове: {totalVotes}
          </h2>
          <div className="flex items-center space-x-3 mt-3">
            <span className="text-lg" style={{ color: text }}>
              Избирателна активност:
            </span>
            <div className="flex-1 bg-border-light dark:bg-border-dark h-6 rounded-lg">
              <div
                className="h-6 rounded-lg transition-all"
                style={{ width: `${voterTurnout}%`, backgroundColor: primary }}
              ></div>
            </div>
            <span className="text-lg font-semibold" style={{ color: text }}>
              {voterTurnout}%
            </span>
          </div>
        </div>

        {/* Votes for parties */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold" style={{ color: text }}>
            Разпределение на гласовете
          </h2>
          <div className="mt-6 space-y-4">
            {parties.length > 0 ? (
              parties.map((party) => renderVoteBar(party))
            ) : (
              <p className="text-center opacity-80" style={{ color: text }}>
                Няма налични партии.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
