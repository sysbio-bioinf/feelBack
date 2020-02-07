# api-config

This library was generated with [Nx](https://nx.dev).

## Usage

This is a rather basic `Config` Module for NestJS applications. It offers an `IEnvironment` interface, which specifies respective format of the environment files. Note that the `environment.ts` and `environment.prod.ts` located within the `./apps/api/environments` folder implement this specific interface.

If you want to add more configuration parameters that are required for your application, please specificy them in **this package** and then add them to the respective `environment` files within the api.

The `ConfigModule` is described as a `Global` module. This means, in turn, it should only be imported once. This should be done in some kind of `CoreModule` within the api application. The `ConfigModule` itself exposes a `ConfigService` that has access to the underlying `environment` file.

You can then access specific environment variables with

```ts
configService.get('your.specific.environment.key', 'defaultValue');
```

Of course you can add additional "helper" functions to this service (i.e., like the `isProduction()` method).

## Running unit tests

Run `ng test api-config` to execute the unit tests via [Jest](https://jestjs.io).
