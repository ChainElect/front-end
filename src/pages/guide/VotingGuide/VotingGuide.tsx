import React from "react";
import { useThemeColors } from "@hooks/useThemeColors";
import {
  FaVoteYea,
  FaUserCheck,
  FaListAlt,
  FaCheckCircle,
  FaChartBar,
} from "react-icons/fa";
import { Title, Paragraph } from "@theme/src/foundation/typography";
import { useVotingGuideData } from "./useVotingGuideData";
import { ActionButton } from "@theme/src/components";
import { VotingGuideStep } from "./useVotingGuideData";
import { t } from "i18next";
import { Link } from "react-router-dom";

export const VotingGuide = () => {
  const { primary, secondary, text, background, border } = useThemeColors();
  const { title, subtitle, steps, ctaSection } = useVotingGuideData();

  return (
    <div className="min-h-screen" style={{ backgroundColor: background }}>
      <header
        className="py-20 backdrop-blur-lg border-b"
        style={{
          backgroundColor: `color-mix(in srgb, ${background} 85%, transparent)`,
          borderColor: `color-mix(in srgb, ${primary} 30%, transparent)`,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Title variant="gradient" as="h1" className="mb-4">
            {title}
          </Title>
          <Paragraph size="lg" className="max-w-2xl mx-auto">
            {subtitle}
          </Paragraph>
        </div>
      </header>

      <main className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <Paragraph size="lg" weight="medium">
              {t("votingGuide.intro")}
            </Paragraph>
          </div>

          <ol className="space-y-8">
            {(steps as VotingGuideStep[]).map((step, index) => (
              <li
                key={index}
                className="p-6 rounded-xl border hover:border-primary/40 transition-all group flex items-start gap-4"
                style={{
                  backgroundColor: `color-mix(in srgb, ${background} 95%, transparent)`,
                  borderColor: `color-mix(in srgb, ${border} 30%, transparent)`,
                }}
              >
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  {step.icon === "userCheck" && (
                    <FaUserCheck className="w-6 h-6" />
                  )}
                  {step.icon === "listAlt" && <FaListAlt className="w-6 h-6" />}
                  {step.icon === "voteYea" && <FaVoteYea className="w-6 h-6" />}
                  {step.icon === "checkCircle" && (
                    <FaCheckCircle className="w-6 h-6" />
                  )}
                  {step.icon === "chartBar" && (
                    <FaChartBar className="w-6 h-6" />
                  )}
                </div>
                <div>
                  <Title as="h3" size="xl" variant="gradient">
                    {step.title}
                  </Title>
                  <Paragraph className="mt-2">{step.content}</Paragraph>
                </div>
              </li>
            ))}
          </ol>

          <div
            className="mt-12 p-8 rounded-2xl border text-center"
            style={{
              borderColor: `color-mix(in srgb, ${border} 30%, transparent)`,
              background: `linear-gradient(45deg, ${primary}10, ${secondary}10)`,
            }}
          >
            <Title as="h2" size="2xl" variant="gradient" className="mb-4">
              {ctaSection.title}
            </Title>
            <Paragraph className="mb-6 max-w-xl mx-auto">
              {ctaSection.content}
            </Paragraph>
            <Link to="/login">
              {" "}
              <ActionButton
                text={ctaSection.buttonText}
                size="lg"
                className="mx-auto"
              />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};
