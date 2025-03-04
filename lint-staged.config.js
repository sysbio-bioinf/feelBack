const path = require('path');

module.exports = {
  '{apps,libs}/**/*.{ts,json,md,scss,html}': (files) => {
    const cwd = process.cwd();
    const relPaths = files.map((file) => {
      return path.relative(cwd, file);
    });

    return [
      `npm run affected:lint -- --fix --parallel --files=${relPaths.join(',')}`,
      'npm run format:write -- --uncommitted',
      `git add ${files.join(' ')}`,
    ];
  },
};
