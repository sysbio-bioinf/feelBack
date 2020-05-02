import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PatientListRoutingModule } from './patient-list.routing.module';
import { ComponentsModule } from '../../components/components.module';
import { PatientListPage } from './patient-list.page';

@NgModule({
  declarations: [PatientListPage],
  imports: [CommonModule, RouterModule, ComponentsModule, PatientListRoutingModule],
})
export class PatientListModule {}
