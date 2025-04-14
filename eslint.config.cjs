const js = require("@eslint/js");
const vue = require("eslint-plugin-vue");
const typescript = require("@typescript-eslint/eslint-plugin");
const tsParser = require("@typescript-eslint/parser");
const prettier = require("eslint-plugin-prettier");

module.exports = [
  {
    ignores: ["dist", "node_modules"],
  },
  js.configs.recommended,
  {
    languageOptions: {
      parser: require("vue-eslint-parser"),
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
        extraFileExtensions: [".vue"],
        parser: {
          ts: tsParser,
        },
      },
    },
    plugins: {
      "@typescript-eslint": typescript,
      vue: vue,
      prettier: prettier,
    },
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error"],
      "vue/multi-word-component-names": "off",
      "prettier/prettier": "error",
    },
  },
];
