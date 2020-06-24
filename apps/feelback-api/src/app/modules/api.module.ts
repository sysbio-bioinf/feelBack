import { AuthModule } from '@cancerlog/api/auth';
import { DoctorModule } from '@cancerlog/api/doctor';
import { FaqModule } from '@cancerlog/api/faq';
import { IdentityModule } from '@cancerlog/api/identity';
import { InstrumentModule } from '@cancerlog/api/instrument';
import { OrganizationModule } from '@cancerlog/api/organization';
import { PersonModule } from '@cancerlog/api/person';
import { ScreeningModule } from '@cancerlog/api/screening';
import { UserModule } from '@cancerlog/api/user';
import { Module } from '@nestjs/common';

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
