import { CoreDto } from '@cancerlog/api/core';

export class CredentialsDto extends CoreDto {
  username!: string;
  password!: string;
}
