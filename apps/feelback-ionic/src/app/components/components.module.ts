import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { InstrumentCardComponent } from './instrument-card/instrument-card.component';
import { OrganizationCardComponent } from './organization-card/organization-card.component';
import { SurveyViewComponent } from './survey-view/survey-view.component';

const components = [
  HeaderComponent,
  SurveyViewComponent,
  OrganizationCardComponent,
  InstrumentCardComponent,
];

@NgModule({
  declarations: [...components],
  imports: [IonicModule, CommonModule],
  exports: [...components],
})
export class ComponentsModule {}
