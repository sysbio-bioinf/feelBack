# Misc Information

## Important Console Commands

### Format `package.json`

To format your `package.json` file accordingly (i.e., move important properties to the top & sort dependencies by name), simply call

```bash
npm run format:package
```

### Synchronize `.env` with `.env.example`

To synchronize your local `.env` file (which should **not** be committed to the GIT repository) with the `.env.example` file, call

```bash
npm run env:sync
```
