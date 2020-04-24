import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { DoctorModule } from './doctor/doctor.module';
import { IdentityModule } from './identity/identity.module';
import { InstrumentModule } from './instrument/instrument.module';
import { OrganizationModule } from './organization/organization.module';
import { PersonModule } from './person/person.module';
import { ScreeningModule } from './screening/screening.module';
import { FaqModule } from './faq/faq.module';

@Module({
  imports: [
    AuthenticationModule,
    DoctorModule,
    IdentityModule,
    InstrumentModule,
    OrganizationModule,
    PersonModule,
    ScreeningModule,
    FaqModule,
  ],
})
export class ApiModule {}
