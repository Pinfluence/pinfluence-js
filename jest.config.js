/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
const {defaults} = require('jest-config');

module.exports = {
  clearMocks: true,
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts'],
  roots: ['<rootDir>'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      diagnostics: false
    }
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testTimeout: 20000,
  testMatch: [
    '!**/dist/**',
    '**/**/*.test.ts'
  ]
};