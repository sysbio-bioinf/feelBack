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
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { InstrumentComponent } from './instrument/instrument.component';
import { ChooseInstrumentComponent } from './choose-instrument/choose-instrument.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PatientNotFoundComponent } from './patient-not-found/patient-not-found.component';
import { InstrumentNotFoundComponent } from './instrument-not-found/instrument-not-found.component';
import { ScreeningComponent } from './screening/screening.component';

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
    PageNotFoundComponent,
    PatientNotFoundComponent,
    InstrumentNotFoundComponent,
    ScreeningComponent
  ],
  imports: [CommonModule, RouterModule, MaterialModule, NgxChartsModule],
  exports: [
    NavbarComponent,
    PatientFilterComponent,
    PatientListComponent,
    SampleInstrumentComponent,
    InstrumentComponent,
    ChooseInstrumentComponent
  ],
})
export class ComponentsModule {}
