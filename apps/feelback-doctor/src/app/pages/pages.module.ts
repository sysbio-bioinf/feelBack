import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientListPage } from './patient-list/patient-list.page';
import { PatientDetailsPage } from './patient-details/patient-details.page';
import { LoginPage } from './login/login.page';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GraphQLModule } from '../modules/graphql.module';
import { ComponentsModule } from '../components/components.module';
import { MaterialModule } from '../modules/material.module';

@NgModule({
  declarations: [PatientListPage, PatientDetailsPage, LoginPage],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ComponentsModule,
    MaterialModule
  ],
  providers: [GraphQLModule],
})
export class PagesModule {}
