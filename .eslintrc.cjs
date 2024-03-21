/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
    'plugin:vue/strongly-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
    'prettier',
    'plugin:import/recommended',
    'plugin:import/typescript'
  ],
  plugins: ['@typescript-eslint', 'prettier', 'import'],
  rules: {
    'prettier/prettier': ['warn'],
    // not needed for vue 3
    'vue/no-multiple-template-root': 'off',
    'padding-line-between-statements': [
      'warn',
      {
        blankLine: 'always',
        prev: '*',
        next: ['block', 'block-like', 'cjs-export', 'class', 'const', 'export', 'import', 'let', 'var']
      },
      {
        blankLine: 'always',
        prev: ['block', 'block-like', 'cjs-export', 'class', 'const', 'export', 'import', 'let', 'var'],
        next: '*'
      },
      {
        blankLine: 'never',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var']
      },
      { blankLine: 'any', prev: ['export', 'import'], next: ['export', 'import'] }
    ],
    'sort-imports': [
      'warn',
      {
        ignoreCase: false,
        ignoreDeclarationSort: true, // don"t want to sort import lines, use eslint-plugin-import instead
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        allowSeparatedGroups: true
      }
    ],
    'import/no-unresolved': 0,
    'import/order': [
      'warn',
      {
        groups: [
          'builtin', // Built-in imports (come from NodeJS native) go first
          'external', // <- External imports
          'internal', // <- Absolute imports
          ['sibling', 'parent'], // <- Relative imports, the sibling and parent types they can be mingled together
          'index', // <- index imports
          'unknown' // <- unknown
        ],
        'newlines-between': 'always',
        alphabetize: {
          /* sort in ascending order. Options: ["ignore", "asc", "desc"] */
          order: 'asc',
          /* ignore case. Options: [true, false] */
          caseInsensitive: true
        }
      }
    ]
  },
  globals: {
    module: 'writable'
  },
  overrides: [
    {
      files: ['**/__tests__/*.{cy,spec}.{js,ts,jsx,tsx}', 'cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}'],
      extends: ['plugin:cypress/recommended']
    }
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest'
  }
}
