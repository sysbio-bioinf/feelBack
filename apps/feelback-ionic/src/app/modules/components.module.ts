import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { NgPipesModule } from 'ngx-pipes';
import { EmptyComponent } from '../components/empty/empty.component';
import { HeaderComponent } from '../components/header/header.component';
import { InstrumentCardComponent } from '../components/instrument-card/instrument-card.component';
import { OrganizationCardComponent } from '../components/organization-card/organization-card.component';
import { SurveyViewComponent } from '../components/survey-view/survey-view.component';

const components = [
  EmptyComponent,
  HeaderComponent,
  SurveyViewComponent,
  OrganizationCardComponent,
  InstrumentCardComponent,
];

@NgModule({
  declarations: [...components],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NgPipesModule,
  ],
  exports: [...components],
})
export class ComponentsModule {}
