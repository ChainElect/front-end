import React from "react";
import { Link, useParams } from "react-router-dom";
import { FaCheckCircle, FaClock, FaVoteYea } from "react-icons/fa";
import { useThemeColors } from "@hooks/useThemeColors";
import { Card } from "@theme/src/components/cards/Card";
import { Title } from "@theme/src/foundation/typography/Title";
import { Paragraph } from "@theme/src/foundation/typography/Paragraph";
import { ActionButton, Button } from "@theme/src/components";
import { useVotingData } from "./useVotingData";
import { t } from "i18next";
import { SecondaryButton } from "@theme/src/components/buttons/SecondaryButton";

export const VotingPage = () => {
  const { id } = useParams();
  const { primary, secondary, text, background, border } = useThemeColors();
  const {
    parties,
    selectedParty,
    setSelectedParty,
    voteSubmitted,
    timeLeft,
    handleVote,
    showConfirmation,
    setShowConfirmation,
  } = useVotingData(id);

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
            {timeLeft || t("voting.loadingTime")}
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
                variant="gradient"
                className="text-center"
              >
                {t("voting.chooseParty")}
              </Title>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                {parties.length > 0 ? (
                  parties.map((party) => (
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
                  ))
                ) : (
                  <Paragraph className="text-center" opacity="high">
                    {t("voting.noParties")}
                  </Paragraph>
                )}
              </div>

              <div className="mt-12 text-center">
                <ActionButton
                  text={t("voting.voteButton")}
                  onClick={() =>
                    selectedParty
                      ? setShowConfirmation(true)
                      : alert(t("voting.selectPartyAlert"))
                  }
                >
                  <FaVoteYea className="inline-block mr-2" />
                </ActionButton>
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
              <div className="mt-8">
                <Link to="/results">
                  <ActionButton text={t("voting.viewResults")} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card variant="elevated" className="p-6 max-w-sm w-full">
            <Title as="h3" size="xl" variant="gradient" className="mb-4">
              {t("voting.confirmationTitle")}
            </Title>
            <Paragraph className="mb-6">
              {t("voting.confirmationText")}{" "}
              <span className="font-semibold">{selectedParty?.name}</span>
            </Paragraph>
            <div className="flex justify-end space-x-4">
              <SecondaryButton
                text={t("common.cancel")}
                onClick={() => setShowConfirmation(false)}
              />
              <ActionButton text={t("common.confirm")} onClick={handleVote} />
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
