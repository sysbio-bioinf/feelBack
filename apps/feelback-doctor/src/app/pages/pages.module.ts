import { NgModule } from '@angular/core';
import { GraphQLModule } from '../modules/graphql.module';
import { LoginModule } from './login/login.module';
import { ErrorModule } from './error/error.module';
import { PatientModule } from './patient/patient.module';
import { InstrumentModule } from './instrument/instrument.module';
import { ScreeningModule } from './screening/screening.module';

@NgModule({
  declarations: [],
  imports: [LoginModule, PatientModule, InstrumentModule, ScreeningModule, ErrorModule],
  providers: [GraphQLModule],
})
export class PagesModule {}
