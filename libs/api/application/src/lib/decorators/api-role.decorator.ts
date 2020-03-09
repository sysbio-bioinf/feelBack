import { SetMetadata } from '@nestjs/common';
import { ApiRolesEnum } from '../enums/api-roles.enum';
import { DECORATOR_METADATA } from '../constants/decorator.constants';

export const ApiRole = (...roles: ApiRolesEnum[]) =>
  SetMetadata(DECORATOR_METADATA.API_ROLE, roles);
