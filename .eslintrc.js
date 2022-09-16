module.exports = {
  env: {
    browser: true,
    amd: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  extends: ['eslint:recommended', 'plugin:jsx-a11y/recommended', 'plugin:prettier/recommended'],
  rules: {
    semi: ['error'],
  },
};
