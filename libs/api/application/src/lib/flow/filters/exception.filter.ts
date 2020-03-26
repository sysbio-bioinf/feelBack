import {
  ArgumentsHost,
  Catch,
  ExceptionFilter as NestExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ContextHelper } from '../../helpers/context.helper';
import { HttpTypeEnum } from '../../enums/http-type.enum';

@Catch(HttpException)
export class ExceptionFilter implements NestExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    switch (host.getType()) {
      case 'http':
        switch (ContextHelper.determineHttpContext(host)) {
          case HttpTypeEnum.GRAPHQL:
            return this.handleGraphQLException(exception, host);
            break;
          case HttpTypeEnum.HTTP:
            return this.handleHttpException(exception, host);
            break;
          default:
            break;
        }
        break;
      default:
        return;
    }
  }

  handleHttpException(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const exceptionMessage = exception.message;
    const exceptionStatus = exception.getStatus();

    response.status(exceptionStatus).json({
      message: exceptionMessage,
      statusCode: exceptionStatus,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }

  handleGraphQLException(exception: HttpException, host: ArgumentsHost) {
    return exception;
  }
}
