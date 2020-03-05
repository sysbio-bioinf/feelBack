require('dotenv').config();

import { IEnvironment } from '@cancerlog/api/config';
import { ApiPathHelper } from '@cancerlog/util/core';
import * as env from 'env-var';
import * as path from 'path';

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
    /*
    jwt: {
      secret: env.get('JWT_SECRET', 'MyT0pS3cr37P4s$w0rd').asString(),
      issuer: env.get('JWT_UUID', '').asString(),
      audience: env.get('APP_URL', 'http://www.example.com').asUrlString(),
      options: {
        expiresIn: env.get('JWT_EXPIRES', '3600').asIntPositive(),
      },
    },
    */
  },

  server: {
    host: env
      .get('FB_API_HOST')
      .default('localhost')
      .asString(),
    port: env
      .get('FB_API_PORT')
      .default(3000)
      .asPortNumber(),
    url: env
      .get('FB_API_URL')
      .default('http://localhost:3000')
      .asUrlString(),
    apiPrefix: env
      .get('FB_API_PREFIX')
      .default('api')
      .asString(),
  },

  graphql: {
    debug: true,
    autoSchemaFile: path.join(
      ApiPathHelper.srcPath('feelback-api'),
      'schema.gql',
    ),
    playground: true,
  },

  database: {
    type: env
      .get('FB_DB_TYPE')
      .default('postgres')
      .asString() as 'postgres',
    host: env
      .get('FB_DB_HOST')
      .default('localhost')
      .asString(),
    port: env
      .get('FB_DB_PORT')
      .default(5432)
      .asPortNumber(),
    database: env
      .get('FB_DB_NAME')
      .default('postgres')
      .asString(),
    username: env
      .get('FB_DB_USER')
      .default('postgres')
      .asString(),
    password: env
      .get('FB_DB_PASSWORD')
      .default('postgres')
      .asString(),
    keepConnectionAlive: true,
    logging: env
      .get('FB_DB_DEBUG')
      .default('true')
      .asBoolStrict(),
    synchronize: true,
    uuidExtension: 'pgcrypto',
  },

  platform: {
    compression: {
      enabled: true,
    },
    cors: {
      enabled: true,
      options: {},
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
