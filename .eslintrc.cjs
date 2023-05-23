const isProduction = process.env.NODE_ENV === 'production';

const importOrderOptions = {
  groups: ['builtin', 'external', 'parent', 'sibling'],
  pathGroups: [
    { pattern: 'vue', group: 'external', position: 'before' },
    // ? Patterns should be sorting of more precise to more generic
    { pattern: '@/**/*.vue', group: 'sibling' },
    { pattern: '@/**/*', group: 'parent' },
    { pattern: './**/*', group: 'parent', position: 'after' },
  ],
  /**
   * ? Particular case: need to exclude `vue` of external import group to can be sorted with pattern
   * @see https://github.com/import-js/eslint-plugin-import/blob/main/docs/rules/order.md#pathgroupsexcludedimporttypes-array
   */
  pathGroupsExcludedImportTypes: ['vue'],
  'newlines-between': 'always',
  distinctGroup: false,
  alphabetize: {
    order: 'asc',
  },
};

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:tailwindcss/recommended',
    '@vue/standard',
    '@vue/eslint-config-standard-with-typescript',
    '@vue/prettier',
  ],
  overrides: [],
  plugins: ['vue'],
  rules: {
    'no-console': [isProduction ? 'error' : 'warn', { allow: ['warn', 'error'] }],
    'no-debugger': isProduction ? 'error' : 'warn',
    'import/order': ['error', importOrderOptions],
    'prefer-arrow-callback': 'error',
    'arrow-body-style': ['error', 'as-needed'],
    // Normalize eqeqeq rules in template like in script
    'vue/eqeqeq': ['error', 'always'],
    // Force self-closing to improve readability of templates
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'any',
          normal: 'always',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    // Normalize methode signature style
    '@typescript-eslint/method-signature-style': 'error',
    // ? Not applicable, need rename components
    'vue/multi-word-component-names': 'off',
    // Allow js script in SFC
    'vue/block-lang': ['error', { script: { lang: ['ts', 'js'] } }],
    // Force PascalCase for component element to normalize naming
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
  },
};
