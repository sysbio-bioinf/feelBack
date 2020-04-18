import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from '../components/header/header.component';
import { InstrumentCardComponent } from '../components/instrument-card/instrument-card.component';
import { OrganizationCardComponent } from '../components/organization-card/organization-card.component';
import { SurveyViewComponent } from '../components/survey-view/survey-view.component';

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
