import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/modules/shared.module';
import { SurveyPageRoutingModule } from './survey-routing.module';
import { SurveyPage } from './survey.page';

@NgModule({
  imports: [
    SharedModule,
    IonicModule,
    SurveyPageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [SurveyPage],
})
export class SurveyPageModule {}
