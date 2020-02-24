module.exports = {
  '{apps,libs}/**/*.{ts,json,md,scss,html}': files => {
    return [
      `npm run affected:lint -- --fix --parallel --files=${files.join(',')}`,
      'npm run format:write -- --uncommitted',
      `git add ${files.join(' ')}`,
    ];
  },
};
