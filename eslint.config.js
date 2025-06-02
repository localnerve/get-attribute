import js from '@eslint/js';
import globals from 'globals';
import jest from 'eslint-plugin-jest';

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
  ...jest.configs['flat/recommended'],
  languageOptions: {
    globals: {
      ...jest.environments.globals.globals,
      ...globals.node
    }
  },
  rules: {
    ...js.configs.recommended.rules,
    ...jest.configs.recommended.rules
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
    'dot-notation': [2, {allowKeywords: true}]
  }
}

export default [ignores, tests, lib];