module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testMatch: [
    '<rootDir>/src/**/*.test.{ts,tsx}',
    '<rootDir>/src/**/*.spec.{ts,tsx}'
  ],
  passWithNoTests: true, // Don't fail if no tests found
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: 'tsconfig.test.json',
    }]
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.stories.{ts,tsx}',
    '!src/**/*.test.{ts,tsx}',
    '!src/**/*.spec.{ts,tsx}',
    '!src/index.ts'
  ],
  // Coverage thresholds - will be increased as more tests are added
  // Currently set low as only sample tests exist
  coverageThreshold: {
    global: {
      branches: 0, // Will increase as tests are added
      functions: 0, // Will increase as tests are added
      lines: 0, // Will increase as tests are added
      statements: 0 // Will increase as tests are added
    }
  }
};
