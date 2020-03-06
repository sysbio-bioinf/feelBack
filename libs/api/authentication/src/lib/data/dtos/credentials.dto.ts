import { CoreDto } from '@cancerlog/api/core';

export interface CredentialsDto extends CoreDto {
  username: string;
  password: string;
}
