import { IdentityServiceConnection } from './identity-service.connection';
import { ServiceConnectionModel } from './../../data/models/service.connection.model';

describe('IdentityServiceConnection', () => {
  let serviceConnection: IdentityServiceConnection;

  beforeEach(() => {
    serviceConnection = new IdentityServiceConnection();
  });

  it('should be defined', () => {
    expect(serviceConnection).toBeDefined();
  });

  it('should have a getAddress method', () => {
    const address = serviceConnection.getAddress();
    expect(address).toBeDefined();
    const expectedAddress = `${serviceConnection.protocol}://${serviceConnection.hostname}:${serviceConnection.port}/${serviceConnection.endpoint}`;
    expect(address).toStrictEqual(expectedAddress);
  });
});
