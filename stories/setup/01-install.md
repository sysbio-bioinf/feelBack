# Installation Process

This file describes the installation process done in order to setup this package. You can follow the commands in order to reproduce this repository.

Note that I am using `npm` in this summary. If you would like to use `yarn`, you need to properly map the `npm` commands to `yarn` commands.

## Dependencies

```bash
# first remove all global dependencies, because we will install the latest versions
npm uninstall -g @nrwl/workspace
npm uninstall -g @angular/cli
npm uninstall -g @nestjs/cli

# install global dependencies
npm install -g @nrwl/workspace
npm install -g @angular/cli
npm install -g @nestjs/cli
```

## Project Setup

And now we will create the `Nrwl Workspace` that creates and manages the Mono-Repository for us.

```bash
npx create-nx-workspace@latest <YOUR NAME HERE>
```

The setup will prompt a few questions regarding the

- stylesheet format you would like to use (I would suggest to use `SASS`)
- "workspace template" to be used (e.g., create an `empty` project).
- Use the `Angular CLI`

For the sake of this "installation procedure", i will create an `empty` project to document all steps in a logical order. However, you may just select `full-stack` to generate an `angular` frontend and `nestjs` backend out of the box with no additional configuration.

```bash
# enter the newly created folder
cd <YOUR NAME HERE>
```

### Using YARN instead of NPM (Optional)

If you would like to use `yarn` instead of `npm` as your default package manager, you need to add the following line to the `./angular.json` file in your project.

```diff
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "",
  "projects": {},
  "cli": {
    "warnings": {
      "typescriptMismatch": false,
      "versionMismatch": false
    },
    "defaultCollection": "@nrwl/workspace",
+	"packageManager": "yarn"
  },
  "schematics": {}
}
```

Then run

```bash
yarn install
```

to install your dependencies via `yarn` instead of `npm`. You can then safely remove the `package-lock.json` file that is used by `npm`.

If you have not changed anything in the repository up to this point, you may simply run

```bash
yarn import
```

to import everything from the `package-lock.json` file and create a corresponding `yarn.lock` file. This procedure is described here [https://yarnpkg.com/blog/2018/06/04/yarn-import-package-lock/](https://yarnpkg.com/blog/2018/06/04/yarn-import-package-lock/) in more details.

### Updating Dependencies

In order to check, if your basic dependencies are still "up to date" simply run

```bash
ng update
```

and follow the instructions (if required).

To update a specific package, run

```bash
ng update PACKAGENAME
ng update --all # to update all packages!
```

## Adding "nice-to-have" 3rd-Party Packages

In order to have a solid starter package, I suggest to add a few (optional) packages.

```bash
npm uninstall -g semantic-release-cli
npm uninstall -g commitizen

npm install -g semantic-release-cli
npm install -g commitizen

npm install --save-dev lint-staged
npm install --save-dev husky
npm install --save-dev standard-version
npm install --save-dev @compodoc/compodoc
npm install --save-dev @commitlint/config-conventional
npm install --save-dev @commitlint/cli
npm install --save-dev semantic-release
npm install --save-dev @semantic-release/changelog
npm install --save-dev @semantic-release/git
npm install --save-dev @semantic-release/github
npm install --save-dev @semantic-release/npm
npm install --save-dev commitizen
npm install --save-dev cz-conventional-changelog
```

Then run the following commands to configure your packages

```bash
# for CI/CD automation and release management
# first time semantic-release setup
semantic-release-cli setup

# configure husky, commitizen, commitlint and so on in your package.json file
# take a look at the `package.json` file that is distributed in this repository to get a basic idea
```

### Check Updates

You may want to add this additional package to automatically update your `package.json` file:

```bash
npm install --save-dev npm-check-updates
```

This package will update your package.json to the latest version of your installed packages. In order to fully automate this process, you can add these 2 scripts to the `package.json -> scripts` part:

```bash
"deps:check": "npx ncu",
"deps:bump": "npx ncu -u && npm install",
```

### ENV Sync

```bash
npm install --save-dev sync-dotenv
```

This package syncs your local `.env` file (which will be ignored from GIT as it contains sensitive information, like DB passwords) with an `.env.example` file. However, this example file will **not** contain any secret information. Again, you can add a script for this:

```bash
"env:sync": "sync-dotenv"
```

Finally, it may be a good idea to adapt your `husky` configuration accordingly to call the `env:sync` command on each pre-commit.

## Configuring Visual Studio Code

In order to have a good developer experience, I suggest to use the Visual Studio Code IDE. You can easily customize the IDE by adding your own `./.vscode/settings.json` file.

```json
{
  "editor.tabSize": 2,
  "files.autoSave": "afterDelay",
  "editor.formatOnSave": true
}
```

This will, for example, automatically apply formatting rules (i.e., prettifier and ESLint) on save.
