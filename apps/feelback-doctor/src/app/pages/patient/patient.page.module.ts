import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';
import { PatientPage } from './patient.page';

@NgModule({
  declarations: [PatientPage],
  imports: [CommonModule, RouterModule, ComponentsModule],
})
export class PatientModule {}
