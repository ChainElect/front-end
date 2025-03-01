import React, { FC } from "react";
import { useThemeColors } from "@hooks/useThemeColors";

export interface Party {
  name: string;
  votes: number;
  color: string;
  icon: JSX.Element;
}

export interface VoteBarProps {
  party: Party;
  totalVotes: number;
  background: string;
  border: string;
  text: string;
}

export const VoteBar: FC<VoteBarProps> = ({
  party,
  totalVotes,
  background,
  border,
  text,
}) => {
  const votePercentage = totalVotes
    ? ((party.votes / totalVotes) * 100).toFixed(1)
    : 0;

  return (
    <div
      key={party.name}
      className="flex items-center space-x-3 py-3 px-4 rounded-xl transition-transform hover:scale-105 shadow-md"
      style={{
        backgroundColor: `color-mix(in srgb, ${background} 85%, transparent)`,
        border: `1px solid ${border}`,
      }}
    >
      <div
        className="p-2 rounded-full shadow-lg text-xl"
        style={{ color: party.color }}
      >
        {party.icon}
      </div>
      <div className="w-24 font-semibold" style={{ color: text }}>
        {party.name}
      </div>
      <div className="flex-1 bg-border-light dark:bg-border-dark h-6 rounded-lg">
        <div
          className="h-6 rounded-lg transition-all"
          style={{
            width: `${votePercentage}%`,
            backgroundColor: party.color,
          }}
        ></div>
      </div>
      <div className="w-16 text-right font-semibold" style={{ color: text }}>
        {votePercentage}%
      </div>
    </div>
  );
};
