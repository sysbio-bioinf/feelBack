import { NgModule } from '@angular/core';
import { GraphQLModule } from '../modules/graphql.module';
import { LoginModule } from './login/login.module';
import { PatientDetailsModule } from './patient-details/patient-details.module';
import { PatientListModule } from './patient-list/patient-list.module';

@NgModule({
  declarations: [],
  imports: [LoginModule, PatientListModule, PatientDetailsModule],
  providers: [GraphQLModule],
})
export class PagesModule {}
