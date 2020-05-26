import * as dotenv from 'dotenv';

import { IEnvironment } from '@cancerlog/api/config';
import { ApiPathHelper } from '@cancerlog/api/util';
import * as env from 'env-var';
import * as path from 'path';
import { IDENTITY_DB_CONNECTION } from '../app/constants/db.constants';

dotenv.config();

export const environment: IEnvironment = {
  env: {
    name: 'production',
    production: true,
    meta: {
      LOG_LEVEL: 'error',
    },
  },

  auth: {
    keycloak: {
      host: {
        url: env.get('KEYCLOAK_URL').asUrlString(),
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
    feelback: {
      // name: FEELBACK_DB_CONNECTION,
      type: env.get('FB_DB_TYPE').default('postgres').asString() as 'postgres',
      host: env.get('FB_DB_HOST').default('localhost').asString(),
      port: env.get('FB_DB_PORT').default(5432).asPortNumber(),
      database: env.get('FB_DB_NAME').default('postgres').asString(),
      username: env.get('FB_DB_USER').default('postgres').asString(),
      password: env.get('FB_DB_PASSWORD').default('postgres').asString(),
      keepConnectionAlive: true,
      logging: env.get('FB_DB_DEBUG').default('true').asBoolStrict(),
      synchronize: true,
      uuidExtension: 'pgcrypto',
    },
    identity: {
      name: IDENTITY_DB_CONNECTION,
      type: env.get('ID_DB_TYPE').default('postgres').asString() as 'postgres',
      host: env.get('ID_DB_HOST').default('localhost').asString(),
      port: env.get('ID_DB_PORT').default(5432).asPortNumber(),
      database: env.get('ID_DB_NAME').default('postgres').asString(),
      username: env.get('ID_DB_USER').default('postgres').asString(),
      password: env.get('ID_DB_PASSWORD').default('postgres').asString(),
      keepConnectionAlive: true,
      logging: env.get('ID_DB_DEBUG').default('true').asBoolStrict(),
      synchronize: true,
      uuidExtension: 'pgcrypto',
    },
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
