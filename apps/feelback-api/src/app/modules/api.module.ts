import { Module } from '@nestjs/common';
import { OrganizationModule } from './organization/organization.module';
import { InstrumentModule } from './instrument/instrument.module';
import { ScreeningModule } from './screening/screening.module';

@Module({
  imports: [OrganizationModule, InstrumentModule, ScreeningModule]
})
export class ApiModule {}
