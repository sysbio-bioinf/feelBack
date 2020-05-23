import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginRouting } from './pages/login/login.routing';
import { LoginLayout } from './layouts/login/login.layout';
import { ErrorPage } from './pages/error/error.page';
import { PatientRouting } from './pages/patient/patient.routing';
import { ChooseInstrumentRouting } from './pages/choose-instrument/choose-instrument.routing';
import { InstrumentRouting } from './pages/instrument/instrument.routing';
import { ScreeningRouting } from './pages/screening/screening.routing';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '**',
    component: LoginLayout,
    children: [{ path: '', component: ErrorPage }],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    LoginRouting,
    PatientRouting,
    ChooseInstrumentRouting,
    InstrumentRouting,
    ScreeningRouting,
  ],
  exports: [RouterModule],
})
export class AppRouting {}
