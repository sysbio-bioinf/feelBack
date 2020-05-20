import { NgModule } from '@angular/core';
import { GraphQLModule } from '../modules/graphql.module';
import { LoginModule } from './login/login.module';
import { ErrorModule } from './error/error.module';
import { PatientDetailsModule } from './patient-details/patient-details.module';
import { PatientModule } from './patient/patient.page.module';

@NgModule({
  declarations: [],
  imports: [LoginModule, PatientModule, PatientDetailsModule, ErrorModule],
  providers: [GraphQLModule],
})
export class PagesModule {}
