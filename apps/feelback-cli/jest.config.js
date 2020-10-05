module.exports = {
  preset: '../../jest.preset.js',
  coverageDirectory: '../../coverage/apps/feelback-cli',
  globals: { 'ts-jest': { tsConfig: '<rootDir>/tsconfig.spec.json' } },
  displayName: 'feelback-cli',
};
