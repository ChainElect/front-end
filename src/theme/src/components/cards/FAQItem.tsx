import React, { FC } from "react";
import { Paragraph, SectionTitle } from "@theme/src/foundation/typography";
import { useThemeColors } from "@hooks/useThemeColors";

export interface FAQItemProps {
  question: string;
  answer: string;
  icon?: React.ReactNode;
}

/**
 * @component FAQItem
 * @description A reusable FAQ item component.
 */
export const FAQItem: FC<FAQItemProps> = ({ question, answer, icon }) => {
  const { primary, text, background, border } = useThemeColors();
  return (
    <div
      className="p-6 rounded-xl border transition-all hover:border-primary/40"
      style={{
        backgroundColor: `color-mix(in srgb, ${background} 95%, transparent)`,
        borderColor: `color-mix(in srgb, ${border} 30%, transparent)`,
      }}
    >
      <SectionTitle
        className="flex items-center gap-2 mb-3"
        style={{ color: primary }}
      >
        {icon || "❔"} {question}
      </SectionTitle>
      <Paragraph className="pl-6" style={{ color: text }}>
        {answer}
      </Paragraph>
    </div>
  );
};
