import { InitDatabaseSeeder } from './20200527-1143-init-database.seeder';
import { AddKeycloakAdminUserSeeder } from './20200624-1517-add-keycloak-admin.seeder';

export const availableSeeders = [
  InitDatabaseSeeder,
  AddKeycloakAdminUserSeeder,
];
