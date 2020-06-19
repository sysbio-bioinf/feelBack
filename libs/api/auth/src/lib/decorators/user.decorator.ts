import { createParamDecorator } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';

/**
 * Extracts the currently logged in user from the execution context.
 */
export const CurrentUser = createParamDecorator(
  (_data, ctxHost: ExecutionContextHost) => {
    const [_root, _args, ctx, _info] = ctxHost.getArgs();
    return ctx.req.user;
  },
);
