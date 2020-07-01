import { ApiException } from './api.exception';
import { ExceptionMessageModel } from '../models/exception-message.model';
import { HttpStatus } from '@nestjs/common';

const defaultMessage: ExceptionMessageModel = {
  title: 'Invalid State',
  message:
    'The current State of the Resource does not allow for this operation.',
};

export class InvalidStateApiException extends ApiException {
  constructor(
    exception: ExceptionMessageModel = defaultMessage,
    status: HttpStatus = HttpStatus.CONFLICT,
  ) {
    super(exception, status);
  }
}
