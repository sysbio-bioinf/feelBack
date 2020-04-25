import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientListPage } from './patient-list/patient-list.page';
import { PatientDetailsPage } from './patient-details/patient-details.page';
import { LoginPage } from './login/login.page';

@NgModule({
  declarations: [
    PatientListPage,
    PatientDetailsPage,
    LoginPage
  ],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
