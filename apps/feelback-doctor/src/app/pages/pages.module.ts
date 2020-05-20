import { NgModule } from '@angular/core';
import { GraphQLModule } from '../modules/graphql.module';
import { LoginModule } from './login/login.module';
import { ErrorModule } from './error/error.module';
import { PatientModule } from './patient/patient.page.module';
import { InstrumentModule } from './instrument/instrument.page.module';

@NgModule({
  declarations: [],
  imports: [LoginModule, PatientModule, InstrumentModule, ErrorModule],
  providers: [GraphQLModule],
})
export class PagesModule {}
