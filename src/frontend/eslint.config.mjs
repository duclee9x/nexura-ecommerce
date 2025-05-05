import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import nextPlugin from "@next/eslint-plugin-next";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores([
    "node_modules/*",
    "dist/*",
    "build/*",
    "public/*",
    ".next/*",
  ]),
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    // ignores: ["node_modules/*", "dist/*", "build/*", "public/*", ".next/*"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "@typescript-eslint": typescriptEslint,
      next: nextPlugin,
    },
    rules: {
      // ✅ React rules
      "react/display-name": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",

      // ✅ React Hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // ✅ TypeScript
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],

      // ✅ Next.js (only manually picked rules — here's an example)
      "next/google-font-display": "error",
    },
  },
]);
