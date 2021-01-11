import { ArgumentMetadata } from '@nestjs/common';
import { ParseUUIDPipe } from './parse-uuid.pipe.pipe';
import { ApiException } from '@feelback-app/api/errors';

describe('ParseUUIDPipe', () => {
  let uuidPipe: ParseUUIDPipe;
  const meta: ArgumentMetadata = {
    type: 'custom',
  };

  beforeEach(() => {
    uuidPipe = new ParseUUIDPipe();
  });

  it('should be defined', () => {
    expect(uuidPipe).toBeDefined();
  });

  describe('transform', () => {
    it('should return uuid v4', async () => {
      const uuidV4 = '4453252d-8900-4d2a-9dcb-355d77fb81f5';
      const result = await uuidPipe.transform(uuidV4, meta);
      expect(result).toStrictEqual(uuidV4);
    });

    it("should throw error if input isn't uuid", () => {
      expect.assertions(2);
      expect(uuidPipe.transform('', meta)).rejects.toThrow(ApiException);
      return expect(uuidPipe.transform('invalid', meta)).rejects.toThrow(
        ApiException,
      );
    });

    it("should throw error if uuid isn't v4", () => {
      expect.assertions(3);
      const uuidV1 = 'a9859c3a-501c-11eb-9ad2-a3c6e7a7e455';
      expect(uuidPipe.transform(uuidV1, meta)).rejects.toThrow(ApiException);
      const uuidV3 = 'c6437ef1-5b86-3a4e-a071-c2d4ad414e65';
      expect(uuidPipe.transform(uuidV3, meta)).rejects.toThrow(ApiException);
      const uuidV5 = '9b8edca0-90f2-5031-8e5d-3f708834696c';
      return expect(uuidPipe.transform(uuidV5, meta)).rejects.toThrow(
        ApiException,
      );
    });
  });
});
