import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainLayout } from '../../layouts/main/main.layout';
import { PatientDetailsPage } from './patient-details.page';
import { ChooseInstrumentComponent } from '../../components/choose-instrument/choose-instrument.component';
import { DistressThermometerComponent } from '../../components/distress-thermometer/distress-thermometer.component';
import { SampleInstrumentComponent } from '../../components/sample-instrument/sample-instrument.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'patients/:patient',
        component: PatientDetailsPage,
        children: [
          {
            path: '',
            component: ChooseInstrumentComponent
          },
          {
            path: 'instruments/distress',
            component: DistressThermometerComponent,
          },
          {
            path: 'instruments/instrument A',
            component: SampleInstrumentComponent,
          },
          {
            path: 'instruments/instrument B',
            component: SampleInstrumentComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class PatientDetailsRoutingModule { }