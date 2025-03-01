import React, { FC } from "react";
import { Title, Paragraph } from "@theme/src/foundation/typography";
import { useThemeColors } from "@hooks/useThemeColors";

export interface ResourceCardProps {
  icon: React.ReactNode;
  title: string;
  link: string;
}

/**
 * @component ResourceCard
 * @description A reusable card component for displaying resource links (tutorials or additional resources).
 */
export const ResourceCard: FC<ResourceCardProps> = ({ icon, title, link }) => {
  const { text, border, primary } = useThemeColors();
  return (
    <a
      href={link}
      className="group flex items-center gap-3 p-4 rounded-xl border transition-all hover:bg-primary/5 hover:border-primary/20"
      style={{
        color: text,
        borderColor: `color-mix(in srgb, ${border} 50%, transparent)`,
        border: `1px solid ${border}`,
      }}
    >
      <span className="text-xl">{icon}</span>
      <span className="flex-1 group-hover:text-primary transition-colors">
        {title}
      </span>
      <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
    </a>
  );
};
