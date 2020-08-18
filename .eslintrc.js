module.exports = {
  parser: "babel-eslint",
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    // Prettier must come last, since it disables previously declared rules
    "prettier",
    "prettier/react",
  ],
  plugins: ["react"],
  parserOptions: {
    ecmaVersion: 2020, // 11
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  rules: {
    "react/prop-types": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
}
