import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../components/components.module';
import { ResultPage } from './result.page';

@NgModule({
  declarations: [ResultPage],
  imports: [CommonModule, ComponentsModule],
})

export class ResultModule {}
