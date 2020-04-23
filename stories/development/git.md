# Git

## Commit Messages

This mono-repository uses strict commit messages to enforce a unified style.
Commit messages are formatted as described in this package [commitizen](https://github.com/commitizen/conventional-commit-types/blob/master/index.json).

The most common types are:

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- **ci**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- **chore**: Other changes that don't modify src or test files
- **revert**: Reverts a previous commit

Those types can also be applied to a certain scope. For example, if you add a new feature to the `api`, you would write your commit message as follows: `feat(api): implement authentication`. Likewise, `docs(platform): describe deployment process` could contain information about the platform is properly deployed.
