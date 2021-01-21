import { ArgumentMetadata } from '@nestjs/common';
import { ParseIntPipe } from './parse-int.pipe.pipe';
import { ApiException } from '@feelback-app/api/errors';

describe('ParseIntPipe', () => {
  let intPipe: ParseIntPipe;
  const meta: ArgumentMetadata = {
    type: 'custom',
  };

  beforeEach(() => {
    intPipe = new ParseIntPipe();
  });

  it('should be defined', () => {
    expect(intPipe).toBeDefined();
  });

  describe('transform', () => {
    it('should return number', async () => {
      const result = await intPipe.transform('1234', meta);
      expect(result).toBe(1234);
    });

    it("should throw error if input isn't a number", () => {
      expect.assertions(1);
      return expect(intPipe.transform('invalid', meta)).rejects.toThrow(
        ApiException,
      );
    });
  });
});
