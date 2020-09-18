import { ErrorEntity } from './error-entity.enum';

export class Error {
  constructor(values: { [k: string]: any }) {
    this.code = values.code;
    this.entity = values.entity;
    this.callbackUrl = values.callbackUrl;
  }

  code: number;
  entity: ErrorEntity;
  callbackUrl: string;
}
