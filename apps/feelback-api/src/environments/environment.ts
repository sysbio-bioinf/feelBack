import { IEnvironment } from '@cancerlog/api/config';
import { ApiPathHelper } from '@cancerlog/util/core';
import * as env from 'env-var';
import * as path from 'path';

export const environment: IEnvironment = {
  env: {
    name: 'development',
    production: false,
    meta: {
      LOG_LEVEL: 'debug'
    }
  },

  auth: {
    keycloak: {
      host: {
        url: env.get('KEYCLOAK_URL').asUrlString()
      },
      config: {
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        strictSsl: false,
        jwksUri: `${env
          .get('KEYCLOAK_URL')
          .asUrlString()}auth/realms/feelback/protocol/openid-connect/certs`
      },
      clients: [
        {
          realm: 'feelback',
          client: 'feelback-api-client',
          scope: 'feelback-api'
        }
      ]
    }
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
    host: env.get('API_HOST', 'localhost').asString(),
    port: env.get('API_PORT', '3000').asPortNumber(),
    url: env.get('API_URL', 'http://localhost:3000').asUrlString(),
    apiPrefix: env.get('API_PREFIX', 'api').asString()
  },

  graphql: {
    debug: true,
    autoSchemaFile: path.join(
      ApiPathHelper.srcPath('feelback-api'),
      'schema.gql'
    ),
    playground: true
  },

  database: {
    type: env.get('DB_TYPE', 'postgres').asString() as 'postgres',
    host: env.get('DB_HOST', 'localhost').asString(),
    port: env.get('DB_PORT', '5432').asPortNumber(),
    database: env.get('DB_NAME', 'postgres').asString(),
    username: env.get('DB_USER', 'postgres').asString(),
    password: env.get('DB_PASSWORD', 'postgres').asString(),
    keepConnectionAlive: true,
    logging: env.get('DB_DEBUG', 'true').asBoolStrict(),
    synchronize: true,
    uuidExtension: 'pgcrypto'
  },

  platform: {
    compression: {
      enabled: true
    },
    cors: {
      enabled: true,
      options: {}
    },
    helmet: {
      enabled: true
    },
    ratelimit: {
      enabled: true,
      attempts: 100,
      interval: 1
    }
  }
};
