import { Routes } from '@angular/router';
import { PatientPage } from './patient.page';
import { InstrumentRouting } from '../instrument/instrument.page.routing';

export const PatientRouting: Routes = [
  {
    path: ':patient',
    component: PatientPage,
    children: [...InstrumentRouting]
  },
];
