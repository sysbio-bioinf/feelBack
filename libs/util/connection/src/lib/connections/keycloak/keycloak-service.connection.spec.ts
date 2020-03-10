import { KeycloakServiceConnection } from './keycloak-service.connection';

describe('KeycloakServiceConnection', () => {
  it('should be defined', () => {
    expect(new KeycloakServiceConnection()).toBeDefined();
  });

  it('should have a getAddress method', () => {
    const address = new KeycloakServiceConnection().getAddress();
    expect(address).toBeDefined();
  });

  it('should have other methods defined', () => {
    const instance = new KeycloakServiceConnection();
    expect(instance.getAddress()).toBeDefined();
    expect(instance.getRealmAddress('foobar')).toBeDefined();
    expect(instance.getTokenAddress('foobar')).toBeDefined();
    expect(instance.getUserInfoAddress('foobar')).toBeDefined();
  });
});
