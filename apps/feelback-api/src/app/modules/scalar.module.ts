import { Module } from '@nestjs/common';
import { JSONObjectScalar } from '@cancerlog/api/application';

const scalars = [JSONObjectScalar];

@Module({
  providers: [...scalars],
  exports: [...scalars]
})
export class ScalarModule {}
