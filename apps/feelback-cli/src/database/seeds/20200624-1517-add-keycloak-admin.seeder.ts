import { DoctorEntity } from '@feelback-app/api/data';
import { Seeder } from '@feelback-app/api/database';
import { RolesEnum } from '@feelback-app/api/shared';
import { KeycloakServiceConnection } from '@feelback-app/util/connection';
import KeycloakAdminClient from 'keycloak-admin';
import { getConnection } from 'typeorm';
import { environment } from '../../environments/environment';

export class AddKeycloakAdminUserSeeder extends Seeder {
  async seed() {
    const adminClient = new KeycloakAdminClient({
      baseUrl: `${new KeycloakServiceConnection().getAddress()}/auth`,
    });

    const realmName = environment.auth.keycloak.realm.name;

    await adminClient.auth({
      username: environment.auth.keycloak.server.username,
      password: environment.auth.keycloak.server.password,
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

      const feelbackConnection = getConnection();

      const adminUser: Partial<DoctorEntity> = {
        acceptedTOS: true,
        isActive: true,
        email: environment.auth.keycloak.realm.username,
        keycloakId: keycloakId.id,
      };

      await feelbackConnection.getRepository(DoctorEntity).save([adminUser]);
    } catch (exception) {
      console.log(exception);
      throw new Error(exception);
    }
  }
}
