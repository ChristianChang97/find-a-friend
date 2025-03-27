import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: { globals: globals.node },
  },
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  tseslint.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    rules: {
      indent: ["tab"], // Usando tabulação para indentação
      "max-len": ["error", { code: 60 }],
      "object-curly-newline": [
        "error",
        {
          ObjectExpression: { minProperties: 6, multiline: true },
          ObjectPattern: { minProperties: 6, multiline: true },
          ImportDeclaration: { minProperties: 6, multiline: true },
          ExportDeclaration: { minProperties: 6, multiline: true },
        },
      ],
    },
  },
]);
