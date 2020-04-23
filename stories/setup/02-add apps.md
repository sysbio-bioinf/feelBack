# Adding Apps

Now, that everything is installed, let's create some applications. Applications are automatically created within the `./apps` folder in your mono repository.

Note that you can install / configure the applications via the `Nrwl/Nx CLI` as well!

## Frontend Application (Angular)

We will use `Angular` as our frontend framework of choice here. You can, however, use other schematics for `React` as well, if you like. In order to create a new angular app, run the following commands.

```bash
# add the nrwl/angular dependency
ng add @nrwl/angular@latest

# generate "web" app
ng g @nrwl/angular:app web --routing --style=scss --tags=app

# or if you like to use the new IVY renderer
ng g @nrwl/angular:app web --routing --style=scss --tags=app --enable-ivy
```

### Update Everything

Again, run `ng update` to update your dependencies to the latest state.

### Optional (but nice-to-have) 3rd Party Packages for the Backend

The following lists some really "ncie-to-have" packages, that may come in handy when developing a backend application.

```bash
# // TODO Add some good packages here
```

## Backend Application (NestJS)

We will use `NestJS` as our backend framework of choice. You can easily create a "pure" `NodeJs / Express` application as well, if you like to. Please see the official `Nrwl/Nx` docs for such a setup!

```bash
# add the nrwl/nest dependencies
ng add @nrwl/nest@latest

# generate "api" app and "link" it to the "web" project
ng g @nrwl/nest:app api --frontendProject=web
```

Note that the "installation process" of `nrwl/nest` misses some crucial configuration steps. In order to provide a good development experience with `NestJS`, additionally create a `./nest-cli.json` file in the root folder of the mono-repository and add the following content:

```json
{
  "language": "ts",
  "collection": "@nestjs/schematics",
  "sourceRoot": "apps/api/src"
}
```

Change the `sourceRoot` accoringly, if your backend-project is not called `api`.

The `nest-cli` tells `NestJS`, where new files needs to be created - for example, if you run specific `nest generate ...` commands.

Additionally, open the `./apps/api/tsconfig.app.json` file and replace the content with the following file:

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "../../dist/out-tsc",
    "module": "commonjs",
    "target": "es2017",
    "types": ["node"]
  },
  "exclude": ["**/*.spec.ts"],
  "include": ["**/*.ts"]
}
```

`NestJS` requires specific `module & target` properties that are **not** correctly set in `Nrwl/Nx` (see this issue [https://github.com/nrwl/nx/issues/1667](https://github.com/nrwl/nx/issues/1667)).

### Update Everything

Again, run `ng update` to update your dependencies to the latest state.

### Optional (but nice-to-have) 3rd Party Packages for the Backend

The following lists some really "ncie-to-have" packages, that may come in handy when developing a backend application.

```bash
# authentication (with jwt)
npm install passport
npm install passport-http-bearer
npm install passport-jwt
npm install @nestjs/passport
npm install @nestjs/jwt

npm install --save-dev @types/passport
npm install --save-dev @types/passport-jwt

# database
npm install pg

# graphql
npm install apollo-server-express
npm install graphql
npm install graphql-scalars
npm install graphql-tools
npm install @nestjs/graphql
npm install type-graphql

# // TODO: Add prisma2 here

# mailer
npm install nodemailer
npm install @nest-modules/mailer
npm install pug

npm install --save-dev @types/nodemailer

# security
npm install argon2
npm install compression
npm install helmet
npm install graphql-depth-limit
# // TODO Maybe add https://github.com/pa-bru/graphql-cost-analysis as well?

npm install --save-dev @types/compression
npm install --save-dev @types/helmet
npm install --save-dev @types/graphql-depth-limit

# misc packages
npm install cache-manager
npm install class-transformer
npm install class-validator
npm install env-var
npm install lodash
npm install qs
npm install string-format

npm install --save-dev @types/lodash
npm install --save-dev @types/qs
npm install --save-dev @types/string-format

# other dev dependencies
npm install --save-dev rimraf

```

## Write your own Code

Now add your own code to the backend and / or frontend application you have just created. Note that you can (and should) split your code into different `libs` in order to make it more modular and easier to maintain. `Nrwl/Nx` provides a sophisticated CLI to create libs and automatically link them.
