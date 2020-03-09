import { SetMetadata } from '@nestjs/common';
import { ApiRealmsEnum } from '../enums/api-realms.enum';
import { DECORATOR_METADATA } from '../constants/decorator.constants';

export const ApiRealm = (realm: ApiRealmsEnum) =>
  SetMetadata(DECORATOR_METADATA.API_REALM, realm);
