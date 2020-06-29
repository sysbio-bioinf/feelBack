import { RolesEnum } from '@feelback-app/api/interfaces';
import { SetMetadata } from '@nestjs/common';
import { DECORATOR_METADATA } from '../constants/decorator.constants';

export const Roles = (...roles: RolesEnum[]) =>
  SetMetadata(DECORATOR_METADATA.API_ROLE, roles);
