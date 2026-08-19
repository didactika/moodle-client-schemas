module.exports = {
  projects: [
    {
      displayName: 'unit',
      testMatch: ['<rootDir>/test/unit/**/*.test.ts', '<rootDir>/test/unit/**/*.spec.ts'],
      preset: 'ts-jest',
      testEnvironment: 'node',
      transform: {
        '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.json' }]
      },
      transformIgnorePatterns: ['/node_modules/(?!(p-limit|yocto-queue)/)'],
      modulePathIgnorePatterns: ['<rootDir>/src/tmp/', '<rootDir>/tmp/']
    },
    {
      displayName: 'integration',
      testMatch: ['<rootDir>/test/integration/**/*.test.ts', '<rootDir>/test/integration/**/*.spec.ts'],
      preset: 'ts-jest',
      testEnvironment: 'node',
      transform: {
        '^.+\\.tsx?$': ['ts-jest', { tsconfig: 'tsconfig.json' }]
      },
      transformIgnorePatterns: ['/node_modules/(?!(p-limit|yocto-queue)/)'],
      modulePathIgnorePatterns: ['<rootDir>/src/tmp/', '<rootDir>/tmp/']
    }
  ],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/tmp/**'
  ],
  coverageReporters: ['text', 'lcov']
};
