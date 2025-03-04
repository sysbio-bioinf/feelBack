const nxPreset = require('@nrwl/jest/preset');
const esModules = ['@ionic'].join('|');

module.exports = {
  ...nxPreset,
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  transform: {
    '^.+\\.(ts|js|html)$': 'ts-jest',
  },
  resolver: '@nrwl/jest/plugins/resolver',
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageReporters: ['html'],
  transformIgnorePatterns: [`./node_modules/(?!${esModules})`],
};
