import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../components/components.module';
import { ScreeningPage } from './screening.page';

@NgModule({
  declarations: [ScreeningPage],
  imports: [CommonModule, ComponentsModule],
})

export class ScreeningModule {}
