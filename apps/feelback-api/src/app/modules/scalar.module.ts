import { Module } from '@nestjs/common';
import { JSONObjectScalar } from '@feelback-app/api/util';

const scalars = [JSONObjectScalar];

@Module({
  providers: [...scalars],
  exports: [...scalars],
})
export class ScalarModule {}
