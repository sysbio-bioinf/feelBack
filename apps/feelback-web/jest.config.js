module.exports = {
  name: 'feelback-web',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/feelback-web',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js',
  ],
};
