import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionMessageModel } from '../models/exception-message.model';

export class ApiException extends HttpException {
  constructor(exception: ExceptionMessageModel, status: HttpStatus) {
    super(exception, status);
  }
}
