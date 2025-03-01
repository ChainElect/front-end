import React from "react";
import { useThemeColors } from "@hooks/useThemeColors";
import { Title } from "@theme/src/foundation/typography/Title";
import { Paragraph } from "@theme/src/foundation/typography/Paragraph";
import { Label } from "@theme/src/foundation/typography/Label";
import { useElectionResultsData } from "./useElectionResults";
import { getPartyColor, getPartyIcon } from "./partyMappings";
import { Card } from "@theme/src/components/cards/Card";
import { VoteBar } from "./VoteBar";
import { t } from "i18next";

export const ElectionResults = () => {
  const { primary, secondary, text, background, border } = useThemeColors();

  const partyColorCallback = (name: string) =>
    getPartyColor(name, primary, secondary);
  const partyIconCallback = (name: string) => getPartyIcon(name);

  const { parties, totalVotes, voterTurnout, loading, error } =
    useElectionResultsData(partyColorCallback, partyIconCallback);

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

        {/* Voter Turnout Section */}
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

        {/* Votes for Parties */}
        <div className="mt-8">
          <Title as="h2" size="2xl">
            {t("electionResults.voteDistributionTitle")}
          </Title>
          <div className="mt-6 space-y-4">
            {parties.length > 0 ? (
              parties.map((party) => (
                <VoteBar
                  key={party.name}
                  party={party}
                  totalVotes={totalVotes}
                  background={background}
                  border={border}
                  text={text}
                />
              ))
            ) : (
              <Paragraph size="md">{t("electionResults.noParties")}</Paragraph>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};
