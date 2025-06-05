import config from '@cycraft/eslint/config'

export default [
  {
    ignores: ['**/dist/*'],
  },
  ...config,
  {
    files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
]
