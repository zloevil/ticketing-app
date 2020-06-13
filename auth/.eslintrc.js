module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'airbnb'
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    "import/no-unresolved": 0,
    'import/extensions': 'off',
    'no-empty-function': 'off',
    'no-useless-constructor': 'off',
    'camelcase': 'off',
    '@typescript-eslint/camelcase': 'off',
    'max-classes-per-file': 'off',
    'prefer-promise-reject-errors': 'off',
    "@typescript-eslint/no-namespace": "off",
  },
};
