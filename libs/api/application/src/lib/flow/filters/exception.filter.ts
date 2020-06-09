import {
  ArgumentsHost,
  Catch,
  ExceptionFilter as NestExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { GqlContextType } from '@nestjs/graphql';
import { Request, Response } from 'express';

@Catch(HttpException)
export class ExceptionFilter implements NestExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    if (host.getType() === 'http') {
      return this.handleHttpException(exception, host);
    }

    if (host.getType<GqlContextType>() === 'graphql') {
      return this.handleGraphQLException(exception, host);
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
    console.log(exception);
    return exception;
  }
}
