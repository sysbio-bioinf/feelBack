export class Error {
  constructor(values: { [k: string]: any }) {
    this.code = values.code;
    this.entity = values.entity;
    this.callbackUrl = values.callbackUrl;
  }
  
  code: number;
  entity: string;
  callbackUrl: string;
}
