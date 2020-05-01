import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { PatientFilterComponent } from './patient-filter/patient-filter.component';
import { MaterialModule } from '../modules/material.module';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientCardComponent } from './patient-card/patient-card.component';
import { DistressThermometerComponent } from './distress-thermometer/distress-thermometer.component';
import { SampleInstrumentComponent } from './sample-instrument/sample-instrument.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';

@NgModule({
  declarations: [
    NavbarComponent,
    PatientFilterComponent,
    PatientListComponent,
    PatientCardComponent,
    DistressThermometerComponent,
    SampleInstrumentComponent,
    QuestionnaireComponent,
  ],
  imports: [CommonModule, RouterModule, MaterialModule, NgxChartsModule],
  exports: [
    NavbarComponent,
    PatientFilterComponent,
    PatientListComponent,
    PatientCardComponent,
    SampleInstrumentComponent
  ],
})
export class ComponentsModule {}
