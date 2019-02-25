module.exports = {
  collectCoverageFrom: [
    'packages/**/*.{js,jsx,ts,tsx}',
    '!packages/**/*.test.{js,jsx,ts,tsx}',
  ],
  coverageDirectory: '<rootDir>/coverage',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
  ],
  moduleDirectories: ['node_modules', 'packages'],
  moduleNameMapper: {
    '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/config/testing/mocks/image.ts',
    '^@datapunt/(.*)$': '<rootDir>/packages/$1/src',
  },
  testPathIgnorePatterns: ['/node_modules/', '/lib/'],
  setupFilesAfterEnv: ['<rootDir>/config/testing/test-bundler.ts'],
  transform: {
    '\\.(ts|tsx)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
  testRegex: '/__tests__/.*\\.(ts|tsx|js)$',
  snapshotSerializers: ['enzyme-to-json/serializer'],
}
