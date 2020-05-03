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

@NgModule({
  declarations: [
    NavbarComponent,
    PatientFilterComponent,
    PatientListComponent,
    DistressThermometerComponent,
    SampleInstrumentComponent,
    QuestionnaireComponent,
    InstrumentComponent,
  ],
  imports: [CommonModule, RouterModule, MaterialModule, NgxChartsModule],
  exports: [
    NavbarComponent,
    PatientFilterComponent,
    PatientListComponent,
    SampleInstrumentComponent,
    InstrumentComponent
  ],
})
export class ComponentsModule {}
