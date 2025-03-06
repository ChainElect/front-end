import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useWallets } from "@web3-onboard/react";
import { useNavigate } from "react-router-dom";
import { useThemeColors } from "@hooks/useThemeColors";
import { Card } from "@theme/src/components/cards/Card";
import { Title } from "@theme/src/foundation/typography/Title";
import { Paragraph } from "@theme/src/foundation/typography/Paragraph";
import { ActionButton } from "@theme/src/components";
import { ERC20_ABI, ERC20_ADDRESS } from "@utils/wallet/walletConstants.js";
import { t } from "i18next";

export const FinishedElections = () => {
  const navigate = useNavigate();
  const { primary, text, background, border } = useThemeColors();
  const [elections, setElections] = useState([]);
  const connectedWallets = useWallets();

  const handleButtonClick = (id) => {
    navigate(`/results/${id}`);
  };

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

      const closedElections = await contract.getClosedElection();
      const electionsWithParties = await Promise.all(
        closedElections.map(async (election) => {
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
  }, [connectedWallets]);

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: background }}>
      <header
        className="py-20 backdrop-blur-lg border-b text-center"
        style={{
          backgroundColor: `color-mix(in srgb, ${background} 85%, transparent)`,
          borderColor: `color-mix(in srgb, ${primary} 30%, transparent)`,
        }}
      >
        <Title variant="gradient" className="text-4xl font-bold">
          {t("elections.finishedTitle", "Резултати от изминали избори")}
        </Title>
        <Paragraph className="mt-4 text-lg opacity-90" style={{ color: text }}>
          {t(
            "elections.finishedSubtitle",
            "Изберете избори, за които искате да гласувате."
          )}
        </Paragraph>
      </header>

      <main className="py-12">
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          <Title as="h2" size="2xl" variant="gradient" className="text-center">
            {t("elections.chooseFinishedElection", "Изберете избор")}
          </Title>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            {elections.length > 0 ? (
              elections.map((election) => (
                <Card
                  key={election.id.toString()}
                  variant="default"
                  backgroundVariant="default"
                  className="cursor-pointer hover:scale-105 transition-transform"
                  style={{ borderColor: border }}
                >
                  <Title as="h3" size="xl" style={{ color: primary }}>
                    {election.name}
                  </Title>
                  <Paragraph
                    className="mt-2 opacity-80"
                    style={{ color: text }}
                  >
                    {election.description ||
                      t("elections.noDescription", "Описание липсва.")}
                  </Paragraph>
                  <div className="mt-6 text-center">
                    <ActionButton
                      text={t("elections.resultsButton", "Резултати")}
                      onClick={() => handleButtonClick(election.id)}
                    />
                  </div>
                </Card>
              ))
            ) : (
              <Paragraph className="text-center" opacity="high">
                {t("elections.noElections", "Няма текущи избори.")}
              </Paragraph>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
