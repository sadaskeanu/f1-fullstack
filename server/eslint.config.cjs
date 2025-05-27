// eslint-disable-next-line @typescript-eslint/no-require-imports, no-undef
const js = require("@eslint/js");
// eslint-disable-next-line @typescript-eslint/no-require-imports, no-undef
const tseslint = require("typescript-eslint");

// eslint-disable-next-line no-undef
module.exports = [
  {
    ignores: [
      "src/generated/**",
      "dist/**",
      "node_modules/**",
      "eslint.config.cjs",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
];
