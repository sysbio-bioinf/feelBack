import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';
import { PatientListPage } from './patient-list.page';

@NgModule({
  declarations: [PatientListPage],
  imports: [CommonModule, RouterModule, ComponentsModule],
})
export class PatientListModule {}
