import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientDetailsPage } from './pages/patient-details/patient-details.page';
import { PatientListPage } from './pages/patient-list/patient-list.page';
import { LoginPage } from './pages/login/login.page';
import { LoginLayout } from './layouts/login/login.layout';
import { MainLayout } from './layouts/main/main.layout';
import { DistressThermometerComponent } from './components/distress-thermometer/distress-thermometer.component';
import { SampleInstrumentComponent } from './components/sample-instrument/sample-instrument.component';
import { ChooseInstrumentComponent } from './components/choose-instrument/choose-instrument.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: LoginLayout,
    children: [{ path: 'login', component: LoginPage }],
  },
  {
    path: '',
    component: MainLayout,
    children: [
      { path: 'list', component: PatientListPage },
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
