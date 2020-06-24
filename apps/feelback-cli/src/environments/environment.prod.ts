import * as dotenv from 'dotenv';
import * as env from 'env-var';

dotenv.config();

export const environment = {
  production: true,

  auth: {
    keycloak: {
      username: env.get('KEYCLOAK_USER').default('admin').asString(),
      password: env.get('KEYCLOAK_PASSWORD').default('password').asString(),

      realm: {
        name: env.get('KEYCLOAK_REALM_NAME').default('realm').asString(),
        username: env.get('KEYCLOAK_REALM_USER').default('admin').asString(),
        password: env
          .get('KEYCLOAK_REALM_PASSWORD')
          .default('password')
          .asString(),
      },
    },
  },
};
