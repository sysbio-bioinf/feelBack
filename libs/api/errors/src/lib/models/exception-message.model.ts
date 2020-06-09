export class ExceptionMessageModel {
  code!: string;
  title?: string;
  message!: string;
  error?: any;
  meta?: object;
  source?: string;
}
