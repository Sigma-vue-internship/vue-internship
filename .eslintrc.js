/* eslint-disable */
module.exports = {
  root: true,

  env: {
    browser: true,
    node: true,
  },

  parserOptions: {
    parser: 'babel-eslint',
  },

  extends: [
    'plugin:vue/recommended',
  ],

  // add your custom rules here
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    'semi': [1, 'always'],
    'object-literal-sort-keys': 0,
    'max-len': [2, { code: 140 }],
    'object-curly-spacing': [1, 'always'],
    'array-bracket-spacing': [
      'error',
      'never'
    ],
    'no-var': ['error'],
    'space-before-function-paren': ['error', 'never'],
    'no-unused-vars': [1],
    'comma-dangle': [1, {
      'objects': 'always-multiline',
      'imports': 'never',
      'exports': 'never',
      'functions': 'never'
    }],
    'no-trailing-spaces': [1, { 'ignoreComments': true }],
  },

  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    },
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    },
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
};
/* eslint-enable */
