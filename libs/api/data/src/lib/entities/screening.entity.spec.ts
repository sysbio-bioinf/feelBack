import { ScreeningEntity } from './screening.entity';

describe('ScreeningEntity', () => {
  const screening = new ScreeningEntity();

  it('should be defined', () => {
    expect(screening).toBeDefined();
  });

  describe('getScreeningData', () => {
    it('should return undefined on simple initialization', () => {
      expect(screening.getScreeningData()).toBeUndefined();
    });

    it('should return payload object after value is set', () => {
      screening.payload = {};
      expect(screening.getScreeningData()).toStrictEqual({});
      const obj = {
        foo: true,
        bar: 5,
      };
      screening.payload = obj;
      expect(screening.getScreeningData()).toStrictEqual(obj);
    });
  });
});
