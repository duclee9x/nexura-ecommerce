import react from "eslint-plugin-react";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import pluginNext from "@next/eslint-plugin-next";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
const path = process.cwd().split("/").pop();
const scope =
  path === "app"
    ? "project"
    : path in
        [
          "cart-service",
          "order-service",
          "payment-service",
          "product-service",
          "user-service",
          "workflow",
        ]
      ? "backend"
      : path === "frontend"
        ? "frontend"
        : "unknown";
console.log(`Using ESLint config for scope: ${scope}`);
const backendRules = {
  plugins: {
    react,
    "@typescript-eslint": typescriptEslint,
  },
  languageOptions: {
    ecmaVersion: "latest",
    parser: typescriptParser,
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
  rules: {
    ...tseslint.configs.recommended.rules
  }
  
};
const frontendRules = {
  name: "ESLint Config - nextjs",
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
    "@next/next": pluginNext,
  },
  files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
  rules: {
    ...pluginNext.configs.recommended.rules,
    ...pluginNext.configs["core-web-vitals"].rules,
    // ✅ React rules
    "react/display-name": "off",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",

    // ✅ React Hooks
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",

    // ✅ TypeScript
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
  },
};
const projectRules = [
  { ...backendRules, ignores: ["src/frontend"] },
  { ...frontendRules, files: ["src/frontend/**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
];
export default tseslint.config(
  {
    ignores: [
      "**.config.ts",
      "**/prisma-client/**",
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/public/**",
      "**/.next/**",
      "**/logs/**",
    ],
  },
  projectRules
);
