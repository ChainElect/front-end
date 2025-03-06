import React from "react";
import { useThemeColors } from "@hooks/useThemeColors";
import { FaChartBar, FaInfoCircle } from "react-icons/fa";
import { Title, Paragraph } from "@theme/src/foundation/typography";
import { useResultsGuideData } from "./useResultsGuideData";

export const ResultsGuide = () => {
  const { primary, secondary, text, background, border } = useThemeColors();
  const { title, subtitle, steps } = useResultsGuideData();

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
          <ol className="space-y-8">
            {steps.map((step, index) => (
              <li
                key={index}
                className="p-6 rounded-xl border hover:border-primary/40 transition-all flex items-start gap-4"
                style={{
                  backgroundColor: `color-mix(in srgb, ${background} 95%, transparent)`,
                  borderColor: `color-mix(in srgb, ${border} 30%, transparent)`,
                }}
              >
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  {step.icon === "chart" ? (
                    <FaChartBar className="w-6 h-6" />
                  ) : (
                    <FaInfoCircle className="w-6 h-6" />
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
        </div>
      </main>
    </div>
  );
};
