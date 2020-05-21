import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { PatientFilterComponent } from './patient-filter/patient-filter.component';
import { MaterialModule } from '../modules/material.module';
import { PatientListComponent } from './patient-list/patient-list.component';
import { DistressThermometerComponent } from './distress-thermometer/distress-thermometer.component';
import { SampleInstrumentComponent } from './sample-instrument/sample-instrument.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { QuestionnaireComponent } from './screening/questionnaire/questionnaire.component';
import { InstrumentComponent } from './instrument/instrument.component';
import { ChooseInstrumentComponent } from './choose-instrument/choose-instrument.component';
import { LoadingComponent } from './loading/loading.component';
import { OverviewComponent } from './screening/overview/overview.component';
import { EmptyStateComponent } from './empty-state/empty-state.component';
import { ErrorIndicatorComponent } from './error-indicator/error-indicator.component';
import { CircleImageComponent } from './circle-image/circle-image.component';
import { ConsultationComponent } from './screening/consultation/consultation.component';

@NgModule({
  declarations: [
    NavbarComponent,
    PatientFilterComponent,
    PatientListComponent,
    DistressThermometerComponent,
    SampleInstrumentComponent,
    QuestionnaireComponent,
    InstrumentComponent,
    ChooseInstrumentComponent,
    LoadingComponent,
    ErrorIndicatorComponent,
    OverviewComponent,
    EmptyStateComponent,
    CircleImageComponent,
    ConsultationComponent,
  ],
  imports: [CommonModule, RouterModule, MaterialModule, NgxChartsModule],
  exports: [
    NavbarComponent,
    PatientFilterComponent,
    PatientListComponent,
    SampleInstrumentComponent,
    InstrumentComponent,
    ChooseInstrumentComponent,
    LoadingComponent,
    EmptyStateComponent,
    CircleImageComponent,
    ConsultationComponent,
    QuestionnaireComponent,
    OverviewComponent,
  ],
})
export class ComponentsModule {}
