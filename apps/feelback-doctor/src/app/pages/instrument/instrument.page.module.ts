import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';
import { MaterialModule } from '../../modules/material.module';
import { InstrumentPage } from './instrument.page';

@NgModule({
  declarations: [InstrumentPage],
  imports: [CommonModule, RouterModule, ComponentsModule, MaterialModule],
})
export class InstrumentModule {}
