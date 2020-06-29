import { CoreDto } from '@feelback-app/api/core';

export class CredentialsDto extends CoreDto {
  username!: string;
  password!: string;
}
