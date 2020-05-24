import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../../../components/components.module';
import { MaterialModule } from '../../../../material.module';
import { ScreeningsPage } from './screenings.page';
import { ScreeningsRouting } from './screenings.routing';

@NgModule({
  declarations: [ScreeningsPage],
  imports: [CommonModule, RouterModule, ComponentsModule, MaterialModule, ScreeningsRouting],
})
export class ScreeningsModule {}
