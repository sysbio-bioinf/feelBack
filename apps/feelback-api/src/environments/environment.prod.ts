import { IEnvironment } from '@feelback-app/api/config';
import {
  feelbackDatabaseConnection,
  identityDatabaseConnection,
} from '@feelback-app/api/database';
import { ApiPathHelper } from '@feelback-app/api/util';
import * as dotenv from 'dotenv';
import * as env from 'env-var';
import * as path from 'path';

dotenv.config();

export const environment: IEnvironment = {
  env: {
    name: 'production',
    production: true,
    logLevel: 'error',
  },

  auth: {
    keycloak: {
      server: {
        host: env.get('KEYCLOAK_HOST').default('localhost').asUrlString(),
        username: env.get('KEYCLOAK_USER').default('admin').asString(),
        password: env.get('KEYCLOAK_PASSWORD').default('password').asString(),
      },
      config: {
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        strictSsl: false,
        jwksUri: `${env
          .get('KEYCLOAK_HOST')
          .asUrlString()}auth/realms/feelback/protocol/openid-connect/certs`,
      },
      clients: {
        feelback: {
          realm: 'feelback',
          client: 'feelback-api-client',
          scope: 'feelback-api',
        },
      },
    },
  },

  server: {
    host: env.get('FB_API_HOST').default('localhost').asString(),
    port: env.get('FB_API_PORT').default(3000).asPortNumber(),
    url: env.get('FB_API_URL').default('http://localhost:3000').asUrlString(),
    apiPrefix: env.get('FB_API_PREFIX').default('api').asString(),
  },

  graphql: {
    debug: true,
    autoSchemaFile: path.join(
      ApiPathHelper.srcPath('feelback-api'),
      'schema.gql',
    ),
    playground: true,
    cors: {
      credentials: true,
      origin: true,
    },
  },

  dbConnections: {
    feelback: feelbackDatabaseConnection,
    identity: identityDatabaseConnection,
  },

  platform: {
    compression: {
      enabled: true,
    },
    cors: {
      enabled: true,
      options: {
        origin: true,
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
        credentials: true,
      },
    },
    helmet: {
      enabled: true,
    },
    ratelimit: {
      enabled: true,
      attempts: 100,
      interval: 1,
    },
  },
};
