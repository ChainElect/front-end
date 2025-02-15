// craco.config.js
const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@assets": path.resolve(__dirname, "src/assets/"),
      "@components": path.resolve(__dirname, "src/components/"),
      "@theme": path.resolve(__dirname, "src/theme/"),
    },
  },
};
