import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { useWallets } from "@web3-onboard/react";
import { FaVoteYea } from "react-icons/fa";
import { useThemeColors } from "@hooks/useThemeColors";
import { Card } from "@theme/src/components/cards/Card";
import { Title } from "@theme/src/foundation/typography/Title";
import { Paragraph } from "@theme/src/foundation/typography/Paragraph";
import { ActionButton } from "@theme/src/components";
import { ERC20_ABI, ERC20_ADDRESS } from "@utils/wallet/walletConstants";
import { t } from "i18next";

interface Election {
  id: string;
  name: string;
  description: string;
  parties: any[];
}

export const OngoingElections = () => {
  const navigate = useNavigate();
  const { primary, text, background, border } = useThemeColors();
  const [elections, setElections] = useState<Election[]>([]);
  const connectedWallets = useWallets();

  const fetchElections = async () => {
    try {
      if (!connectedWallets.length) return;

      const injectedProvider = connectedWallets[0].provider;
      const provider = new ethers.providers.Web3Provider(injectedProvider);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(ERC20_ADDRESS, ERC20_ABI, signer);

      const ongoingElections = await contract.getAllOngoingElections();
      const electionsWithParties = await Promise.all(
        ongoingElections.map(async (election) => ({
          ...election,
          parties: await contract.getElectionParties(election.id),
        }))
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
          {t("elections.ongoingTitle")}
        </Title>
        <Paragraph className="mt-4 text-lg opacity-90" style={{ color: text }}>
          {t("elections.ongoingSubtitle")}
        </Paragraph>
      </header>

      <main className="py-12">
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          <Title as="h2" size="2xl" variant="gradient" className="text-center">
            {t("elections.chooseElection")}
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
                    {election.description || t("elections.noDescription")}
                  </Paragraph>
                  <div className="mt-6 text-center">
                    <ActionButton
                      text={t("elections.voteButton")}
                      onClick={() =>
                        navigate(`/voting/${election.id.toString()}`)
                      }
                    >
                      <FaVoteYea className="inline-block mr-2" />
                    </ActionButton>
                  </div>
                </Card>
              ))
            ) : (
              <Paragraph className="text-center" opacity="high">
                {t("elections.noElections")}
              </Paragraph>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
