import React, { useState, useEffect } from "react";
import { useThemeColors } from "@hooks/useThemeColors";
import { Title } from "@theme/src/foundation/typography/Title";
import { Paragraph } from "@theme/src/foundation/typography/Paragraph";
import { Label } from "@theme/src/foundation/typography/Label";
import { Card } from "@theme/src/components/cards/Card";
import { t } from "i18next";
import { ethers } from "ethers";
import { ERC20_ABI, ERC20_ADDRESS } from "@utils/wallet/walletConstants";
import { useWallets } from "@web3-onboard/react";
import { useParams } from "react-router-dom";

export const ElectionResults = () => {
  const { primary, text, background, border } = useThemeColors();
  const { id } = useParams();
  const connectedWallets = useWallets();

  const [parties, setParties] = useState([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [voterTurnout, setVoterTurnout] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const totalEligibleVoters = 150000;

  const getPartyColor = (name: string) => {
    const colorMapping = {
      "Партия А": "bg-blue-500",
      "Партия Б": "bg-red-500",
      "Партия В": "bg-green-500",
      "Партия Г": "bg-yellow-500",
    };
    return colorMapping[name] || "bg-gray-500";
  };

  const fetchResults = async () => {
    try {
      const injectedProvider = connectedWallets[0]?.provider;
      if (!injectedProvider) throw new Error("Wallet not connected");

      const provider = new ethers.providers.Web3Provider(injectedProvider);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(ERC20_ADDRESS, ERC20_ABI, signer);

      const electionResults = await contract.getResults(id);
      let calculatedTotalVotes = 0;

      const formattedParties = electionResults.map((party) => {
        const votes = parseInt(party.voteCount.toString(), 10);
        calculatedTotalVotes += votes;

        return {
          name: party.name,
          votes: votes,
          color: getPartyColor(party.name),
        };
      });

      const calculatedVoterTurnout = (
        (calculatedTotalVotes / totalEligibleVoters) *
        100
      ).toFixed(1);

      setParties(formattedParties);
      setTotalVotes(calculatedTotalVotes);
      //setVoterTurnout(calculatedVoterTurnout);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  return (
    <div
      className="py-12 min-h-screen flex items-center justify-center"
      style={{ backgroundColor: background }}
    >
      <Card backgroundVariant="grey" className="text-center">
        <Title variant="gradient" className="mb-2">
          {t("electionResults.headerTitle")}
        </Title>
        <Paragraph>
          {t("electionResults.lastUpdated")} {new Date().toLocaleString()}
        </Paragraph>

        {loading && (
          <Paragraph size="md">{t("electionResults.loading")}</Paragraph>
        )}
        {error && (
          <Paragraph size="md" style={{ color: "red" }}>
            {t("electionResults.error")}
          </Paragraph>
        )}

        <Card className="mt-8">
          <Title as="h2" size="2xl">
            {t("electionResults.totalVotes", { count: totalVotes })}
          </Title>
          <div className="flex items-center space-x-3 mt-3">
            <Label size="lg">{t("electionResults.voterTurnoutLabel")}</Label>
            <div className="flex-1 bg-border-light dark:bg-border-dark h-6 rounded-lg">
              <div
                className="h-6 rounded-lg transition-all"
                style={{
                  width: `${voterTurnout}%`,
                  backgroundColor: primary,
                }}
              ></div>
            </div>
            <Label size="lg" weight="semibold">
              {voterTurnout}%
            </Label>
          </div>
        </Card>

        <div className="mt-8">
          <Title as="h2" size="2xl">
            {t("electionResults.voteDistributionTitle")}
          </Title>
          <div className="mt-6 space-y-4">
            {parties.length > 0 ? (
              parties.map((party) => {
                const votePercentage = (
                  (party.votes / totalVotes) *
                  100
                ).toFixed(1);
                return (
                  <div key={party.name} className="flex items-center space-x-2">
                    <Label className="w-24" size="lg">
                      {party.name}
                    </Label>
                    <div className="flex-1 bg-gray-200 h-5 rounded-md">
                      <div
                        className={`${party.color} h-5 rounded-md`}
                        style={{ width: `${votePercentage}%` }}
                      ></div>
                    </div>
                    <Label size="lg" weight="semibold">
                      {votePercentage}%
                    </Label>
                  </div>
                );
              })
            ) : (
              <Paragraph size="md">{t("electionResults.noParties")}</Paragraph>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};
