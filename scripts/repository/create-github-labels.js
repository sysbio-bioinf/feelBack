/*
 * Use this command with
 * node ./path/to/script.js
 *
 * Be sure to have properly set the configuration for the repository in the config.json file and
 * include a valid ACCESS TOKEN
 */

require('dotenv').config();
const { Octokit } = require('@octokit/rest');
const labels = require('./labels.json');

const githubToken = process.env.GITHUB_TOKEN;
const githubRepo = process.env.GITHUB_REPO;
const githubUser = process.env.GITHUB_USER;

const ghClient = new Octokit({
  auth: githubToken,
});

const createLabels = async () => {
  const { data: user } = await ghClient.users.getAuthenticated();
  console.log(`Welcome ${user.name}! (${user.login})`, `\n`);

  console.log('We are now deleting all existing labels');
  const { data: remoteLabels } = await ghClient.issues.listLabelsForRepo({
    owner: githubUser,
    repo: githubRepo,
  });

  await Promise.all(
    remoteLabels.map((label) => {
      ghClient.issues.deleteLabel({
        owner: githubUser,
        repo: githubRepo,
        name: label.name,
      });
    }),
  );
  console.log('Remote Labels deleted');

  for (let i = 0; i < labels.length; i++) {
    await ghClient.issues.createLabel({
      owner: githubUser,
      repo: githubRepo,
      name: labels[i].name,
      color: labels[i].color,
      description: labels[i].description,
    });
  }

  console.log('Successfully seeded new labels');
};

createLabels();
