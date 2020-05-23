import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';
import { MaterialModule } from '../../modules/material.module';
import { ChooseInstrumentPage } from './choose-instrument.page';

@NgModule({
  declarations: [ChooseInstrumentPage],
  imports: [CommonModule, RouterModule, ComponentsModule, MaterialModule],
})
export class ChooseInstrumentModule {}
