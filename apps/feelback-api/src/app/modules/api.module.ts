import { Module } from '@nestjs/common';
import { OrganizationModule } from './organization/organization.module';
import { InstrumentModule } from './instrument/instrument.module';

@Module({
  imports: [OrganizationModule, InstrumentModule]
})
export class ApiModule {}
