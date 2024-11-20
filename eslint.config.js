const prettier = require('eslint-plugin-prettier');
module.exports = [
  {
    files: ['**/*.js'],
    ignores: ['node_modules/**'],
    languageOptions: {
      // specify globals here if needed
      globals: {
        // global variables, e.g., "React": "writable"
      },
    },
    rules: {
      'no-var': 'error',

      'prefer-const': 'warn',

      'no-console': 'off',
      eqeqeq: 'error',

      curly: 'error',
    },
  },
  {
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
];

//npx eslint . --fix
