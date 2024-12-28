import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginA11y from "eslint-plugin-jsx-a11y";
import pluginImport from "eslint-plugin-import";
import babelParser from "@babel/eslint-parser"; // Import Babel parser
import pluginReactHooks from "eslint-plugin-react-hooks";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      parser: babelParser, // Use Babel parser
      parserOptions: {
        requireConfigFile: false, // Don't require a Babel config file
        ecmaVersion: 2021, // Use modern JavaScript features
        sourceType: "module", // Enable ES Module syntax
        ecmaFeatures: {
          jsx: true, // Enable JSX
        },
      },
      globals: {
        ...globals.browser, // For browser globals like `window`, `document`
        ...globals.node, // For Node.js globals like `process`, `__dirname`
      },
    },
    plugins: {
      react: pluginReact,
      "react-hooks": pluginReactHooks,
      "jsx-a11y": pluginA11y,
      jsxA11y: pluginA11y,
      import: pluginImport,
    },
    settings: {
      react: {
        version: "detect", // Auto-detect React version
      },
    },
    rules: {
      "no-console": "warn",
      "react/jsx-no-bind": "warn",
      "react/no-array-index-key": "warn",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "import/no-default-export": "error",
      eqeqeq: "error",
      curly: "error",
      "no-var": "error",
      "prefer-const": "warn",
      "no-debugger": "error",
      // "max-lines-per-function": [
      //   "warn",
      //   { max: 50, skipBlankLines: true, skipComments: true, IIFEs: true },
      // ],
      complexity: ["warn", { max: 10 }],
      "react/jsx-props-no-spreading": "warn",
      "react/no-danger": "error",
      "import/order": [
        "warn",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling", "index"],
          ],
          "newlines-between": "always",
        },
      ],
      "jsx-a11y/alt-text": "warn",
      "jsx-a11y/anchor-is-valid": "warn",
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];
