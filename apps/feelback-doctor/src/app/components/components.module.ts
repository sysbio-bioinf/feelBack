import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './util/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../modules/material.module';
import { ListComponent } from './patient/list/list.component';
import { DistressThermometerComponent } from './instrument/distress-thermometer/distress-thermometer.component';
import { SampleInstrumentComponent } from './instrument/sample-instrument/sample-instrument.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { QuestionnaireComponent } from './screening/questionnaire/questionnaire.component';
import { ChooseInstrumentComponent } from './instrument/choose-instrument/choose-instrument.component';
import { LoadingComponent } from './util/loading/loading.component';
import { OverviewComponent } from './screening/overview/overview.component';
import { EmptyStateComponent } from './util/empty-state/empty-state.component';
import { ErrorIndicatorComponent } from './util/error-indicator/error-indicator.component';
import { CircleImageComponent } from './util/circle-image/circle-image.component';
import { ConsultationComponent } from './screening/consultation/consultation.component';
import { HeaderComponent } from './instrument/header/header.component';
import { InstrumentWrapperComponent } from './instrument/instrument-wrapper/instrument-wrapper.component';
import { FilterComponent } from './patient/filter/filter.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FilterComponent,
    ListComponent,
    DistressThermometerComponent,
    SampleInstrumentComponent,
    QuestionnaireComponent,
    ChooseInstrumentComponent,
    LoadingComponent,
    ErrorIndicatorComponent,
    OverviewComponent,
    EmptyStateComponent,
    CircleImageComponent,
    ConsultationComponent,
    HeaderComponent,
    InstrumentWrapperComponent,
  ],
  imports: [CommonModule, RouterModule, MaterialModule, NgxChartsModule],
  exports: [
    NavbarComponent,
    FilterComponent,
    ListComponent,
    SampleInstrumentComponent,
    ChooseInstrumentComponent,
    LoadingComponent,
    EmptyStateComponent,
    CircleImageComponent,
    ConsultationComponent,
    QuestionnaireComponent,
    OverviewComponent,
    HeaderComponent,
    DistressThermometerComponent,
    ErrorIndicatorComponent,
  ],
})
export class ComponentsModule {}
