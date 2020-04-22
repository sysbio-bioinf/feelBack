module.exports = {
  name: 'feelback-doctor',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/feelback-doctor',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
