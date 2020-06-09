import { IEnvironment } from '@cancerlog/api/config';
import {
  feelbackDatabaseConnection,
  identityDatabaseConnection,
} from '@cancerlog/api/database';
import { ApiPathHelper } from '@cancerlog/api/util';
import * as dotenv from 'dotenv';
import * as env from 'env-var';
import * as path from 'path';

dotenv.config();

export const environment: IEnvironment = {
  env: {
    name: 'development',
    production: false,
    meta: {
      LOG_LEVEL: 'debug',
    },
  },

  auth: {
    keycloak: {
      host: {
        url: env.get('KEYCLOAK_URL').default('localhost').asUrlString(),
      },
      config: {
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        strictSsl: false,
        jwksUri: `${env
          .get('KEYCLOAK_URL')
          .asUrlString()}auth/realms/feelback/protocol/openid-connect/certs`,
      },
      clients: [
        {
          realm: 'feelback',
          client: 'feelback-api-client',
          scope: 'feelback-api',
        },
      ],
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
