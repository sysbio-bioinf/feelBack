import { ApiException } from './api.exception';
import { ExceptionMessageModel } from '../models/exception-message.model';
import { HttpStatus } from '@nestjs/common';

const defaultMessage: ExceptionMessageModel = {
  title: 'Not Found',
  message: 'Requested Resource not found',
};

export class NotFoundApiException extends ApiException {
  constructor(
    exception: ExceptionMessageModel = defaultMessage,
    status: HttpStatus = HttpStatus.NOT_FOUND,
  ) {
    super(exception, status);
  }
}
