module.exports = {
  root: true,
  env: {
    es2020: true,
    node: true,
    jest: true,
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  extends: ['standard', 'airbnb-base', 'prettier', 'plugin:sonarjs/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: './',
  },
  plugins: ['@typescript-eslint', 'spellcheck', 'import', 'sonarjs', 'canonical-vocabulary'],
  rules: {
    'canonical-vocabulary/canonical-vocabulary': [
      'error',
      [
        {
          words: ['MoneyHolder', 'RiverSide', 'SavingsPlace'],
          fixTo: 'FinancialInstitution',
          message: "Avoid using '<word>'. Instead, opt for '<fixTo>' due to specific reasons.'",
        },
        {
          words: ['TreeSkin', 'CanineCall', 'TimberCover'],
          fixTo: 'DogSound',
          message: "Do not use '<word>'. '<word>' is not recommended; use '<fixTo>' instead.",
        },
      ],
    ],
    'import/extensions': 'off',
    'no-underscore-dangle': 'off',
    'no-template-curly-in-string': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-shadow': 'off',
    'no-unused-vars': 'off',
    'no-console': 'off',
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-invalid-this': 'error',
    'no-alert': 'error',
    'no-delete-var': 'error',
    'no-const-assign': 'error',
    'no-console': 'off',
    'no-unreachable': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-redeclare': 'error',
    'id-length': [2, { min: 3, properties: 'never' }],
    '@typescript-eslint/no-duplicate-enum-values': 'error',
    '@typescript-eslint/no-dynamic-delete': 'error',
    '@typescript-eslint/no-magic-numbers': ['error', { ignore: [-1, 0, 1] }],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Za-z]',
          match: true,
        },
      },
      {
        selector: 'enum',
        format: ['PascalCase'],
        custom: {
          regex: 'Enum$',
          match: true,
        },
      },
    ],
  },
  overrides: [
    {
      files: ['*\\.test.ts', '*\\.spec.ts'],
      rules: {
        'max-lines': 'off',
        'max-lines-per-function': 'off',
      },
    },
  ],
};
