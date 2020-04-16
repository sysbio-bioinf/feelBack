import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SurveyViewComponent } from './survey-view/survey-view.component';

const components = [SurveyViewComponent];

@NgModule({
  declarations: [...components],
  imports: [IonicModule, CommonModule],
  exports: [...components],
})
export class ComponentsModule {}
