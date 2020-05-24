import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './util/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../modules/material.module';
import { ListComponent } from './patients/list/list.component';
import { DistressThermometerComponent } from './instruments/distress-thermometer/distress-thermometer.component';
import { SampleInstrumentComponent } from './instruments/sample-instrument/sample-instrument.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { QuestionnaireComponent } from './result/questionnaire/questionnaire.component';
import { LoadingComponent } from './util/loading/loading.component';
import { OverviewComponent } from './result/overview/overview.component';
import { EmptyStateComponent } from './util/empty-state/empty-state.component';
import { ErrorIndicatorComponent } from './util/error-indicator/error-indicator.component';
import { CircleImageComponent } from './util/circle-image/circle-image.component';
import { ConsultationComponent } from './result/consultation/consultation.component';
import { PatientInfoComponent } from './result/patient-info/patient-info.component';
import { FilterComponent } from './patients/filter/filter.component';

@NgModule({
  declarations: [
    NavbarComponent,
    FilterComponent,
    ListComponent,
    DistressThermometerComponent,
    SampleInstrumentComponent,
    QuestionnaireComponent,
    LoadingComponent,
    ErrorIndicatorComponent,
    OverviewComponent,
    EmptyStateComponent,
    CircleImageComponent,
    ConsultationComponent,
    PatientInfoComponent,
  ],
  imports: [CommonModule, RouterModule, MaterialModule, NgxChartsModule],
  exports: [
    NavbarComponent,
    FilterComponent,
    ListComponent,
    SampleInstrumentComponent,
    LoadingComponent,
    EmptyStateComponent,
    CircleImageComponent,
    ConsultationComponent,
    QuestionnaireComponent,
    OverviewComponent,
    PatientInfoComponent,
    DistressThermometerComponent,
    ErrorIndicatorComponent,
    CircleImageComponent,
  ],
})
export class ComponentsModule {}
