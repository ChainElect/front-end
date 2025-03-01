import React from "react";
import { FaVoteYea, FaChartPie, FaUsers } from "react-icons/fa";

/**
 * Returns the color associated with the given party name.
 *
 * @param name - The name of the party.
 * @param primary - The primary theme color.
 * @param secondary - The secondary theme color.
 * @returns A color value as a string.
 */
export const getPartyColor = (
  name: string,
  primary: string,
  secondary: string
): string => {
  const colorMapping: Record<string, string> = {
    "Партия А": primary,
    "Партия Б": secondary,
    "Партия В": "var(--color-accent)",
    "Партия Г": "var(--color-warning)",
  };
  return colorMapping[name] || "var(--color-border-light)";
};

/**
 * Returns the icon associated with the given party name.
 *
 * @param name - The name of the party.
 * @returns A JSX element representing the icon.
 */
export const getPartyIcon = (name: string): JSX.Element => {
  const iconMapping: Record<string, JSX.Element> = {
    "Партия А": <FaVoteYea />,
    "Партия Б": <FaChartPie />,
    "Партия В": <FaUsers />,
    "Партия Г": <FaVoteYea />,
  };
  return iconMapping[name] || <FaUsers />;
};
