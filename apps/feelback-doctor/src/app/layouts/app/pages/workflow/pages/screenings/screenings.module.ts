import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ScreeningsPage } from './screenings.page';
import { ScreeningsRouting } from './screenings.routing';
import { ComponentsModule } from '../../../../../../components/components.module';
import { MaterialModule } from '../../../../../../../app/material.module';

@NgModule({
  declarations: [ScreeningsPage],
  imports: [CommonModule, RouterModule, ComponentsModule, MaterialModule, ScreeningsRouting],
})
export class ScreeningsModule {}
