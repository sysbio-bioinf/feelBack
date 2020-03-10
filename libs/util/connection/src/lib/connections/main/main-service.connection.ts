import { ServiceConnectionModel } from '../../data/models/service.connection.model';

export class MainServiceConnection implements ServiceConnectionModel {
  protocol = 'http';
  hostname = 'main_app';
  port = 3000;
  endpoint = 'graphql';

  getAddress(): string {
    return `${this.protocol}://${this.hostname}:${this.port}/${this.endpoint}`;
  }
}
