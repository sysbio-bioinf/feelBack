import { RolesEnum } from '@feelback-app/api/shared';
import { Reflector } from '@nestjs/core';
import { DECORATOR_METADATA } from '../constants/decorator.constants';
import { Roles } from './roles.decorator';

export class TestClass {
  @Roles(RolesEnum.ADMIN, RolesEnum.MANAGER, RolesEnum.USER)
  testMethod() {}
}

describe('RolesDecorator', () => {
  it('should set api roles metadata', () => {
    const reflector = new Reflector();
    const testClass = new TestClass();
    expect(
      reflector.get(DECORATOR_METADATA.API_ROLE, testClass.testMethod),
    ).toStrictEqual([RolesEnum.ADMIN, RolesEnum.MANAGER, RolesEnum.USER]);
  });
});
