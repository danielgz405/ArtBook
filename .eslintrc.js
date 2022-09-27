module.exports = {
  env: {
    browser: true,
    amd: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: ['eslint:recommended', 'plugin:jsx-a11y/recommended', 'plugin:prettier/recommended', 'plugin:react/recommended'],
  rules: {
    'no-unused-vars': 'warn',
    semi: ['error'],
    'react/react-in-jsx-scope': 'off',
    // allow jsx syntax in js files (for next.js project)
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/no-unescaped-entities': 0,
    'react/prop-types': 'off',
  },
};
