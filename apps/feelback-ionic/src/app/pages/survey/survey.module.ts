import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/modules/shared.module';
import { SurveyPageRoutingModule } from './survey-routing.module';
import { SurveyPage } from './survey.page';

@NgModule({
  imports: [SharedModule, IonicModule, SurveyPageRoutingModule],
  declarations: [SurveyPage],
})
export class SurveyPageModule {}
