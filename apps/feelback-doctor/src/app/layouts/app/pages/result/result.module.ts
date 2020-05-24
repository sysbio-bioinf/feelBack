import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../../../components/components.module';
import { ResultPage } from './result.page';
import { ResultRouting } from './result.routing';

@NgModule({
  declarations: [ResultPage],
  imports: [CommonModule, ComponentsModule, ResultRouting],
})

export class ResultModule {}
