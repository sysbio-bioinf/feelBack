import { SetMetadata } from '@nestjs/common';
import { DECORATOR_METADATA } from '../constants/decorator.constants';

export const Unprotected = () =>
  SetMetadata(DECORATOR_METADATA.API_UNPROTECTED, true);
