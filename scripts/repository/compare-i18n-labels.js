const { program } = require('commander');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');

program.version('0.0.1');

program
  .command('exec <app>')
  .description('run a comparison match on a given app')
  .option('-t, --type [type]', 'Which type to use (e.g., apps, libs)')
  .option(
    '-b, --base [base]',
    'The base language-file everything is compared to (e.g., en.json)',
  )
  .action(function (app, options) {
    const type = options.type || 'apps';
    const baseLanguage = options.base || 'en.json';

    const projectPath = path.join(type, app);
    const assetsPath = path.join(projectPath, 'src', 'assets', 'i18n');

    if (!fs.existsSync(projectPath)) {
      console.error(`Path ${projectPath} does not exist`);
      return -1;
    }

    if (!fs.existsSync(assetsPath)) {
      console.error(`Path ${assetsPath} does not exist`);
      return 1;
    }

    const availableLanguageFiles = fs.readdirSync(assetsPath);

    const baseFilePath = path.join(assetsPath, baseLanguage);
    const baseFileContent = readFileContentAsObject(baseFilePath);
    const filesWithoutBaseFile = availableLanguageFiles.filter((item) => {
      return item !== baseLanguage;
    });

    const baseFileKeys = getDeepKeys(baseFileContent);

    for (fileToCompare of filesWithoutBaseFile) {
      console.log(`Comparing ${baseLanguage} with ${fileToCompare}`);

      const fileToComparePath = path.join(assetsPath, fileToCompare);
      const fileToCompareContent = readFileContentAsObject(fileToComparePath);
      const fileKeys = getDeepKeys(fileToCompareContent);

      const keyDifferences = _.difference(baseFileKeys, fileKeys);

      // add all keys to the object
      for (key of keyDifferences) {
        _.set(
          fileToCompareContent,
          key,
          `TODO: TRANSLATE: ${_.get(baseFileContent, key)}`,
        );
      }

      saveObjectAsFile(fileToCompareContent, fileToComparePath);
    }
  });

program.parse(process.argv);

function readFileContentAsObject(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`File ${filePath} does not exist`);
    return 1;
  }

  try {
    const fileHandle = fs.readFileSync(filePath);
    const fileContent = fileHandle.toString();
    return JSON.parse(fileContent);
  } catch (exception) {
    console.error(`Could not read file ${filePath}`);
    return 1;
  }
}

function saveObjectAsFile(content, filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`File ${filePath} does not exist`);
    return 1;
  }

  try {
    const contentString = JSON.stringify(content, null, 2);
    fs.writeFileSync(filePath, contentString);
  } catch (exception) {
    console.error(`Could not write file ${filePath}`);
    return 1;
  }
}

function getDeepKeys(obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
    if (typeof obj[key] === 'object') {
      var subkeys = getDeepKeys(obj[key]);
      keys = keys.concat(
        subkeys.map(function (subkey) {
          return `${key}.${subkey}`;
        }),
      );
    }
  }
  keys.sort();
  return keys;
}
