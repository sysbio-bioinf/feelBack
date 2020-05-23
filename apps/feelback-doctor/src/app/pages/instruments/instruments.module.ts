import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';
import { MaterialModule } from '../../modules/material.module';
import { InstrumentsPage } from './instruments.page';

@NgModule({
  declarations: [InstrumentsPage],
  imports: [CommonModule, RouterModule, ComponentsModule, MaterialModule],
})
export class InstrumentsModule {}
