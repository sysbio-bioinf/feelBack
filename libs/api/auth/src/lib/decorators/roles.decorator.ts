import { SetMetadata } from '@nestjs/common';
import { DECORATOR_METADATA } from '../constants/decorator.constants';

export const Roles = (...roles: string[]) =>
  SetMetadata(DECORATOR_METADATA.API_ROLE, roles);
