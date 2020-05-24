import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../../../components/components.module';
import { MaterialModule } from '../../../../material.module';
import { InstrumentsPage } from './instruments.page';
import { InstrumentsRouting } from './instruments.routing';

@NgModule({
  declarations: [InstrumentsPage],
  imports: [CommonModule, RouterModule, ComponentsModule, MaterialModule, InstrumentsRouting],
})
export class InstrumentsModule {}
