import { ServiceConnectionModel } from '../../data/models/service.connection.model';

export class KeycloakServiceConnection implements ServiceConnectionModel {
  protocol = 'http';
  hostname = 'keycloak';
  port = 8080;
  endpoint = '';

  getAddress(): string {
    return `${this.protocol}://${this.hostname}:${this.port}`;
  }

  getRealmAddress(realm: string) {
    return `${this.getAddress()}/auth/realms/${realm}`;
  }

  getTokenAddress(realm: string): string {
    return `${this.getRealmAddress(realm)}/protocol/openid-connect/token`;
  }

  getUserInfoAddress(realm: string): string {
    return `${this.getRealmAddress(realm)}/protocol/openid-connect/userinfo`;
  }
}
