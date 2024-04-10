import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  /**
   * base and typescript
   */
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  /**
   *  ignore type check for .js
   */
  {
    files: ["*.js"],
    ...tseslint.configs.disableTypeChecked,
  },
  /**
   * react
   */
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ["tsconfig.json", "tsconfig.node.json"],
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: globals.browser,
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "error",
        { allowConstantExport: true },
      ],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  /**
   * enable node api for tailwind.config.js
   */
  {
    files: ["tailwind.config.js"],
    languageOptions: {
      globals: globals.node,
    },
  },
  /**
   * ignore files
   */
  {
    ignores: ["dist", "public", "src/server/openapi"],
  },
);
