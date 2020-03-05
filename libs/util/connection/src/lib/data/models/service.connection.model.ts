export interface ServiceConnectionModel {
  protocol: string;
  hostname: string;
  port: number;
  endpoint: string;

  getAddress(): string;
}
