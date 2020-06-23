import { Module } from '@nestjs/common';
import { DoctorModule } from './doctor/doctor.module';
import { IdentityModule } from './identity/identity.module';
import { InstrumentModule } from './instrument/instrument.module';
import { OrganizationModule } from './organization/organization.module';
import { PersonModule } from './person/person.module';
import { ScreeningModule } from './screening/screening.module';
import { FaqModule } from './faq/faq.module';
import { AuthModule } from '@cancerlog/api/auth';
import { UserModule } from '@cancerlog/api/user';

@Module({
  imports: [
    AuthModule,
    DoctorModule,
    IdentityModule,
    InstrumentModule,
    OrganizationModule,
    PersonModule,
    ScreeningModule,
    FaqModule,
    UserModule,
  ],
})
export class ApiModule {}
