import { CoreDevice } from './core.device';
import { DesktopDevice } from './desktop.device';

describe('DesktopDevice', () => {
  it('should be defined', () => {
    const device = new DesktopDevice();
    expect(device).toBeDefined();
    expect(device).toBeInstanceOf(CoreDevice);
  });
});
