import {FlatCompat} from "@eslint/eslintrc";
import checkFile from "eslint-plugin-check-file";
import drizzle from "eslint-plugin-drizzle";
import {dirname} from "path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      "check-file": checkFile,
      drizzle,
    },
  },
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "src/components/ui/**",
      "src/lib/utils.ts",
    ],
  },
  {
    rules: {
      "prefer-arrow-callback": ["error"],
      "prefer-template": ["error"],
      semi: ["error"],
      quotes: ["error", "double"],
      "no-undef": ["warn"],
      "no-unused-vars": ["warn"],

      "check-file/filename-naming-convention": [
        "error",
        {
          "**/*.{js,jsx,ts,tsx}": "KEBAB_CASE",
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],
      "check-file/folder-naming-convention": [
        "error",
        {
          "src/**/": "NEXT_JS_APP_ROUTER_CASE",
        },
        {
          //
          errorMessage:
            // eslint-disable-next-line quotes
            `The folder "{{ target }}" does not match the KEBAB_CASE pattern`,
        },
      ],
    },
  },
];

export default eslintConfig;
