import { Reflector } from '@nestjs/core';
import { DECORATOR_METADATA } from '../..';
import { Unprotected } from './unprotected.decorator';

export class TestClass {
  @Unprotected()
  testMethod() {}
}

describe('UnprotectedDecorator', () => {
  it('should set api unprotected metadata', () => {
    const reflector = new Reflector();
    const testClass = new TestClass();
    expect(
      reflector.get(DECORATOR_METADATA.API_UNPROTECTED, testClass.testMethod),
    ).toStrictEqual(true);
  });
});
