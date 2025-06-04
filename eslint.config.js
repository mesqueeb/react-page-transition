import config from '@cycraft/eslint/config'

export default [
  {
    ignores: ['**/dist/*'],
  },
  ...config,
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/consistent-indexed-object-style': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
]
