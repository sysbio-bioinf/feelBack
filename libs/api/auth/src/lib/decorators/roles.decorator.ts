import { SetMetadata } from '@nestjs/common';
import { DECORATOR_METADATA } from '../constants/decorator.constants';
import { RolesEnum } from '../enums/roles.enum';

export const Roles = (...roles: RolesEnum[]) =>
  SetMetadata(DECORATOR_METADATA.API_ROLE, roles);
