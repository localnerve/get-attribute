module.exports = {
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    '/__tests__/globals/'
  ],
  globalSetup: './__tests__/globals/setup',
  globalTeardown: './__tests__/globals/teardown',
  verbose: true,
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    '/node_modules/',
    '/tmp/',
    '__tests__/fixtures',
    '__tests__/globals'
  ]
};