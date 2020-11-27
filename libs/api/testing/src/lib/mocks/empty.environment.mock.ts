import { IEnvironment } from '@feelback-app/api/config';

export const mockEmptyEnvironment: IEnvironment = {
  env: {
    name: 'TESTING',
    production: false,
    logLevel: 'debug',
    meta: {
      foo: 'bar',
    },
  },
  auth: {
    keycloak: {
      server: {
        host: '',
        username: '',
        password: '',
      },
      config: { jwksUri: '' },
      clients: {
        feelback: {
          realm: 'test',
          client: '',
          scope: '',
        },
      },
    },
  },
  database: {},
  graphql: {},
  server: {
    apiPrefix: 'api',
    host: 'localhost',
    port: 1234,
    url: 'http://localhost:1234',
  },
  platform: {
    compression: {
      enabled: false,
    },
    cors: {
      enabled: false,
      options: {},
    },
    helmet: {
      enabled: false,
    },
    ratelimit: {
      enabled: false,
      attempts: 100,
      interval: 1,
    },
    i18n: {
      defaultLanguage: 'en',
      availableLanguages: ['en'],
      fallbackLanguage: 'en',
    },
  },
};
