import {
  ExecutionContext,
  HttpStatus,
  Injectable,
  CanActivate,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import * as passport from 'passport';
import { CoreException } from '@cancerlog/api/core';
import { KeycloakJwtModel } from '@cancerlog/api/authentication';

const defaultOptions = {
  session: false,
  callback: (err, user, info) => {
    if (err || !user) {
      // When Error occur, info is the error.
      throw new CoreException(
        {
          status: HttpStatus.UNAUTHORIZED,
          detail:
            'Invalid or missing JWT Access Token. Maybe you are missing the BEARER type?',
          source: { pointer: 'header.authorization' },
          error: info,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return { user, info };
  },
};

const createPassportContext = (request, response) => (type, options) =>
  // TODO Add (minimal) typings for user
  new Promise<{ user: any; info: KeycloakJwtModel }>((resolve, reject) =>
    passport.authenticate(type, options, (err, user, info) => {
      try {
        return resolve(options.callback(err, user, info));
      } catch (err) {
        reject(err);
      }
    })(request, response, resolve),
  );

@Injectable()
export class GraphqlJwtGuard extends AuthGuard('jwt') implements CanActivate {
  getRequest(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context);
    return gqlContext.getContext().req;
  }

  async canActivate(context: ExecutionContext) {
    const gqlContext = GqlExecutionContext.create(context);
    const request = gqlContext.getContext().req;
    const response = gqlContext.getContext().req.res;

    const passportFunction = createPassportContext(request, response);
    const resolvedUser = await passportFunction('jwt', defaultOptions);

    request['auth'] = {};
    request['auth']['user'] = resolvedUser.user;
    request['auth']['info'] = resolvedUser.info;

    return true;
  }

  // TODO: better typings for params
  handleRequest(err, user, info) {
    if (err || !user) {
      throw new CoreException(
        {
          status: HttpStatus.UNAUTHORIZED,
          detail:
            'Invalid or missing JWT Access Token. Maybe you are missing the BEARER type?',
          source: { pointer: 'header.authorization' },
          debug: { location: 'GraphQlJwtGuard' },
          error: info,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }
}
