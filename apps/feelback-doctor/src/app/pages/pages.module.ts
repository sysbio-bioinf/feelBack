import { NgModule } from '@angular/core';
import { GraphQLModule } from '../modules/graphql.module';
import { LoginModule } from './login/login.module';
import { ErrorModule } from './error/error.module';
import { PatientsModule } from './patients/patients.module';
import { InstrumentModule } from './instrument/instrument.module';
import { ScreeningModule } from './screening/screening.module';
import { ChooseInstrumentModule } from './choose-instrument/choose-instrument.module';

@NgModule({
  declarations: [],
  imports: [LoginModule, PatientsModule, ChooseInstrumentModule, InstrumentModule, ScreeningModule, ErrorModule],
  providers: [GraphQLModule],
})
export class PagesModule {}
