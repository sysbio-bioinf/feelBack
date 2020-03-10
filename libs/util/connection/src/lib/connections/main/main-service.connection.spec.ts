import { MainServiceConnection } from './main-service.connection';

describe('MainServiceConnection', () => {
  it('should be defined', () => {
    expect(new MainServiceConnection()).toBeDefined();
  });

  it('should have a getAddress method', () => {
    const address = new MainServiceConnection().getAddress();
    expect(address).toBeDefined();
  });
});
