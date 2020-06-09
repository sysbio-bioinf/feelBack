import { KeycloakJwtModel } from '@cancerlog/api/authentication';
import {
  EC_AUTH_MISSING_JWT,
  ExceptionMessageModel,
} from '@cancerlog/api/errors';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import * as _ from 'lodash';
import * as passport from 'passport';
import { REQUEST_FIELDS } from '../../../constants/request-fields.constants';

const defaultOptions = {
  session: false,
  // @ts-ignore
  callback: (err, user, info) => {
    if (err || !user) {
      // When Error occur, info is the error.
      throw new UnauthorizedException({
        code: EC_AUTH_MISSING_JWT.code,
        title: 'Unauthorized',
        message: EC_AUTH_MISSING_JWT.description,
        error: info,
        source: 'header.authorization',
      } as ExceptionMessageModel);
    }
    return { user, info };
  },
};

// @ts-ignore
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

    _.set(request, REQUEST_FIELDS.AUTH_USER, resolvedUser.user);
    _.set(request, REQUEST_FIELDS.AUTH_INFO, resolvedUser.info);

    return true;
  }

  // TODO: better typings for params
  // @ts-ignore
  handleRequest(err, user, info) {
    if (err || !user) {
      throw new UnauthorizedException({
        code: EC_AUTH_MISSING_JWT.code,
        title: 'Unauthorized',
        message: EC_AUTH_MISSING_JWT.description,
        error: info,
        source: 'header.authorization',
      } as ExceptionMessageModel);
    }
    return user;
  }
}
