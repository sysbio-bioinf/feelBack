import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { User } from '../data/classes/user.class';
import { CurrentUser } from './user.decorator';
import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants';

const decoratorUser = new User('decoratorId');

const ctx = {
  req: { user: decoratorUser },
};

const executionContext = {
  getArgs: () => [null, null, ctx, null],
} as ExecutionContextHost;

export class TestClass {
  testMethod(@CurrentUser() user: User) {
    return user;
  }
}

describe('UserDecorator', () => {
  it('should return user from context', () => {
    const args = Reflect.getMetadata(
      ROUTE_ARGS_METADATA,
      TestClass,
      'testMethod',
    );
    const factory = args[Object.keys(args)[0]].factory;
    const result = factory(null, executionContext);
    expect(result).toStrictEqual(decoratorUser);
  });
});
