import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainLayout } from '../../layouts/main/main.layout';
import { PatientDetailsPage } from './patient-details.page';
import { ChooseInstrumentComponent } from '../../components/choose-instrument/choose-instrument.component';
import { InstrumentComponent } from '../../components/instrument/instrument.component';
import { PatientNotFoundComponent } from '../../components/patient-not-found/patient-not-found.component';
import { LoginLayout } from '../../layouts/login/login.layout';

const routes: Routes = [
  {
    path: 'patients',
    component: MainLayout,
    children: [
      {
        path: ':patient',
        component: PatientDetailsPage,
        children: [
          { path: '', redirectTo: 'instruments', pathMatch: 'full' },
          {
            path: 'instruments',
            component: ChooseInstrumentComponent,
          },
          {
            path: 'instruments/:instrument',
            component: InstrumentComponent,
          },
        ],
      },
    ],
  },
  {
    path: 'patient-not-found/:patient',
    component: LoginLayout,
    children: [{ path: '', component: PatientNotFoundComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientDetailsRoutingModule {}
