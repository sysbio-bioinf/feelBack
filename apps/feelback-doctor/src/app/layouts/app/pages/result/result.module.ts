import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from '../../../../components/components.module';
import { ResultPage } from './result.page';
import { ResultRouting } from './result.routing';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [ResultPage],
  imports: [CommonModule, ComponentsModule, ResultRouting],
})

export class ResultModule {}
