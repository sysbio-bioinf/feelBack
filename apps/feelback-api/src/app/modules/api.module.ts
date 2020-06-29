import { AuthModule } from '@feelback-app/api/auth';
import { DoctorModule } from '@feelback-app/api/doctor';
import { FaqModule } from '@feelback-app/api/faq';
import { IdentityModule } from '@feelback-app/api/identity';
import { InstrumentModule } from '@feelback-app/api/instrument';
import { OrganizationModule } from '@feelback-app/api/organization';
import { PersonModule } from '@feelback-app/api/person';
import { ScreeningModule } from '@feelback-app/api/screening';
import { UserModule } from '@feelback-app/api/user';
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
