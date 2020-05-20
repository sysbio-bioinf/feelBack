import { NgModule } from '@angular/core';
import { GraphQLModule } from '../modules/graphql.module';
import { LoginModule } from './login/login.module';
import { ErrorModule } from './error/error.module';
import { PatientListModule } from './patients/patients.module';
import { PatientDetailsModule } from './patient-details/patient-details.module';

@NgModule({
  declarations: [],
  imports: [LoginModule, PatientListModule, PatientDetailsModule, ErrorModule],
  providers: [GraphQLModule],
})
export class PagesModule {}
