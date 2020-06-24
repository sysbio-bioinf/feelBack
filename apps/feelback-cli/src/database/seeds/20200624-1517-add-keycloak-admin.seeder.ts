import { RolesEnum } from '@cancerlog/api/auth';
import { Seeder } from '@cancerlog/api/database';
import { KeycloakServiceConnection } from '@cancerlog/util/connection';
import KeycloakAdminClient from 'keycloak-admin';
import { environment } from '../../environments/environment';

export class AddKeycloakAdminUserSeeder extends Seeder {
  async seed() {
    const adminClient = new KeycloakAdminClient({
      baseUrl: `${new KeycloakServiceConnection().getAddress()}/auth`,
    });

    const realmName = environment.auth.keycloak.realm.name;

    await adminClient.auth({
      username: environment.auth.keycloak.username,
      password: environment.auth.keycloak.password,
      clientId: 'admin-cli',
      grantType: 'password',
    });

    try {
      const keycloakId = await adminClient.users.create({
        realm: realmName,
        emailVerified: true,
        enabled: true,
        email: environment.auth.keycloak.realm.username,
        username: environment.auth.keycloak.realm.username,
        credentials: [
          {
            type: 'password',
            value: environment.auth.keycloak.realm.password,
          },
        ],
      });

      const adminRole = await adminClient.roles.findOneByName({
        name: RolesEnum.ADMIN,
        realm: realmName,
      });

      await adminClient.users.addRealmRoleMappings({
        id: keycloakId.id,
        roles: [
          {
            id: adminRole.id || '',
            name: adminRole.name || '',
          },
        ],
        realm: realmName,
      });
    } catch (exception) {
      throw new Error(exception);
    }
  }
}
