import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/features/shared/shared.module';
import { SurveyPageRoutingModule } from './survey-routing.module';
import { SurveyPage } from './survey.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    IonicModule,
    SurveyPageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [SurveyPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SurveyPageModule {}
