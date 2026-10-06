/**
 * ESLint Flat Configuration
 * ===========================
 *
 * Modern ESLint configuration using the flat config format (ESLint 9+).
 * This replaces the old .eslintrc.js format.
 *
 * Features:
 * - React 19 support with latest jsx-runtime
 * - React Hooks rules
 * - React Refresh for HMR compatibility
 * - Ignore patterns for build outputs
 *
 * Run linting:
 *   npm run lint        # Check for issues
 *   npm run lint:fix    # Auto-fix issues
 */

import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  // Ignore patterns
  {
    ignores: ['dist/**', 'node_modules/**', 'coverage/**'],
  },

  // Base JavaScript configuration
  js.configs.recommended,

  // Main configuration for all JS/JSX files
  {
    files: ['**/*.{js,jsx}'],

    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },

    settings: {
      react: {
        version: '19.0', // React 19
      },
    },

    rules: {
      // React rules
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      'react/prop-types': 'off', // Not using PropTypes
      'react/no-unescaped-entities': 'off', // Apostrophes/quotes in JSX text are fine

      // React Hooks rules
      ...reactHooks.configs.recommended.rules,

      // React Refresh rules (for Vite HMR)
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      // General rules
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },

  // Server-specific configuration
  {
    files: ['src/server/**/*.js', 'prisma/**/*.js', 'scripts/**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      'no-console': 'off', // Console is fine in server code
    },
  },

  // Test files configuration
  {
    files: ['**/*.test.{js,jsx}', '**/*.spec.{js,jsx}', '**/__tests__/**/*.{js,jsx}'],
    languageOptions: {
      globals: {
        ...globals.jest,
        describe: 'readonly',
        it: 'readonly',
        expect: 'readonly',
        vi: 'readonly',
        beforeEach: 'readonly',
        afterEach: 'readonly',
        beforeAll: 'readonly',
        afterAll: 'readonly',
      },
    },
    rules: {
      'no-unused-expressions': 'off',
    },
  },
];
