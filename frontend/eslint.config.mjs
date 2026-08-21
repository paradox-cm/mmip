import { FlatCompat } from '@eslint/eslintrc'
import simpleImportSort from 'eslint-plugin-simple-import-sort'
import tailwind from 'eslint-plugin-tailwindcss'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

export default [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'off',
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [['^node:'], ['^react'], ['^@typescript-eslint'], ['^\\w'], ['^@/'], ['^\\.']],
        },
      ],
      'simple-import-sort/exports': 'warn',
    },
  },
  ...tailwind.configs['flat/recommended'],
  {
    ignores: [
      'next.config.ts',
      'sanity.types.ts',
      'node_modules/',
      '.next/',
      'dist/',
      'prettier.config.*',
      'tailwind.config.*',
      'postcss.config.*',
    ],
  },
]
