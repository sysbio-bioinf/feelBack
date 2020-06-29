import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PatientsPage } from './patients.page';
import { PatientsRouting } from './patients.routing';
import { ComponentsModule } from '../../../../../../components/components.module';

@NgModule({
  declarations: [PatientsPage],
  imports: [CommonModule, RouterModule, ComponentsModule, PatientsRouting],
})
export class PatientsModule {}
