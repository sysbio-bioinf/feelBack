import { IdentityServiceConnection } from './identity-service.connection';
import { ServiceConnectionModel } from './../../data/models/service.connection.model';

describe('IdentityServiceConnection', () => {
  it('should be defined', () => {
    expect(new IdentityServiceConnection()).toBeDefined();
  });

  it('should have a getAddress method', () => {
    const address = new IdentityServiceConnection().getAddress();
    expect(address).toBeDefined();
  });
});
