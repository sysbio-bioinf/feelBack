import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';
import { MaterialModule } from '../../modules/material.module';
import { PatientDetailsPage } from './patient-details.page';
import { PatientDetailsRoutingModule } from './patient-details.routing.module';

@NgModule({
  declarations: [PatientDetailsPage],
  imports: [CommonModule, RouterModule, ComponentsModule, MaterialModule, PatientDetailsRoutingModule],
})
export class PatientDetailsModule {}
