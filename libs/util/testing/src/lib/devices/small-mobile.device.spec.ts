import { CoreDevice } from './core.device';
import { SmallMobileDevice } from './small-mobile.device';

describe('SmallMobileDevice', () => {
  it('should be defined', () => {
    const device = new SmallMobileDevice();
    expect(device).toBeDefined();
    expect(device).toBeInstanceOf(CoreDevice);
  });
});
