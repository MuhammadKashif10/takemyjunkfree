import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  {
    rules: {
      // Not enabled in the original project's eslint.config.js (typescript-eslint +
      // prettier only) — ported copy uses plain apostrophes throughout, and escaping
      // them as entities has zero visual effect but would diverge the source from
      // the original content/component files for no reader-facing reason.
      "react/no-unescaped-entities": "off",
    },
  },
];

export default eslintConfig;
