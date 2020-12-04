import { KeycloakServiceConnection } from './keycloak-service.connection';

describe('KeycloakServiceConnection', () => {
  let serviceConnection: KeycloakServiceConnection;
  const realm = 'test';

  beforeEach(() => {
    serviceConnection = new KeycloakServiceConnection();
  });

  it('should be defined', () => {
    expect(serviceConnection).toBeDefined();
  });

  it('should have other methods defined', () => {
    expect(serviceConnection.getAddress()).toBeDefined();
    expect(serviceConnection.getRealmAddress(realm)).toBeDefined();
    expect(serviceConnection.getTokenAddress(realm)).toBeDefined();
    expect(serviceConnection.getUserInfoAddress(realm)).toBeDefined();
  });

  it('should have a getAddress method', () => {
    const address = serviceConnection.getAddress();
    const expectedAddress = `${serviceConnection.protocol}://${serviceConnection.hostname}:${serviceConnection.port}`;
    expect(address).toStrictEqual(expectedAddress);
  });

  it('should have a getRealmAddress method', () => {
    const prefix = serviceConnection.getAddress();
    const expectedAddress = `${prefix}/auth/realms/${realm}`;
    const address = serviceConnection.getRealmAddress(realm);
    expect(address).toStrictEqual(expectedAddress);
  });

  it('should have a getTokenAddress method', () => {
    const prefix = serviceConnection.getRealmAddress(realm);
    const expectedAddress = `${prefix}/protocol/openid-connect/token`;
    const address = serviceConnection.getTokenAddress(realm);
    expect(address).toStrictEqual(expectedAddress);
  });

  it('should have a getUserInfoAddress method', () => {
    const prefix = serviceConnection.getRealmAddress(realm);
    const expectedAddress = `${prefix}/protocol/openid-connect/userinfo`;
    const address = serviceConnection.getUserInfoAddress(realm);
    expect(address).toStrictEqual(expectedAddress);
  });
});
