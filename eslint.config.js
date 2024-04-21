const js = require('@eslint/js');
const globals = require('globals');
const jest = require('eslint-plugin-jest');

const ignores = {
  name: 'ignores',
  ignores: [
    'bin/**',
    'node_modules/**',
    'tmp/**'
  ]
};

const tests = {
  name: 'tests',
  files: ['__tests__/**'],
  ...jest.configs['flat/recommended']
};

const lib = {
  name: 'lib',
  files: ['lib/**'],
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

module.exports = [ignores, tests, lib];