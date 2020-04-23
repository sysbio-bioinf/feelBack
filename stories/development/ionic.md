# Ionic

## Adding Packages

## Known Issues

When importing files from modules stored under `/libs`, often an error like `cannot find module X` is shown.
This is because all projects have their own `tsconfig.json` file in their root folder.
However, the `ionic` project has their own `compilerOptions.path` set, which references the `@angular` components, for example.

If you, for example, would need to import a class from the package `@foo/x/y`, then you would need to add this foreign package to the `path` section, like this:

```json
{
  "compileOnSave": false,
  "compilerOptions": {
    // ...
    "baseUrl": "./",
    "paths": {
      "@angular/*": ["../../node_modules/@angular/*"],
      "@cancerlog/shared/misc": ["../../libs/shared/misc/src/index.ts"]
    }
  }
}
```
