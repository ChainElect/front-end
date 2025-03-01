// src/theme/cards/FeatureCard.tsx
import React, { FC, HTMLAttributes } from "react";
import { useThemeColors } from "@hooks/useThemeColors";
import { IconContainer } from "../icons/IconContainer";
import { Paragraph, Title } from "@theme/src/foundation/typography";
import { Card } from "./Card";

export interface FeatureCardProps extends HTMLAttributes<HTMLDivElement> {
  icon: string;
  title: string;
  content: string;
}

export const FeatureCard: FC<FeatureCardProps> = ({ icon, title, content }) => {
  const { primary, text } = useThemeColors();

  return (
    <Card
      variant="elevated"
      backgroundVariant="default"
      className="group relative flex-col h-full"
    >
      <div
        className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: `radial-gradient(400px at 50% 50%, color-mix(in srgb, ${primary} 10%, transparent), transparent)`,
        }}
      />

      <div className="relative z-10">
        <IconContainer icon={icon} />

        <Title as="h3" size="2xl" className="mb-4" style={{ color: text }}>
          {title}
        </Title>

        <Paragraph className="leading-relaxed flex-1" style={{ color: text }}>
          {content}
        </Paragraph>
      </div>
    </Card>
  );
};
