import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

/**
 * Authentication guard for GraphQL requests.
 *
 * This class extends the regular AuthGuard to use the Keycloak Bearer Strategy.
 * To do so, it overrides the `getRequest()` method to provide the request object
 * from the `GqlExecutionContext`.
 *
 * @extends AuthGuard('keycloak-bearer')
 */
@Injectable()
export class GqlAuthGuard extends AuthGuard('keycloak-bearer') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
