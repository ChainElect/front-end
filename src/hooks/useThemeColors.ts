import { useTheme } from "@context/CustomThemeContext";

export const useThemeColors = () => {
  const { theme } = useTheme();

  return {
    primary: theme.mode === "dark" ? "var(--color-primary)" : "var(--color-primary)",
    text: theme.mode === "dark" ? "var(--color-text-dark)" : "var(--color-text-light)",
    background: theme.mode === "dark" ? "var(--color-background-dark)" : "var(--color-background-light)",
    border: theme.mode === "dark" ? "var(--color-border-dark)" : "var(--color-border-light)",
    accent: "var(--color-accent)"
  };
};