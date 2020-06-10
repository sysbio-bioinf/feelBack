module.exports = {
  name: 'feelback-ionic',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/feelback-ionic',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
