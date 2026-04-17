import js from '@eslint/js';
import globals from 'globals';
import n from 'eslint-plugin-n';

const ignores = {
  name: 'ignores',
  ignores: [
    'bin/**',
    'node_modules/**',
    'tmp/**',
    'coverage/**'
  ]
};

const tests = {
  name: 'tests',
  files: ['__tests__/**'],
  ...js.configs['flat/recommended'],
  languageOptions: {
    globals: {
      test: 'readonly',
      it: 'readonly',
      before: 'readonly',
      after: 'readonly',
      ...globals.node
    }
  },
  rules: {
    ...js.configs.recommended.rules,
  }
};

const lib = {
  name: 'lib',
  files: ['lib/**'],
  ...js.configs['flat/recommended'],
  languageOptions: {
    globals: {
      ...globals.node
    }
  },
  rules: {
    ...js.configs.recommended.rules,
    indent: [2, 2, {
      SwitchCase: 1,
      MemberExpression: 1
    }],
    quotes: [2, 'single'],
    'dot-notation': [2, {allowKeywords: true}],
     'n/no-process-exit': 'off'
  }
}

export default [ignores, n.configs['flat/recommended-module'], tests, lib];