module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react', 'html'
  ],
  rules: {
    'linebreak-style': 0,
    'no-console': 0,
    'camelcase': 0,
    'arrow-parens': 0,
    'indent': ['error', 4],
    'no-continue': 0,
    'no-plusplus': 0,
    'max-classes-per-file': 0,
    // 声明未使用
    'no-unused-vars': 1,
    // 返回值同一类型
    'consistent-return': 0,
    // 形参重定义
    'no-param-reassign': 1,
    // 引用后缀
    'import/extensions': 0,
    // default import
    'import/prefer-default-export': 0,
    // 箭头函数换行
    'implicit-arrow-linebreak': 0,
  },
};
