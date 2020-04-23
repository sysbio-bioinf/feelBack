# Adding Libs

Now, that you have created some applications, let's create some libraries. Libraries offer specific features (i.e., a _mailer module_ or _UI fragments_) that can be used in your apps. In a `Nrwl/Nx` podcast, I once heard that approx. 90% of your code should "live" in `libs`. The `apps`, in turn, are most likely "empty shells" that combine your `libs` in a proper way.

Libraries are automatically created within the `./libs` folder in your mono repository.

Note that you can install / configure libraries via the `Nrwl/Nx CLI` as well!

An (opinionated) way of structuring applications and libraries can be found in this blogpost [https://blog.strongbrew.io/opinionated-guidelines-for-large-nx-angular-projects/](https://blog.strongbrew.io/opinionated-guidelines-for-large-nx-angular-projects/). However, you are completely free to use whatever structure you like.

## Adding your own Framework-Agnostic Library (Pure TypeScript)

In order to create a new **framework-agnostic** `lib`, simply call

```bash
ng g @nrwl/workspace:lib NAME
ng g @nrwl/workspace:lib NAME --directory DIR
```

If you don't add a `--directory` when creating a library, it automatically creates it to the `./libs` folder (i.e., `./libs/NAME`). However, if you specify a `--directory`, it automatically creates it within the `./libs/DIR/NAME` folder.

Note that `Nrwl/Nx` currently not provide a lib schematics for `NestJS` libraries. So if you would like to create a `NestJS` lib, simply create a pure TypeScript library.

> **Heads up!**
> Adding a lib automatically updates the `./angular.json`, `./nx.json` and `./tsconfig.json` files in your root folder of the mono repository. This is done by `Nrwl/Nx` and allows you to import / use the library in any other `lib` or `app`. Note that you can "restrict" access to libs by adding `tags` to libs (i.e., you can define that the `api` application an only import `libs` that have the tag `api`).

// TODO: Write something about other Libs as well.
