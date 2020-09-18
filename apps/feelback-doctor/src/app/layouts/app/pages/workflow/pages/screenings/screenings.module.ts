import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ScreeningsPage } from './screenings.page';
import { ScreeningsRouting } from './screenings.routing';
import { ComponentsModule } from '../../../../../../components/components.module';
import { MaterialModule } from '../../../../../../../app/material.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ScreeningsPage],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
    MaterialModule,
    ScreeningsRouting,
    NgxChartsModule,
    ReactiveFormsModule,
  ],
})
export class ScreeningsModule {}
