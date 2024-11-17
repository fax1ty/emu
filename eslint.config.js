import eslintPluginTypeScript from "@typescript-eslint/eslint-plugin";
import eslintParserTypeScript from "@typescript-eslint/parser";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginSimpleImportSort from "eslint-plugin-simple-import-sort";
import eslintPluginTailwind from "eslint-plugin-tailwindcss";

export default [
  {
    ignores: [
      "node_modules/**",
      "**/dist/**",
      "**/.prettierrc.*",
      "src-tauri/**",
    ],
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: eslintParserTypeScript,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: eslintPluginReact,
      "@typescript-eslint": eslintPluginTypeScript,
      prettier: eslintPluginPrettier,
      import: eslintPluginImport,
      "simple-import-sort": eslintPluginSimpleImportSort,
      "react-hooks": eslintPluginReactHooks,
    },
    rules: {
      ...eslintPluginReact.configs.recommended.rules,
      ...eslintPluginTypeScript.configs.recommended.rules,

      "prettier/prettier": ["error"],

      "react/react-in-jsx-scope": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error"],
      "@typescript-eslint/no-unused-expressions": "off",
      "import/named": "off",
      "import/no-extraneous-dependencies": "off",
      "import/no-unresolved": "off",
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^react", "^@?\\w"],
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            ["^.+\\.s?css$"],
          ],
        },
      ],
      "simple-import-sort/exports": "error",
      "react/jsx-indent": ["error", 2],
      "react/jsx-indent-props": ["error", 2],
      "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 1 }],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        },
      },
    },
  },
  eslintConfigPrettier,
  ...eslintPluginTailwind.configs["flat/recommended"],
];
