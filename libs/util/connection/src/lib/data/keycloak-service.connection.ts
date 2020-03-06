import { ServiceConnectionModel } from './models/service.connection.model';

export class KeycloakServiceConnection implements ServiceConnectionModel {
  protocol = 'http';
  hostname = 'keycloak';
  port = 8080;
  endpoint = 'auth/realms/feelback/protocol/openid-connect';

  getAddress(): string {
    return `${this.protocol}://${this.hostname}:${this.port}/${this.endpoint}`;
  }
}
