// craco.config.js
const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@assets": path.resolve(__dirname, "src/assets/"),
      "@components": path.resolve(__dirname, "src/components/"),
      "@theme": path.resolve(__dirname, "src/theme/"),
      "@hooks": path.resolve(__dirname, "src/hooks/"),
      "@context": path.resolve(__dirname, "src/context/"),
      "@utils": path.resolve(__dirname, "src/utils/"),
      "@config": path.resolve(__dirname, "src/config/"),
      "@routes": path.resolve(__dirname, "src/routes/"),
      "@layouts": path.resolve(__dirname, "src/layouts/"),
    },
  },
};
