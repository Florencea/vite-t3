import js from "@eslint/js";
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
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "error",
        { allowConstantExport: true },
      ],
    },
  },
  /**
   * ignore files
   */
  {
    ignores: ["dist", "public", "src/server/openapi"],
  },
);
