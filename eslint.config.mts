import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginNext from "@next/eslint-plugin-next";
import prettier from "eslint-config-prettier";

export default [
  // Базові правила JS
  js.configs.recommended,

  // Налаштування для всіх типів файлів
  {
    files: ["**/*.{js,cjs,mjs,ts,cts,mts,jsx,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: ["./tsconfig.json"], // важливо для TypeScript
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      react: pluginReact,
      "@next/next": pluginNext,
    },
    rules: {
      // Рекомендовані правила TypeScript
      ...tseslint.configs.recommended.rules,

      // Рекомендовані правила React
      ...pluginReact.configs.recommended.rules,

      // Рекомендовані правила Next.js
      ...pluginNext.configs.recommended.rules,

      // Додаткові правила
      "react/react-in-jsx-scope": "off", // Не потрібне в Next.js
    },
  },

  // Вимикаємо конфлікти з Prettier
  prettier,
];
