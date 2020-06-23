import { AuthModule } from '@cancerlog/api/auth';
import { FaqModule } from '@cancerlog/api/faq';
import { InstrumentModule } from '@cancerlog/api/instrument';
import { OrganizationModule } from '@cancerlog/api/organization';
import { UserModule } from '@cancerlog/api/user';
import { Module } from '@nestjs/common';
import { DoctorModule } from './doctor/doctor.module';
import { IdentityModule } from './identity/identity.module';
import { PersonModule } from './person/person.module';
import { ScreeningModule } from './screening/screening.module';

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
