import { Module } from '@nestjs/common';
import { OrganizationModule } from './organization/organization.module';
import { InstrumentModule } from './instrument/instrument.module';
import { ScreeningModule } from './screening/screening.module';
import { PersonModule } from './person/person.module';
import { DoctorModule } from './doctor/doctor.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [
    AuthenticationModule,
    DoctorModule,
    InstrumentModule,
    OrganizationModule,
    PersonModule,
    ScreeningModule,
  ],
})
export class ApiModule {}
