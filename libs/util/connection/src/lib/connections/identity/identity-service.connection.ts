import { ServiceConnectionModel } from '../../data/models/service.connection.model';

export class IdentityServiceConnection implements ServiceConnectionModel {
  protocol = 'http';
  hostname = 'identity_app';
  port = 3001;
  endpoint = 'graphql';

  getAddress(): string {
    return `${this.protocol}://${this.hostname}:${this.port}/${this.endpoint}`;
  }
}
