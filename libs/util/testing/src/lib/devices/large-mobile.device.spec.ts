import { CoreDevice } from './core.device';
import { LargeMobileDevice } from './large-mobile.device';

describe('LargeMobileDevice', () => {
  it('should be defined', () => {
    const device = new LargeMobileDevice();
    expect(device).toBeDefined();
    expect(device).toBeInstanceOf(CoreDevice);
  });
});
