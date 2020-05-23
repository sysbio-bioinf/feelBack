import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';
import { PatientsPage } from './patients.page';

@NgModule({
  declarations: [PatientsPage],
  imports: [CommonModule, RouterModule, ComponentsModule],
})
export class PatientsModule {}
