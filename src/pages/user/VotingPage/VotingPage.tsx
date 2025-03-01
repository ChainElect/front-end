import React from "react";
import { FaCheckCircle, FaClock, FaVoteYea } from "react-icons/fa";
import { useThemeColors } from "@hooks/useThemeColors";
import { Card } from "@theme/src/components/cards/Card";
import { Title } from "@theme/src/foundation/typography/Title";
import { Paragraph } from "@theme/src/foundation/typography/Paragraph";
import { ActionButton, Button } from "@theme/src/components";
import { useVotingData } from "./useVotingData";
import { t } from "i18next";

export const VotingPage = () => {
  const { primary, text, background, border } = useThemeColors();
  const {
    parties,
    selectedParty,
    setSelectedParty,
    voteSubmitted,
    timeLeft,
    handleVote,
  } = useVotingData();

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: background }}>
      {/* Header */}
      <header
        className="py-20 backdrop-blur-lg border-b text-center"
        style={{
          backgroundColor: `color-mix(in srgb, ${background} 85%, transparent)`,
          borderColor: `color-mix(in srgb, ${primary} 30%, transparent)`,
        }}
      >
        <Title variant="gradient" className="text-4xl font-bold">
          {t("voting.headerTitle")}
        </Title>
        <Paragraph className="mt-4 text-lg opacity-90" style={{ color: text }}>
          {t("voting.headerSubtitle")}
        </Paragraph>
        <div className="mt-6 flex items-center justify-center space-x-3">
          <FaClock className="text-xl" style={{ color: primary }} />
          <Title size="2xl" className="font-bold" style={{ color: text }}>
            {timeLeft}
          </Title>
        </div>
      </header>

      {/* Main content */}
      <main className="py-12">
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          {!voteSubmitted ? (
            <>
              <Title
                as="h2"
                size="2xl"
                className="text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
              >
                {t("voting.chooseParty")}
              </Title>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                {parties.map((party) => (
                  <Card
                    key={party.id}
                    variant="default"
                    backgroundVariant="default"
                    className={`cursor-pointer transition-transform transform ${
                      selectedParty?.id === party.id
                        ? "border-4 scale-105"
                        : "border border-opacity-50 hover:scale-105"
                    }`}
                    style={{
                      borderColor:
                        selectedParty?.id === party.id ? primary : border,
                    }}
                    onClick={() => setSelectedParty(party)}
                  >
                    <img
                      src={party.photo}
                      alt={party.name}
                      className="w-24 h-24 rounded-full mx-auto"
                    />
                    <Title
                      as="h3"
                      size="xl"
                      className="mt-4"
                      style={{ color: primary }}
                    >
                      {party.name}
                    </Title>
                    <Paragraph
                      className="mt-2 text-sm opacity-80"
                      style={{ color: text }}
                    >
                      {party.description}
                    </Paragraph>
                  </Card>
                ))}
              </div>
              <div className="mt-12 text-center">
                <Button onClick={handleVote}>
                  <FaVoteYea className="inline-block mr-2" />
                  {t("voting.voteButton")}
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center">
              <FaCheckCircle
                className="text-5xl mx-auto"
                style={{ color: primary }}
              />
              <Title
                as="h2"
                size="3xl"
                className="mt-4"
                style={{ color: primary }}
              >
                {t("voting.voteSubmittedMessage")}
              </Title>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
