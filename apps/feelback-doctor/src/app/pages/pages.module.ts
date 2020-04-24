import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientListPage } from './patient-list/patient-list.page';
import { PatientDetailsPage } from './patient-details/patient-details.page';

@NgModule({
  declarations: [
    PatientListPage,
    PatientDetailsPage,
  ],
  imports: [
    CommonModule
  ]
})
export class PagesModule { }
