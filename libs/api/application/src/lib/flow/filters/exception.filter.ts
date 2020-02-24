import {
  ArgumentsHost,
  Catch,
  ExceptionFilter as NestExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class ExceptionFilter implements NestExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    // FIXME: Change this part to use context.getType() once the type "graphql" is available
    return this.handleGraphQLException(exception, host);
  }

  handleGraphQLException(exception: HttpException, host: ArgumentsHost) {
    return exception;
  }
}
