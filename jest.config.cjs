module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/'],
  testTimeout: 20000
};