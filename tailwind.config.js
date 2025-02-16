module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        text: {
          light: "var(--color-text-light)",
          dark: "var(--color-text-dark)",
        },
        background: {
          light: "var(--color-background-light)",
          dark: "var(--color-background-dark)",
        },
        border: {
          light: "var(--color-border-light)",
          dark: "var(--color-border-dark)",
        },
      },
    },
  },
  plugins: [],
};
