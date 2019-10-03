module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'indent': ['error', 4],
    'linebreak-style': ['error', 'windows'],
    'arrow-parens': 0,
    'no-unused-vars': 1,
    'space-before-function-paren': 0,
    'no-plusplus': 0,
    'import/extensions': 0,
  },
};
