import { HttpStatus, HttpException } from '@nestjs/common';

export class CoreException extends HttpException {
  private messageData: ExceptionMessage;

  constructor(
    protected readonly exception: ExceptionMessage,
    readonly httpStatus: HttpStatus,
  ) {
    super(exception, httpStatus);

    this.messageData = exception;
  }

  getMessage(): ExceptionMessage {
    return this.messageData;
  }
}

export interface ExceptionMessage {
  id?: string;
  links?: {
    about: string;
  };
  status?: HttpStatus;
  code?: string;
  title?: string;
  detail: string;
  source?: {
    pointer?: string;
    parameter?: string;
  };
  error?: object;
  meta?: object;
  debug?: {
    message?: string;
    location?: string;
  };
}
