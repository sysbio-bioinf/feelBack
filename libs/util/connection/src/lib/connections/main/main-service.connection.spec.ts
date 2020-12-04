import { MainServiceConnection } from './main-service.connection';

describe('MainServiceConnection', () => {
  let serviceConnection: MainServiceConnection;

  beforeEach(() => {
    serviceConnection = new MainServiceConnection();
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
